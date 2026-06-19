// Gera previews (desktop, mobile, carrinho) do site para cada tema.
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'previews');
fs.mkdirSync(OUT, { recursive: true });

const THEMES = [
  { key:'classic', config:'js/config.js' },
  { key:'verde',   config:'js/config-verde.js' },
];

function tempIndex(configPath){
  let html = fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
  html = html.replace('js/config.js', configPath);
  const p = path.join(ROOT, `_shot.html`);
  fs.writeFileSync(p, html);
  return p;
}

async function settle(page){
  await page.evaluate(async()=>{ if(document.fonts) await document.fonts.ready; });
  await new Promise(r=>setTimeout(r,350));
}

const run = async () => {
  const browser = await puppeteer.launch({headless:'new', args:['--no-sandbox']});
  for(const t of THEMES){
    const file = 'file://'+tempIndex(t.config);
    const page = await browser.newPage();

    // desktop hero (first viewport)
    await page.setViewport({width:1440, height:900, deviceScaleFactor:2});
    await page.goto(file, {waitUntil:'networkidle0'});
    await settle(page);
    await page.screenshot({path:path.join(OUT,`desktop-${t.key}-hero.png`)});

    // desktop full page
    await page.screenshot({path:path.join(OUT,`desktop-${t.key}-full.png`), fullPage:true});

    // desktop with cart open (add 2 items)
    await page.evaluate(()=>{
      const btns=[...document.querySelectorAll('.card__add')];
      btns[0]&&btns[0].click(); btns[0]&&btns[0].click(); btns[1]&&btns[1].click();
      document.getElementById('cartBtn').click();
    });
    await new Promise(r=>setTimeout(r,500));
    await page.screenshot({path:path.join(OUT,`desktop-${t.key}-cart.png`)});

    // mobile full page
    const m = await browser.newPage();
    await m.setViewport({width:390, height:844, deviceScaleFactor:2, isMobile:true, hasTouch:true});
    await m.goto(file, {waitUntil:'networkidle0'});
    await settle(m);
    await m.screenshot({path:path.join(OUT,`mobile-${t.key}-full.png`), fullPage:true});
    await m.close();
    await page.close();
    console.log('  ✓ tema', t.key);
  }
  await browser.close();
  fs.existsSync(path.join(ROOT,'_shot.html')) && fs.unlinkSync(path.join(ROOT,'_shot.html'));
  console.log('Previews em', OUT);
};
run().catch(e=>{console.error(e);process.exit(1);});
