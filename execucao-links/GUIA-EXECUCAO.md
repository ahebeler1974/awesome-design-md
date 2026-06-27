# 🛠️ Guia de Execução — Inserir links e publicar (Guia Casa Inteligente)

> **O que é isto:** o passo a passo prático para **terminar os links de afiliado** e **publicar** os posts,
> usando o método validado do [`MASTERINFRAHANDOFF.md`](../MASTERINFRAHANDOFF.md). Pensado para rodar
> num **navegador logado** (seu, ou um ambiente com a sua sessão) — **não** num agente de nuvem isolado.
>
> Acompanha o script [`inserir-links.js`](./inserir-links.js).

---

## ⚠️ Pré-requisitos (sem isto, NADA funciona)

| Requisito | Por quê |
|---|---|
| **Rede liberada** para `ahebeler.shop` e `mercadolivre.com.br` | Ambientes de nuvem fechados bloqueiam esses hosts (testado: 403). Rode na sua máquina ou num ambiente com política de rede aberta. |
| **Login no `wp-admin`** (humano digita a senha) | O `wp.apiFetch` usa o *nonce* da sessão logada. Agentes **não** digitam senha. |
| **Login de afiliado no Mercado Livre** | O token `ua=` **só** sai do "Copiar link" estando logado; **não pode ser fabricado**. |
| **Dados do handoff** (§2 IDs, §4 produtos/MLB) | Dizem qual post e qual produto é cada botão. |

> 🤖 **Agente PODE:** extrair o link (clipboard) e inserir via `apiFetch`, contar/validar.
> **Agente NÃO PODE:** digitar a senha, fabricar o `ua=`, escolher substituto de produto descontinuado, decidir a "Oferta do dia".

---

## Visão geral do fluxo

```
Para cada post pendente (ver §4 do handoff):
  1. Gerar os links oficiais no Mercado Livre (§3a/§3b)         ← sessão de afiliado
  2. Preencher o array LINKS do inserir-links.js
  3. Rodar em DRY-RUN no console do wp-admin                    ← sessão do wp-admin
  4. Conferir a tabela → aplicar  run({ dryRun:false })
  5. validar()  → F=0, V=0, ua==matt_tool
Depois de todos os posts: limpeza do tema, imagem destacada, publicar por silos, purgar cache.
```

---

## Parte A — Gerar o link oficial (Mercado Livre logado)

Para **cada produto** de um botão pendente:

1. Esteja **logado como afiliado** (barra preta "Afiliados" no topo do produto).
2. Abra a **página do produto** (`/p/MLBxxxxxxx`).
3. Clique em **"Compartilhar" do breadcrumb** (NÃO o botão azul da barra preta) → **"Copiar link"**.
4. O link copiado tem `...&matt_tool=38524122&ua=<TOKEN>`. Guarde-o.
   - ❌ Se vier `meli.la/...` ou contiver `/social/`, está **errado** (vitrine) — refaça pelo "Compartilhar" do breadcrumb.

**Automação opcional do clipboard** (no console da aba do produto):
```js
// localizar o "Compartilhar" certo pelo retângulo (o de y≈27 é o errado, da barra preta)
const el = [...document.querySelectorAll('*')]
  .find(n => n.textContent.trim() === 'Compartilhar' && n.getBoundingClientRect().y > 100);
el?.scrollIntoView({block:'center'}); el?.click();
// clicar em "Copiar link" no menu que abrir, então:
const link = await navigator.clipboard.readText();
console.log(/\/p\/MLB\d+/.test(link) && /ua=/.test(link) ? '✅ ' + link : '❌ link suspeito: ' + link);
```
> Sempre confira pelo retângulo (clique em posição fixa erra) e valide que o link tem `/p/MLB<id>` **e** `ua=` antes de usar.

---

## Parte B — Inserir no WordPress (wp-admin logado)

1. Abra uma aba **logada** em `https://ahebeler.shop/wp-admin` (qualquer tela do admin).
2. Abra o console (**F12 → Console**).
3. Abra [`inserir-links.js`](./inserir-links.js) e **edite**:
   - `POST_ID` → o ID do post ([§2 do handoff](../MASTERINFRAHANDOFF.md#2-mapa-dos-posts-id-do-wordpress--artigo)).
   - `LINKS` → um item por botão: `inc`/`exc` para casar com o NOME no `<mark>`, e o `href` oficial da Parte A.
4. **Cole o arquivo inteiro** e Enter → roda em **DRY-RUN** (não salva). Confira a tabela impressa.
5. Se estiver certo: `run({ dryRun: false })` → aplica e salva.
6. `validar()` → confere **F=0, V=0, ua==matt_tool**.

> 💡 O script acha o `<mark>` irmão de cada botão, casa o produto por `inc`/`exc` (ignora acento/caixa),
> troca o `href`, põe `rel="nofollow sponsored noopener"` + `target="_blank"` e remove o `<mark>`.
> Usa `content.raw` (markup de blocos Gutenberg) — **nunca** `.rendered`.

### Exemplo de `LINKS`
```js
const POST_ID = 1009; // 09 Echo Dot promo
const LINKS = [
  { inc: ['echo dot', '5'], exc: ['max', 'relogio'], href: 'https://www.mercadolivre.com.br/.../p/MLB46024018?...&matt_tool=38524122&ua=TOKEN1' },
  { inc: ['echo pop'],       exc: [],                 href: 'https://www.mercadolivre.com.br/.../p/MLB62304347?...&matt_tool=38524122&ua=TOKEN2' },
];
```

---

## ✅ Checklist por post (gates antes de publicar)

- [ ] **F = 0** — nenhum `COLAR-LINK-AFILIADO` restante (nenhum botão morto `href="#"`).
- [ ] **V = 0** — nenhum link com `/social/` (vitrine).
- [ ] **ua == matt_tool** — todo link oficial tem os dois (link sem `ua=` é inválido).
- [ ] Todo `href` cai em `/p/MLB<id>` do **produto certo** (confira a coluna `mlb` da tabela do dry-run).
- [ ] `<mark>` de destaque amarelo **removidos** (o script faz isso ao aplicar).
- [ ] Blocos `[Opcional — sua experiência ...]` preenchidos **ou** removidos.
- [ ] Sem notas internas sobradas no corpo.
- [ ] **Imagem destacada** definida (alt = palavra-chave).
- [ ] **Rank Math** com nota 80+ (título, meta, keyword).

> Atalho de validação no console: `validar()` imprime L / ua / F / V e marca ✅/❌ automaticamente.

---

## Checklist final do site (depois de todos os posts)

- [ ] Remover **"Built with GeneratePress"** do rodapé (`add_filter('generate_copyright', fn() => '© 2026 Guia Casa Inteligente');`).
- [ ] **Rank Math:** reconectar (aviso de URL alterada após troca de domínio).
- [ ] **Search Console:** conectar + enviar sitemap (`/sitemap_index.xml`).
- [ ] Resolver os **2 descontinuados**: Allo W3 → art.14 · FR 500 → art.18 (escolher substituto atual).
- [ ] Decidir a **"Oferta do dia"** do art.09 e a copy travada do art.13 (Echo Show 5).
- [ ] **Publicar por silos** ([§6 do handoff](../MASTERINFRAHANDOFF.md#6-ordem-de-publicação-por-silos)).
- [ ] **Purgar o cache LiteSpeed** ao final (Toolbox → "Limpar tudo - LSCache").
- [ ] Varredura global: `grep "/social/"` em todos os posts = **0**.

---

## Apêndice — `inserir-links.js` (referência)

> Arquivo executável: [`inserir-links.js`](./inserir-links.js). Reproduzido aqui para leitura no PDF.

```js
// ===== CONFIG (edite por post) =====
const POST_ID = 1009;                 // ID do WordPress (§2 do handoff)
const LINKS = [
  // { inc: ['echo dot','5'], exc: ['max','relogio'], href: 'https://.../p/MLB46024018?...&matt_tool=38524122&ua=...' },
];

// ===== Helpers =====
const _norm = s => (s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
const _matchRule = (name, r) =>
  (r.inc||[]).every(t => _norm(name).includes(_norm(t))) &&
  (r.exc||[]).every(t => !_norm(name).includes(_norm(t)));
function _findMark(a){ let n=a.nextElementSibling,h=0; while(n&&h<6){ if(n.tagName==='MARK')return n; n=n.nextElementSibling; h++; } return null; }
const _linkValido = h => /\/p\/MLB\d+/.test(h) && /[?&]ua=/.test(h) && /matt_tool=38524122/.test(h) && !h.includes('/social/');

// ===== Execução =====
async function run({ dryRun = true } = {}) {
  const p = await wp.apiFetch({ path: `/wp/v2/posts/${POST_ID}?context=edit&_fields=content` });
  const doc = new DOMParser().parseFromString(p.content.raw, 'text/html');
  const anchors = [...doc.querySelectorAll('a')].filter(a => (a.getAttribute('href')||'').includes('COLAR-LINK-AFILIADO'));
  for (const a of anchors) {
    const mark = _findMark(a);
    const rule = LINKS.find(r => _matchRule(mark ? mark.textContent : '', r));
    if (!rule || !_linkValido(rule.href)) continue;
    if (!dryRun) {
      a.setAttribute('href', rule.href);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'nofollow sponsored noopener');
      if (mark) mark.remove();
    }
  }
  if (!dryRun) await wp.apiFetch({ path: `/wp/v2/posts/${POST_ID}`, method: 'POST', data: { content: doc.body.innerHTML } });
}

// ===== Validação =====
async function validar(postId = POST_ID) {
  const { content } = await wp.apiFetch({ path: `/wp/v2/posts/${postId}?context=edit&_fields=content` });
  const n = re => (content.raw.match(re) || []).length;
  return { L: n(/matt_tool=38524122/g), ua: n(/[?&]ua=/g), F: n(/COLAR-LINK-AFILIADO/g), V: n(/\/social\//g) };
}
```
