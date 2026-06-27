# 🧭 MASTER HANDOFF — Infraestrutura do Blog "Guia Casa Inteligente"

> **Para quem é este arquivo:** agentes (Claude Code) que vão **terminar e arrumar toda a infra** do
> blog de afiliados Mercado Livre `ahebeler.shop`. Contém: configuração completa, estado exato de cada
> artigo, o método técnico validado de gerar/inserir links, e a lista do que deve ser **removido/corrigido**.
>
> **Atualizado em:** 2026-06-26 · **Regra de ouro:** link de afiliado SEMPRE direto no produto,
> NUNCA na vitrine `/social/`.

---

## 📊 Status (resumo de 10 segundos)

| Métrica | Valor |
|---|---|
| Artigos no total (01–20) | **20** |
| Publicados | **2** (01 + 02 — Iluminação) |
| Rascunhos | **18** (artigos 03–20 · WordPress IDs 1001–1018) |
| Artigos **prontos** (F=0, V=0) | **7** (03, 04, 05, 06, 07, 10, 20) |
| Links oficiais inseridos | **56** (37 nos prontos + 19 nos parciais) |
| Links na vitrine `/social/` | **0** ✅ (meta permanente) |
| **Botões pendentes** | **36 em 11 artigos** = 32 (escopo conhecido, 9 artigos) + 4 (2 descontinuados) |
| Blockers | 2 produtos **descontinuados** (Allo W3 → art.14 · FR 500 → art.18) · copy travada (art.13) · "Oferta do dia" a decidir (art.09) |
| Config pendente | Rank Math reconectar · Search Console + sitemap · imagem destacada por post · purgar LiteSpeed |

> **Reconciliação dos pendentes:** `32 (escopo conhecido: 08, 09, 11, 12, 13, 15, 16, 17, 19) + 4 (descontinuados: art.14 e art.18) = 36 botões em 11 artigos`. Desses 32, **~8 slots ainda precisam ter o produto definido** (marcados como "a definir" na [§4c](#4c-não-iniciados-links)). Os 4 botões dos descontinuados só entram **depois** de escolher o produto substituto (§5/§7). Veja o detalhe por artigo na [§4](#4-estado-atual-de-cada-artigo).

### 🔑 Legenda e ícones (usados em todo o documento)

| Símbolo | Significado |
|---|---|
| **L** | Links de afiliado já inseridos no post (= contagem de `matt_tool`) |
| **F** | Botões **pendentes** = `<a href="#COLAR-LINK-AFILIADO">` + `<mark>` ainda sem link |
| **V** | Links na **vitrine** `/social/` — **tem que ser 0 SEMPRE** |
| ✅ | Pronto / feito | 
| 🔄 | Em progresso / faltam itens |
| ⬜ | Não iniciado |
| ⚠️ | Atenção |
| 🚫 BLOCKER | Bloqueio real (ex.: produto descontinuado) |
| ❌ | Proibido (nunca fazer) |

> **Vocabulário único:** "botão pendente" = "F" = "placeholder" = "botão morto `href="#"`" — são a mesma coisa.
> No método (§3d), os contadores `matt_tool` / `COLAR-LINK-AFILIADO` / `/social/` correspondem exatamente a **L / F / V**.

### 🤖 O que um agente PODE vs NÃO PODE automatizar

- **PODE:** gerar e inserir links via clipboard + `wp.apiFetch` (§3), varrer `/social/`, contar `matt_tool`/`ua=`, editar conteúdo dos posts, remover placeholders.
- **NÃO PODE:** digitar senha (login é **humano** — §1), **fabricar** o token `ua=` (§3a), escolher o **produto substituto** dos descontinuados, decidir a **"Oferta do dia"** do art.09.

---

## Índice

- [1. Configuração do ambiente](#1-configuração-do-ambiente)
  - [1.1 Categorias (nome → slug)](#11-categorias-nome--slug)
  - [1.2 Afiliado Mercado Livre](#12-afiliado-mercado-livre)
  - [1.3 Repositório com o conteúdo-fonte](#13-repositório-com-o-conteúdo-fonte-dos-artigos)
- [2. Mapa dos posts (ID do WordPress → artigo)](#2-mapa-dos-posts-id-do-wordpress--artigo)
- [3. ⭐ Método validado — gerar e inserir um link](#3--método-validado--gerar-e-inserir-um-link)
  - [3a. Gerar o link oficial rastreado](#3a-gerar-o-link-oficial-rastreado)
  - [3b. Extrair o link via automação (clipboard)](#3b-extrair-o-link-via-automação-clipboard)
  - [3c. Inserir no WordPress (sessão logada)](#3c-inserir-no-wordpress-sessão-logada)
  - [3d. Validar](#3d-validar)
- [4. Estado atual de cada artigo](#4-estado-atual-de-cada-artigo)
  - [4a. Prontos (F=0, V=0)](#4a-prontos-f0-v0--7-artigos)
  - [4b. Faltam produtos](#4b-faltam-produtos)
  - [4c. Não iniciados](#4c-não-iniciados-links)
  - [4d. Produtos já linkados (MLB — auditoria)](#4d-produtos-já-linkados-mlb--auditoria)
- [5. O que deve ser removido / corrigido](#5-o-que-deve-ser-removido--corrigido)
- [6. Ordem de publicação (por silos)](#6-ordem-de-publicação-por-silos)
- [7. Checklist final do agente](#7-checklist-final-do-agente)

---

## 1. Configuração do ambiente

| Item | Valor |
|---|---|
| Hospedagem | Hostinger, plano Business (expira 2027-06-26) |
| Domínio | **ahebeler.shop** |
| WordPress admin | `https://ahebeler.shop/wp-admin/` |
| Usuário admin | `ahebeler@gmail.com` (login deve ser feito pelo humano — agentes **NÃO** digitam senha) |
| Título do site | **Guia Casa Inteligente** |
| Slogan | "O guia para escolher o produto certo para sua casa" |
| Idioma | pt-BR |
| Tema | **GeneratePress** (free) |
| Plugins ativos | **Rank Math SEO**, **LiteSpeed Cache**, **WordPress Importer** (instalado p/ a importação) |
| Permalinks | `/%postname%/` |
| Favicon | já configurado (ícone de casa) |
| WordPress | versão 7.0 |

### 1.1 Categorias (nome → slug)

| Categoria | Slug |
|---|---|
| Iluminação Inteligente | `iluminacao-inteligente` |
| Segurança e Câmeras | `seguranca-e-cameras` |
| Robôs e Limpeza | `robos-e-limpeza` |
| Assistentes e Controle | `assistentes-e-controle` |
| Guias e Comparativos | `guias-e-comparativos` |
| Ofertas e Novidades | `ofertas-e-novidades` |

### 1.2 Afiliado Mercado Livre

- **Etiqueta (`matt_word`):** `alexandrehebeler`
- **`matt_tool` (ID da ferramenta):** `38524122`
- Comissão varia por produto (ex.: eletrônicos ~5%; casa ~9–14%). Aparece em "GANHOS X%" na barra preta "Afiliados".
- Cookie de 30 dias (último clique).

### 1.3 Repositório com o conteúdo-fonte dos artigos

- Repo: `ahebeler1974/claude-design-premium`
- Branch: `claude/mercado-livre-affiliate-blog-vdkgb1`
- Pasta: `blog-casa-inteligente/` (artigos em `artigos/01..20.md`, páginas em `paginas/`)

---

## 2. Mapa dos posts (ID do WordPress → artigo)

| ID | Slug | Artigo | Estado ([§4](#4-estado-atual-de-cada-artigo)) |
|---|---|---|---|
| 1001 | fechadura-digital-biometria-apartamento | 03 Fechadura biometria | ✅ pronto |
| 1002 | robo-aspirador-casa-com-pelo-de-cachorro | 04 Robô pet | ✅ pronto |
| 1003 | camera-wifi-vigiar-pet-em-casa | 05 Câmera pet | ✅ pronto |
| 1004 | tomada-inteligente-desligar-ar-condicionado | 06 Tomada | ✅ pronto |
| 1005 | comparativo-robos-aspiradores-ate-1500 | 07 Comparativo robôs | ✅ pronto |
| 1006 | kit-casa-inteligente-para-iniciantes | 08 Kit iniciantes | 🔄 faltam produtos |
| 1007 | echo-dot-vale-a-pena-promo | 09 Echo Dot promo | 🔄 falta "Oferta do dia" |
| 1008 | comparativo-cameras-seguranca-wifi-ate-300 | 10 Comparativo câmeras | ✅ pronto |
| 1009 | sensor-presenca-inteligente-luz-automatica | 11 Sensor presença | ⬜ não iniciado |
| 1010 | interruptor-inteligente-sem-neutro | 12 Interruptor sem neutro | ⬜ não iniciado |
| 1011 | alexa-vs-google-nest-comparativo | 13 Alexa vs Nest | 🔄 refazer copy |
| 1012 | campainha-camera-wifi-apartamento | 14 Campainha | 🚫 descontinuado |
| 1013 | robo-aspirador-passa-pano-ate-2000 | 15 Robô passa-pano | ⬜ não iniciado |
| 1014 | controle-universal-inteligente-ar-tv | 16 Controle IR | ⬜ não iniciado |
| 1015 | fitas-led-inteligentes-quarto-gamer-alexa | 17 Fitas LED | ⬜ não iniciado |
| 1016 | fechadura-digital-senha-cartao-escritorio | 18 Fechadura escritório | 🚫 descontinuado |
| 1017 | central-automacao-residencial-casa-grande | 19 Central automação | ⬜ não iniciado |
| 1018 | sensor-fumaca-gas-inteligente-celular | 20 Sensor fumaça | ✅ pronto |

Os **18** acima são **rascunhos**. Os artigos **01 e 02** (Iluminação) já estão **publicados** e por isso não aparecem na tabela.

> ⚠️ **Lacuna do handoff:** os IDs/slugs dos artigos publicados **01 e 02 não constam** neste documento. Buscar no wp-admin quando precisar deles (não inventar IDs).

---

## 3. ⭐ Método validado — gerar e inserir um link

> **CRÍTICO.** Este é o único caminho que paga comissão **E** cai direto no produto. Não trocar o método.

### 3a. Gerar o link oficial rastreado

1. Estar **logado como afiliado** no Mercado Livre (barra preta "Afiliados" no topo do produto).
2. Abrir a **página do produto** (`/p/MLBxxxxxxx`).
3. No bloco do produto, clicar em **"Compartilhar" (o do breadcrumb, NÃO o botão azul da barra preta)** → no menu, **"Copiar link"**.
4. O link copiado tem o formato:
   `https://www.mercadolivre.com.br/<slug>/p/MLBxxxx?pdp_filters=...&matt_tool=38524122&ua=<TOKEN>`
   - O **`ua=<TOKEN>`** é a assinatura oficial — **não pode ser fabricada**; só sai do "Copiar link".
   - Pode descartar o fragmento depois de `#`.

❌ **NÃO usar:** o botão azul "Compartilhar" da barra preta nem o "Gerador de produtos recomendados" → ambos geram `meli.la/...` que **redireciona pra vitrine `/social/alexandrehebeler`** (converte menos). Qualquer URL com `/social/` está **ERRADA**.

### 3b. Extrair o link via automação (clipboard)

Após clicar "Copiar link", ler `await navigator.clipboard.readText()` no contexto da aba do produto.

- **Sempre localizar pelo `getBoundingClientRect()`** do elemento com texto exato "Compartilhar" e `y>100`
  (o de `y≈27` é o **errado**, da barra preta). A posição do "Compartilhar" do breadcrumb varia (~x 1333, y 177–225) — esses números são só uma dica de partida.
- "Copiar link" abre em ~`(x+19, y+91)` a partir do "Compartilhar" — use como **fallback aproximado**; o clique fixo erra, então **sempre confira pelo rect**.
- **Sempre validar** que o link contém `/p/MLB<id-esperado>` **e** `ua=` antes de usar (o clipboard pode reter o link anterior se o clique falhar).

### 3c. Inserir no WordPress (sessão logada)

Numa aba já logada em `ahebeler.shop/wp-admin`, usar `wp.apiFetch` (nonce automático):

```js
// 1. GET conteúdo (precisa ser .raw — markup dos blocos Gutenberg, NUNCA .rendered)
const p = await wp.apiFetch({ path: `/wp/v2/posts/${id}?context=edit&_fields=content` });

// 2. Parsear e substituir
const doc = new DOMParser().parseFromString(p.content.raw, 'text/html');
[...doc.querySelectorAll('a')]
  .filter(a => (a.getAttribute('href') || '').includes('COLAR-LINK-AFILIADO'))
  .forEach(a => {
    // achar o <mark> irmão seguinte (até 6 nós) -> nome do produto
    let mark = null, n = a.nextElementSibling, hops = 0;
    while (n && hops < 6) {
      if (n.tagName === 'MARK') { mark = n; break; }
      n = n.nextElementSibling; hops++;
    }
    // se o nome em mark.textContent casar com o produto-alvo (use include + exclude):
    a.setAttribute('href', LINK_OFICIAL);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'nofollow sponsored noopener');
    if (mark) mark.remove(); // remove o destaque amarelo
  });

// 3. UPDATE (devolve o innerHTML; preserva os comentários <!-- wp:... --> dos blocos)
await wp.apiFetch({ path: `/wp/v2/posts/${id}`, method: 'POST', data: { content: doc.body.innerHTML } });
```

- Cada botão pendente é um `<a href="#COLAR-LINK-AFILIADO">🛒 Ver preço no Mercado Livre</a>` seguido de
  `<mark ...>⚠️ COLE AQUI O LINK DE AFILIADO (PRODUTO, não vitrine): NOME DO PRODUTO</mark>`.
- O **NOME no `<mark>`** diz qual produto é aquele botão. O filtro `.includes('COLAR-LINK-AFILIADO')` casa
  com o `href="#COLAR-LINK-AFILIADO"` de propósito (ignora o `#` à frente — é mais robusto).
- ⚠️ **Round-trip do conteúdo:** use `p.content.raw` no GET e `doc.body.innerHTML` no UPDATE. **Nunca** use
  `.rendered` nem remova os comentários `<!-- wp:... -->` — isso corrompe a estrutura de blocos Gutenberg.
- ⚠️ Cuidado com chaves ambíguas: "echo dot" casa com "Echo Dot Max" e "com relógio"; use **include + exclude**.
- ⚠️ Preservar sempre `rel="nofollow sponsored noopener"` + `target="_blank"` (divulgação de afiliado + segurança da nova aba). Não "simplificar".

### 3d. Validar

Por post, contar (e relacionar com a legenda **L / F / V** da §4):

| Contador | Significado | Esperado |
|---|---|---|
| `matt_tool` | **L** — nº de links inseridos | = nº de botões que deviam ter link |
| `ua=` | nº de assinaturas oficiais | **= contagem de `matt_tool`** (todo link oficial tem os dois) |
| `COLAR-LINK-AFILIADO` | **F** — botões ainda pendentes | **0** ao publicar |
| `/social/` | **V** — links na vitrine | **0** sempre |

> Um link com `matt_tool` mas **sem `ua=`** (ex.: URL editada à mão) é inválido — por isso `ua=` entra na validação.

---

## 4. Estado atual de cada artigo

*(validado em 2026-06-26)* — Legenda **L / F / V** no [topo](#-legenda-e-ícones-usados-em-todo-o-documento).

### 4a. Prontos (F=0, V=0) — 7 artigos

| Artigo | L (links) |
|---|---|
| 03 Fechadura biometria | 4 |
| 04 Robô pet | 4 |
| 05 Câmera pet | 5 |
| 06 Tomada | 4 |
| 07 Comparativo robôs | 6 |
| 10 Comparativo câmeras | 10 |
| 20 Sensor fumaça | 4 |
| **Soma** | **37** |

### 4b. Faltam produtos

> ⚠️ Onde os produtos nomeados forem **menos** que F, os botões restantes precisam ter o produto
> identificado pelo **NOME no `<mark>`** dentro do artigo (§3c) — **não inventar** modelos.

| Artigo | L/F | Produtos que FALTAM linkar |
|---|---|---|
| 08 Kit iniciantes | 4/3 | **Tapo L530E** (cat: MLB65246849) · **Positivo Lâmpada RGB E27** · **sensor de abertura/presença Alexa** *(3 de 3 nomeados ✅)* |
| 09 Echo Dot promo | 6/1 | **"Oferta do dia"** — decisão do dono (promo do momento) |
| 13 Alexa vs Nest | 5/1 | **Echo Show 5 3ª ger** (cat: MLB39376694 — copy travou; refazer) |
| 14 Campainha | 2/2 | 2 botões, ambos a definir: 🚫 **Intelbras Allo W3 — DESCONTINUADO** → escolher substituto (ex.: Allo WT7) · **+ 1 produto que não consta** |
| 18 Fechadura escritório | 2/2 | 2 botões, ambos a definir: 🚫 **Intelbras FR 500 — DESCONTINUADO** → escolher substituto (ex.: linha FR atual/IFR) · **+ 1 produto que não consta** |

### 4c. Não iniciados (links)

| Artigo | L/F | Produtos nomeados (parcial — ver aviso da §4b) |
|---|---|---|
| 11 Sensor presença | 0/3 | Sensor Wi-Fi AGL · Sensor PIR Tuya/Smart Life · **(1 produto a definir — não consta)** |
| 12 Interruptor sem neutro | 0/4 | SONOFF ZBMINI-L2 · Interruptor Touch EKAZA T3074 · Interruptor Touch EKAZA T1074 · **(1 produto a definir — não consta)** |
| 15 Robô passa-pano | 0/6 | Xiaomi S20+ · Xiaomi S40 · WAP W3000 · KaBuM 700 · Mondial Fast Clean RB-04 · **(1 produto a definir — não consta)** |
| 16 Controle IR | 0/4 | BroadLink RM4 Pro · Controle IR Tuya/Smart Life NovaDigital · **(2 produtos a definir — não constam)** |
| 17 Fitas LED | 0/6 | Tapo L920-5 · Govee RGBIC · Tapo L900-5 · Intelbras Izy EFLS 6050 · Positivo Fita LED RGB · **(1 produto a definir — não consta)** |
| 19 Central automação | 0/4 | Aqara Hub M3 · Intelbras ICA 1001 · **(2 produtos a definir — não constam)** |

> **Soma de F (botões pendentes):** 4b = `3+1+1+2+2 = 9` · 4c = `3+4+6+4+6+4 = 27` → **36 no total, em 11 artigos**
> (08, 09, 11, 12, 13, 14, 15, 16, 17, 18, 19). Desses, **32** estão em **9** artigos de escopo conhecido
> (08, 09, 11, 12, 13, 15, 16, 17, 19) — porém **~8 desses slots ainda precisam ter o produto definido** (ver
> os marcadores "a definir" abaixo) — e **4** dependem de resolver os descontinuados em **2** artigos (14, 18).
> **Nota T3074/T1074:** contados aqui como 2 modelos distintos; se forem o mesmo, faltam 2 (não 1) em definir no art.12.

**Totais:** 56 links oficiais inseridos · 0 na vitrine · **36 botões pendentes em 11 artigos** (= 32 em artigos de escopo conhecido + 4 descontinuados).

### 4d. Produtos já linkados (MLB — auditoria)

> Lista de **produtos únicos** (24) já usados. O total de **56 links** é maior porque o mesmo produto
> aparece em vários artigos/slots (ex.: Echo Dot 5 reutilizado nos slots "com relógio" do art.09).

| Produto | MLB | Produto | MLB |
|---|---|---|---|
| S40C | `MLB63436594` | Tapo C500 | `MLB23037572` |
| WAP W100 | `MLB15711832` | FR 220 | `MLB21868709` |
| KaBuM 700 | `MLB36621174` | Papaiz SL140B | `MLB45455332` |
| WAP W1000 | `MLB40340788` | Tapo D230S1 | `MLB2037210121` |
| Xiaomi E10 | `MLB24237954` | Yale YDF 30 | `MLB26632299` |
| Velds 3em1 | `MLB50359112` | IDF 620 | `MLB22723641` |
| Tapo C200 | `MLB18593981` | Sensor Tuya fumaça | `MLB38934647` |
| Mibo iM4 C | `MLB22569962` | EKAZA 20A | `MLB25132713` |
| Tapo C210 | `MLB19663400` | Positivo Smart Plug 16A | `MLB23061221` |
| Xiaomi Smart C200 | `MLB59824659` | Echo Dot 5 | `MLB46024018` |
| Mibo iM3 C | `MLB18596028` | Echo Pop | `MLB62304347` |
| | | Echo Dot Max | `MLB60085379` |
| | | Nest Mini | `MLB2073784404` |

- **Nota (art.09):** os slots "com relógio" usaram o link do **Echo Dot 5 padrão** (anúncios "com relógio" não têm "Compartilhar" de afiliado). Trocar se quiser o exato.
- ⚠️ **Auditar:** "KaBuM 700" aparece tanto aqui (`MLB36621174`, já linkado) quanto como produto a linkar no art.15 — confirmar se é o mesmo botão (possível duplicidade).

---

## 5. O que deve ser removido / corrigido

### 5a. Remover (limpeza)

1. **"Built with GeneratePress" do rodapé** — é o copyright padrão do tema. Remover via filtro
   `generate_copyright` (snippet em functions.php / Code Snippets) ou ocultar via CSS e pôr copyright próprio.
   Ex.: `add_filter('generate_copyright', fn() => '© 2026 Guia Casa Inteligente');`
2. **Marcadores de placeholder restantes** nos artigos pendentes: todo `href="#COLAR-LINK-AFILIADO"` e todo
   `<mark>⚠️ COLE AQUI O LINK DE AFILIADO...</mark>` devem sumir conforme os links forem inseridos
   (NÃO publicar artigo com placeholder visível).
3. **Blocos `[Opcional — sua experiência ...]`** (em `<em>`) — preencher com experiência real OU remover.
4. **Notas internas** que possam ter sobrado no corpo (ex.: "(publique também esse artigo...)").
5. **Plugin "WordPress Importer"** pode ser desativado/removido após terminar as importações (opcional).
6. **Item no Lixo (1)** — esvaziar se for rascunho automático inútil.

### 5b. Nunca permitir (regra permanente)

- **Nenhum link com `/social/`** (vitrine) nos botões de compra. Varredura: `grep` por `/social/` em todo post = **0**.
- Nenhum botão "morto" (`href="#..."`) publicado.

### 5c. Corrigir / configurar

1. **Rank Math:** aparece aviso "o URL do site foi alterado… reconectar" no topo do wp-admin → clicar pra reconectar (efeito da troca de domínio).
2. **Google Search Console:** conectar e enviar sitemap (`/sitemap_index.xml`).
3. **Cache LiteSpeed:** após qualquer alteração de tema/conteúdo, **purgar** (LiteSpeed → Toolbox → "Limpar tudo - LSCache"). *(O bug de marca "ahebeler.shop" vs "Guia Casa Inteligente" era cache velho — já corrigido.)*
4. **Imagem destacada** em cada post (alt = palavra-chave) antes de publicar.
5. **Cada post tem Rank Math preenchido** (título, meta, keyword vieram do import) — conferir nota 80+.

### 5d. Design / polimento (pendente)

- Padronizar os cards da seção **"Últimos reviews e comparativos"** na home (hoje o alinhamento texto+miniatura fica torto). Provável via CSS ou bloco do GenerateBlocks.
- (Opcional) Logo/wordmark próprio no header (hoje é texto).

---

## 6. Ordem de publicação (por silos)

Publicar review + comparativo da mesma categoria juntos (ativa links internos):

1. ✅ **Iluminação:** 01 + 02 (já no ar)
2. **Robôs:** 04 + 07 (prontos) → depois 15
3. **Segurança:** 05 + 10 (prontos) → 03 (pronto) → 14, 18, 20
4. **Assistentes/Ofertas:** 09 + 08 + 06 → 13, 16
5. **Iluminação/automação de iluminação:** 11, 12, 17
6. **Guias:** 19

---

## 7. Checklist final do agente

1. **Terminar os 36 botões pendentes** ([§4](#4-estado-atual-de-cada-artigo)) usando o método da [§3](#3--método-validado--gerar-e-inserir-um-link):
   - **32 em artigos de escopo conhecido** — 08, 09, 11, 12, 13, 15, 16, 17, 19 (alguns slots ainda precisam do produto definido — ver [§4c](#4c-não-iniciados-links)).
   - **4 nos descontinuados** — artigos 14 e 18, **após** o item 2.
2. **Resolver os 2 descontinuados** (Allo W3 → art.14; FR 500 → art.18) com substituto atual (decisão humana).
3. **Remover** o que está na [§5a](#5a-remover-limpeza) (principalmente "Built with GeneratePress" e placeholders).
4. **Configurar** Rank Math (reconectar) + Search Console + sitemap ([§5c](#5c-corrigir--configurar)).
5. **Imagem destacada** + revisão de opinião em cada post.
6. **Validar** (0 `/social/`, 0 placeholder, `ua=` = `matt_tool`) e **publicar por silos** ([§6](#6-ordem-de-publicação-por-silos)).
7. **Purgar o cache LiteSpeed** ao final.
