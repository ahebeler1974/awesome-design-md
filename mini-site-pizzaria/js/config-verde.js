/* =====================================================================
   EXEMPLO DE REUTILIZAÇÃO — o MESMO template, outro cliente.
   Só mudaram nome, cores, contatos e alguns itens. (Demonstração.)
   ===================================================================== */
window.SITE = {
  business: {
    name: "Nonna Verde",
    tagline: "Pizza napoletana com manjericão fresco e ingredientes da horta.",
    eyebrow: "Cantina italiana • forno a lenha",
    logo: "assets/img/logo.svg",
    whatsapp: "5521977776666",
    phone: "(21) 97777-6666",
    instagram: "nonnaverde",
    address: "Av. Atlântica, 980 — Copacabana, Rio de Janeiro/RJ",
    mapsQuery: "Av Atlantica 980 Copacabana Rio de Janeiro",
    trust: [
      { icon: "fire",  title: "Forno a lenha", text: "Estilo napoletano" },
      { icon: "moto",  title: "Delivery", text: "Em 35–50 min" },
      { icon: "card",  title: "Pagamento fácil", text: "Pix e cartões" },
      { icon: "star",  title: "Nota 4,8", text: "+1.500 avaliações" },
    ],
    heroBadges: [
      { icon: "star", text: "4,8 ★ no delivery" },
      { icon: "fire", text: "Forno a lenha" },
      { icon: "tag",  text: "Combo família com desconto" },
    ],
    about: {
      title: "Tradição italiana, do jeitinho da Nonna",
      text: "Massa leve de longa fermentação, molho de tomate San Marzano e muito manjericão "
          + "colhido na hora. Cada pizza sai do forno a lenha com a borda aerada e o sabor "
          + "que só a cozinha da Nonna tem.",
      features: ["Massa napoletana","Tomate San Marzano","Manjericão da horta",
                 "Forno a lenha 450°C","Borda aerada","Receita de família"],
    },
    payments: ["Pix","Cartão de crédito","Cartão de débito","Dinheiro"],
    schedule: { 0:[[18,23.5]], 1:[], 2:[[18,23]], 3:[[18,23]], 4:[[18,23]], 5:[[18,24]], 6:[[12,24]] },
  },
  theme: {
    primary:  "#2E7D32",
    primaryDark:"#225C26",
    accent:   "#E7B53A",
    ink:      "#1E2A1B",
    bg:       "#F6F8EF",
    surface:  "#FFFFFF",
    line:     "#E2E9D6",
    green:    "#1FA855",
    heroBg:   "radial-gradient(120% 120% at 75% 10%, #234A28 0%, #173318 48%, #0F230F 100%)",
    heroInk:  "#EEF6E4",
  },
  ui: {
    currency: "R$",
    orderIntro: "Ciao! Quero fazer um pedido pela *Nonna Verde* 🌿🍕",
    quickIntro: "Olá! Vim pelo site da Nonna Verde e quero pedir 🍕",
  },
  menu: [
    { id:"napoletanas", name:"Napoletanas", icon:"🍕", items:[
      { name:"Margherita D.O.P.", price:54.90, img:"assets/img/pizza-margherita.svg", tag:"Clássica",
        desc:"San Marzano, fior di latte, manjericão e azeite extravirgem." },
      { name:"Diavola",          price:58.90, img:"assets/img/pizza-pepperoni.svg",
        desc:"Mussarela, salame picante e um toque de pimenta calabresa." },
      { name:"Ortolana",         price:56.90, img:"assets/img/pizza-vegetariana.svg", tag:"Da horta",
        desc:"Abobrinha, berinjela, pimentão, champignon e manjericão." },
      { name:"Quattro Formaggi", price:60.90, img:"assets/img/pizza-quatroqueijos.svg",
        desc:"Fior di latte, gorgonzola, provolone e parmesão." },
      { name:"Calabresa da Nonna",price:53.90, img:"assets/img/pizza-calabresa.svg",
        desc:"Calabresa artesanal, cebola roxa e azeitonas." },
      { name:"Frango & Catupiry", price:57.90, img:"assets/img/pizza-frango.svg",
        desc:"Frango desfiado da casa com catupiry cremoso." },
    ]},
    { id:"especiais", name:"Especiais", icon:"⭐", items:[
      { name:"Toscana",          price:59.90, img:"assets/img/pizza-toscana.svg",
        desc:"Calabresa moída, champignon e manjericão fresco." },
      { name:"Bacon & Cheddar",  price:61.90, img:"assets/img/pizza-baconcheddar.svg", tag:"Chef",
        desc:"Cheddar cremoso, bacon crocante e cebola caramelizada." },
      { name:"Portuguesa",       price:57.90, img:"assets/img/pizza-portuguesa.svg",
        desc:"Presunto, ovos, cebola, ervilha e azeitona." },
    ]},
    { id:"dolce", name:"Dolce", icon:"🍫", items:[
      { name:"Nutella & Morango", price:56.90, img:"assets/img/pizza-chocomorango.svg", tag:"Queridinha",
        desc:"Creme de avelã, morangos frescos e raspas de chocolate." },
      { name:"Banana Caramellata",price:51.90, img:"assets/img/pizza-bananacanela.svg",
        desc:"Banana caramelizada, canela e doce de leite." },
      { name:"Romeu & Giulietta", price:52.90, img:"assets/img/pizza-romeujulieta.svg",
        desc:"Fior di latte com goiabada cremosa." },
    ]},
    { id:"bevande", name:"Bebidas", icon:"🥤", items:[
      { name:"Refrigerante 2L",   price:13.90, img:"assets/img/drink-refri.svg",  desc:"Coca-Cola, Guaraná ou Fanta." },
      { name:"Suco Natural 500ml", price:11.90, img:"assets/img/drink-suco.svg",   desc:"Laranja, limão siciliano ou maracujá." },
      { name:"Água com Gás 500ml", price:5.90,  img:"assets/img/drink-agua.svg",   desc:"Bem gelada." },
      { name:"Cerveja Artesanal", price:14.90,  img:"assets/img/drink-cerveja.svg",desc:"IPA, Pilsen ou Weiss." },
    ]},
  ],
};
