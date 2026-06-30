# 🚀 Guia de Implementação — como aplicar o redesign

> Passo a passo para colocar o novo visual e os novos textos no ar em **ahebeler.shop** (WordPress + GeneratePress). Ordenado por impacto. Não precisa fazer tudo de uma vez — cada bloco já melhora o site sozinho.

> ⚠️ **Antes de começar:** faça um **backup** (Hostinger → Backups) e, ao terminar cada etapa, **purgue o cache** (LiteSpeed → Toolbox → "Limpar tudo - LSCache"). Trabalhe logado no `wp-admin` (o login é humano).

---

## ⏱️ Resumo rápido (15 minutos para o "antes/depois")

1. Abra `redesign/preview.html` no navegador para ver o resultado-alvo.
2. **Fontes:** cole o `<link>` das fontes no `<head>` (passo 1).
3. **CSS:** cole `02-css-premium.css` em *Personalizar → CSS adicional* (passo 2).
4. **Logo:** suba `assets/logo-horizontal.svg` em *Personalizar → Identidade do site* (passo 3).
5. Purgue o cache e recarregue. O site já fica com a cara nova.

Depois, vá aplicando os textos e componentes (passos 4 a 8).

---

## Passo 1 — Carregar as fontes (Sora + Inter)

GeneratePress não precisa disso se você usar o `@import` que já vem no topo do CSS — mas o `<link>` é **mais rápido** (melhor Core Web Vitals). Escolha **um** caminho:

**Opção A (recomendada, mais rápida):** adicione no `<head>`.
- *Aparência → Elementos → Adicionar Elemento → Hook*, gancho `wp_head`, e cole:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@500;600;700;800&display=swap" rel="stylesheet">
```
- Depois, **remova** a primeira linha `@import ...` do CSS do passo 2.

**Opção B (mais simples):** não faça nada — o `@import` no topo do `02-css-premium.css` já baixa as fontes sozinho.

---

## Passo 2 — CSS premium (o coração do visual)

1. *Aparência → Personalizar → CSS adicional*.
2. Apague o CSS antigo (faça uma cópia de segurança dele antes) e **cole todo o conteúdo de [`02-css-premium.css`](02-css-premium.css)**.
3. *Publicar*.
4. **Menu mobile:** em *Personalizar → Layout → Navegação Primária*, ative o **menu mobile** ("Navigation as Mobile menu" / defina um "Mobile Menu Label"). O CSS já estiliza o hambúrguer.
5. Purgue o cache LiteSpeed e recarregue com `?v=2` no fim da URL para furar o cache do navegador.

> O CSS dá: header escuro compacto, nav com acento ciano, cards com thumbnail 16:9, botões verdes do Mercado Livre com glow, tabelas comparativas, caixas de veredito, FAQ, rodapé escuro — tudo com os tokens da identidade.

---

## Passo 3 — Logo e favicon

1. *Personalizar → Identidade do site → Logotipo* → envie [`assets/logo-horizontal.svg`](assets/logo-horizontal.svg) (feito para o header **escuro**).
   - Se o WordPress recusar SVG, instale o plugin **"Safe SVG"** (ou converta para PNG com fundo transparente, ~320×64).
2. *Ícone do site (favicon)* → envie [`assets/favicon.svg`](assets/favicon.svg) (ou um PNG 512×512 a partir dele).
3. Se o nome do site ainda aparecer como texto ao lado do logo, oculte o título em *Personalizar → Layout → Cabeçalho*.

---

## Passo 4 — Textos da página inicial (copy que vende)

Abra [`04-copy-home.md`](04-copy-home.md) e leve para a home (página estática **ID 28**), seção por seção, usando blocos do Gutenberg/GenerateBlocks:
- **Hero** (`.gci-hero`): headline recomendada + subheadline + 2 botões + selo de confiança.
- **Barra de números** de confiança (honesta).
- **"Comece por aqui"**, **"Melhores guias por categoria"**, **"Mais lidos"**.
- **"Como escolhemos os produtos"** (prova de credibilidade).
- **Newsletter** + microcopy + disclosure.
- Cole o **meta title/description** da home no Rank Math (caixa de edição da página → aba Rank Math).

> O HTML pronto de cada bloco está em [`03-componentes.html`](03-componentes.html) — copie o componente e troque o texto pelo da copy.

---

## Passo 5 — Componentes nos artigos (onde a conversão acontece)

Para cada review/comparativo, monte o artigo no padrão de [`05-template-artigo.md`](05-template-artigo.md) usando os blocos de [`03-componentes.html`](03-componentes.html):

1. No editor do post, adicione um bloco **HTML personalizado** onde quiser o componente.
2. Cole o componente (`.gci-tldr`, `.gci-tabela`, `.gci-best`, `.gci-pros`/`.gci-cons`, `.gci-rating`, `.gci-faq`, `.gci-relacionados`, `.gci-disclosure`, `.gci-sticky-cta`).
3. Em cada botão `.gci-cta`, **troque o `href="#"`** pelo seu link de afiliado oficial do Mercado Livre.
   - ⚠️ Use o link **direto do produto** (`/p/MLB...&matt_tool=38524122&ua=...`), **nunca** a vitrine `/social/`. Veja o método validado em [`../execucao-links/GUIA-EXECUCAO.md`](../execucao-links/GUIA-EXECUCAO.md) e o script [`../execucao-links/inserir-links.js`](../execucao-links/inserir-links.js).
4. Mantenha `rel="nofollow sponsored noopener"` e `target="_blank"` (já vêm nos componentes).
5. Coloque a linha de **disclosure** dentro do `.gci-tldr`, logo acima do 1º botão.

**Prioridade:** comece pelos 7 artigos já prontos (03, 04, 05, 06, 07, 10, 20) e pelo flagship **Alexa vs Google Nest** (já reescrito no `05-template-artigo.md`).

---

## Passo 6 — Categorias e SEO

De [`06-categorias-e-seo.md`](06-categorias-e-seo.md):
1. Em *Posts → Categorias*, cole a **intro** de cada uma das 6 categorias no campo "Descrição" (o GeneratePress mostra acima da lista de posts).
2. Cole os **meta titles/descriptions** de cada categoria e post no Rank Math.
3. Verifique que cada post tem **imagem destacada** 16:9 (alt = palavra-chave). Sem isso, os cards ficam sem thumbnail.

---

## Passo 7 — Imagens destacadas (ponto crítico)

Os relatórios mostraram que **quase nenhum post tem imagem destacada** — e o novo layout depende delas para os cards 16:9.
- Padronize 16:9 (ex.: 1200×675), visual limpo, nome de arquivo com a palavra-chave, alt descritivo.
- Respeite direitos de imagem (use imagens próprias, bancos livres, ou conforme as regras do Mercado Livre/fornecedor).

---

## Passo 8 — Estratégia, viral e AdSense

Siga [`07-estrategia-viral.md`](07-estrategia-viral.md) para: linkagem interna por silo, schema (FAQ/Article/Review), CTA fixo no mobile, calendário de conteúdo e o plano priorizado (impacto × esforço), além da preparação para AdSense.

---

## ✅ Checklist final

- [ ] Fontes carregando (Sora nos títulos, Inter no corpo).
- [ ] CSS publicado + cache purgado.
- [ ] Logo no header escuro + favicon.
- [ ] Menu em 1 linha no desktop e hambúrguer no mobile.
- [ ] Home com hero novo, números, "como avaliamos" e newsletter.
- [ ] Artigos com TL;DR, tabela, veredito, prós/contras, FAQ e CTA verde.
- [ ] Disclosure de afiliado perto do 1º CTA (não só no rodapé).
- [ ] Todo botão aponta para `/p/MLB...` (0 links `/social/`).
- [ ] Imagens destacadas 16:9 em todos os posts.
- [ ] Metas do Rank Math preenchidas; cache purgado.
- [ ] Testado no celular (360–480px).
