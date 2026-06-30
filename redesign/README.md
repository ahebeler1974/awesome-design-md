# ✨ Kit de Redesign — Guia Casa Inteligente (ahebeler.shop)

Kit **pronto para aplicar** que transforma o blog de afiliados **Guia Casa Inteligente** num site **premium, que vende, impecável e viral** — com layout que chama atenção, conversão agressiva (mas honesta) para o **Mercado Livre** e textos reescritos para reter e converter.

> **Por que um kit, e não a edição direta do site?** O WordPress vive na Hostinger, que **bloqueia ambientes de nuvem (HTTP 403)** e exige **login humano**. Então o caminho profissional (o mesmo dos handoffs anteriores deste repo) é entregar tudo **pronto para colar**, com um **preview navegável** para você aprovar o visual antes de mexer no site.

---

## 👀 Comece por aqui: veja o "depois"

**Abra [`preview.html`](preview.html) no navegador.** É um mockup autossuficiente do novo site (home + artigo) — exatamente a cara que o site vai ter. Nada de WordPress, nada de instalar: é só abrir o arquivo.

---

## 📂 O que tem no kit

| Arquivo | O que é | Onde se aplica |
|---|---|---|
| [`preview.html`](preview.html) | 🌟 Mockup navegável do novo design (home + artigo) | Só abrir no navegador |
| [`01-identidade-visual.md`](01-identidade-visual.md) | Paleta, tipografia (Sora + Inter), logo, voz da marca | Referência |
| [`02-css-premium.css`](02-css-premium.css) | CSS de produção completo | GeneratePress → *Personalizar → CSS adicional* |
| [`03-componentes.html`](03-componentes.html) | Blocos prontos: tabela, prós/contras, "melhor escolha", FAQ, CTA, disclosure, sticky CTA | Blocos *HTML personalizado* nos posts |
| [`04-copy-home.md`](04-copy-home.md) | Reescrita da página inicial (hero, números, "como avaliamos", newsletter) | Home (ID 28) |
| [`05-template-artigo.md`](05-template-artigo.md) | Template editorial fixo **+ artigo flagship reescrito** (Alexa vs Google Nest) | Todos os reviews/comparativos |
| [`06-categorias-e-seo.md`](06-categorias-e-seo.md) | Intros das 6 categorias + meta titles/descriptions | Categorias + Rank Math |
| [`07-estrategia-viral.md`](07-estrategia-viral.md) | Plano de viralidade, conversão de afiliado e prontidão AdSense | Estratégia |
| [`08-guia-implementacao.md`](08-guia-implementacao.md) | **Passo a passo** para aplicar tudo | Execução |
| [`assets/`](assets/) | `logo-horizontal.svg`, `logo-icon.svg`, `favicon.svg` | Identidade do site |

---

## 🎯 O que muda no site (e por que vende mais)

**Visual (layout que impressiona):**
- Header **escuro, compacto e premium** com logo de verdade (casa + Wi-Fi) e menu em 1 linha (hambúrguer no mobile).
- Cards com **thumbnail 16:9**, sombra, "pill" de categoria e elevação no hover — fim do site "só texto".
- Botão **verde do Mercado Livre com glow** e ícone de carrinho, fácil de identificar como "clicar para ver o preço".
- Tipografia premium: **Sora** nos títulos, **Inter** no corpo.

**Conversão (direciona pro Mercado Livre):**
- **CTA fixo no mobile** + CTAs repetidos em pontos-chave.
- Caixas **"Melhor escolha"** / **"Melhor custo-benefício"** com botão direto.
- **Disclosure honesto** colado ao 1º CTA (gera confiança em vez de afastar).

**Viralidade / retenção (as pessoas voltam e salvam):**
- **Tabelas comparativas** no topo (formato que se salva e compartilha).
- **Vereditos claros** ("a melhor escolha é X porque…") + selo **"Atualizado em"**.
- **FAQ**, **"Leia também"** e linkagem interna por silo → mais tempo no site.

**Textos (copy que converte sem mentir):**
- Hero e seções reescritos para benefício + intenção de compra.
- Artigo flagship **"Alexa vs Google Nest"** reescrito inteiro como modelo.
- Metas de SEO para home, 6 categorias e os posts publicados.

---

## ▶️ Como aplicar (resumo)

1. Abra o **[`preview.html`](preview.html)** e aprove o visual.
2. Siga o **[`08-guia-implementacao.md`](08-guia-implementacao.md)** — começa com 15 min para o "antes/depois" (fontes → CSS → logo) e segue por copy, componentes, categorias e SEO.

> Faça **backup** antes e **purgue o cache LiteSpeed** depois de cada etapa.

---

## 🔗 Relação com o resto do repositório

Este kit cuida do **design e dos textos**. A parte de **inserir os links de afiliado** e publicar continua no fluxo já existente:
- [`../MASTERINFRAHANDOFF.md`](../MASTERINFRAHANDOFF.md) — estado de cada artigo e método validado de gerar/inserir links.
- [`../execucao-links/`](../execucao-links/) — guia e script `inserir-links.js`.

**Regra de ouro mantida:** link de afiliado sempre **direto no produto** (`/p/MLB…`), **nunca** na vitrine `/social/`.
