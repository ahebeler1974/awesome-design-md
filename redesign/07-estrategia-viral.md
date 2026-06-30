# 🚀 Estratégia — Guia Casa Inteligente (viralidade, conversão Mercado Livre e AdSense)

> **O que é isto:** o plano de jogo para transformar o `ahebeler.shop` de "tema WordPress básico" em um blog editorial **impecável, que vende e que volta**. Casa com a [`01-identidade-visual.md`](01-identidade-visual.md) (tokens `--gci-*`, fontes Sora+Inter, componentes `.gci-*`) e com a infra real do [`MASTERINFRAHANDOFF.md`](../MASTERINFRAHANDOFF.md) (20 artigos, 6 categorias, etiqueta de afiliado `matt_tool=38524122`).
>
> **Regra que atravessa tudo:** verde `--gci-cta` só no botão "Ver preço no Mercado Livre"; veredito claro em todo conteúdo; disclosure honesto perto do **primeiro** CTA; link sempre direto no produto (`/p/MLB...`), **nunca** na vitrine `/social/`.
>
> **Como ler:** comece pela [§7 — Plano priorizado](#7-plano-priorizado-impacto--esforço). Ela diz a ordem. As seções 1–6 são o "como".

---

## Índice

1. [Pilares de viralidade e retenção](#1-pilares-de-viralidade-e-retenção)
2. [Linkagem interna por silo](#2-linkagem-interna-por-silo-review--comparativo)
3. [Conversão Mercado Livre (checklist)](#3-conversão-mercado-livre--checklist)
4. [SEO on-page e técnico](#4-seo-on-page-e-técnico)
5. [Prontidão AdSense](#5-prontidão-adsense)
6. [Calendário de conteúdo](#6-calendário-de-conteúdo)
7. [Plano priorizado (impacto × esforço)](#7-plano-priorizado-impacto--esforço)

---

## 1. Pilares de viralidade e retenção

A viralidade aqui **não** é "ficar famoso" — é fazer conteúdo que a pessoa **salva, volta e compartilha** porque resolve a dúvida "qual eu compro?". No nicho de casa inteligente, o que circula é o formato **decisório e escaneável**, não o texto longo. Cinco pilares:

### Pilar A — Formatos "salváveis": `X vs Y` e `melhores até R$N`

São os que mais geram backlink, print e link em grupo de WhatsApp/comunidade. O segredo: **a tabela comparativa e o veredito ficam no TOPO** (acima da dobra), não enterrados no fim.

- Estrutura vencedora: *título → caixa "Resposta rápida" (TL;DR) → tabela comparativa → vereditos ("Melhor escolha" / "Melhor custo-benefício" / "Evite se…") → análise produto a produto → FAQ*.
- Use a `.gci-tabela` (responsiva) e as caixas `.gci-best`. A pessoa deve conseguir decidir **sem rolar até o fim**.
- Exemplos de títulos para o nicho (mapeados aos artigos reais):
  - "Alexa vs Google Nest: qual assistente vale mais a pena em 2026?" *(art.13)*
  - "Os 5 melhores robôs aspiradores até R$1.500 (comparativo honesto)" *(art.07)*
  - "Câmeras Wi-Fi de segurança até R$300: comparamos 6 modelos" *(art.10)*
  - "Robô que passa pano até R$2.000: vale a pena? Comparativo" *(art.15)*
  - "Fitas LED inteligentes pra quarto gamer: Tapo vs Govee vs Intelbras" *(art.17)*

### Pilar B — Veredito claro + selo "Atualizado em"

Confiança é o motor do retorno. Quem confia, **volta antes de comprar** e indica.

- **Sempre** um veredito explícito: "A melhor escolha geral é X porque…". Nada de "depende".
- Selo **"Atualizado em [data]"** visível no topo do artigo (`.gci-best` ou badge âmbar `--gci-amber`). Atualize de verdade ao revisar preço/modelo — data velha mata a confiança.
- Caixa **"Como avaliamos"** linkando a página-pilar de metodologia (Pilar E) = prova de credibilidade.

### Pilar C — FAQ com schema + "Leia também"

- FAQ em accordion (`.gci-faq` com `<details>`) responde as dúvidas reais ("funciona sem internet?", "precisa de fio neutro?", "é Zigbee ou Wi-Fi?") **e** alimenta o schema `FAQPage` (§4) → elegível a rich snippet no Google = mais clique.
- Bloco **"Leia também"** (`.gci-relacionados`) no fim de cada artigo, sempre apontando para o par do silo (§2) → aumenta páginas/sessão e tempo no site (sinais que o Google e o AdSense gostam).

### Pilar D — Microconteúdo compartilhável (imagem destacada que "vende o clique")

- **Toda** imagem destacada (hoje inexistentes — problema citado no estado atual) deve funcionar como "thumbnail de comparativo": produto + título curto sobreposto + nota/estrela quando review. É isso que aparece no preview do WhatsApp/Pinterest/Facebook e decide o clique.
- Padronize um template visual (mesma paleta `--gci-*`, fonte Sora no título) para o site parecer uma marca, não posts soltos.

### Pilar E — Página-pilar de credibilidade: "Como avaliamos os produtos"

- Uma página explicando os critérios (conectividade Wi-Fi 2.4GHz/Zigbee, bateria, app, certificação, custo-benefício) e que **há links de afiliado, mas a recomendação é honesta**. É o ativo que sustenta toda a autoridade — e ajuda muito na aprovação do AdSense (§5).

> **Resumo do pilar:** o que viraliza no nicho é **decisão rápida + confiança**. Tabela no topo, veredito sem rodeio, data fresca, FAQ com schema, imagem que vende o clique.

---

## 2. Linkagem interna por silo (review ↔ comparativo)

O ativo de SEO mais subutilizado do site. Cada **categoria** é um silo; dentro dele, **reviews individuais** apontam para o **comparativo** (e vice-versa). Isso concentra autoridade, faz o leitor circular e ativa os links de afiliado de produtos relacionados.

**Regra de ouro do silo:** todo review linka o comparativo da sua categoria ("Veja como ele se compara aos concorrentes →"); todo comparativo linka cada review citado ("Análise completa do X →"). Use a `.gci-relacionados` no rodapé e links contextuais no corpo.

### Mapa prático (artigos reais do handoff)

| Silo (categoria) | Comparativo / pilar (hub) | Reviews que apontam pra ele (spokes) |
|---|---|---|
| **Robôs e Limpeza** | 07 Comparativo robôs até R$1.500 · 15 Robô passa-pano até R$2.000 | 04 Robô pet ↔ 07 · 15 |
| **Segurança e Câmeras** | 10 Comparativo câmeras Wi-Fi até R$300 | 05 Câmera pet · 03 Fechadura biometria · 14 Campainha · 18 Fechadura escritório · 20 Sensor fumaça |
| **Assistentes e Controle** | 13 Alexa vs Nest | 09 Echo Dot · 16 Controle IR · 19 Central automação |
| **Iluminação Inteligente** | 01 + 02 (publicados) | 11 Sensor presença · 12 Interruptor sem neutro · 17 Fitas LED |
| **Guias e Comparativos** | 08 Kit iniciantes (guia-pilar de entrada) | linka 1 review "campeão" de cada silo acima |
| **Ofertas e Novidades** | 09 Echo Dot promo (entrada de oferta) | aponta pro review/comparativo do produto em oferta |

### Ligações cruzadas de alto valor (fazer primeiro)

- **04 Robô pet → 07 Comparativo robôs** e **07 → 04, 15** *(silo Robôs já tem os dois lados prontos)*.
- **05 Câmera pet → 10 Comparativo câmeras** e **10 → 05** *(silo Segurança, ambos prontos)*.
- **08 Kit iniciantes** vira o **hub de entrada**: linka 1 review forte de cada silo (03, 05, 09) → distribui autoridade pra todo o site.
- **09 Echo Dot promo → 13 Alexa vs Nest** (do produto em oferta para o comparativo que ajuda a decidir).

> **Por quê:** o handoff já manda **publicar por silos** (§6 do handoff). A linkagem interna é o que faz esse agrupamento render — sem ela, publicar junto não ativa nada. Priorize os silos cujos dois lados (review + comparativo) **já estão prontos**: Robôs (04+07) e Segurança (05+10).

---

## 3. Conversão Mercado Livre — checklist

O objetivo do dono é **direcionar para o link de afiliado**. Cada elemento abaixo aumenta a taxa de clique no botão verde sem mentir (cookie de 30 dias, último clique — então o clique conta).

### 3.1 O botão (CTA) — `.gci-cta`

- [ ] Texto **"Ver preço no Mercado Livre"** (não "comprar agora" — reduz fricção; a pessoa só vai "ver o preço").
- [ ] Verde `--gci-grad-cta` com leve glow (`--gci-cta-glow`) e ícone de carrinho 🛒. Verde **exclusivo** do CTA (regra de ouro da identidade).
- [ ] Microcopy de confiança embaixo: *"Preço e estoque atualizados no site do Mercado Livre"*.
- [ ] **Repetir o CTA** em pontos de decisão: após o TL;DR, após cada veredito, no fim. Não basta um botão único lá embaixo.
- [ ] `rel="nofollow sponsored noopener"` + `target="_blank"` em **todo** link (já garantido pelo `inserir-links.js`). Nunca "simplificar".

### 3.2 Disclosure de afiliado (honesto e perto do 1º CTA)

- [ ] Caixa `.gci-disclosure` curta **logo acima/abaixo do primeiro botão** — não só no rodapé (corrige o problema atual). Texto-padrão da identidade:
  > *Este guia tem links de afiliado. Se você comprar pelo nosso link, podemos ganhar uma pequena comissão **sem custo extra para você** — é assim que mantemos o site no ar e independente.*
- [ ] Manter também no rodapé e numa página dedicada (§5).

### 3.3 Veredito → CTA (o par que converte)

- [ ] Cada caixa de veredito (`.gci-best`: "Melhor escolha", "Melhor custo-benefício") **termina com o seu próprio botão** do produto recomendado. Veredito sem botão ao lado desperdiça a intenção de compra.
- [ ] "Evite se…" também ajuda: filtra quem ia se decepcionar e devolver — protege a reputação (e a comissão).

### 3.4 CTA fixo no mobile — `.gci-sticky-cta`

- [ ] Barra fixa no rodapé do mobile com o produto **principal** do artigo + preço/“ver preço” + botão verde. A maioria do tráfego de afiliado é mobile; o sticky recupera quem rolou longe do botão.
- [ ] Some na home/páginas institucionais; aparece só em review/comparativo.

### 3.5 Urgência **honesta** + prova social

- [ ] Urgência real apenas: "promoção pode acabar", "estoque costuma esgotar em datas como Black Friday" — **nunca** preço fixo prometido nem falsa escassez (a identidade proíbe).
- [ ] Prova social/autoridade técnica: "milhares de avaliações no Mercado Livre", critérios técnicos (Wi-Fi 2.4GHz, Zigbee, bateria X mAh, certificação) — gatilho de autoridade que vende sem inventar.
- [ ] Selo "Atualizado em" reforça que o preço/modelo foi conferido recentemente.

### 3.6 Higiene de link (gate antes de publicar)

- [ ] **F = 0** (nenhum `COLAR-LINK-AFILIADO`) · **V = 0** (nenhum `/social/`) · **`ua=` == `matt_tool`** — rode `validar()` do [`inserir-links.js`](../execucao-links/inserir-links.js).
- [ ] Todo `href` cai em `/p/MLB<id>` do produto certo.

---

## 4. SEO on-page e técnico

O Rank Math já está instalado (handoff §1). Falta usá-lo bem e adicionar schema rico.

### 4.1 Titles e meta descriptions

- **Title (≤60 car.):** benefício + especificidade + intenção. Ex.: "Robô Aspirador para Pelo de Cachorro: Vale a Pena? (2026)".
- **Meta description (≤155 car.):** promessa + veredito implícito + CTA. Ex.: "Testamos os melhores robôs para casa com pet. Veja qual aspira pelo de verdade, preço e onde comprar."
- **Keyword foco** por artigo (já veio do import — conferir nota Rank Math **80+**, gate do handoff).

### 4.2 Schema estruturado (JSON-LD) — o maior ganho de clique

| Schema | Onde aplicar | Ganho |
|---|---|---|
| **Article** | todo post | elegibilidade base, data de publicação/atualização |
| **Review** + `Rating` | reviews individuais (03, 04, 05, 06, 09…) | ⭐ estrelas no resultado de busca |
| **Product** | produto principal do review | preço/avaliação no snippet |
| **FAQPage** | a FAQ `.gci-faq` de cada artigo | accordion rico no Google = mais cliques |
| **BreadcrumbList** | breadcrumb `.gci-breadcrumb` | trilha categoria → artigo no resultado |
| **ItemList** | comparativos (07, 10, 13, 15…) | "lista" no resultado |

> Rank Math gera Article/Breadcrumb/FAQ nativamente — ativar por tipo de post. Review/Product exigem preencher os campos (nota, critérios). **Não** inventar preço fixo no schema (some logo e o Google penaliza dado falso).

### 4.3 Imagens

- [ ] **Imagem destacada em todo post** (hoje faltam — problema do estado atual). `alt` = palavra-chave do artigo.
- [ ] Formato **WebP**, dimensões servidas no tamanho exibido, `loading="lazy"` (exceto a do topo/LCP).
- [ ] Thumbnail 16:9 nos cards (`.gci-card`) — corrige os cards "muito textuais".

### 4.4 Core Web Vitals (CWV)

- [ ] LiteSpeed Cache já ativo: ligar minificação CSS/JS, lazy-load de imagem, **preload** das fontes Sora/Inter (`display=swap`) para não travar o LCP.
- [ ] Fontes via Google Fonts com `preconnect` (já no kit) — ou hospedar local para CLS/LCP melhores.
- [ ] Reservar dimensão das imagens (width/height) para **CLS ≈ 0**.
- [ ] **Purgar LiteSpeed** após mudanças (gate do handoff).

### 4.5 Sitemap, Search Console e datas

- [ ] **Reconectar o Rank Math** (aviso de URL alterada pós-troca de domínio — handoff §5c).
- [ ] **Google Search Console:** verificar propriedade + enviar `/sitemap_index.xml`.
- [ ] **Data de atualização** visível no post **e** no schema (`dateModified`) — atualize de verdade ao revisar. Isso ativa o pilar de retenção (§1-B).

---

## 5. Prontidão AdSense

O AdSense exige **conteúdo original suficiente + páginas institucionais + navegação clara + zero placeholder**. O site está perto, mas falta o básico institucional.

### 5.1 O que falta antes de pedir aprovação

- [ ] **Páginas obrigatórias** (criar todas):
  - **Política de Privacidade** (com menção a cookies e AdSense/Google).
  - **Termos de Uso**.
  - **Sobre** (quem é o Guia Casa Inteligente, a proposta editorial honesta).
  - **Contato** (formulário ou e-mail).
  - **Divulgação de Afiliados** (página dedicada + disclosure por artigo — §3.2).
  - **"Como avaliamos os produtos"** (metodologia — também pilar de credibilidade §1-E).
- [ ] **Zero placeholder publicado:** nenhum `COLAR-LINK-AFILIADO`, nenhum `<mark>` amarelo, nenhum bloco `[Opcional — sua experiência...]` vazado (gates do handoff §5).
- [ ] **Massa de conteúdo:** publicar os artigos prontos (são 7: 03, 04, 05, 06, 07, 10, 20 + 01/02 no ar) antes de aplicar — AdSense reprova sites "rasos".
- [ ] Menu/navegação clara (corrigir menu quebrando em 2 linhas — parte do redesign do header).
- [ ] Remover "Built with GeneratePress" do rodapé (handoff §5a) — site precisa parecer próprio.

### 5.2 Posicionamento de anúncios (sem matar a conversão de afiliado)

> O afiliado paga muito mais por clique do que o AdSense. **Anúncio nunca deve competir com o botão verde** nem empurrar o CTA pra baixo da dobra.

- **Permitido / recomendado:**
  - 1 bloco **no meio do artigo** (entre seções, após a análise — longe do TL;DR e dos vereditos).
  - 1 bloco **no fim** (depois da FAQ / "Leia também").
  - 1 bloco discreto na **sidebar** (desktop) ou entre cards na home.
- **Evitar:**
  - Anúncio **acima** ou **colado** no primeiro CTA / TL;DR (rouba o clique de afiliado).
  - Anúncio dentro das tabelas comparativas e das caixas de veredito.
  - Pop-up/anchor que cubra o `.gci-sticky-cta` no mobile (conflito direto).
- **Auto Ads:** se usar, **excluir** as zonas do TL;DR, vereditos e CTA via placement controls — ou deixar manual para ter controle total.

---

## 6. Calendário de conteúdo

Mistura: **terminar/publicar o que existe** (alta intenção, já 80% pronto) + **novas pautas de alta intenção** que preenchem lacunas dos silos. Páginas-pilar primeiro (sustentam tudo).

### Páginas-pilar (base — fazer primeiro)

1. **"Como avaliamos os produtos"** (metodologia — credibilidade + AdSense).
2. **"Kit casa inteligente para iniciantes 2026"** (art.08 — hub de entrada que linka todos os silos).
3. **"Guia: Alexa vs Google Nest — qual assistente escolher"** (art.13 — hub do silo Assistentes).
4. **Páginas institucionais** (§5.1).

### Artigos de alta intenção (8–12 ideias)

Já no pipeline (terminar + publicar — maior ROI imediato):

1. 07 — **Melhores robôs aspiradores até R$1.500: comparativo** *(pronto)*.
2. 10 — **Câmeras Wi-Fi de segurança até R$300: comparamos 6** *(pronto)*.
3. 04 — **Robô aspirador para casa com pet: vale a pena?** *(pronto)*.
4. 05 — **Câmera Wi-Fi para vigiar o pet em casa** *(pronto)*.
5. 15 — **Robô que passa pano até R$2.000: comparativo** *(produtos a definir)*.
6. 17 — **Fitas LED inteligentes para quarto gamer (com Alexa)** *(a iniciar)*.
7. 12 — **Interruptor inteligente sem fio neutro: funciona? quais comprar** *(dúvida técnica de alta intenção)*.
8. 16 — **Controle universal inteligente para ar e TV (IR + Alexa)** *(a iniciar)*.

Novas pautas sugeridas (preenchem buscas de compra que o nicho ainda não cobre):

9. **"Melhores assistentes de voz até R$300: Echo vs Nest vs alternativas"** (amplia o silo Assistentes; sazonal em Black Friday).
10. **"Fechadura digital: biometria vs senha vs cartão — qual escolher"** (conecta art.03 e art.18; alta intenção).
11. **"Casa inteligente sem mensalidade: o que dá pra automatizar de graça"** (formato salvável, anti-medo de custo recorrente).
12. **"Black Friday casa inteligente: o que vale (e o que não vale) comprar"** (página de **Ofertas e Novidades**, atualizável todo ano — tráfego sazonal forte).

> **Cadência sugerida:** publicar por silo (handoff §6), 2 artigos/semana, começando pelos silos com os dois lados prontos (Robôs 04+07, Segurança 05+10), com a linkagem interna da §2 feita **no momento da publicação**.

---

## 7. Plano priorizado (impacto × esforço)

Faça de cima pra baixo. As ações de **Alta** prioridade entregam "impecável + que vende + AdSense-ready" no menor esforço.

| # | Ação | Impacto | Esforço | Prioridade |
|---|---|---|---|---|
| 1 | Aplicar header compacto + logo + menu em 1 linha + paleta `--gci-*` (CSS do kit) | Alto | Médio | **Alta** |
| 2 | Imagem destacada (WebP, alt=keyword) + thumbnail 16:9 nos cards em todos os posts | Alto | Médio | **Alta** |
| 3 | Inserir componentes editoriais (TL;DR, tabela, vereditos, pros/contras, FAQ) nos 7 prontos | Alto | Médio | **Alta** |
| 4 | CTA `.gci-cta` repetido + disclosure perto do 1º CTA + sticky mobile | Alto | Baixo | **Alta** |
| 5 | Terminar os 36 botões pendentes (F=0, V=0, `ua`==`matt_tool`) via `inserir-links.js` | Alto | Médio | **Alta** |
| 6 | Páginas institucionais (Privacidade, Termos, Sobre, Contato, Afiliados, Como avaliamos) | Alto | Baixo | **Alta** |
| 7 | Linkagem interna por silo (§2), começando por Robôs e Segurança | Alto | Baixo | **Alta** |
| 8 | Reconectar Rank Math + Search Console + enviar sitemap | Alto | Baixo | **Alta** |
| 9 | Remover "Built with GeneratePress" e todo placeholder/`<mark>` | Médio | Baixo | **Alta** |
| 10 | Schema Review/Product/FAQ/Breadcrumb (estrelas no Google) | Alto | Médio | **Média** |
| 11 | Selo "Atualizado em" + `dateModified` no schema | Médio | Baixo | **Média** |
| 12 | CWV: WebP, lazy-load, preload de fontes, minificação LiteSpeed, purgar cache | Médio | Médio | **Média** |
| 13 | Aplicar AdSense após publicar os prontos + páginas institucionais | Médio | Baixo | **Média** |
| 14 | Resolver os 2 descontinuados (art.14 Allo W3, art.18 FR 500) — decisão humana | Médio | Médio | **Média** |
| 15 | Posicionar anúncios fora das zonas de CTA/veredito | Médio | Baixo | **Média** |
| 16 | Novas pautas 9–12 (assistentes, fechaduras, sem mensalidade, Black Friday) | Médio | Alto | **Baixa** |
| 17 | Template visual de imagem destacada compartilhável (marca consistente) | Médio | Médio | **Baixa** |
| 18 | Hospedar fontes localmente (CWV fino) + otimizações avançadas | Baixo | Médio | **Baixa** |

> **Sequência enxuta (primeiras 2 semanas):** 1 → 2 → 3 → 4 nos 7 prontos → 6 (institucionais) → 9 (limpeza) → 8 (Search Console) → 7 (silos Robôs e Segurança) → publicar → 13 (pedir AdSense). Depois entram schema (10), CWV (12) e os pendentes (5/14).
