// SPDX-License-Identifier: GPL-3.0-or-later
// Barrido local de partidas reales por la interfaz real del Atlas (Playwright).
// Uso: node scripts/sweep-local-saves.cjs <carpeta> [chromium|webkit] [dispositivo de Playwright, p. ej. "iPad Pro 11"]
// Cada subcarpeta <consola>\<juego> lleva sus partidas; el juego se elige por la carpeta (tabla JUEGOS).
// Solo lectura y solo en el equipo: no se escribe ningún byte de las partidas ni se imprime entrenador, TID o SID.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const playwright=require('playwright');
const root=path.resolve(__dirname,'..'),folder=path.resolve(process.argv[2]||'.');
const engine=process.argv[3]||'chromium',deviceName=process.argv[4];
const JUEGOS={'Rojo':'RED','Azul':'BLUE','Amarillo':'YELLOW','Verde (Japón)':'GREEN','Oro':'GOLD','Plata':'SILVER','Cristal':'CRYSTAL',
 'Rubí':'RUBY','Zafiro':'SAPPHIRE','Esmeralda':'EMERALD','Rojo Fuego':'FIRERED','Verde Hoja':'LEAFGREEN',
 'Diamante':'DIAMOND','Perla':'PEARL','Platino':'PLATINUM','HeartGold':'HEARTGOLD','SoulSilver':'SOULSILVER',
 'Negro':'BLACK','Blanco':'WHITE','Negro 2':'BLACK2','Blanco 2':'WHITE2','X':'X','Y':'Y','Rubí Omega':'OMEGARUBY',
 'Zafiro Alfa':'ALPHASAPPHIRE','Sol':'SUN','Luna':'MOON','Ultrasol':'ULTRASUN','Ultraluna':'ULTRAMOON',
 "Let's Go Pikachu":'LETGOP',"Let's Go Eevee":'LETGOE','Espada':'SWORD','Escudo':'SHIELD','Diamante Brillante':'BD',
 'Perla Reluciente':'SP','Leyendas Arceus':'ARCEUS','Escarlata':'SCARLET','Púrpura':'VIOLET','Leyendas Z-A':'ZA',
 'espada-escudo':'SWORD','rojofuego-switch':'FIRERED'};
const files=[];
(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);
 if(e.isDirectory())walk(p);else if(!/\.(txt|md|json)$/i.test(e.name))files.push(p);}})(folder);
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname),name=pathname==='/'?'/atlas.html':pathname;
 const file=path.join(root,name);
 if(!file.startsWith(root)||/[\\/]\.|fixtures|research|tests/.test(name)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}
 const type={'.js':'text/javascript','.wasm':'application/wasm','.json':'application/json','.svg':'image/svg+xml','.html':'text/html','.webmanifest':'application/manifest+json'}[path.extname(file)]||'application/octet-stream';
 res.writeHead(200,{'Content-Type':type});res.end(fs.readFileSync(file));
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port;
 const browser=await playwright[engine].launch({headless:true});
 const options=deviceName?{...playwright.devices[deviceName]}:{};
 if(engine!=='chromium')delete options.defaultBrowserType;
 let fallos=0;
 try{
  for(const file of files){
   const rel=path.relative(folder,file),game=JUEGOS[path.basename(path.dirname(file))];
   const context=await browser.newContext(options),page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(String(e.message).slice(0,120)));
   try{
    await page.goto(base);await page.waitForFunction(()=>typeof store==='object'&&typeof render==='function');
    if(game)await page.evaluate(g=>{store.game=g;render();},game);
    const before=await page.evaluate(()=>localStorage.getItem('pokemon-atlas9-progress-v1'));
    await page.locator('#file-save').setInputFiles(file);
    await page.waitForFunction(b=>{const s=localStorage.getItem('pokemon-atlas9-progress-v1');return (s&&s!==b)||document.querySelector('.notice.error,.error');},before,{timeout:120000}).catch(()=>{});
    const st=await page.evaluate(()=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1')||'{}'));
    const read=st.game&&st.evidence?.[st.game];
    if(!read){fallos++;const body=await page.locator('body').innerText();
     console.log(`NO LEÍDO | ${rel} | ${(body.match(/[^\n]*(?:no |error|Selecciona)[^\n]*/i)||[''])[0].slice(0,160)}`);continue;}
    await page.locator('[data-view="mission"]').first().click().catch(()=>{});
    const info=await page.evaluate(()=>{
     const w=document.querySelector('#gen3-where'),g=game(store.game),goals=masteryGoals(g);
     const sin=goals.filter(o=>!masteryProof(o,g));
     return {where:w?w.innerText.split('\n').map(s=>s.trim()).filter(Boolean).slice(1,3).join(' · '):'',
      total:goals.length,ok:goals.length-sin.length,sin:sin.map(o=>`[${o.tier}] ${o.label}`)};
    });
    const ok=game&&st.game!==game?` | OJO juego ${st.game} ≠ carpeta ${game}`:'';
    console.log(`${st.game} | ${rel} | ${info.where||'(sin panel de ubicación)'} | medallas ${read.badgesTotal??'-'} | acreditados ${info.ok}/${info.total}${ok}${errors.length?' | ERRORES '+errors.join(' / '):''}`);
    for(const x of info.sin)console.log('    sin acreditar: '+x);
    if(ok||errors.length)fallos++;
   }catch(e){fallos++;console.log(`FALLO | ${rel} | ${String(e.message).split('\n')[0].slice(0,160)}`);}
   finally{await context.close();}
  }
 }finally{await browser.close();server.close();}
 console.log(`Partidas: ${files.length} · con incidencias: ${fallos}`);
})();
