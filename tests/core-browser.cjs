// Public inputs stay private. Only pass/fail counts and source references may be published.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const {spawnSync}=require('node:child_process');
const {chromium,webkit}=require('playwright');
const root=path.resolve(__dirname,'..'),manifest=require('../research/saves/public-corpus.json');
const folder=path.resolve(process.argv[2]||'fixtures/private/public-corpus');
const engine=process.env.POKEMON_BROWSER||'chromium';
const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'pokemon-browser-private-'));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname),name=pathname==='/'?'/atlas.html':pathname;
 if(!/^\/(atlas\.html|index\.html|sw\.js|manifest\.webmanifest|icons\/[\w.-]+|src\/(?:saves|engine|guides)\/[\w.-]+|engine\/(?:index\.html|_framework\/[\w.-]+))$/.test(name)){res.writeHead(404).end();return;}
 const file=path.join(root,name);if(!fs.existsSync(file)){res.writeHead(404).end();return;}
 const type={'.js':'text/javascript','.wasm':'application/wasm','.dat':'application/octet-stream','.json':'application/json','.svg':'image/svg+xml','.html':'text/html'}[path.extname(file)]||'application/octet-stream';
 res.writeHead(200,{'Content-Type':type});res.end(fs.readFileSync(file));
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port;
 const browser=await ({chromium,webkit}[engine]).launch({headless:true});
 const results=[],errors=[],requests=[];
 try{
  const context=await browser.newContext(),page=await context.newPage();
  page.on('pageerror',()=>errors.push('page error'));
  context.on('request',r=>{requests.push({url:r.url(),method:r.method(),body:r.postData()});});
  await page.goto(base);await page.waitForFunction(()=>!!globalThis.PokemonCoreBrowser);
  await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();
  await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  for(const sample of manifest.samples){
   const source=path.join(folder,'files',sample.id+'.sav'),bytes=fs.readFileSync(source),before=hash(bytes);
   if(before!==sample.fileSha256)throw Error('Pinned public input changed.');
   const report=await page.evaluate(async encoded=>{
    const bytes=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));
    try{return {ok:true,diagnosis:await PokemonCoreBrowser.read(bytes)};}catch{return {ok:false};}
   },bytes.toString('base64'));
   const failures=[];if(report.ok!==(sample.expected.core==='read'))failures.push('acceptance');
   if(report.ok){
    const output=path.join(temporary,sample.id+'.json');
    const cli=spawnSync(process.env.POKEMON_DOTNET||'dotnet',[path.join(root,'pkhex-extractor/bin/Release/net10.0/Pokemon.SaveAudit.dll'),source,output,'--include-events'],{encoding:'utf8',timeout:20000});
    if(cli.status!==0)failures.push('desktop extraction');
    else{const expected=JSON.parse(fs.readFileSync(output));delete expected.readAt;delete report.diagnosis.readAt;
     if(JSON.stringify(expected)!==JSON.stringify(report.diagnosis))failures.push('desktop parity');}
   }
   if(before!==hash(fs.readFileSync(source)))failures.push('input changed');
   results.push({id:sample.id,accepted:report.ok,failures});
   if(results.length%20===0)console.log(engine+': compared '+results.length+' public inputs');
  }
  console.log(JSON.stringify({engine,compared:results.length,accepted:results.filter(r=>r.accepted).length,failed:results.filter(r=>r.failures.length).length}));
  // Exercise the actual Atlas import path with a modern public container.
  const modern=manifest.samples.find(s=>s.expected.game==='SCARLET'&&s.expected.core==='read');
  await page.locator('#file-save').setInputFiles({name:'main',mimeType:'application/octet-stream',buffer:fs.readFileSync(path.join(folder,'files',modern.id+'.sav'))});
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.SCARLET?.sourceType==='local-save',null,{timeout:120000});
  const state=await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'));return {game:s.game,checks:s.checks,engine:s.evidence.SCARLET.extractor.engine};});
  console.log(engine+': Atlas import completed');
  if(state.game!=='SCARLET'||state.engine!=='PKHeX.Core'||Object.keys(state.checks||{}).length)throw Error('Atlas import did not retain conservative progress.');
  if(requests.some(r=>r.method!=='GET'||r.body||!r.url.startsWith(base+'/')||new URL(r.url).search))throw Error('Unexpected network request during local analysis.');
  // Wait for runtime cache writes, then remove both the frame and the origin.
  const runtimeURLs=[...new Set(requests.map(r=>r.url).filter(url=>url.includes('/engine/_framework/')))];
  await page.waitForFunction(async urls=>{const keys=await caches.keys();const cache=await caches.open(keys.find(k=>k.startsWith('pokemon-100-')));return (await Promise.all(urls.map(url=>cache.match(url)))).every(Boolean);},runtimeURLs);
  console.log(engine+': runtime cached');
  await page.evaluate(()=>document.querySelector('iframe[title="Motor local de guardados"]').remove());
  server.closeAllConnections();await new Promise(r=>server.close(r));
  await page.reload();await page.waitForFunction(()=>!!globalThis.PokemonCoreBrowser);
  const bytes=fs.readFileSync(path.join(folder,'files',modern.id+'.sav'));
  const offline=await page.evaluate(async b=>{try{const d=await PokemonCoreBrowser.read(Uint8Array.from(atob(b),c=>c.charCodeAt(0)));return d.game==='SCARLET';}catch{return false;}},bytes.toString('base64'));
  if(!offline)throw Error('The downloaded local engine did not reopen offline.');
  const summary={engine,samples:results.length,accepted:results.filter(r=>r.accepted).length,rejected:results.filter(r=>!r.accepted).length,failed:results.filter(r=>r.failures.length).length,pageErrors:errors.length,localNetworkOnly:true,offline:true};
  fs.writeFileSync(path.join(folder,'browser-'+engine+'-report.json'),JSON.stringify({summary,results},null,2)+'\n');
  console.log(JSON.stringify(summary));if(summary.failed||errors.length)process.exitCode=1;
  await context.close();
 }finally{await browser.close();}
})().catch(error=>{const safeMessages=['The downloaded local engine did not reopen offline.','Unexpected network request during local analysis.','Atlas import did not retain conservative progress.'];console.error(safeMessages.includes(error.message)?error.message:'Browser engine regression failed ('+error.name+'); no private diagnosis has been printed.');process.exitCode=1;}).finally(()=>{server.close();fs.rmSync(temporary,{recursive:true,force:true});});
