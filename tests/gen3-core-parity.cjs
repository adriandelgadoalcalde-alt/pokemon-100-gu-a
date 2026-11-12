// Contrasta el lector nativo de la 3.ª generación con PKHeX.Core (motor WebAssembly) en partidas públicas
// y, si existen, en copias privadas de fixtures/private/*.sav. Solo publica recuentos, nunca datos de partida.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),crypto=require('node:crypto');
const {chromium,webkit}=require('playwright');
const root=path.resolve(__dirname,'..'),manifest=require('../research/saves/public-corpus.json');
const data=require('../src/saves/gen3-data.js'),gen3=require('../src/saves/gen3.js');
const folder=path.resolve(process.argv[2]||'.cache/public-corpus');
const engine=process.env.POKEMON_BROWSER||'chromium';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const file=path.join(root,name==='/'?'atlas.html':name);
 if(!file.startsWith(root)||!/^\/(atlas\.html|sw\.js|manifest\.webmanifest|icons\/[\w.-]+|src\/(?:saves|engine|guides)\/[\w.-]+|engine\/(?:index\.html|_framework\/[\w.-]+))?$/.test(name)||!fs.existsSync(file)){res.writeHead(404).end();return;}
 const type={'.js':'text/javascript','.wasm':'application/wasm','.json':'application/json','.html':'text/html','.svg':'image/svg+xml'}[path.extname(file)]||'application/octet-stream';
 res.writeHead(200,{'Content-Type':type});res.end(fs.readFileSync(file));
});
(async()=>{
 const inputs=manifest.samples.map(s=>({label:s.id,file:path.join(folder,'files',s.id+'.sav'),sha:s.fileSha256}))
  .filter(s=>fs.existsSync(s.file)&&fs.statSync(s.file).size>=0x10000&&fs.statSync(s.file).size<=0x20040);
 const priv=path.join(root,'fixtures/private');
 if(fs.existsSync(priv))for(const f of fs.readdirSync(priv))if(f.endsWith('.sav'))inputs.push({label:'privado',file:path.join(priv,f)});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await ({chromium,webkit}[engine]).launch({headless:true,...(process.env.POKEMON_CHROMIUM&&engine==='chromium'?{executablePath:process.env.POKEMON_CHROMIUM}:{})});
 const summary={engine,compared:0,matched:0,skipped:0,failures:[]};
 try{
  const page=await browser.newPage();
  await page.goto('http://127.0.0.1:'+server.address().port+'/');
  await page.waitForFunction(()=>!!globalThis.PokemonCoreBrowser);
  for(const input of inputs){
   const bytes=new Uint8Array(fs.readFileSync(input.file)),before=hash(bytes);
   if(input.sha&&before!==input.sha)throw Error('Entrada pública fijada modificada.');
   let field;try{field=gen3.read(bytes,data);}catch(error){
    if(error.code==='GEN3_FIELD_UNAVAILABLE'){summary.skipped++;continue;}throw error;}
   const core=await page.evaluate(async encoded=>{
    const b=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));
    try{const d=await PokemonCoreBrowser.read(b);return {ok:true,flags:d.events?.activeFlags||null,work:d.events?.work||null,caught:d.caught,badges:d.badgesMask};}
    catch{return {ok:false};}
   },Buffer.from(bytes).toString('base64'));
   if(hash(bytes)!==before)throw Error('La lectura modificó los bytes de entrada.');
   summary.compared++;
   const problems=[];
   if(!core.ok)problems.push('Core rechaza un archivo que el lector nativo acepta');
   else{
    if(JSON.stringify(core.flags)!==JSON.stringify(field.flags))problems.push('flags');
    if(JSON.stringify(core.work)!==JSON.stringify(field.vars))problems.push('vars');
    const partyCaught=field.party.filter(p=>!p.egg&&p.species).every(p=>core.caught.includes(p.species));
    if(!partyCaught)problems.push('especies del equipo ausentes de la Pokédex de Core');
   }
   if(problems.length)summary.failures.push({input:input.label,problems});else summary.matched++;
  }
 }finally{await browser.close();server.close();}
 console.log(JSON.stringify(summary,null,1));
 if(summary.failures.length||!summary.compared)process.exit(1);
})().catch(error=>{console.error(error.message);process.exit(1);});
