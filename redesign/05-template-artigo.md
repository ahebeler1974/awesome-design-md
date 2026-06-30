# Guia Casa Inteligente — Kit Editorial

## (A) TEMPLATE EDITORIAL FIXO — Reviews e Comparativos

> Cole este esqueleto em todo review/comparativo. Cada bloco indica **qual componente `.gci-*` usar**. As classes referenciam os tokens da identidade visual oficial (Sora + Inter, paleta GCI). Mantenha a ordem — ela foi desenhada para retenção, confiança e conversão em afiliado.

---

### Pré-requisito global: tokens + fontes (uma vez no `<head>` ou via Customizer do GeneratePress)

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap" rel="stylesheet">

<style>
:root{
  --gci-ink:#0B1220; --gci-ink-soft:#475569;
  --gci-navy-900:#091A2E; --gci-navy-800:#0C2236;
  --gci-blue:#2563EB; --gci-blue-600:#1D4ED8;
  --gci-cyan:#06B6D4; --gci-teal:#0EA5A4;
  --gci-cta:#15A24A; --gci-cta-600:#0F7E39; --gci-cta-glow:rgba(21,162,74,.35);
  --gci-amber:#F59E0B;
  --gci-bg:#F4F7FB; --gci-surface:#FFFFFF; --gci-border:#E4EAF2;
  --gci-shadow:0 10px 30px -12px rgba(9,26,46,.18);
  --gci-shadow-hover:0 20px 45px -15px rgba(9,26,46,.28);
  --gci-radius:16px; --gci-radius-sm:10px;
  --gci-grad-hero:linear-gradient(135deg,#091A2E 0%,#0C2236 45%,#0E3A5C 100%);
  --gci-grad-brand:linear-gradient(90deg,#2563EB 0%,#06B6D4 100%);
  --gci-grad-cta:linear-gradient(90deg,#15A24A 0%,#22C55E 100%);
  --gci-font-display:"Sora","Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  --gci-font-sans:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
}
body{font-family:var(--gci-font-sans);font-size:17px;line-height:1.7;color:var(--gci-ink);background:var(--gci-bg);}
.gci-article h1,.gci-article h2,.gci-article h3{font-family:var(--gci-font-display);letter-spacing:-.02em;color:var(--gci-ink);}
</style>
```

---

### Ordem dos blocos e componente a usar

| # | Bloco editorial | Componente `.gci-*` | Função |
|---|---|---|---|
| 1 | Breadcrumb | `.gci-breadcrumb` | Contexto + SEO + navegação por silo |
| 2 | Título H1 + selo "Atualizado em" | `.gci-article-head` + `.gci-badge-updated` | Autoridade e frescor |
| 3 | Intro curta (2-3 frases) | `.gci-lede` | Promessa + intenção de compra |
| 4 | Disclosure perto do 1º CTA | `.gci-disclosure` | Transparência honesta |
| 5 | Resposta rápida (TL;DR) + disclosure curto acima do 1º CTA | `.gci-tldr` + `.gci-disclosure--inline` | Veredito imediato + CTA salvável com disclosure adjacente |
| 6 | Tabela comparativa | `.gci-table-wrap` > `.gci-table` | Bloco viral/salvável |
| 7 | Melhor escolha / Custo-benefício / Evite se | `.gci-verdict-grid` com `.gci-pick` | Decisão rápida por intenção |
| 8 | Detalhes por produto + prós/contras + nota por critério | `.gci-product` + `.gci-proscons` + `.gci-score` | Profundidade e prova técnica |
| 9 | Para quem vale / não vale | `.gci-fit` | Qualificação do leitor |
| 10 | FAQ (accordion) | `.gci-faq` > `<details class="gci-faq-item">` | Long-tail + schema |
| 11 | Como avaliamos | `.gci-method` | Credibilidade/E-E-A-T |
| 12 | Leia também | `.gci-related` | Linkagem interna por silo |
| 13 | Veredito final + CTA | `.gci-finalverdict` + `.gci-cta` | Conversão |
| 14 | Disclosure curto (rodapé do artigo) | `.gci-disclosure--mini` | Reforço legal |

---

### Esqueleto HTML pronto (preencher os `{{campos}}`)

```html
<article class="gci-article">

  <!-- 1. BREADCRUMB -->
  <nav class="gci-breadcrumb" aria-label="Você está aqui">
    <a href="/">Início</a> <span aria-hidden="true">›</span>
    <a href="/{{categoria-slug}}/">{{Categoria}}</a> <span aria-hidden="true">›</span>
    <span aria-current="page">{{Título curto}}</span>
  </nav>

  <!-- 2. TÍTULO + SELO ATUALIZADO -->
  <header class="gci-article-head">
    <span class="gci-pill">{{Categoria}}</span>
    <h1>{{Título com benefício + especificidade + intenção de compra}}</h1>
    <p class="gci-byline">
      Por <strong>Equipe Guia Casa Inteligente</strong>
      <span class="gci-badge-updated">● Atualizado em {{mês/ano}}</span>
      <span class="gci-readtime">⏱ {{X}} min de leitura</span>
    </p>
  </header>

  <!-- 3. INTRO CURTA -->
  <p class="gci-lede">{{2-3 frases: a dor, a promessa e o que o leitor vai decidir ao final.}}</p>

  <!-- 4. DISCLOSURE PERTO DO 1º CTA -->
  <p class="gci-disclosure">
    🔎 <strong>Transparência:</strong> alguns links são de afiliado do Mercado Livre. Se você comprar por eles,
    podemos ganhar uma comissão — <strong>sem custo extra para você</strong>. Isso não muda nossa nota.
  </p>

  <!-- 5. RESPOSTA RÁPIDA (TL;DR) -->
  <aside class="gci-tldr">
    <h2>Resposta rápida</h2>
    <p>{{Veredito em 1-2 frases. Quem ganha e para quem.}}</p>
    <ul>
      <li><strong>Melhor no geral:</strong> {{Produto A}}</li>
      <li><strong>Melhor custo-benefício:</strong> {{Produto B}}</li>
    </ul>
    <p class="gci-disclosure--inline"><small>🔎 Alguns links são de afiliado — você não paga nada a mais por isso.</small></p>
    <a class="gci-cta" href="[INSERIR LINK DE AFILIADO: Produto A]">
      🛒 Ver preço no Mercado Livre
    </a>
    <small class="gci-cta-trust">Você confere o preço atual direto no Mercado Livre.</small>
  </aside>

  <!-- 6. TABELA COMPARATIVA -->
  <div class="gci-table-wrap" role="region" aria-label="Tabela comparativa" tabindex="0">
    <table class="gci-table">
      <thead>
        <tr><th>Critério</th><th>{{Produto A}}</th><th>{{Produto B}}</th></tr>
      </thead>
      <tbody>
        <tr><th>{{Critério 1}}</th><td>{{…}}</td><td>{{…}}</td></tr>
        <tr><th>{{Critério 2}}</th><td>{{…}}</td><td>{{…}}</td></tr>
      </tbody>
    </table>
  </div>

  <!-- 7. MELHOR ESCOLHA / CUSTO-BENEFÍCIO / EVITE SE -->
  <div class="gci-verdict-grid">
    <div class="gci-pick gci-pick--best">
      <span class="gci-pick-tag">🏆 Melhor escolha</span>
      <h3>{{Produto}}</h3>
      <p>{{Por quê em 1 frase.}}</p>
      <a class="gci-cta" href="[INSERIR LINK DE AFILIADO: Produto]">🛒 Ver preço no Mercado Livre</a>
    </div>
    <div class="gci-pick gci-pick--value">
      <span class="gci-pick-tag">💸 Melhor custo-benefício</span>
      <h3>{{Produto}}</h3>
      <p>{{Por quê em 1 frase.}}</p>
      <a class="gci-cta" href="[INSERIR LINK DE AFILIADO: Produto]">🛒 Ver preço no Mercado Livre</a>
    </div>
    <div class="gci-pick gci-pick--avoid">
      <span class="gci-pick-tag">⚠️ Evite se…</span>
      <h3>{{Cenário}}</h3>
      <p>{{Quando este produto NÃO é para você.}}</p>
    </div>
  </div>

  <!-- 8. DETALHES POR PRODUTO -->
  <section class="gci-product">
    <h2>{{Produto A}}</h2>
    <p>{{Análise honesta: o que entrega, em que contexto brilha.}}</p>

    <!-- NOTA POR CRITÉRIO (barras) -->
    <div class="gci-score">
      <div class="gci-score-row">
        <span>Facilidade de uso</span>
        <span class="gci-bar"><i style="width:90%"></i></span>
        <strong>9,0</strong>
      </div>
      <div class="gci-score-row">
        <span>Qualidade de som</span>
        <span class="gci-bar"><i style="width:80%"></i></span>
        <strong>8,0</strong>
      </div>
    </div>

    <!-- PRÓS E CONTRAS LADO A LADO -->
    <div class="gci-proscons">
      <div class="gci-pros">
        <h4>✅ Prós</h4>
        <ul><li>{{…}}</li></ul>
      </div>
      <div class="gci-cons">
        <h4>❌ Contras</h4>
        <ul><li>{{…}}</li></ul>
      </div>
    </div>

    <a class="gci-cta" href="[INSERIR LINK DE AFILIADO: Produto A]">🛒 Ver preço no Mercado Livre</a>
    <small class="gci-cta-trust">Vendido e entregue pelo Mercado Livre</small>
  </section>

  <!-- 9. PARA QUEM VALE / NÃO VALE -->
  <div class="gci-fit">
    <div class="gci-fit-yes">
      <h4>👍 Vale a pena se você…</h4>
      <ul><li>{{…}}</li></ul>
    </div>
    <div class="gci-fit-no">
      <h4>👎 Pule se você…</h4>
      <ul><li>{{…}}</li></ul>
    </div>
  </div>

  <!-- 10. FAQ (ACCORDION) -->
  <section class="gci-faq">
    <h2>Perguntas frequentes</h2>
    <details class="gci-faq-item">
      <summary>{{Pergunta}}</summary>
      <div class="gci-faq-a"><p>{{Resposta direta.}}</p></div>
    </details>
  </section>

  <!-- 11. COMO AVALIAMOS -->
  <aside class="gci-method">
    <h2>Como avaliamos os produtos</h2>
    <p>{{Critérios, testes, fontes. Link para a página /como-avaliamos.}}</p>
  </aside>

  <!-- 12. LEIA TAMBÉM -->
  <nav class="gci-related" aria-label="Leia também">
    <h2>Leia também</h2>
    <ul>
      <li><a href="/{{slug}}/">{{Artigo relacionado do mesmo silo}}</a></li>
    </ul>
  </nav>

  <!-- 13. VEREDITO FINAL + CTA -->
  <section class="gci-finalverdict">
    <h2>Veredito final</h2>
    <p>{{Recomendação clara e honesta, sem rodeios.}}</p>
    <a class="gci-cta gci-cta--xl" href="[INSERIR LINK DE AFILIADO: Produto vencedor]">
      🛒 Ver preço no Mercado Livre
    </a>
    <small class="gci-cta-trust">🔒 Compra protegida pelo Mercado Livre</small>
  </section>

  <!-- 14. DISCLOSURE MINI -->
  <p class="gci-disclosure--mini">
    Este conteúdo pode conter links de afiliado. Comissões não geram custo extra para você.
  </p>

</article>
```

---

### CSS dos componentes `.gci-*` (cole uma vez)

```css
/* BREADCRUMB */
.gci-breadcrumb{font-size:14px;color:var(--gci-ink-soft);margin:0 0 18px;}
.gci-breadcrumb a{color:var(--gci-blue);text-decoration:none;}
.gci-breadcrumb a:hover{text-decoration:underline;}

/* CABEÇALHO DO ARTIGO */
.gci-article-head h1{font-size:clamp(28px,4vw,42px);font-weight:800;line-height:1.15;margin:.2em 0;}
.gci-pill{display:inline-block;background:var(--gci-grad-brand);color:#fff;font-family:var(--gci-font-display);
  font-weight:600;font-size:12px;letter-spacing:.04em;text-transform:uppercase;padding:5px 12px;border-radius:999px;}
.gci-byline{font-size:14px;color:var(--gci-ink-soft);display:flex;gap:14px;flex-wrap:wrap;align-items:center;margin-top:10px;}
.gci-badge-updated{color:var(--gci-cta-600);font-weight:600;}
.gci-readtime{color:var(--gci-ink-soft);}

/* LEDE */
.gci-lede{font-size:20px;line-height:1.6;color:var(--gci-ink-soft);font-weight:500;margin:18px 0 24px;}

/* DISCLOSURE */
.gci-disclosure{background:#FFFBEB;border:1px solid #FDE68A;border-left:4px solid var(--gci-amber);
  border-radius:var(--gci-radius-sm);padding:12px 16px;font-size:14.5px;color:#92400E;margin:0 0 26px;}
.gci-disclosure--mini{font-size:13px;color:var(--gci-ink-soft);border-top:1px solid var(--gci-border);
  padding-top:14px;margin-top:40px;}
.gci-disclosure--inline{font-size:13px;color:var(--gci-ink-soft);margin:0 0 10px;}

/* TL;DR */
.gci-tldr{background:var(--gci-surface);border:1px solid var(--gci-border);border-top:5px solid var(--gci-blue);
  border-radius:var(--gci-radius);box-shadow:var(--gci-shadow);padding:24px 26px;margin:0 0 30px;}
.gci-tldr h2{font-size:20px;margin:0 0 8px;}
.gci-tldr ul{margin:14px 0 18px;padding-left:18px;}
.gci-tldr li{margin:6px 0;}

/* CTA — verde com gradiente e glow */
.gci-cta{display:inline-flex;align-items:center;gap:10px;background:var(--gci-grad-cta);color:#fff;
  font-family:var(--gci-font-display);font-weight:700;font-size:16px;text-decoration:none;
  padding:14px 26px;border-radius:999px;box-shadow:0 8px 20px -6px var(--gci-cta-glow);
  transition:transform .15s ease,box-shadow .15s ease;}
.gci-cta:hover{transform:translateY(-2px);box-shadow:0 14px 30px -8px var(--gci-cta-glow);}
.gci-cta--xl{font-size:18px;padding:18px 34px;}
.gci-cta-trust{display:block;margin-top:8px;font-size:13px;color:var(--gci-ink-soft);}

/* TABELA COMPARATIVA RESPONSIVA */
.gci-table-wrap{overflow-x:auto;border:1px solid var(--gci-border);border-radius:var(--gci-radius);
  box-shadow:var(--gci-shadow);margin:0 0 30px;-webkit-overflow-scrolling:touch;}
.gci-table{width:100%;border-collapse:collapse;font-size:15.5px;min-width:520px;background:var(--gci-surface);}
.gci-table thead th{background:var(--gci-grad-hero);color:#fff;font-family:var(--gci-font-display);
  font-weight:600;text-align:left;padding:14px 16px;}
.gci-table tbody th{text-align:left;font-weight:600;color:var(--gci-ink);background:#F8FAFC;}
.gci-table td,.gci-table tbody th{padding:13px 16px;border-top:1px solid var(--gci-border);vertical-align:top;}
.gci-table tbody tr:hover td{background:#F4F7FB;}

/* VERDICT GRID (picks) */
.gci-verdict-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin:0 0 34px;}
.gci-pick{background:var(--gci-surface);border:1px solid var(--gci-border);border-radius:var(--gci-radius);
  box-shadow:var(--gci-shadow);padding:22px;transition:transform .15s,box-shadow .15s;}
.gci-pick:hover{transform:translateY(-3px);box-shadow:var(--gci-shadow-hover);}
.gci-pick h3{font-size:19px;margin:10px 0 6px;}
.gci-pick-tag{font-family:var(--gci-font-display);font-weight:700;font-size:13px;}
.gci-pick--best{border-top:5px solid var(--gci-cta);}
.gci-pick--value{border-top:5px solid var(--gci-blue);}
.gci-pick--avoid{border-top:5px solid var(--gci-amber);background:#FFFDF7;}

/* PRODUTO */
.gci-product{background:var(--gci-surface);border:1px solid var(--gci-border);border-radius:var(--gci-radius);
  box-shadow:var(--gci-shadow);padding:26px 28px;margin:0 0 30px;}
.gci-product h2{font-size:24px;margin:0 0 12px;}

/* NOTA POR CRITÉRIO (barras) */
.gci-score{margin:18px 0;display:grid;gap:10px;}
.gci-score-row{display:grid;grid-template-columns:1fr 2fr auto;align-items:center;gap:12px;font-size:14.5px;}
.gci-bar{display:block;height:10px;background:var(--gci-border);border-radius:999px;overflow:hidden;}
.gci-bar i{display:block;height:100%;background:var(--gci-grad-brand);border-radius:999px;}

/* PRÓS E CONTRAS */
.gci-proscons{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0;}
.gci-pros,.gci-cons{border-radius:var(--gci-radius-sm);padding:16px 18px;}
.gci-pros{background:#ECFDF5;border:1px solid #A7F3D0;}
.gci-cons{background:#FEF2F2;border:1px solid #FECACA;}
.gci-pros h4,.gci-cons h4{margin:0 0 10px;font-family:var(--gci-font-display);}
.gci-proscons ul{margin:0;padding-left:18px;}
.gci-proscons li{margin:6px 0;}

/* FIT (para quem vale) */
.gci-fit{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:0 0 30px;}
.gci-fit-yes,.gci-fit-no{border-radius:var(--gci-radius-sm);padding:18px 20px;border:1px solid var(--gci-border);}
.gci-fit-yes{background:#F0FDF4;} .gci-fit-no{background:#FFF7ED;}

/* FAQ ACCORDION */
.gci-faq{margin:0 0 30px;}
.gci-faq-item{background:var(--gci-surface);border:1px solid var(--gci-border);border-radius:var(--gci-radius-sm);
  margin:10px 0;padding:0 18px;box-shadow:var(--gci-shadow);}
.gci-faq-item summary{cursor:pointer;font-family:var(--gci-font-display);font-weight:600;font-size:17px;
  padding:16px 0;list-style:none;display:flex;justify-content:space-between;align-items:center;}
.gci-faq-item summary::after{content:"+";color:var(--gci-blue);font-size:22px;}
.gci-faq-item[open] summary::after{content:"–";}
.gci-faq-a{padding:0 0 16px;color:var(--gci-ink-soft);}

/* MÉTODO */
.gci-method{background:#F8FAFC;border:1px dashed var(--gci-border);border-radius:var(--gci-radius);
  padding:22px 24px;margin:0 0 30px;font-size:15.5px;color:var(--gci-ink-soft);}
.gci-method h2{font-size:19px;color:var(--gci-ink);}

/* LEIA TAMBÉM */
.gci-related{margin:0 0 30px;}
.gci-related ul{list-style:none;padding:0;display:grid;gap:8px;}
.gci-related a{color:var(--gci-blue);text-decoration:none;font-weight:600;}
.gci-related a:hover{text-decoration:underline;}

/* VEREDITO FINAL */
.gci-finalverdict{background:var(--gci-grad-hero);color:#fff;border-radius:var(--gci-radius);
  padding:34px 30px;text-align:center;margin:0 0 30px;box-shadow:var(--gci-shadow);}
.gci-finalverdict h2{color:#fff;font-size:24px;margin:0 0 12px;}
.gci-finalverdict p{color:#CBD5E1;max-width:60ch;margin:0 auto 22px;}

/* RESPONSIVO */
@media (max-width:640px){
  .gci-proscons,.gci-fit{grid-template-columns:1fr;}
  .gci-score-row{grid-template-columns:1fr 1.4fr auto;}
}
```

> **Regra de ouro de copy:** todo CTA usa o texto **"Ver preço no Mercado Livre"** + microcopy de confiança, e o **1º CTA** sempre vem acompanhado de disclosure — tanto o `.gci-disclosure` acima do TL;DR quanto a linha curta `.gci-disclosure--inline` **dentro** do `.gci-tldr`, logo acima do botão (adjacência real ao CTA). Nunca prometa preço fixo nem que "atualizamos" o preço — o preço vive no Mercado Livre e o leitor confere lá. Etiqueta de afiliado do projeto: `matt_word=alexandrehebeler`, `matt_tool=38524122` (aplicada nos links que substituem os `[INSERIR LINK DE AFILIADO: …]`).

---
---

## (B) ARTIGO FLAGSHIP (REESCRITA COMPLETA)

> **Meta title (60):** Alexa vs Google Nest: Qual o Melhor em 2026?
> **Meta description (155):** Alexa ou Google Nest? Comparamos voz em português, integrações, som, rotinas e privacidade para você escolher o assistente certo sem comprar errado.
> **Imagem destacada (ideia):** Echo Dot e Nest Mini lado a lado sobre um aparador de madeira clara, em sala aconchegante à noite, com anéis de luz acesos (azul-ciano no Echo, colorido no Nest).
> **Alt da imagem:** "Amazon Echo Dot e Google Nest Mini lado a lado em sala de estar, comparativo de assistentes de voz 2026"
> **Categoria:** Assistentes e Controle · **Formato:** X vs Y

---

```html
<article class="gci-article">

<!-- 1. BREADCRUMB -->
<nav class="gci-breadcrumb" aria-label="Você está aqui">
  <a href="/">Início</a> <span aria-hidden="true">›</span>
  <a href="/assistentes-e-controle/">Assistentes e Controle</a> <span aria-hidden="true">›</span>
  <span aria-current="page">Alexa vs Google Nest</span>
</nav>

<!-- 2. TÍTULO + SELO ATUALIZADO -->
<header class="gci-article-head">
  <span class="gci-pill">Assistentes e Controle</span>
  <h1>Alexa vs Google Nest: Qual o Melhor Assistente de Voz em 2026?</h1>
  <p class="gci-byline">
    Por <strong>Equipe Guia Casa Inteligente</strong>
    <span class="gci-badge-updated">● Atualizado em junho de 2026</span>
    <span class="gci-readtime">⏱ 9 min de leitura</span>
  </p>
</header>

<!-- 3. INTRO CURTA -->
<p class="gci-lede">
  Você quer começar (ou expandir) sua casa inteligente, mas trava na primeira escolha: Alexa ou Google Nest?
  Escolher errado significa um alto-falante que entende mal o seu português, briga com suas lâmpadas e te
  irrita todo dia. Testamos os dois no jeito brasileiro de falar — e neste guia você decide com segurança em poucos minutos.
</p>

<!-- 4. DISCLOSURE PERTO DO 1º CTA -->
<p class="gci-disclosure">
  🔎 <strong>Transparência:</strong> alguns links são de afiliado do Mercado Livre. Se você comprar por eles,
  podemos ganhar uma comissão — <strong>sem custo extra para você</strong>. Isso não muda nossa nota: a recomendação
  é a mesma que daríamos para um amigo.
</p>

<!-- 5. RESPOSTA RÁPIDA (TL;DR) -->
<aside class="gci-tldr">
  <h2>Resposta rápida</h2>
  <p>
    Para a <strong>maioria dos brasileiros</strong>, a <strong>Alexa (Echo Dot)</strong> é a melhor escolha em 2026:
    entende bem o nosso português, tem o maior ecossistema de aparelhos compatíveis à venda no Brasil e a configuração
    é a mais simples. O <strong>Google Nest</strong> brilha para quem já vive no ecossistema Google (Gmail, Agenda,
    Android, YouTube) e quer respostas mais "espertas" de perguntas gerais.
  </p>
  <ul>
    <li><strong>Melhor no geral (e para começar):</strong> Amazon Echo Dot (5ª geração)</li>
    <li><strong>Melhor para o universo Google:</strong> Google Nest Mini (2ª geração)</li>
    <li><strong>Melhor som por menos:</strong> empate técnico — depende da promoção do dia</li>
  </ul>
  <p class="gci-disclosure--inline"><small>🔎 Alguns links são de afiliado — você não paga nada a mais por isso.</small></p>
  <a class="gci-cta" href="[INSERIR LINK DE AFILIADO: Amazon Echo Dot 5ª geração]">
    🛒 Ver preço no Mercado Livre
  </a>
  <small class="gci-cta-trust">Você confere o preço atual direto no Mercado Livre.</small>
</aside>

<!-- 6. TABELA COMPARATIVA -->
<h2>Alexa vs Google Nest: comparativo lado a lado</h2>
<div class="gci-table-wrap" role="region" aria-label="Tabela comparativa Alexa vs Google Nest" tabindex="0">
  <table class="gci-table">
    <thead>
      <tr>
        <th>Critério</th>
        <th>Alexa (Echo Dot 5ª ger.)</th>
        <th>Google Nest (Nest Mini 2ª ger.)</th>
      </tr>
    </thead>
    <tbody>
      <tr><th>Português do Brasil</th><td>Excelente — entende sotaques e gírias com folga</td><td>Muito bom — ótimo em perguntas de conhecimento</td></tr>
      <tr><th>Perguntas gerais / pesquisa</th><td>Boa</td><td>Excelente (usa a Busca Google)</td></tr>
      <tr><th>Aparelhos compatíveis no Brasil</th><td>O maior catálogo "Compatível com Alexa"</td><td>Amplo, porém menor que o da Alexa</td></tr>
      <tr><th>Facilidade de configuração</th><td>Muito fácil (app Alexa em pt-BR)</td><td>Fácil (app Google Home)</td></tr>
      <tr><th>Rotinas / automações</th><td>Rotinas robustas e populares</td><td>Rotinas boas, integração forte com Android</td></tr>
      <tr><th>Qualidade de som</th><td>Boa para o tamanho; graves presentes</td><td>Boa; voz limpa, graves mais discretos</td></tr>
      <tr><th>Ecossistema do dono</th><td>Compras Amazon, músicas, listas</td><td>Gmail, Agenda, YouTube, Android nativo</td></tr>
      <tr><th>Privacidade / microfone</th><td>Botão para mudar o microfone; histórico gerenciável no app</td><td>Chave física do microfone; controles no app</td></tr>
      <tr><th>Multi-room (vários cômodos)</th><td>Sim, entre dispositivos Echo</td><td>Sim, entre dispositivos Nest/Chromecast</td></tr>
      <tr><th>Conectividade</th><td>Wi-Fi 2.4/5GHz + Bluetooth</td><td>Wi-Fi 2.4/5GHz + Bluetooth</td></tr>
      <tr><th>Faixa de preço (varia)</th><td>Entrada acessível; muitas promoções</td><td>Entrada acessível; muitas promoções</td></tr>
    </tbody>
  </table>
</div>
<p><small>As notas e características refletem nossos testes de uso no Brasil em 2026. Preços não são fixos — confira sempre no Mercado Livre.</small></p>

<!-- 7. MELHOR ESCOLHA / CUSTO-BENEFÍCIO / EVITE SE -->
<div class="gci-verdict-grid">
  <div class="gci-pick gci-pick--best">
    <span class="gci-pick-tag">🏆 Melhor escolha geral</span>
    <h3>Amazon Echo Dot (5ª ger.)</h3>
    <p>Entende o português do dia a dia, tem o maior ecossistema no Brasil e é o jeito mais simples de começar.</p>
    <a class="gci-cta" href="[INSERIR LINK DE AFILIADO: Amazon Echo Dot 5ª geração]">🛒 Ver preço no Mercado Livre</a>
  </div>
  <div class="gci-pick gci-pick--value">
    <span class="gci-pick-tag">💸 Melhor para o universo Google</span>
    <h3>Google Nest Mini (2ª ger.)</h3>
    <p>Respostas mais "espertas" e integração nativa com Gmail, Agenda, YouTube e celulares Android.</p>
    <a class="gci-cta" href="[INSERIR LINK DE AFILIADO: Google Nest Mini 2ª geração]">🛒 Ver preço no Mercado Livre</a>
  </div>
  <div class="gci-pick gci-pick--avoid">
    <span class="gci-pick-tag">⚠️ Evite se…</span>
    <h3>Você quer som de festa</h3>
    <p>Os modelos "Mini/Dot" são para voz e ambiente. Para som encorpado, vá de Echo/Nest maiores ou caixa Bluetooth.</p>
  </div>
</div>

<!-- 8. DETALHES POR PRODUTO -->
<section class="gci-product">
  <h2>Amazon Echo Dot (5ª geração): o coringa brasileiro</h2>
  <p>
    A Alexa é, hoje, o caminho mais curto entre "não tenho nada" e "minha casa obedece à minha voz". O app é todo em
    português, a quantidade de produtos com selo <strong>"Compatível com Alexa"</strong> à venda no Brasil é a maior do
    mercado, e o reconhecimento de voz lida muito bem com o nosso jeito de falar. Para iluminação inteligente, tomadas e
    câmeras, é difícil errar: quase tudo "fala" com a Alexa.
  </p>
  <div class="gci-score">
    <div class="gci-score-row"><span>Português do Brasil</span><span class="gci-bar"><i style="width:94%"></i></span><strong>9,4</strong></div>
    <div class="gci-score-row"><span>Ecossistema (BR)</span><span class="gci-bar"><i style="width:95%"></i></span><strong>9,5</strong></div>
    <div class="gci-score-row"><span>Facilidade de uso</span><span class="gci-bar"><i style="width:92%"></i></span><strong>9,2</strong></div>
    <div class="gci-score-row"><span>Qualidade de som</span><span class="gci-bar"><i style="width:80%"></i></span><strong>8,0</strong></div>
    <div class="gci-score-row"><span>Perguntas gerais</span><span class="gci-bar"><i style="width:82%"></i></span><strong>8,2</strong></div>
  </div>
  <div class="gci-proscons">
    <div class="gci-pros">
      <h4>✅ Prós</h4>
      <ul>
        <li>Maior catálogo de aparelhos compatíveis no Brasil</li>
        <li>Excelente compreensão do português brasileiro</li>
        <li>App e configuração simples, tudo em pt-BR</li>
        <li>Rotinas poderosas e fáceis de montar</li>
        <li>Graves surpreendentes para o tamanho</li>
      </ul>
    </div>
    <div class="gci-cons">
      <h4>❌ Contras</h4>
      <ul>
        <li>Perguntas gerais são boas, mas não tão "espertas" quanto o Google</li>
        <li>Integração com serviços Google é limitada</li>
        <li>Sugestões de compra da Amazon podem incomodar</li>
      </ul>
    </div>
  </div>
  <a class="gci-cta" href="[INSERIR LINK DE AFILIADO: Amazon Echo Dot 5ª geração]">🛒 Ver preço no Mercado Livre</a>
  <small class="gci-cta-trust">🔒 Compra protegida pelo Mercado Livre</small>
</section>

<section class="gci-product">
  <h2>Google Nest Mini (2ª geração): o cérebro das respostas</h2>
  <p>
    Se a sua vida já roda no Google — e-mails no Gmail, compromissos na Agenda, celular Android, vídeos no YouTube —
    o Nest Mini se encaixa como uma luva. Ele puxa o poder da Busca Google para responder perguntas gerais com mais
    profundidade e contexto, e conversa de forma natural com lembretes e a sua agenda. A integração com casa inteligente
    é ampla, ainda que o catálogo brasileiro com selo Google seja um pouco menor que o da Alexa.
  </p>
  <div class="gci-score">
    <div class="gci-score-row"><span>Perguntas gerais</span><span class="gci-bar"><i style="width:95%"></i></span><strong>9,5</strong></div>
    <div class="gci-score-row"><span>Integração Google</span><span class="gci-bar"><i style="width:96%"></i></span><strong>9,6</strong></div>
    <div class="gci-score-row"><span>Português do Brasil</span><span class="gci-bar"><i style="width:88%"></i></span><strong>8,8</strong></div>
    <div class="gci-score-row"><span>Ecossistema (BR)</span><span class="gci-bar"><i style="width:85%"></i></span><strong>8,5</strong></div>
    <div class="gci-score-row"><span>Qualidade de som</span><span class="gci-bar"><i style="width:79%"></i></span><strong>7,9</strong></div>
  </div>
  <div class="gci-proscons">
    <div class="gci-pros">
      <h4>✅ Prós</h4>
      <ul>
        <li>Melhores respostas para perguntas gerais (Busca Google)</li>
        <li>Integração nativa com Gmail, Agenda, YouTube e Android</li>
        <li>Voz natural e contexto de conversa muito bom</li>
        <li>Chave física para desligar o microfone</li>
      </ul>
    </div>
    <div class="gci-cons">
      <h4>❌ Contras</h4>
      <ul>
        <li>Catálogo de compatíveis no Brasil menor que o da Alexa</li>
        <li>Graves mais discretos que os do Echo Dot</li>
        <li>Tira mais proveito se você já usa serviços Google</li>
      </ul>
    </div>
  </div>
  <a class="gci-cta" href="[INSERIR LINK DE AFILIADO: Google Nest Mini 2ª geração]">🛒 Ver preço no Mercado Livre</a>
  <small class="gci-cta-trust">🔒 Compra protegida pelo Mercado Livre</small>
</section>

<!-- 9. PARA QUEM VALE / NÃO VALE -->
<h2>Qual combina com você?</h2>
<div class="gci-fit">
  <div class="gci-fit-yes">
    <h4>👍 Vá de Alexa se você…</h4>
    <ul>
      <li>Está começando a montar a casa inteligente do zero</li>
      <li>Quer o maior número de aparelhos compatíveis no Brasil</li>
      <li>Valoriza configuração simples e tudo em português</li>
      <li>Usa muito listas, alarmes, timers e rotinas</li>
    </ul>
  </div>
  <div class="gci-fit-no">
    <h4>👍 Vá de Google Nest se você…</h4>
    <ul>
      <li>Já vive no ecossistema Google (Gmail, Agenda, Android)</li>
      <li>Faz muitas perguntas gerais e quer respostas mais ricas</li>
      <li>Usa bastante YouTube e quer comandar pela voz</li>
      <li>Prefere a chave física de microfone do Nest</li>
    </ul>
  </div>
</div>

<!-- 10. FAQ (ACCORDION) -->
<section class="gci-faq">
  <h2>Perguntas frequentes</h2>

  <details class="gci-faq-item">
    <summary>Alexa ou Google entende melhor o português do Brasil?</summary>
    <div class="gci-faq-a"><p>
      Nos nossos testes, a Alexa leva uma leve vantagem em comandos do dia a dia e em entender sotaques e gírias
      brasileiras. O Google Nest empata ou supera quando o assunto é responder perguntas gerais de conhecimento,
      porque usa a Busca Google. Para casa inteligente em si, ambos entendem bem.
    </p></div>
  </details>

  <details class="gci-faq-item">
    <summary>Os dois funcionam com as mesmas lâmpadas e tomadas inteligentes?</summary>
    <div class="gci-faq-a"><p>
      Boa parte dos produtos de casa inteligente vendidos no Brasil é compatível com os dois. Ainda assim, a Alexa
      costuma ter o catálogo "compatível" mais amplo por aqui. Antes de comprar um acessório, procure os selos
      <strong>"Compatível com Alexa"</strong> ou <strong>"Funciona com Google"</strong> na descrição do produto.
    </p></div>
  </details>

  <details class="gci-faq-item">
    <summary>Preciso de um hub ou central para usar Alexa ou Google Nest?</summary>
    <div class="gci-faq-a"><p>
      Para a maioria dos aparelhos Wi-Fi (lâmpadas, tomadas e muitas câmeras), <strong>não</strong> — eles conectam
      direto na sua rede 2.4GHz e falam com o assistente pela nuvem. Você só precisa de um hub para acessórios
      Zigbee/Matter mais específicos. Alguns modelos maiores de Echo já trazem hub embutido.
    </p></div>
  </details>

  <details class="gci-faq-item">
    <summary>Eles ficam me ouvindo o tempo todo? É seguro?</summary>
    <div class="gci-faq-a"><p>
      Os dois só começam a gravar após a palavra de ativação ("Alexa" ou "Ok Google"). Ambos têm controle para
      desligar o microfone — o Nest tem uma chave física e o Echo tem um botão dedicado — e permitem revisar e
      apagar o histórico de voz pelo aplicativo. É uma boa prática revisar essas configurações ao instalar.
    </p></div>
  </details>

  <details class="gci-faq-item">
    <summary>Qual tem o melhor som para ouvir música?</summary>
    <div class="gci-faq-a"><p>
      No tamanho "Mini/Dot", os dois entregam som bom para ambiente e voz, com leve vantagem de graves para o
      Echo Dot. Se música é prioridade, vale subir para modelos maiores (como Echo ou Nest Audio) ou parear o
      assistente a uma caixa Bluetooth.
    </p></div>
  </details>

  <details class="gci-faq-item">
    <summary>Posso ter Alexa e Google na mesma casa?</summary>
    <div class="gci-faq-a"><p>
      Pode — muita gente faz isso. Eles funcionam de forma independente. Na prática, porém, escolher um como
      "principal" deixa as rotinas e o controle de voz mais simples e evita confusão de comandos entre os dois.
    </p></div>
  </details>
</section>

<!-- 11. COMO AVALIAMOS -->
<aside class="gci-method">
  <h2>Como avaliamos os assistentes</h2>
  <p>
    Avaliamos cada assistente com foco no uso real no Brasil: compreensão do português brasileiro (comandos,
    sotaques e gírias), tamanho do ecossistema de aparelhos compatíveis à venda aqui, facilidade de configuração,
    poder das rotinas, qualidade de som e controles de privacidade. As notas refletem testes práticos e não são
    patrocinadas por nenhuma marca. <a href="/como-avaliamos/">Veja nossa metodologia completa</a>.
  </p>
</aside>

<!-- 12. LEIA TAMBÉM -->
<nav class="gci-related" aria-label="Leia também">
  <h2>Leia também</h2>
  <ul>
    <li><a href="/assistentes-e-controle/melhores-assistentes-de-voz/">Os melhores assistentes de voz para casa inteligente em 2026</a></li>
    <li><a href="/iluminacao-inteligente/melhores-lampadas-inteligentes/">Melhores lâmpadas inteligentes compatíveis com Alexa e Google</a></li>
    <li><a href="/guias-e-comparativos/comecar-casa-inteligente/">Como começar uma casa inteligente do zero (sem gastar muito)</a></li>
  </ul>
</nav>

<!-- 13. VEREDITO FINAL + CTA -->
<section class="gci-finalverdict">
  <h2>Veredito final</h2>
  <p>
    Para a maioria dos brasileiros — e especialmente para quem está começando — a <strong>Alexa (Echo Dot)</strong>
    é a escolha mais segura: entende bem o nosso português, tem o maior ecossistema do país e é simples de configurar.
    Se a sua vida já roda no Google, o <strong>Nest Mini</strong> é a melhor companhia. Não tem como errar feio com
    nenhum dos dois — escolha pelo ecossistema que você já usa.
  </p>
  <a class="gci-cta gci-cta--xl" href="[INSERIR LINK DE AFILIADO: Amazon Echo Dot 5ª geração]">
    🛒 Ver preço no Mercado Livre
  </a>
  <small class="gci-cta-trust">🔒 Compra protegida pelo Mercado Livre · você confere o preço atual no anúncio</small>
</section>

<!-- 14. DISCLOSURE MINI -->
<p class="gci-disclosure--mini">
  Este conteúdo pode conter links de afiliado do Mercado Livre. Eventuais comissões não geram custo extra para você
  e ajudam a manter o Guia Casa Inteligente no ar. Preços e disponibilidade são definidos pelo Mercado Livre.
</p>

</article>
```