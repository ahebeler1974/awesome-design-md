/* =====================================================================
   APP — renderiza o site a partir de window.SITE (config.js).
   Não precisa editar para trocar de cliente: mexa só no config.js.
   ===================================================================== */
(function(){
  const S = window.SITE;
  const $ = (s, r=document) => r.querySelector(s);
  const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  const money = n => S.ui.currency + ' ' + n.toFixed(2).replace('.', ',');
  const waLink = msg => `https://wa.me/${S.business.whatsapp}?text=${encodeURIComponent(msg)}`;
  const DAYS = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
  const fmtH = h => { const hh=Math.floor(h)%24, mm=Math.round((h-Math.floor(h))*60); return mm? `${hh}h${String(mm).padStart(2,'0')}` : `${hh}h`; };

  const IC = {
    moto:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 17.5h-6m9.5 0L14 6h-2m2.5 5H18l2 3"/></svg>',
    card:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/></svg>',
    fire:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 3-1 4-1 6 0 1 1 2 2 2 0-1 .5-2 .5-2 2 2 3 4 3 6a6.5 6.5 0 1 1-13 0c0-3 2.5-5 3.5-7 .8-1.6 1.5-3 1.5-3 .5 1 1 2 2 3 .8-1 .8-2 0-5z"/></svg>',
    star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 21.4l1.4-6.8L2.2 9.9l6.9-.8z"/></svg>',
    tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l8-8 9 9-8 8z"/><circle cx="8" cy="8" r="1.4" fill="currentColor"/></svg>',
  };

  /* ---------- theme ---------- */
  (function theme(){
    const t = S.theme, root = document.documentElement.style;
    const map = {primary:'--primary',primaryDark:'--primary-d',accent:'--accent',ink:'--ink',bg:'--bg',
      surface:'--surface',line:'--line',green:'--green',heroBg:'--hero-bg',heroInk:'--hero-ink'};
    for(const k in map) if(t[k]) root.setProperty(map[k], t[k]);
    document.title = `${S.business.name} — Cardápio & Pedidos no WhatsApp`;
  })();

  /* ---------- schedule ---------- */
  function todayIdx(){ return new Date().getDay(); }
  function isOpenNow(){
    const now = new Date(), d = now.getDay(), h = now.getHours()+now.getMinutes()/60;
    return (S.business.schedule[d]||[]).some(([a,b]) => h>=a && h<b);
  }
  function rangesText(r){ return (!r||!r.length) ? 'Fechado' : r.map(([a,b])=>`${fmtH(a)} – ${fmtH(b)}`).join(' / '); }

  /* ---------- static binds ---------- */
  const B = S.business;
  $('#brandName').textContent = B.name;
  $('#footName').textContent = B.name;
  $('#brandLogo').src = $('#footLogo').src = B.logo;
  $('#heroName').textContent = B.name;
  $('#heroEyebrow').textContent = B.eyebrow || 'Pizzaria artesanal';
  $('#heroTag').textContent = B.tagline;
  $('#footCopy').textContent = `© ${new Date().getFullYear()} ${B.name} · Todos os direitos reservados`;
  $('#addr').textContent = B.address;
  $('#phone').textContent = B.phone;
  if (S.menu[0] && S.menu[0].items[0]) $('#aboutPizza').src = S.menu[0].items[0].img;

  // about
  $('#aboutTitle').textContent = B.about.title;
  $('#aboutText').textContent = B.about.text;
  $('#aboutFeats').innerHTML = B.about.features.map(f=>`<li>${f}</li>`).join('');

  // hero badges + trust
  $('#heroBadges').innerHTML = (B.heroBadges||[]).map(b=>`<span class="b">${IC[b.icon]||''}${b.text}</span>`).join('');
  $('#trustIn').innerHTML = (B.trust||[]).map(t=>`<div class="t">${IC[t.icon]||''}<span><b>${t.title}</b><br>${t.text}</span></div>`).join('');

  // status
  (function status(){
    const open = isOpenNow(), e = $('#heroStatus');
    e.textContent = open ? 'Aberto agora' : 'Fechado no momento';
    e.classList.toggle('closed', !open);
  })();

  // hours table
  $('#hoursTable').innerHTML = [1,2,3,4,5,6,0].map(d=>{
    const isToday = d===todayIdx();
    return `<tr class="${isToday?'today':''}"><td>${DAYS[d]}</td><td>${rangesText(B.schedule[d])}</td></tr>`;
  }).join('');

  // payments
  $('#pays').innerHTML = (B.payments||[]).map(p=>`<span>${p}</span>`).join('');

  // maps
  $('#mapsLink').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(B.mapsQuery||B.address)}`;

  // whatsapp generic links
  const quick = waLink(S.ui.quickIntro || S.ui.orderIntro);
  ['#hdrCta','#heroWa','#contactWa','#waFab'].forEach(id => { const a=$(id); if(a) a.href = quick; });

  /* ---------- menu ---------- */
  const cats = $('#cats'), sections = $('#menuSections');
  const addBtns = {}; // name -> button el
  S.menu.forEach((cat, i) => {
    const c = document.createElement('button');
    c.className = 'cat' + (i===0?' active':''); c.dataset.target = cat.id;
    c.innerHTML = `<span>${cat.icon||''}</span> ${cat.name}`;
    cats.appendChild(c);

    const sec = document.createElement('div');
    sec.className = 'menu-cat'; sec.id = 'cat-'+cat.id;
    sec.innerHTML = `<h3 class="menu-cat__title"><span class="ic">${cat.icon||''}</span> ${cat.name}</h3>`;
    const grid = document.createElement('div'); grid.className='grid';
    cat.items.forEach(item => {
      const id = slug(item.name);
      const card = document.createElement('article'); card.className='card';
      card.innerHTML =
        `<div class="card__img">${item.tag?`<span class="card__tag">${item.tag}</span>`:''}<img src="${item.img}" alt="${item.name}" loading="lazy"></div>
         <div class="card__b">
           <div class="card__top"><h4 class="card__name">${item.name}</h4><span class="card__price">${money(item.price)}</span></div>
           <p class="card__desc">${item.desc||''}</p>
           <button class="card__add" data-name="${item.name}">+ Adicionar</button>
         </div>`;
      grid.appendChild(card);
      const btn = card.querySelector('.card__add');
      addBtns[item.name] = btn;
      btn.addEventListener('click', ()=> add(item));
    });
    sec.appendChild(grid); sections.appendChild(sec);

    c.addEventListener('click', ()=>{
      const y = sec.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({top:y, behavior:'smooth'});
    });
  });

  /* ---------- cart ---------- */
  const LSKEY = 'cart_'+slug(B.name);
  let cart = {};
  try{ cart = JSON.parse(localStorage.getItem(LSKEY)) || {}; }catch(e){ cart = {}; }

  function save(){ try{ localStorage.setItem(LSKEY, JSON.stringify(cart)); }catch(e){} }
  function add(item){ const k=item.name; cart[k] = cart[k] || {price:item.price, img:item.img, qty:0}; cart[k].qty++; render(); bump(); }
  function setQty(k, d){ if(!cart[k]) return; cart[k].qty += d; if(cart[k].qty<=0) delete cart[k]; render(); }
  function total(){ return Object.values(cart).reduce((s,i)=>s+i.price*i.qty,0); }
  function count(){ return Object.values(cart).reduce((s,i)=>s+i.qty,0); }

  function render(){
    save();
    const body = $('#cartBody'), items = Object.entries(cart);
    if(!items.length){
      body.innerHTML = `<div class="cart__empty">Seu pedido está vazio.<br>Adicione suas pizzas favoritas! 🍕</div>`;
    } else {
      body.innerHTML = items.map(([name,i])=>
        `<div class="ci">
           <div class="ci__img"><img src="${i.img}" alt=""></div>
           <div class="ci__info"><div class="ci__name">${name}</div><div class="ci__price">${money(i.price)}</div></div>
           <div class="ci__qty"><button data-dec="${name}">−</button><b>${i.qty}</b><button data-inc="${name}">+</button></div>
         </div>`).join('');
      body.querySelectorAll('[data-inc]').forEach(b=>b.onclick=()=>setQty(b.dataset.inc,1));
      body.querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>setQty(b.dataset.dec,-1));
    }
    const n = count(), tot = total();
    $('#cartTotal').textContent = money(tot);
    $('#cartCount').textContent = n;
    $('#mbarCount').textContent = n===1?'1 item':`${n} itens`;
    $('#mbarTotal').textContent = money(tot);

    // checkout link
    const co = $('#cartCheckout');
    if(!n){ co.style.opacity=.5; co.style.pointerEvents='none'; co.href='#'; }
    else{
      co.style.opacity=1; co.style.pointerEvents='auto';
      const lines = Object.entries(cart).map(([name,i])=>`• ${i.qty}x ${name} — ${money(i.price*i.qty)}`).join('\n');
      const msg = `${S.ui.orderIntro}\n\n${lines}\n\n*Total: ${money(tot)}*\n\nPara concluir, me passe:\n📍 Endereço:\n👤 Nome:\n💳 Pagamento:`;
      co.href = waLink(msg);
    }
    // add buttons reflect qty
    for(const name in addBtns){
      const q = cart[name] && cart[name].qty;
      addBtns[name].innerHTML = q ? `<span class="qty">${q}</span> no carrinho` : '+ Adicionar';
      addBtns[name].classList.toggle('in', !!q);
    }
  }

  function bump(){ const el=$('#cartBtn'); el.animate([{transform:'scale(1)'},{transform:'scale(1.18)'},{transform:'scale(1)'}],{duration:280}); }

  /* ---------- drawer + UI events ---------- */
  const overlay=$('#overlay'), drawer=$('#cart');
  const openCart=()=>{ overlay.classList.add('open'); drawer.classList.add('open'); };
  const closeCart=()=>{ overlay.classList.remove('open'); drawer.classList.remove('open'); };
  $('#cartBtn').onclick = openCart;
  $('#mbarCart').onclick = openCart;
  $('#cartClose').onclick = closeCart;
  overlay.onclick = closeCart;

  const navMobile=$('#navMobile');
  $('#navToggle').onclick = ()=> navMobile.classList.toggle('open');
  navMobile.querySelectorAll('a').forEach(a=>a.onclick=()=>navMobile.classList.remove('open'));

  // header shadow on scroll
  const hdr=$('#hdr');
  const onScroll=()=> hdr.classList.toggle('scrolled', window.scrollY>10);
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // scrollspy -> active category chip
  const catBtns = [...cats.children];
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const id = e.target.id.replace('cat-','');
        catBtns.forEach(b=> b.classList.toggle('active', b.dataset.target===id));
      }
    });
  }, {rootMargin:'-45% 0px -50% 0px', threshold:0});
  S.menu.forEach(c=> obs.observe($('#cat-'+c.id)));

  render();
})();
