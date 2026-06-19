// Gera artes ilustrativas (SVG) de pizzas/bebidas para o template.
// 100% self-contained, sem dependência de fotos externas. O cliente troca
// estes arquivos por fotos reais (mesmo nome) quando quiser.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG = path.resolve(__dirname, '..', 'assets', 'img');
fs.mkdirSync(IMG, { recursive: true });

// ---- seeded RNG ----
function rng(seed){ let s=seed>>>0; return ()=>{ s=(s+0x6D2B79F5)>>>0; let t=Math.imul(s^s>>>15,1|s); t=(t+Math.imul(t^t>>>7,61|t))^t; return ((t^t>>>14)>>>0)/4294967296; }; }

// ---- topping renderers ----
function pepperoni(x,y,r,rnd){
  let spots=''; for(let i=0;i<5;i++){const a=rnd()*6.28,d=rnd()*r*0.5;spots+=`<circle cx="${x+Math.cos(a)*d}" cy="${y+Math.sin(a)*d}" r="${r*0.16}" fill="#8E2B22"/>`;}
  return `<g><ellipse cx="${x}" cy="${y+r*0.18}" rx="${r}" ry="${r*0.92}" fill="#7E241C" opacity=".25"/><circle cx="${x}" cy="${y}" r="${r}" fill="#C0392B"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#pepShine)" opacity=".5"/>${spots}</g>`;
}
function basil(x,y,s,rot){
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 ${-s} C ${s*0.8} ${-s*0.6}, ${s*0.8} ${s*0.6}, 0 ${s} C ${-s*0.8} ${s*0.6}, ${-s*0.8} ${-s*0.6}, 0 ${-s} Z" fill="#3C7A2E"/><path d="M0 ${-s} L0 ${s}" stroke="#2C5E22" stroke-width="${s*0.12}"/></g>`;
}
function olive(x,y,r){ return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#3A2E1F"/><circle cx="${x}" cy="${y}" r="${r*0.45}" fill="#6B4F2A"/></g>`; }
function mush(x,y,r){ return `<g><path d="M${x-r} ${y} a${r} ${r} 0 0 1 ${2*r} 0 Z" fill="#E7D4B0"/><rect x="${x-r*0.28}" y="${y}" width="${r*0.56}" height="${r*0.7}" rx="${r*0.2}" fill="#D9C39A"/></g>`; }
function cheeseBlob(x,y,r){ return `<circle cx="${x}" cy="${y}" r="${r}" fill="#FBE9A8" opacity=".9"/>`; }
function tomato(x,y,r){ return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#E2503B"/><circle cx="${x}" cy="${y}" r="${r*0.7}" fill="#EB6B57"/><g fill="#F7C9A0">${[0,1,2,3,4].map(i=>{const a=i/5*6.28;return `<ellipse cx="${x+Math.cos(a)*r*0.4}" cy="${y+Math.sin(a)*r*0.4}" rx="${r*0.12}" ry="${r*0.06}" transform="rotate(${a*57} ${x+Math.cos(a)*r*0.4} ${y+Math.sin(a)*r*0.4})"/>`;}).join('')}</g></g>`; }
function chicken(x,y,r){ return `<rect x="${x-r}" y="${y-r*0.6}" width="${2*r}" height="${1.2*r}" rx="${r*0.4}" fill="#E8C089" transform="rotate(${(x+y)%40-20} ${x} ${y})"/>`; }
function bacon(x,y,r){ return `<path d="M${x-r} ${y} q ${r*0.5} ${-r*0.7} ${r} 0 q ${r*0.5} ${r*0.7} ${r} 0" stroke="#B65A4B" stroke-width="${r*0.5}" fill="none" stroke-linecap="round"/><path d="M${x-r} ${y} q ${r*0.5} ${-r*0.7} ${r} 0 q ${r*0.5} ${r*0.7} ${r} 0" stroke="#E8A48F" stroke-width="${r*0.18}" fill="none" stroke-linecap="round"/>`; }
function strawberry(x,y,r){ return `<g transform="translate(${x} ${y})"><path d="M0 ${-r*0.7} C ${r} ${-r}, ${r} ${r*0.4}, 0 ${r} C ${-r} ${r*0.4}, ${-r} ${-r}, 0 ${-r*0.7} Z" fill="#E1382F"/><path d="M${-r*0.5} ${-r*0.7} L0 ${-r*0.4} L${r*0.5} ${-r*0.7}" fill="#3C7A2E"/></g>`; }
function banana(x,y,r){ return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#F3DE8A"/><circle cx="${x}" cy="${y}" r="${r*0.5}" fill="#E7CD6B"/></g>`; }
function choco(x,y,r,rnd){ let p=`M${x-r} ${y}`; for(let i=0;i<4;i++){p+=` q ${r*0.4} ${(rnd()-0.5)*r} ${r*0.5} 0`;} return `<path d="${p}" stroke="#5A3A22" stroke-width="${r*0.22}" fill="none" stroke-linecap="round"/>`; }

const TOPPING_FN = { pepperoni, basil:(x,y,r,rnd)=>basil(x,y,r,rnd()*360), olive, mush, cheese:cheeseBlob, tomato, chicken, bacon, strawberry, banana, choco };

// ---- base (sauce/cheese) palettes ----
const BASES = {
  red:    {sauce:'#C23A26', cheese:'#F4CF6E'},
  white:  {sauce:'#F1E2BE', cheese:'#F7E4A6'},   // quatro queijos / branca
  green:  {sauce:'#9CB36A', cheese:'#F4CF6E'},
  sweet:  {sauce:'#7A4A2B', cheese:'#F6E6C2'},    // doce (base chocolate/leite)
};

function pizza({toppings=[], base='red', seed=7, size=820, plate=true}){
  const cx=size/2, cy=size*0.46, R=size*0.36, cheeseR=R*0.86;
  const b = BASES[base] || BASES.red;
  const rnd = rng(seed);
  // rim bubbles
  let rim=''; for(let i=0;i<46;i++){const a=i/46*6.28; const rr=R*0.97; rim+=`<circle cx="${cx+Math.cos(a)*rr}" cy="${cy+Math.sin(a)*rr}" r="${size*0.012*(0.6+rnd())}" fill="${rnd()>0.5?'#E8B774':'#D49A4E'}" opacity=".7"/>`;}
  // cheese mottले
  let mottle=''; for(let i=0;i<26;i++){const a=rnd()*6.28,d=rnd()*cheeseR*0.92;mottle+=`<circle cx="${cx+Math.cos(a)*d}" cy="${cy+Math.sin(a)*d}" r="${size*0.018*(0.5+rnd())}" fill="#F7DE8E" opacity=".5"/>`;}
  // toppings placement (poisson-ish via seeded jitter on rings)
  let tp='';
  const items=[]; toppings.forEach(t=>{ for(let i=0;i<t.count;i++) items.push(t.type); });
  items.forEach((type,i)=>{
    const ring = 0.32 + (i % 3) * 0.22 + rnd()*0.08;
    const a = (i*2.399) + rnd()*0.5;     // golden-angle spread
    const d = cheeseR*ring;
    const x=cx+Math.cos(a)*d, y=cy+Math.sin(a)*d;
    const r=size*0.045*(0.85+rnd()*0.4);
    tp += (TOPPING_FN[type]||pepperoni)(x,y,r,rnd);
  });
  const plateEl = plate
    ? `<rect x="0" y="0" width="${size}" height="${size*0.92}" rx="40" fill="url(#plateBg)"/><ellipse cx="${cx}" cy="${cy+R*0.1}" rx="${R*1.12}" ry="${R*1.08}" fill="#000" opacity=".10"/>`
    : `<ellipse cx="${cx}" cy="${cy+R*0.12}" rx="${R*1.06}" ry="${R*1.02}" fill="#000" opacity=".14"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size*0.92}" width="${size}" height="${size*0.92}">
  <defs>
    <radialGradient id="plateBg" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#FBF1DF"/><stop offset="70%" stop-color="#F3E2C4"/><stop offset="100%" stop-color="#E7Cfa1"/></radialGradient>
    <radialGradient id="crust" cx="50%" cy="46%" r="55%"><stop offset="60%" stop-color="#F0C079"/><stop offset="88%" stop-color="#D89B4C"/><stop offset="100%" stop-color="#B97C34"/></radialGradient>
    <radialGradient id="cheese" cx="50%" cy="46%" r="55%"><stop offset="0%" stop-color="#F8DC83"/><stop offset="100%" stop-color="${b.cheese}"/></radialGradient>
    <radialGradient id="pepShine" cx="38%" cy="34%" r="60%"><stop offset="0%" stop-color="#E76B5A"/><stop offset="100%" stop-color="#C0392B" stop-opacity="0"/></radialGradient>
  </defs>
  ${plateEl}
  <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#crust)"/>
  ${rim}
  <circle cx="${cx}" cy="${cy}" r="${cheeseR}" fill="${b.sauce}"/>
  <circle cx="${cx}" cy="${cy}" r="${cheeseR*0.96}" fill="url(#cheese)"/>
  ${mottle}
  ${tp}
  </svg>`;
}

// ---- drink icon ----
function drink(seed=1, color='#E4572E'){
  const rnd=rng(seed);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 754" width="820" height="754">
  <defs><radialGradient id="bg" cx="50%" cy="40%" r="75%"><stop offset="0%" stop-color="#FBF1DF"/><stop offset="100%" stop-color="#EAD7B4"/></radialGradient>
  <linearGradient id="soda" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${color}"/><stop offset="100%" stop-color="#7a1f12"/></linearGradient></defs>
  <rect width="820" height="754" rx="40" fill="url(#bg)"/>
  <ellipse cx="410" cy="650" rx="150" ry="26" fill="#000" opacity=".10"/>
  <path d="M300 250 h220 l-20 360 a40 40 0 0 1 -40 36 h-100 a40 40 0 0 1 -40 -36 Z" fill="url(#soda)"/>
  <rect x="296" y="232" width="228" height="34" rx="16" fill="#C9CDD2"/>
  <path d="M312 300 h196 l-6 110 h-184 Z" fill="#fff" opacity=".18"/>
  <rect x="392" y="120" width="20" height="150" rx="10" fill="#9aa0a6"/>
  <circle cx="402" cy="120" r="26" fill="#c0c5cb"/>
  </svg>`;
}

// ---- logo emblem ----
function logo(){
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <circle cx="60" cy="60" r="56" fill="#C8102E"/>
  <circle cx="60" cy="60" r="56" fill="none" stroke="#F4B740" stroke-width="4" stroke-dasharray="2 7"/>
  <path d="M60 26 L92 86 a72 40 0 0 1 -64 0 Z" fill="#F4B740"/>
  <path d="M60 26 L92 86 a72 40 0 0 1 -64 0 Z" fill="none" stroke="#8a5a12" stroke-width="2" opacity=".4"/>
  <circle cx="58" cy="62" r="6" fill="#C0392B"/><circle cx="72" cy="74" r="5" fill="#C0392B"/><circle cx="46" cy="74" r="5" fill="#C0392B"/>
  <path d="M62 50 q5 4 0 9" stroke="#3C7A2E" stroke-width="4" fill="none" stroke-linecap="round"/>
  </svg>`;
}

// ---- menu art map ----
const PIZZAS = {
  margherita:   {base:'red',   seed:11, t:[{type:'tomato',count:4},{type:'cheese',count:5},{type:'basil',count:6}]},
  calabresa:    {base:'red',   seed:22, t:[{type:'pepperoni',count:10},{type:'olive',count:4}]},
  mussarela:    {base:'red',   seed:33, t:[{type:'cheese',count:9},{type:'tomato',count:3}]},
  portuguesa:   {base:'red',   seed:44, t:[{type:'chicken',count:4},{type:'olive',count:5},{type:'tomato',count:3},{type:'cheese',count:3}]},
  frango:       {base:'red',   seed:55, t:[{type:'chicken',count:8},{type:'cheese',count:4}]},
  quatroqueijos:{base:'white', seed:66, t:[{type:'cheese',count:12}]},
  pepperoni:    {base:'red',   seed:77, t:[{type:'pepperoni',count:12}]},
  vegetariana:  {base:'red',   seed:88, t:[{type:'basil',count:5},{type:'mush',count:5},{type:'tomato',count:4},{type:'olive',count:4}]},
  baconcheddar: {base:'red',   seed:99, t:[{type:'bacon',count:7},{type:'cheese',count:5}]},
  toscana:      {base:'red',   seed:111,t:[{type:'pepperoni',count:6},{type:'mush',count:4},{type:'basil',count:3}]},
  chocomorango: {base:'sweet', seed:121,t:[{type:'choco',count:5},{type:'strawberry',count:7}]},
  bananacanela: {base:'sweet', seed:131,t:[{type:'banana',count:9},{type:'choco',count:3}]},
  romeujulieta: {base:'sweet', seed:141,t:[{type:'cheese',count:6},{type:'strawberry',count:5}]},
};
const DRINKS = { refri:'#3A2A22', suco:'#E59A1C', agua:'#7FB5D6', cerveja:'#E0A52E' };

let count=0;
for(const [k,v] of Object.entries(PIZZAS)){ fs.writeFileSync(path.join(IMG,`pizza-${k}.svg`), pizza({toppings:v.t, base:v.base, seed:v.seed})); count++; }
for(const [k,c] of Object.entries(DRINKS)){ fs.writeFileSync(path.join(IMG,`drink-${k}.svg`), drink(k.length*7+3, c)); count++; }
fs.writeFileSync(path.join(IMG,'hero-pizza.svg'), pizza({toppings:[{type:'pepperoni',count:9},{type:'basil',count:6},{type:'olive',count:5},{type:'tomato',count:3}], base:'red', seed:2025, size:1000, plate:false}));
fs.writeFileSync(path.join(IMG,'logo.svg'), logo());
count+=2;
console.log('Geradas', count, 'artes em', IMG);
