/* =====================================================================
   ⚙️  CONFIGURAÇÃO DO SITE  —  EDITE APENAS ESTE ARQUIVO POR CLIENTE
   Troque: nome, logo, cores, contatos, horários e o cardápio.
   (As fotos ficam em assets/img/ — substitua pelos arquivos do cliente.)
   ===================================================================== */
window.SITE = {

  business: {
    name: "Bella Massa",
    tagline: "Pizza artesanal de fermentação natural, assada no forno a lenha.",
    eyebrow: "Pizzaria artesanal • desde 2012",
    logo: "assets/img/logo.svg",

    // WhatsApp: somente números, com DDI (55) + DDD. Ex.: 5511988887777
    whatsapp: "5511988887777",
    phone: "(11) 98888-7777",
    instagram: "bellamassa",

    address: "Rua das Oliveiras, 123 — Vila Madalena, São Paulo/SP",
    mapsQuery: "Rua das Oliveiras 123 Vila Madalena São Paulo",

    // Selos de confiança (ícone + texto)
    trust: [
      { icon: "moto",  title: "Entrega rápida", text: "30–45 min" },
      { icon: "card",  title: "Pague na entrega", text: "Pix, cartão ou dinheiro" },
      { icon: "fire",  title: "Forno a lenha", text: "Massa artesanal" },
      { icon: "star",  title: "Nota 4,9", text: "+2.000 pedidos" },
    ],

    // Selos do hero
    heroBadges: [
      { icon: "star", text: "4,9 ★ no delivery" },
      { icon: "moto", text: "Entrega em 30–45 min" },
      { icon: "tag",  text: "Frete grátis acima de R$ 60" },
    ],

    about: {
      title: "Massa artesanal, do nosso forno pra sua casa",
      text: "Na Bella Massa cada pizza começa com uma massa de fermentação natural de 48 horas, "
          + "molho de tomate italiano e ingredientes selecionados. Assamos no forno a lenha para "
          + "aquele sabor de verdade — crocante por fora, leve por dentro.",
      features: ["Fermentação natural de 48h","Forno a lenha","Ingredientes selecionados",
                 "Receitas da casa","Embalagem que mantém quente","Feito na hora"],
    },

    payments: ["Pix","Cartão de crédito","Cartão de débito","Dinheiro","Vale-refeição"],

    // Horários: 0=Dom, 1=Seg ... 6=Sáb. [] = fechado. Faixas em horas (24h, use .5 p/ 30min)
    schedule: {
      0: [[18, 23]],
      1: [],
      2: [[18, 23]],
      3: [[18, 23]],
      4: [[18, 23]],
      5: [[18, 24]],
      6: [[18, 24]],
    },
  },

  // 🎨 CORES — mude aqui para reskin completo
  theme: {
    primary:  "#C8102E",   // cor principal (marca)
    primaryDark:"#9E0C24",
    accent:   "#F4B740",   // detalhes / selos
    ink:      "#241712",   // texto
    bg:       "#FFF8F0",   // fundo
    surface:  "#FFFFFF",
    line:     "#EFE2D0",
    green:    "#1FA855",   // "aberto"
    heroBg:   "radial-gradient(120% 120% at 75% 10%, #3A1A12 0%, #25110C 45%, #1A0C08 100%)",
    heroInk:  "#FBEFE0",
  },

  ui: {
    currency: "R$",
    // Texto que inicia a mensagem do pedido no WhatsApp
    orderIntro: "Olá! Quero fazer um pedido pela *Bella Massa* 🍕",
    quickIntro: "Olá! Vim pelo site e quero fazer um pedido 🍕",
  },

  // 🍕 CARDÁPIO — categorias e itens
  menu: [
    { id:"tradicionais", name:"Tradicionais", icon:"🍕", items:[
      { name:"Margherita",        price:49.90, img:"assets/img/pizza-margherita.svg",   tag:"Mais pedida",
        desc:"Molho de tomate, mussarela, rodelas de tomate e manjericão fresco." },
      { name:"Calabresa",         price:52.90, img:"assets/img/pizza-calabresa.svg",
        desc:"Mussarela, calabresa fatiada, cebola e azeitonas pretas." },
      { name:"Mussarela",         price:47.90, img:"assets/img/pizza-mussarela.svg",
        desc:"Generosa camada de mussarela com molho da casa e orégano." },
      { name:"Portuguesa",        price:56.90, img:"assets/img/pizza-portuguesa.svg",
        desc:"Presunto, ovos, cebola, ervilha, azeitona e mussarela." },
      { name:"Frango c/ Catupiry", price:57.90, img:"assets/img/pizza-frango.svg",
        desc:"Frango desfiado temperado com o autêntico catupiry cremoso." },
      { name:"Quatro Queijos",    price:58.90, img:"assets/img/pizza-quatroqueijos.svg",
        desc:"Mussarela, provolone, parmesão e gorgonzola." },
    ]},
    { id:"especiais", name:"Especiais da Casa", icon:"⭐", items:[
      { name:"Pepperoni",         price:59.90, img:"assets/img/pizza-pepperoni.svg",      tag:"Chef",
        desc:"Muçarela e fatias de pepperoni levemente picante." },
      { name:"Vegetariana",       price:55.90, img:"assets/img/pizza-vegetariana.svg",
        desc:"Tomate, champignon, palmito, pimentão, cebola e manjericão." },
      { name:"Bacon & Cheddar",   price:60.90, img:"assets/img/pizza-baconcheddar.svg",
        desc:"Cheddar cremoso, bacon crocante e um toque de cebola caramelizada." },
      { name:"Toscana",           price:58.90, img:"assets/img/pizza-toscana.svg",
        desc:"Calabresa moída, mussarela, champignon e manjericão." },
    ]},
    { id:"doces", name:"Pizzas Doces", icon:"🍫", items:[
      { name:"Chocolate c/ Morango", price:54.90, img:"assets/img/pizza-chocomorango.svg", tag:"Queridinha",
        desc:"Chocolate ao leite, morangos frescos e raspas de chocolate." },
      { name:"Banana c/ Canela",  price:49.90, img:"assets/img/pizza-bananacanela.svg",
        desc:"Banana, açúcar, canela e fios de leite condensado." },
      { name:"Romeu & Julieta",   price:51.90, img:"assets/img/pizza-romeujulieta.svg",
        desc:"Mussarela com goiabada cremosa e morangos." },
    ]},
    { id:"bebidas", name:"Bebidas", icon:"🥤", items:[
      { name:"Refrigerante 2L",   price:12.90, img:"assets/img/drink-refri.svg",
        desc:"Coca-Cola, Guaraná ou Fanta (2 litros)." },
      { name:"Suco Natural 500ml", price:10.90, img:"assets/img/drink-suco.svg",
        desc:"Laranja, abacaxi ou maracujá, feito na hora." },
      { name:"Água Mineral 500ml", price:4.90,  img:"assets/img/drink-agua.svg",
        desc:"Com ou sem gás, bem gelada." },
      { name:"Cerveja Long Neck", price:9.90,   img:"assets/img/drink-cerveja.svg",
        desc:"Heineken, Budweiser ou Stella Artois." },
    ]},
  ],
};
