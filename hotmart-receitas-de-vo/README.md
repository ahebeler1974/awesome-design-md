# 🍫 Kit de Criativos — Receitas de Vó com Toque Funcional

Pacote **pronto para tráfego pago** do e-book *Receitas de Vó com Toque Funcional*
(24 receitas brasileiras afetivas, sem lactose, com gordura de coco e versões com adoçante).
Venda direta no **Hotmart** · Instagram / Meta Ads · ticket R$ 20–47.

Todos os criativos seguem a lógica do funil de impulso:
**parar o scroll → criar desejo → tirar a culpa/medo → CTA forte → checkout.**

---

## ✅ O que já está pronto neste kit

| Pacote | Onde está | O que é |
|---|---|---|
| **4 carrosséis** (27 slides) | `criativos/carrossel-*/slide-XX.png` | Imagens **1080×1350 (4:5)**, prontas pra postar |
| **PDFs dos carrosséis** | `criativos/pdf/*.pdf` | Cada carrossel em 1 PDF (pra revisar/imprimir/subir) |
| **Pré-visualização** | `criativos/contact-sheets/*.png` | Todos os slides de cada carrossel numa tira só |
| **Textos de anúncio (A/B/C/D)** | `copy/textos-de-anuncio.md` | Primary text + headlines + CTA pro Meta |
| **Legendas + hashtags** | `copy/legendas-e-hashtags.md` | Legendas prontas por carrossel pro orgânico |
| **Reels + storytelling** | `copy/reels-e-storytelling.md` | 3 roteiros de Reels + história de venda |
| **Fotos recortadas** | `assets/fotos/*.png` | Hero shots tirados do próprio e-book |

> Os 4 ângulos (um por carrossel) seguem direto o roteiro de tráfego:
> **1) Fit/sem culpa · 2) Sem lactose · 3) Mãe/família · 4) Afeto/nostalgia.**

---

## 📦 Os 4 carrosséis

| # | Pasta | Ângulo | Slides | Foto-capa | Combine com |
|---|-------|--------|:---:|-----------|-------------|
| 1 | `carrossel-1-fit` | **Fit / sem culpa** | 8 | brigadeiro | Texto **A** + headline "Doce que cabe na dieta" |
| 2 | `carrossel-2-sem-lactose` | **Sem lactose** | 7 | pudim | Texto **B** + headline "24 receitas sem lactose" |
| 3 | `carrossel-3-mae-familia` | **Mãe / família** | 6 | bolo de banana | Texto **C** + headline "Lanche caseiro e barato" |
| 4 | `carrossel-4-afeto` | **Afeto / nostalgia** | 6 | bolo de fubá | Texto **D** + headline "O gostinho da vó, sem culpa" |

**Importante:** poste os slides **na ordem** (`slide-01`, `slide-02`, …). O `slide-01` é a capa
que para o scroll; o último slide é sempre o **CTA → Saiba mais**.

---

## 🚀 Começando (recomendado pra ticket baixo)

1. **Confira o Pixel da Meta** instalado e conectado à página da Hotmart.
2. **Suba 2 ângulos primeiro** — sugestão: **Carrossel 1 (Fit)** + **Carrossel 2 (Sem lactose)**.
   São os que mais convertem em ticket baixo.
3. Em cada conjunto, use **1 ângulo por criativo** (não misture "fit" com "sem lactose").
4. Texto principal: pegue a versão correspondente em `copy/textos-de-anuncio.md` (A pro 1, B pro 2…).
5. Botão: teste **Saiba mais** x **Comprar**.
6. **Orçamento de teste:** R$ 20–30/dia, por 3–5 dias, antes de julgar. Não desligue no 1º dia.
7. Olhe **CTR** (mire >1,5%) e **ROAS** (mire >1,5, ideal 2+). Escale só o vencedor.

### Estrutura de campanha sugerida
```
CAMPANHA (Objetivo: Vendas / Conversões)
├── Conjunto 1 — Advantage+ (deixa a Meta achar)
│     └── Carrossel 1 (Fit) + Carrossel 2 (Sem lactose) + Reels 1
├── Conjunto 2 — Interesses amplos (culinária, receitas, vida saudável)
│     └── Carrossel 3 (Mãe) + Carrossel 4 (Afeto)
└── (após as 1as vendas) Conjunto 3 — Lookalike de compradores
```

### KPIs — quando agir
| Métrica | Meta saudável | Se estiver ruim… |
|---|---|---|
| CTR | > 1,5% | troque a **capa/criativo** |
| CPC | < R$ 1,00 | melhore **texto + headline** |
| Conversão na página | > 2% | ajuste a **página Hotmart** |
| ROAS | > 1,5 (ideal 2+) | pause e teste outro ângulo |

---

## ⚠️ Política da Meta (pra não tomar reprovação)

A Meta é rígida com saúde/peso/dieta. Nos criativos — principalmente no ângulo "fit":

- ❌ **NÃO** use "antes e depois", fotos de corpo/balança ou promessa de emagrecimento.
- ❌ **NÃO** aponte um atributo pessoal do usuário ("você está acima do peso?", "perca X kg").
- ✅ **PODE** falar do produto: "sem lactose", "sem açúcar refinado", "doce que cabe na dieta", "versão mais leve".
- ✅ Foque no **alimento e no benefício da receita**, não na transformação física da pessoa.

> Os criativos deste kit já foram escritos dentro dessa política (falam do doce, não do corpo).

---

## 🛠️ Personalizar e gerar de novo (opcional)

Os criativos foram gerados por código (HTML/CSS → PNG), então dá pra editar e refazer todos
de uma vez. Pré-requisito: Node.js.

```bash
cd build
npm install            # instala puppeteer + sharp (baixa o Chromium)
# edite o que quiser:
#  - build/render.js   → const HANDLE = '@receitasdevo'  (troque pelo seu @)
#  - build/render.js   → textos/cores/fotos de cada slide (array CAROUSELS)
#  - build/styles.css  → paleta, fontes, tapes, etc.
node render.js         # regenera os 27 PNGs em ../criativos
```

- **Trocar o @ do perfil:** mude `HANDLE` no topo do `render.js` e rode `node render.js`.
- **Trocar uma foto:** substitua o arquivo em `assets/fotos/<nome>.png` (mesmo nome) e regenere.
- **Trocar um texto:** edite o slide no array `CAROUSELS` dentro do `render.js`.

> Os textos dos slides usam o lettering "pincel" (Pacifico), os títulos arredondados (Baloo 2),
> as anotações manuscritas (Caveat) e o corpo em Nunito — tudo embutido em `build/fonts/`.

---

## 📋 Checklist de subida

- [ ] Pixel da Meta instalado e conectado à Hotmart
- [ ] Página de vendas Hotmart revisada (título, preço, prova, garantia)
- [ ] @ do perfil trocado nos criativos (rodar `node render.js` de novo)
- [ ] 4 carrosséis + Reels prontos (este kit)
- [ ] 4 versões de texto (A/B/C/D) em `copy/`
- [ ] Conjuntos por ângulo configurados
- [ ] Orçamento de teste definido (R$ 20–30/dia)
- [ ] UTM/rastreio na Hotmart pra saber qual criativo vende

---

### Observações
- As **fotos** foram recortadas das páginas do próprio e-book (qualidade de impressão).
  Se um dia tiver fotos em alta resolução do produto, é só substituir em `assets/fotos/` e regerar.
- O `@receitasdevo` é um **placeholder** — troque pelo seu perfil real antes de subir.
- Formato 1080×1350 atende feed e a maioria dos posicionamentos do Meta para carrossel.
