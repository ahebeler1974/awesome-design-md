# 🎨 Identidade Visual — Guia Casa Inteligente

> Fonte única de verdade do design. Tudo no kit (CSS, componentes, preview, logo) usa **exatamente** estes tokens. Não improvise outra paleta — a consistência é o que faz o site parecer "premium" em vez de "tema padrão".

---

## 1. Posicionamento da marca

**Guia Casa Inteligente** é a autoridade editorial brasileira em casa inteligente: reviews e comparativos **honestos**, escritos para quem tem medo de comprar o produto errado. O tom é de **especialista próximo** — técnico quando precisa (Wi-Fi 2.4 GHz, Zigbee, bateria, certificação), mas direto e acolhedor.

- **Promessa:** "Análises honestas para você escolher o produto certo — sem perder dinheiro."
- **Diferencial:** veredito claro em todo conteúdo + transparência total sobre afiliados.
- **Sensação visual-alvo:** tecnologia confiável + casa aconchegante = azul/ciano (tech) sobre branco limpo, com verde de ação no CTA.

---

## 2. Paleta oficial (tokens CSS)

```css
:root{
  /* Texto */
  --gci-ink:#0B1220;          /* texto principal (navy quase preto) */
  --gci-ink-soft:#475569;     /* texto secundário */

  /* Marca / header / rodapé escuros */
  --gci-navy-900:#091A2E;
  --gci-navy-800:#0C2236;

  /* Azul/ciano da marca (tecnologia) */
  --gci-blue:#2563EB;
  --gci-blue-600:#1D4ED8;
  --gci-cyan:#06B6D4;
  --gci-teal:#0EA5A4;

  /* Verde de AÇÃO — botão "Ver no Mercado Livre" */
  --gci-cta:#15A24A;
  --gci-cta-600:#0F7E39;
  --gci-cta-glow:rgba(21,162,74,.35);

  /* Destaque / avaliação */
  --gci-amber:#F59E0B;

  /* Superfícies */
  --gci-bg:#F4F7FB;           /* fundo da página */
  --gci-surface:#FFFFFF;      /* cards */
  --gci-border:#E4EAF2;

  /* Sombra / raio */
  --gci-shadow:0 10px 30px -12px rgba(9,26,46,.18);
  --gci-shadow-hover:0 20px 45px -15px rgba(9,26,46,.28);
  --gci-radius:16px;
  --gci-radius-sm:10px;

  /* Gradientes */
  --gci-grad-hero:linear-gradient(135deg,#091A2E 0%,#0C2236 45%,#0E3A5C 100%);
  --gci-grad-brand:linear-gradient(90deg,#2563EB 0%,#06B6D4 100%);
  --gci-grad-cta:linear-gradient(90deg,#15A24A 0%,#22C55E 100%);
}
```

| Cor | Hex | Uso |
|---|---|---|
| Navy 900 | `#091A2E` | Header, rodapé, texto forte sobre claro |
| Azul marca | `#2563EB` | Links, acentos, gradiente da marca |
| Ciano | `#06B6D4` | Acento tech, hover de menu, "Inteligente" no logo |
| Verde CTA | `#15A24A` | **Somente** botões de compra (Mercado Livre) |
| Âmbar | `#F59E0B` | Estrelas, selo "Melhor escolha" |
| Fundo | `#F4F7FB` | Fundo geral da página |

> **Regra de ouro do verde:** o verde `--gci-cta` é exclusivo do botão de afiliado. Não use em outros lugares — assim o olho do leitor aprende que "verde = clicar para ver o preço".

---

## 3. Tipografia

- **Títulos (display):** `Sora` — geométrica, moderna, "tech". Pesos 600–800, tracking levemente negativo.
- **Corpo:** `Inter` — ~17px, altura de linha 1.7, ótima legibilidade.
- **Fallback:** `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`.

```html
<!-- Adicione no <head> (GeneratePress: Elements > Hook 'wp_head', ou plugin de fontes) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap" rel="stylesheet">
```

```css
--gci-font-display:"Sora","Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
--gci-font-sans:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
```

---

## 4. Logo

- Arquivo: [`assets/logo-horizontal.svg`](assets/logo-horizontal.svg) (versão para **fundo escuro** do header).
- Ícone: casa estilizada + sinal de Wi-Fi/chip, no gradiente azul→ciano.
- Wordmark: **"Guia Casa"** forte + **"Inteligente"** com acento ciano.
- Favicon/ícone: [`assets/logo-icon.svg`](assets/logo-icon.svg) e [`assets/favicon.svg`](assets/favicon.svg).
- **Área de respiro:** mantenha ao menos a altura do ícone de espaço livre em volta. Nunca distorça (escale proporcional).

---

## 5. Voz e tom (copy)

| Faça | Evite |
|---|---|
| Veredito claro: "A melhor escolha geral é X porque…" | "Depende, cada um tem o seu…" sem conclusão |
| Frases curtas, escaneáveis, com subtítulos | Parágrafos longos sem respiro |
| Prova: "comparamos", "na prática", critérios técnicos | Inventar que "testou pessoalmente" se não testou |
| Disclosure honesto perto do 1º CTA | Esconder que é link de afiliado |
| Urgência **real** (promoção/estoque quando existe) | Falsa escassez, preço fixo prometido |

**Disclosure padrão (cole perto do primeiro botão):**
> *Este guia tem links de afiliado. Se você comprar pelo nosso link, podemos ganhar uma pequena comissão **sem nenhum custo extra para você** — é assim que mantemos o site no ar e independente.*

---

## 6. Componentes editoriais (classes `.gci-*`)

Estilizados pelo [`02-css-premium.css`](02-css-premium.css) e prontos em [`03-componentes.html`](03-componentes.html):

`.gci-hero` · `.gci-disclosure` · `.gci-tldr` (resposta rápida) · `.gci-cta` (botão Mercado Livre) · `.gci-best` (melhor escolha) · `.gci-pros` / `.gci-cons` · `.gci-rating` (nota por critério) · `.gci-tabela` (comparativo) · `.gci-faq` (accordion) · `.gci-breadcrumb` · `.gci-relacionados` (leia também) · `.gci-sticky-cta` (CTA fixo no mobile).
