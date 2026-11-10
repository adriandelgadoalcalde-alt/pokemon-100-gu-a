// A newly activated release must not copy the previous release from the HTTP cache.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium,webkit}=require('playwright');
const source=fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8');
let version='OLD';
const server=http.createServer((req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 if(pathname==='/sw.js'){
  res.writeHead(200,{'Content-Type':'text/javascript','Cache-Control':'no-cache'});
  res.end(source.replace(/const CACHE='[^']+'/,"const CACHE='pokemon-100-update-"+version+"'"));return;
 }
 res.writeHead(200,{'Content-Type':pathname.endsWith('.js')?'text/javascript':'text/html','Cache-Control':'public,max-age=3600'});
 res.end(pathname.endsWith('.js')?'/* Static fixture asset */':`<!doctype html><html><body><p id="version">${version}</p><script>navigator.serviceWorker.register('./sw.js');</script></body></html>`);
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 const engine=process.env.POKEMON_BROWSER||'chromium',browser=await ({chromium,webkit}[engine]).launch({headless:true});
 try{
  const page=await browser.newPage();await page.goto(base+'/index.html');
  await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();
  await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await page.evaluate(()=>localStorage.setItem('synthetic-progress-preserved','yes'));
  version='NEW';
  await page.evaluate(async()=>{const registration=await navigator.serviceWorker.getRegistration();const changed=new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));await registration.update();await changed;});
  const cached=await page.evaluate(async url=>{const cache=await caches.open('pokemon-100-update-NEW');const response=await cache.match(url);return response?.text();},base+'/index.html');
  assert.match(cached,/id="version">NEW</,'The new release precached old HTML from the HTTP cache.');
  server.closeAllConnections();await new Promise(r=>server.close(r));
  await page.reload();assert.equal(await page.locator('#version').innerText(),'NEW');
  assert.equal(await page.evaluate(()=>localStorage.getItem('synthetic-progress-preserved')),'yes');
  console.log(engine+': release update bypassed stale HTTP cache and preserved offline progress.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error.message);process.exitCode=1;}).finally(()=>server.close());
