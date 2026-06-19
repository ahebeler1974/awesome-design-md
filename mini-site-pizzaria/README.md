# 🍕 Mini-site de Pizzaria — template responsivo e reutilizável

Site de uma página (landing) para pizzaria/delivery, com **cardápio**, **carrinho** e
**pedido direto pelo WhatsApp**. Moderno, rápido, otimizado para celular e **100% reutilizável**:
para um novo cliente você edita **um único arquivo** (`js/config.js`) e troca o logo e as fotos.

> Sem framework, sem build obrigatório, sem dependência externa em tempo de execução
> (fontes e imagens ficam dentro do projeto). É só abrir o `index.html`.

---

## ✨ O que o site tem

- **Header fixo** com logo, navegação e botão "Peça no WhatsApp"
- **Banner (hero)** com nome, selos (nota, entrega, frete grátis) e status **Aberto/Fechado** automático
- **Cardápio por categorias** com filtro, fotos, descrição e preço
- **Carrinho** com quantidades → **monta a mensagem e envia o pedido pelo WhatsApp**
- **Sobre**, **Horário de funcionamento** (com o dia de hoje destacado) e **Como chegar** (Google Maps)
- **Botão flutuante do WhatsApp** + **barra fixa de pedido no celular**
- **Totalmente responsivo** (1, 2 ou 3 colunas conforme a tela)
- **Tema por variáveis de cor** — reskin completo trocando 4 cores

### Pré-visualização
Veja a pasta [`previews/`](previews/) — o **mesmo template** em dois clientes diferentes
(`Bella Massa`, vermelho · `Nonna Verde`, verde), em desktop, celular e com o carrinho aberto.

---

## 📁 Estrutura

```
mini-site-pizzaria/
├── index.html              # estrutura da página
├── css/styles.css          # estilo (tema por variáveis CSS)
├── js/
│   ├── config.js           # ⚙️ EDITE AQUI por cliente (negócio, cores, cardápio)
│   ├── config-verde.js     # exemplo do mesmo site reaproveitado p/ outro cliente
│   └── app.js              # lógica (render, carrinho, WhatsApp) — não precisa mexer
├── assets/
│   ├── fonts/              # Fraunces + Plus Jakarta Sans (self-hosted)
│   └── img/                # logo + imagens dos produtos (troque pelas fotos do cliente)
├── previews/               # screenshots de exemplo
└── build/                  # scripts opcionais (gerar artes e previews)
```

---

## 🚀 Como ver o site

- **Mais simples:** dê dois cliques em `index.html` (abre no navegador).
- **Recomendado (evita qualquer bloqueio do navegador):** rode um servidor local:
  ```bash
  cd mini-site-pizzaria
  python3 -m http.server 8080      # depois acesse http://localhost:8080
  ```

---

## 🛠️ Personalizar para um novo cliente (passo a passo)

Abra **`js/config.js`** e altere:

**1. Dados do negócio** (`business`)
- `name`, `tagline`, `eyebrow`
- `whatsapp` → **só números, com DDI 55 + DDD**. Ex.: `5511988887777`
- `phone`, `instagram`, `address`, `mapsQuery`
- `trust` e `heroBadges` → os selos exibidos
- `about` → texto e lista de diferenciais
- `payments` → formas de pagamento
- `schedule` → horários (veja abaixo)

**2. Cores** (`theme`) — o reskin completo sai daqui:
```js
theme: {
  primary: "#C8102E",   // cor da marca (botões, preços, destaques)
  accent:  "#F4B740",   // detalhes / selos
  bg:      "#FFF8F0",   // fundo
  heroBg:  "radial-gradient(...)", // fundo do banner
  // ...
}
```

**3. Cardápio** (`menu`) — categorias e itens:
```js
{ id:"tradicionais", name:"Tradicionais", icon:"🍕", items:[
  { name:"Margherita", price:49.90, img:"assets/img/pizza-margherita.svg",
    tag:"Mais pedida", desc:"Molho de tomate, mussarela e manjericão." },
  // ...
]}
```
- `price` em número (ex.: `49.90`)
- `tag` é opcional (selo no canto da foto)
- `img` aponta para a foto do produto

**4. Logo e fotos** (pasta `assets/img/`)
- Troque `logo.svg` pelo logo do cliente (pode ser `.png`/`.svg` — ajuste `business.logo`)
- Substitua as imagens dos produtos pelas **fotos reais** do cliente
  (use o mesmo nome de arquivo, ou atualize o campo `img` de cada item)

> As imagens que vêm no template são **ilustrações** geradas só para demonstração.
> Para o site final, use fotos reais das pizzas — convertem muito melhor.

### Horários (`schedule`)
`0 = Domingo … 6 = Sábado`. Faixas em horas (24h, use `.5` para 30 min). `[]` = fechado.
```js
schedule: { 0:[[18,23]], 1:[], 2:[[18,23]], 3:[[18,23]], 4:[[18,23]], 5:[[18,24]], 6:[[18,24]] }
```
O site calcula sozinho o selo **Aberto agora / Fechado** e destaca o dia atual na tabela.

---

## 💬 Como funciona o pedido

O cliente toca em **Adicionar**, ajusta as quantidades no carrinho e clica em
**Finalizar no WhatsApp**. O site monta uma mensagem assim e abre a conversa já preenchida:

```
Olá! Quero fazer um pedido pela *Bella Massa* 🍕

• 2x Margherita — R$ 99,80
• 1x Calabresa — R$ 52,90

*Total: R$ 152,70*

Para concluir, me passe:
📍 Endereço:
👤 Nome:
💳 Pagamento:
```

O carrinho fica salvo no aparelho (não some se recarregar a página).

---

## 🌐 Publicar (hospedagem)

É um site **estático** — sobe em qualquer lugar:
- **Netlify / Vercel / Cloudflare Pages:** arraste a pasta (deploy em segundos) — grátis
- **GitHub Pages:** ative nas configurações do repositório
- **Hospedagem tradicional (Hostinger, etc.):** suba os arquivos por FTP
- Depois é só apontar o **domínio próprio** do cliente.

> Dica: troque o `favicon` (em `index.html`), preencha o `<title>`/`description` e
> cadastre o cliente no **Google Meu Negócio** para aparecer no mapa.

---

## ♻️ Usar para vários clientes

1. Duplique a pasta `mini-site-pizzaria/` → `mini-site-pizzaria-CLIENTE/`
2. Edite `js/config.js` (dados, cores, cardápio)
3. Troque `logo` e fotos em `assets/img/`
4. Publique. Pronto. 🎉

O arquivo `js/config-verde.js` é um exemplo real disso — o mesmo código rodando como
outra pizzaria só mudando a configuração.

---

## 🔧 Scripts opcionais (pasta `build/`)

Só se quiser regenerar as artes ou os previews (precisa de Node.js):
```bash
cd build
npm install                 # puppeteer + sharp (para os previews)
node generate-art.js        # regenera as ilustrações em assets/img/
node screenshot.js          # regenera os previews em ../previews/
```

## Créditos / licenças
- Fontes **Fraunces** e **Plus Jakarta Sans** — Google Fonts (Open Font License).
- Ilustrações de produtos geradas para o template (substitua por fotos reais no site final).
- Integração de pedidos via link `wa.me` oficial do WhatsApp.
