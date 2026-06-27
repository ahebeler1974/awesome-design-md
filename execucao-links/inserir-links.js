/* ============================================================================
 * inserir-links.js — Guia Casa Inteligente
 * Inserir links de afiliado nos botões pendentes de UM post do WordPress.
 *
 * COMO USAR (resumo — detalhes no GUIA-EXECUCAO.md):
 *   1. Abrir uma aba JÁ LOGADA em https://ahebeler.shop/wp-admin (qualquer tela do admin).
 *   2. Abrir o console do navegador (F12 → Console).
 *   3. Editar POST_ID e o array LINKS abaixo.
 *   4. Colar este arquivo inteiro e dar Enter → roda em DRY-RUN (não salva nada).
 *   5. Conferir a tabela. Se estiver certo: rodar  run({ dryRun: false })
 *   6. Conferir:  validar()
 *
 * Requisitos: estar logado no wp-admin (o wp.apiFetch usa o nonce da sessão).
 * Os links OFICIAIS (com matt_tool=38524122 e ua=) você obtém pelo método da §3
 * do handoff (Mercado Livre logado → "Compartilhar" do breadcrumb → "Copiar link").
 * NUNCA usar URL com /social/ (vitrine).
 * ========================================================================== */

// ===== 1) CONFIG — edite por post =====
const POST_ID = 1009; // ver §2 do MASTERINFRAHANDOFF (ID do WordPress do post)

// Cada item liga um trecho do NOME no <mark> ao link OFICIAL.
//   inc: substrings que DEVEM aparecer no nome do produto (case/acento-insensível)
//   exc: substrings que NÃO podem aparecer (desambiguação — ex.: "Max", "com relógio")
//   href: link oficial copiado do Mercado Livre (precisa ter matt_tool + ua=, sem /social/)
const LINKS = [
  // EXEMPLO (apague e preencha com os seus):
  // { inc: ['echo dot', '5'], exc: ['max', 'relogio'], href: 'https://www.mercadolivre.com.br/.../p/MLB46024018?...&matt_tool=38524122&ua=XXXX' },
];

// ===== 2) Helpers (não precisa mexer) =====
const _norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

function _matchRule(name, rule) {
  const n = _norm(name);
  const inc = (rule.inc || []).every(t => n.includes(_norm(t)));
  const exc = (rule.exc || []).every(t => !n.includes(_norm(t)));
  return inc && exc;
}

// acha o <mark> irmão seguinte do <a> (até 6 nós, conforme o handoff)
function _findMark(a) {
  let n = a.nextElementSibling, hops = 0;
  while (n && hops < 6) {
    if (n.tagName === 'MARK') return n;
    n = n.nextElementSibling; hops++;
  }
  return null;
}

function _linkValido(href) {
  return /\/p\/MLB\d+/.test(href)            // cai num produto
      && /[?&]ua=/.test(href)                // tem a assinatura oficial
      && /matt_tool=38524122/.test(href)     // tem a etiqueta certa
      && !href.includes('/social/');         // NÃO é vitrine
}

// ===== 3) Execução =====
async function run({ dryRun = true } = {}) {
  if (typeof wp === 'undefined' || !wp.apiFetch) {
    console.error('❌ wp.apiFetch indisponível. Abra uma tela do wp-admin e tente de novo.');
    return;
  }
  const p = await wp.apiFetch({ path: `/wp/v2/posts/${POST_ID}?context=edit&_fields=content` });
  const doc = new DOMParser().parseFromString(p.content.raw, 'text/html');
  const anchors = [...doc.querySelectorAll('a')]
    .filter(a => (a.getAttribute('href') || '').includes('COLAR-LINK-AFILIADO'));

  const report = [];
  let aplicados = 0;
  for (const a of anchors) {
    const mark = _findMark(a);
    const name = mark ? mark.textContent.trim() : '(sem <mark>)';
    const rule = LINKS.find(r => _matchRule(name, r));
    if (!rule) { report.push({ produto: name, acao: '— sem regra (pulado)' }); continue; }
    if (!_linkValido(rule.href)) { report.push({ produto: name, acao: '❌ link inválido (matt_tool/ua=/social?)' }); continue; }
    if (!dryRun) {
      a.setAttribute('href', rule.href);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'nofollow sponsored noopener');
      if (mark) mark.remove();
    }
    aplicados++;
    report.push({ produto: name, acao: dryRun ? '✓ casou (dry-run)' : '✅ inserido', mlb: (rule.href.match(/MLB\d+/) || [])[0] });
  }

  console.table(report);
  console.log(`Botões pendentes no post: ${anchors.length} · com link mapeado: ${aplicados} · restantes: ${anchors.length - aplicados}`);

  if (dryRun) {
    console.log('🟡 DRY-RUN: nada foi salvo. Se a tabela estiver certa, rode:  run({ dryRun: false })');
  } else {
    await wp.apiFetch({ path: `/wp/v2/posts/${POST_ID}`, method: 'POST', data: { content: doc.body.innerHTML } });
    console.log('✅ Post atualizado. Rode  validar()  para conferir L/F/V.');
  }
}

// ===== 4) Validação pós-edição (conta L / F / V) =====
async function validar(postId = POST_ID) {
  const p = await wp.apiFetch({ path: `/wp/v2/posts/${postId}?context=edit&_fields=content` });
  const html = p.content.raw;
  const n = re => (html.match(re) || []).length;
  const L = n(/matt_tool=38524122/g);   // links inseridos
  const ua = n(/[?&]ua=/g);             // assinaturas oficiais
  const F = n(/COLAR-LINK-AFILIADO/g);  // placeholders restantes
  const V = n(/\/social\//g);           // links na vitrine
  console.table({ L_matt_tool: L, ua: ua, F_placeholders: F, V_social: V });
  console.log(`${F === 0 ? '✅' : '❌'} F (placeholders) = ${F}  (precisa ser 0)`);
  console.log(`${V === 0 ? '✅' : '❌'} V (/social/)     = ${V}  (precisa ser 0)`);
  console.log(`${ua === L ? '✅' : '❌'} ua == matt_tool  = ${ua} / ${L}`);
  return { L, ua, F, V };
}

// roda o dry-run automaticamente ao colar
run();
