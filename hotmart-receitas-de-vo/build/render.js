// ============================================================
//  Gerador de criativos — Receitas de Vó com Toque Funcional
//  Renderiza 27 slides (4 carrosséis) em PNG 1080x1350 (Instagram 4:5)
// ============================================================
import puppeteer from 'puppeteer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'criativos');
const HANDLE = '@receitasdevo'; // troque pelo seu @ do Instagram

// ---------- SVG doodles ----------
const heart = (c='currentColor') => `<svg viewBox="0 0 32 30" fill="${c}"><path d="M16 28.5C16 28.5 2.2 20.3 2.2 10.9 2.2 6.1 5.9 2.8 10 2.8c2.6 0 4.8 1.3 6 3.4 1.2-2.1 3.4-3.4 6-3.4 4.1 0 7.8 3.3 7.8 8.1 0 9.4-13.8 17.6-13.8 17.6Z"/></svg>`;
const heartO = (c='currentColor') => `<svg viewBox="0 0 32 30" fill="none" stroke="${c}" stroke-width="2.6"><path d="M16 27.4C16 27.4 3.4 19.9 3.4 11.1 3.4 6.7 6.7 3.9 10.3 3.9c2.4 0 4.4 1.2 5.7 3.2 1.3-2 3.3-3.2 5.7-3.2 3.6 0 6.9 2.8 6.9 7.2 0 8.8-12.3 16.3-12.3 16.3Z"/></svg>`;
const sprig = (c='currentColor') => `<svg viewBox="0 0 66 40" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"><path d="M5 35C22 31 44 19 62 6"/><path d="M24 28c-3-7 0-12 8-14 1 8-3 13-8 14Z" fill="${c}" stroke="none"/><path d="M40 19c-3-7 0-12 8-14 1 8-3 13-8 14Z" fill="${c}" stroke="none"/></svg>`;
const swipeArrow = (c='currentColor') => `<svg viewBox="0 0 60 30" fill="none" stroke="${c}" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15h45"/><path d="M37 4l15 11-15 11"/></svg>`;
const curlArrow = (c='currentColor') => `<svg viewBox="0 0 90 90" fill="none" stroke="${c}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 12C8 42 26 66 64 62"/><path d="M50 52l16 11 3-19"/></svg>`;
const hand = (c='#fff') => `<svg viewBox="0 0 24 24" fill="${c}"><path d="M9 11.2V5.6a1.55 1.55 0 0 1 3.1 0v5.1h1V7.4a1.55 1.55 0 0 1 3.1 0v3.6h1V9.1a1.55 1.55 0 0 1 3.1 0v6.4a5.2 5.2 0 0 1-5.2 5.2h-2.3c-1.4 0-2.7-.55-3.6-1.55l-4.2-4.3a1.55 1.55 0 0 1 2.2-2.2l2.0 2.0V11.2Z"/></svg>`;
const spoon = (c='currentColor') => `<svg viewBox="0 0 24 24" fill="${c}"><path d="M13.5 3c-2 0-3.6 1.9-3.6 4.2 0 1.7 1 3.1 2.4 3.7l-3.1 9.0a1.2 1.2 0 0 0 2.27.8l3.05-8.9c1.6-.5 2.6-2 2.6-3.6C17.1 4.9 15.5 3 13.5 3Z"/></svg>`;
const brushU = (c) => `<svg viewBox="0 0 200 16" preserveAspectRatio="none"><path d="M3 9C50 3 150 3 197 7.5 150 13 60 13 5 11Z" fill="${c}" opacity=".9"/></svg>`;

// ---------- component builders ----------
const tape = (cls, style) => `<div class="tape ${cls}" style="${style}"></div>`;
const note = (txt, style, size=38) => `<div class="note" style="${style}; font-size:${size}px">${txt}</div>`;
const tagk = (txt, style, size=34) => `<div class="tagk" style="${style}; font-size:${size}px">${txt}</div>`;
const heartDeco = (c, style, size=40) => `<div style="position:absolute; z-index:23; width:${size}px; height:${size}px; ${style}">${heart(c)}</div>`;
const sprigDeco = (c, style, size=70) => `<div style="position:absolute; z-index:23; width:${size}px; height:${size*0.6}px; ${style}">${sprig(c)}</div>`;

function photo(src, w, h, {style='', tilt=0, cap='', tapes=[], soft=false}={}){
  const t = tapes.map(tp=>tape(tp.cls, tp.style)).join('');
  return `<div class="photo ${soft?'soft':''}" style="width:${w+(soft?0:36)}px; ${style}; transform:rotate(${tilt}deg)">
      <div class="img" style="width:${w}px; height:${h}px"><img src="../assets/fotos/${src}.png"></div>
      ${cap?`<div class="cap">${cap}</div>`:''}${t}</div>`;
}
function photoCluster(items, cx, cy){
  // items: [{src, w,h, dx,dy, tilt, cap, tapes}]
  return items.map(it=>{
    const left = cx + it.dx, top = cy + it.dy;
    return photo(it.src, it.w, it.h, {style:`left:${left}px; top:${top}px; z-index:${20+(it.z||0)}`, tilt:it.tilt, cap:it.cap, tapes:it.tapes||[]});
  }).join('');
}

// ---------- chrome (brand / footer / swipe) ----------
function brand(){
  return `<div class="brand"><div class="bmark">${heart('var(--accent)')}</div>
    <div class="btxt"><span class="b1">Receitas de Vó</span><span class="b2">· com toque funcional</span></div></div>`;
}
function footer(total, idx, isCta){
  const dots = Array.from({length:total}, (_,i)=>`<i class="${i===idx?'on':''}"></i>`).join('');
  const right = isCta
    ? `<div class="fswipe">${heart('var(--accent)')}&nbsp;<span style="margin-left:6px">e-book na Hotmart</span></div>`
    : `<div class="fswipe"><span>arraste</span>${swipeArrow('var(--accent-dp)')}</div>`;
  return `<div class="footer"><div class="handle">${spoon('var(--accent)')}${HANDLE}</div>
    <div class="dots">${dots}</div>${right}</div>`;
}
function base(s, inner){
  return `<section class="slide accent-${s.accent} type-${s.type}">
    <div class="grain"></div><div class="speck"></div>
    <div class="corner ${s.cornerBR?'br':''}"></div>
    ${brand()}
    ${inner}
    ${footer(s.total, s.idx, s.type==='cta')}
  </section>`;
}

// ---------- layouts ----------
function L_cover(s){
  const ph = s.photo;
  const inner = `
    ${photo(ph.src, ph.w, ph.h, {style:`left:${(1080-(ph.w+36))/2}px; top:${ph.top||196}px; z-index:20`, tilt:ph.tilt??-3,
        tapes:[{cls:'stripe',style:`left:${ph.w*0.06}px; top:-26px; width:170px; transform:rotate(-7deg)`},
               {cls:'dot',style:`right:${ph.w*0.04}px; top:-22px; width:150px; transform:rotate(6deg)`}]})}
    <div style="position:absolute; left:92px; right:80px; top:${s.hookTop||806}px; z-index:22">
      ${s.kicker?`<div class="kicker" style="margin-bottom:18px">${s.kicker}</div>`:''}
      <div class="hook" style="font-size:${s.hookSize||90}px">${s.hook}</div>
      ${s.scriptLine?`<div class="script" style="font-size:${s.scriptSize||74}px; margin-top:14px">${s.scriptLine}</div>`:''}
    </div>
    ${sprigDeco('var(--accent)', `right:64px; top:${(ph.top||196)+(ph.h)+30}px; transform:rotate(18deg)`, 96)}
    ${heartDeco('var(--coral)', `left:70px; top:${(ph.top||196)+40}px; transform:rotate(-12deg)`, 44)}
    ${s.deco||''}`;
  return base(s, inner);
}
function L_text(s){
  const inner = `
    <div class="center" style="padding:150px 96px 150px">
      <div style="position:relative">
        ${s.top?`<div style="margin-bottom:26px">${s.top}</div>`:''}
        <div class="statement" style="font-size:${s.size||70}px">${s.body}</div>
        ${s.lede?`<div class="lede" style="font-size:${s.ledeSize||42}px; margin-top:34px">${s.lede}</div>`:''}
      </div>
    </div>
    ${s.deco||''}`;
  return base(s, inner);
}
function L_quote(s){
  const inner = `
    <div class="center" style="padding:150px 96px">
      <div style="font-family:'Pacifico'; font-size:150px; color:var(--accent); opacity:.35; line-height:.6; margin-bottom:10px">,,</div>
      <div class="quote" style="font-size:${s.size||72}px">${s.body}</div>
      ${s.lede?`<div class="lede" style="font-size:${s.ledeSize||44}px; margin-top:34px">${s.lede}</div>`:''}
    </div>
    ${sprigDeco('var(--accent)', 'right:96px; bottom:300px; transform:rotate(150deg)', 90)}
    ${s.deco||''}`;
  return base(s, inner);
}
function L_montage(s){
  const inner = `
    <div style="position:absolute; left:92px; right:92px; top:150px; z-index:22">
      <div class="mtitle" style="font-size:${s.titleSize||56}px">${s.title}</div>
    </div>
    ${photoCluster(s.cluster, s.cx??152, s.cy??360)}
    ${s.tags?`<div style="position:absolute; left:0; right:0; bottom:170px; z-index:24; display:flex; justify-content:center"><div class="chips" style="justify-content:center; max-width:880px">${s.tags}</div></div>`:''}
    ${s.deco||''}`;
  return base(s, inner);
}
function L_phototext(s){
  const ph=s.photo;
  const inner = `
    ${photo(ph.src, ph.w, ph.h, {style:`right:74px; top:${ph.top||250}px; z-index:20`, tilt:ph.tilt??2.5,
       tapes:[{cls:s.tape||'honey',style:`left:30px; top:-24px; width:150px; transform:rotate(-8deg)`}]})}
    <div style="position:absolute; left:92px; top:${s.txtTop||300}px; width:${s.txtW||470}px; z-index:22">
      <div class="statement" style="font-size:${s.size||58}px">${s.body}</div>
      ${s.lede?`<div class="lede" style="font-size:${s.ledeSize||40}px; margin-top:28px">${s.lede}</div>`:''}
      ${s.chip?`<div style="margin-top:34px"><span class="chip solid">${s.chip}</span></div>`:''}
    </div>
    ${heartDeco('var(--coral)', `left:96px; top:${(s.txtTop||300)-70}px`, 46)}
    ${s.deco||''}`;
  return base(s, inner);
}
function L_steps(s){
  const labels = s.labels.map((l,i)=>`<div class="step"><div class="ring"><b>${i+1}</b>${i<s.labels.length-1?`<div class="arrow" style="width:34px">${swipeArrow('var(--accent)')}</div>`:''}</div><div class="lab">${l}</div></div>`).join('');
  const ph=s.photo;
  const inner = `
    <div style="position:absolute; left:92px; right:92px; top:150px; z-index:22">
      <div class="mtitle" style="font-size:${s.titleSize||56}px">${s.title}</div>
    </div>
    ${ph?photo(ph.src, ph.w, ph.h, {style:`left:${(1080-(ph.w+36))/2}px; top:${ph.top||330}px; z-index:20`, tilt:ph.tilt??-2,
       tapes:[{cls:'gingham',style:'left:40px; top:-22px; width:150px; transform:rotate(-7deg)'}]}):''}
    <div style="position:absolute; left:70px; right:70px; top:${s.stepsTop||808}px; z-index:22"><div class="steps">${labels}</div></div>
    ${s.caption?note(s.caption, `left:120px; bottom:175px; max-width:420px; transform:rotate(-2deg)`, 40):''}
    ${s.deco||''}`;
  return base(s, inner);
}
function L_cta(s){
  const ph=s.photo;
  const inner = `
    ${ph?photo(ph.src, ph.w, ph.h, {style:`left:${(1080-(ph.w+36))/2}px; top:${ph.top||150}px; z-index:20`, tilt:ph.tilt??-3,
       tapes:[{cls:'stripe',style:`left:${ph.w*0.5-75}px; top:-26px; width:170px; transform:rotate(-4deg)`}]}):''}
    <div style="position:absolute; left:80px; right:80px; top:${s.headTop||600}px; z-index:22; text-align:center">
      <div class="statement" style="font-size:${s.size||64}px; text-align:center">${s.body}</div>
      ${s.price?`<div class="priceA" style="font-size:${s.priceSize||52}px; margin-top:20px">${s.price}</div>`:''}
    </div>
    <div style="position:absolute; left:0; right:0; top:${s.btnTop||968}px; z-index:23; display:flex; flex-direction:column; align-items:center; gap:26px">
      <div class="pill">${hand('#fff')}<span>${s.cta||'Toque em Saiba mais'}</span></div>
      <div class="lede" style="font-size:36px; text-align:center; color:var(--ink-sf)">${s.sub||''}</div>
    </div>
    ${heartDeco('var(--coral)', `right:150px; top:${(s.headTop||600)-30}px; transform:rotate(14deg)`, 50)}
    ${heartDeco('var(--accent)', `left:140px; top:${(s.btnTop||968)+6}px; transform:rotate(-16deg)`, 40)}
    ${s.deco||''}`;
  return base(s, inner);
}
const LAYOUT = {cover:L_cover, text:L_text, quote:L_quote, montage:L_montage, phototext:L_phototext, steps:L_steps, cta:L_cta};

// helpers for inline copy styling
const M  = (t,cls='')=>`<span class="mark ${cls}">${t}</span>`;
const SC = (t,cls='')=>`<span class="script ${cls}" style="font-family:'Pacifico'">${t}</span>`;

// ============================================================
//  CONTEÚDO DOS 27 SLIDES
// ============================================================
const CAROUSELS = [
{ key:'carrossel-1-fit', accent:'fit', slides:[
  {type:'cover', kicker:'Receita afetiva · versão funcional',
   hook:`Comi brigadeiro<br>hoje.`, hookSize:96,
   scriptLine:`E continuo ${M('na dieta','')}.`, scriptSize:78,
   photo:{src:'brigadeiro_hero', w:686, h:474, top:300, tilt:-3}, hookTop:840},
  {type:'text', size:74,
   body:`O problema nunca<br>foi o ${M('doce')}.`,
   lede:`Foi a versão cheia de açúcar<br>e leite condensado.`,
   top:`<div style="width:80px">${sprig('var(--accent)')}</div>`, cornerBR:true},
  {type:'text', size:72,
   body:`Existe um jeito de<br>matar a vontade<br>${M('sem sabotar')} a<br>sua semana.`,
   lede:`Sem culpa. Sem peso na consciência.`},
  {type:'montage', title:`Brigadeiro, pudim,<br>cocada, bolo de fubá...`, titleSize:54,
   cluster:[
     {src:'brigadeiro_plate', w:330, h:248, dx:0,   dy:0,   tilt:-4, cap:'brigadeiro', z:1, tapes:[{cls:'honey',style:'left:24px;top:-20px;width:120px;transform:rotate(-9deg)'}]},
     {src:'pudim_hero',       w:330, h:248, dx:372, dy:24,  tilt:3,  cap:'pudim', z:2},
     {src:'cocada_hero',      w:330, h:248, dx:18,  dy:300, tilt:2,  cap:'cocada', z:2},
     {src:'fuba_hero',        w:330, h:248, dx:368, dy:328, tilt:-3, cap:'bolo de fubá', z:1, tapes:[{cls:'dot',style:'right:20px;top:-18px;width:110px;transform:rotate(7deg)'}]},
   ], cx:150, cy:330,
   tags:`<span class="chip solid">Zero lactose</span><span class="chip">Com gordura de coco</span><span class="chip solid">Zero culpa</span>`},
  {type:'phototext', size:56,
   body:`Ingredientes simples que você <span class="t-sage">já tem em casa</span>.`,
   lede:`Nada de farinha esquisita<br>ou item caro de loja fit.`,
   photo:{src:'broinha_hero', w:430, h:510, top:268, tilt:2.5}, tape:'gingham',
   chip:`Banana · fubá · aveia · coco`, txtW:470, txtTop:330},
  {type:'steps', title:`24 receitas com passo<br>a passo ilustrado`, titleSize:54,
   photo:{src:'banana_hero', w:486, h:368, top:320, tilt:-2},
   labels:['Bater','Misturar','Unir','Assar'],
   caption:`Diagrama em cada<br>etapa. Sem erro!`},
  {type:'quote', size:74,
   body:`“Mas é ${M('difícil')}?”<br><span class="t-sage">Não.</span>`,
   lede:`Se você sabe mexer uma panela,<br>você faz qualquer uma das 24.`},
  {type:'cta', size:62,
   body:`Comece hoje por menos<br>que ${M('um lanche na rua')}.`,
   price:`24 receitas · R$ 20 a R$ 47`,
   photo:{src:'brigadeiro_hero', w:540, h:372, top:150, tilt:-3},
   cta:`Toque em Saiba mais`, sub:`Baixe agora na Hotmart — acesso imediato no celular.`, headTop:600, btnTop:980},
]},

{ key:'carrossel-2-sem-lactose', accent:'lac', slides:[
  {type:'cover', kicker:'100% sem lactose',
   hook:`Você parou de<br>comer sobremesa`, hookSize:80,
   scriptLine:`com ${M('medo de passar mal')}?`, scriptSize:62,
   photo:{src:'pudim_hero', w:686, h:452, top:300, tilt:-2.5}, hookTop:820, hookSizeNote:''},
  {type:'text', size:72,
   body:`A intolerância tirou<br>o doce da sua vida.`,
   lede:`<span style="font-family:'Pacifico'; font-size:64px; color:var(--teal-dp)">A gente devolve.</span>`,
   top:`<div style="width:80px">${sprig('var(--accent)')}</div>`, cornerBR:true},
  {type:'montage', title:`24 receitas<br>${M('100% sem lactose')}`, titleSize:56,
   cluster:[
     {src:'manjar_hero', w:330, h:248, dx:0,   dy:0,   tilt:-3, cap:'manjar de coco', z:2, tapes:[{cls:'dot',style:'left:22px;top:-18px;width:120px;transform:rotate(-8deg)'}]},
     {src:'pave_hero',   w:330, h:248, dx:372, dy:22,  tilt:3,  cap:'pavê', z:1},
     {src:'arroz_hero',  w:330, h:248, dx:18,  dy:300, tilt:2,  cap:'arroz doce', z:1},
     {src:'limao_hero',  w:330, h:248, dx:368, dy:326, tilt:-3, cap:'torta de limão', z:2, tapes:[{cls:'gingham',style:'right:18px;top:-18px;width:110px;transform:rotate(7deg)'}]},
   ], cx:150, cy:330,
   tags:`<span class="chip solid">pudim</span><span class="chip">manjar</span><span class="chip solid">pavê</span><span class="chip">arroz doce</span>`},
  {type:'phototext', size:54,
   body:`Tudo feito com <span class="t-teal">leite</span> e <span class="t-teal">gordura de coco</span>.`,
   lede:`Cremoso, gostoso —<br>e seguro pra você.`,
   photo:{src:'manjar_hero', w:430, h:510, top:268, tilt:2.5}, tape:'dot',
   chip:`Sem leite · sem lactose`, txtW:470, txtTop:330},
  {type:'text', size:70,
   body:`Sem ingrediente<br>${M('difícil de achar')}.`,
   lede:`Sem ter que ler rótulo com lupa<br>no mercado.`},
  {type:'phototext', size:54,
   body:`Receitas afetivas <span class="t-teal">brasileiras</span>, pra você comer ${M('em paz')}.`,
   lede:`Reinterpretadas, leves<br>e do jeitinho de casa.`,
   photo:{src:'arroz_hero', w:430, h:430, top:300, tilt:-2.5}, tape:'gingham',
   txtW:470, txtTop:330},
  {type:'cta', size:60,
   body:`Volte a comer<br>${M('sobremesa hoje')}.`,
   price:`24 receitas sem lactose`,
   photo:{src:'limao_hero', w:540, h:372, top:150, tilt:3},
   cta:`Garanta seu e-book`, sub:`Toque em Saiba mais e baixe na Hotmart agora.`, headTop:610, btnTop:984},
]},

{ key:'carrossel-3-mae-familia', accent:'mae', slides:[
  {type:'cover', kicker:'Lanche da tarde · feito em casa',
   hook:`O lanche mais<br>barato e gostoso`, hookSize:78,
   scriptLine:`da ${M('sua casa')}.`, scriptSize:76,
   photo:{src:'banana_hero', w:560, h:560, top:286, tilt:-3}, hookTop:880},
  {type:'text', size:64,
   body:`Aquela banana<br>madura que ia<br>pro lixo?`,
   lede:`<span style="font-family:'Pacifico'; font-size:78px; color:#CF9A1F">Vira bolo.</span>`,
   top:`<div style="width:80px">${sprig('var(--accent)')}</div>`, cornerBR:true},
  {type:'montage', title:`Da despensa<br>direto pro café`, titleSize:56,
   cluster:[
     {src:'banana_slice', w:330, h:248, dx:0,   dy:0,   tilt:-4, cap:'bolo de banana', z:1, tapes:[{cls:'honey',style:'left:22px;top:-18px;width:120px;transform:rotate(-9deg)'}]},
     {src:'broinha_hero', w:330, h:248, dx:372, dy:22,  tilt:3,  cap:'broinha', z:2},
     {src:'cookie_hero',  w:330, h:248, dx:18,  dy:300, tilt:2,  cap:'cookie de aveia', z:2},
     {src:'rosquinha_hero',w:330,h:248, dx:368, dy:326, tilt:-3, cap:'rosquinha', z:1, tapes:[{cls:'dot',style:'right:18px;top:-18px;width:110px;transform:rotate(7deg)'}]},
   ], cx:150, cy:330,
   tags:`<span class="chip solid">banana</span><span class="chip">fubá</span><span class="chip solid">aveia</span><span class="chip">coco</span>`},
  {type:'phototext', size:54,
   body:`As crianças amam<br>e você fica ${M('tranquila')}.`,
   lede:`Sem lactose, com açúcar opcional.<br>Lanche de verdade.`,
   photo:{src:'cookie_hero', w:430, h:474, top:280, tilt:2.5}, tape:'honey',
   chip:`Sem lactose`, txtW:470, txtTop:330},
  {type:'steps', title:`Passo a passo<br>ilustrado`, titleSize:58,
   photo:{src:'banana_hero', w:470, h:400, top:316, tilt:-2},
   labels:['Amassar','Misturar','Modelar','Assar'],
   caption:`Dá pra fazer com<br>os filhos no domingo.`},
  {type:'cta', size:60,
   body:`24 receitas por menos<br>de ${M('R$ 50')}.`,
   price:`Lanche caseiro pra semana toda`,
   photo:{src:'banana_hero', w:500, h:430, top:140, tilt:-3},
   cta:`Toque em Saiba mais`, sub:`Acesso imediato na Hotmart, direto no celular.`, headTop:640, btnTop:1000},
]},

{ key:'carrossel-4-afeto', accent:'afeto', slides:[
  {type:'cover', kicker:'Memória afetiva no prato',
   hook:`O cheiro de bolo<br>de fubá no forno`, hookSize:76,
   scriptLine:`tem nome: ${M('casa de vó')}.`, scriptSize:70,
   photo:{src:'fuba_hero', w:600, h:540, top:286, tilt:-2.5}, hookTop:880},
  {type:'text', size:66,
   body:`Receitas que a gente<br>comeu a vida toda.`,
   lede:`Agora numa versão<br><span style="font-family:'Pacifico'; font-size:66px; color:var(--brick)">${M('mais leve')}.</span>`,
   top:`<div style="width:80px">${sprig('var(--accent)')}</div>`, cornerBR:true},
  {type:'text', size:70,
   body:`Sem lactose, com<br>gordura de coco.`,
   lede:`Do jeitinho que <span class="t-terra">faz bem</span> —<br>e que traz lembrança boa.`},
  {type:'montage', title:`Memória afetiva<br>no prato`, titleSize:58,
   cluster:[
     {src:'fuba_hero',    w:330, h:248, dx:0,   dy:0,   tilt:-4, cap:'bolo de fubá', z:1, tapes:[{cls:'stripe',style:'left:22px;top:-18px;width:120px;transform:rotate(-9deg)'}]},
     {src:'arroz_hero',   w:330, h:248, dx:372, dy:22,  tilt:3,  cap:'arroz doce', z:2},
     {src:'cocada_hero',  w:330, h:248, dx:18,  dy:300, tilt:2,  cap:'cocada cremosa', z:2},
     {src:'bolinho_hero', w:330, h:248, dx:368, dy:326, tilt:-3, cap:'bolinho de chuva', z:1, tapes:[{cls:'dot',style:'right:18px;top:-18px;width:110px;transform:rotate(7deg)'}]},
   ], cx:150, cy:330,
   tags:`<span class="chip solid">café da tarde</span><span class="chip">festas</span><span class="chip solid">domingo em família</span>`},
  {type:'phototext', size:52,
   body:`Um caderno visual<br>pra ${M('sobremesa de família')}.`,
   lede:`Café da tarde, festas<br>e domingos de sempre.`,
   photo:{src:'pave_hero', w:430, h:474, top:280, tilt:2.5}, tape:'stripe',
   txtW:470, txtTop:330},
  {type:'cta', size:62,
   body:`Resgate esse<br>${M('gostinho hoje')}.`,
   price:`24 receitas afetivas · versão funcional`,
   photo:{src:'fuba_hero', w:500, h:450, top:140, tilt:-3},
   cta:`Saiba mais e baixe`, sub:`E-book na Hotmart — acesso imediato no celular.`, headTop:640, btnTop:1000},
]},
];

// ============================================================
//  RENDER
// ============================================================
function pageHTML(html){
  return `<!doctype html><html lang="pt-br"><head><meta charset="utf-8">
  <link rel="stylesheet" href="styles.css"></head>
  <body style="margin:0">${html}</body></html>`;
}

async function run(){
  const browser = await puppeteer.launch({headless:'new', args:['--no-sandbox','--font-render-hinting=none']});
  const page = await browser.newPage();
  await page.setViewport({width:1080, height:1350, deviceScaleFactor:2});
  let count=0;
  for(const car of CAROUSELS){
    const dir = path.join(OUT, car.key);
    fs.mkdirSync(dir, {recursive:true});
    const total = car.slides.length;
    for(let i=0;i<car.slides.length;i++){
      const s = {...car.slides[i], accent:car.accent, total, idx:i};
      const html = LAYOUT[s.type](s);
      const tmp = path.join(__dirname, '_render.html');
      fs.writeFileSync(tmp, pageHTML(html));
      await page.goto('file://'+tmp, {waitUntil:'networkidle0'});
      await page.evaluate(async()=>{ await document.fonts.ready; });
      await new Promise(r=>setTimeout(r,120));
      const el = await page.$('.slide');
      const buf = await el.screenshot({type:'png'});
      const outfile = path.join(dir, `slide-${String(i+1).padStart(2,'0')}.png`);
      await sharp(buf).resize(1080,1350,{fit:'fill',kernel:'lanczos3'}).png({quality:92,compressionLevel:9}).toFile(outfile);
      count++;
      console.log('  ✓', car.key, `slide-${String(i+1).padStart(2,'0')}.png`);
    }
  }
  await browser.close();
  console.log(`\nFeito! ${count} slides renderizados em ${OUT}`);
}
run().catch(e=>{console.error(e); process.exit(1);});
