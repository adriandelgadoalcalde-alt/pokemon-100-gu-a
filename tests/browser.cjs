const {chromium,webkit} = require('playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {fixture} = require('./helpers.cjs');

const root = path.resolve(__dirname, '..');
const server = http.createServer((req, res) => {
  let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (name === '/') name = '/index.html';
  if (!/^\/(index\.html|atlas\.html|sw\.js|manifest\.webmanifest|icons\/[\w.-]+|src\/(saves|engine|guides)\/[\w.-]+)$/.test(name)) {
    res.writeHead(404).end(); return;
  }
  const file = path.join(root, name);
  if (!fs.existsSync(file)) {res.writeHead(404).end(); return;}
  const type = name.endsWith('.js') ? 'text/javascript' : name.endsWith('.svg') ? 'image/svg+xml' :
    name.endsWith('.webmanifest') ? 'application/manifest+json' : 'text/html';
  res.writeHead(200, {'Content-Type': type}); res.end(fs.readFileSync(file));
});
async function run() {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const engine=process.env.POKEMON_BROWSER||'chromium';
  if(!['chromium','webkit'].includes(engine))throw Error('Unsupported browser engine');
  const resultDir=path.join('test-results',engine);
  const browser = await ({chromium,webkit}[engine]).launch({headless: true});
  const errors = [];
  try {
    fs.mkdirSync(resultDir, {recursive: true});
    for (const width of [390, 768, 1024, 1366, 1440]) {
      const context = await browser.newContext({viewport: {width, height: 1000}, serviceWorkers: 'block'});
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      for (const file of ['index.html', 'atlas.html']) {
        await page.goto(`${base}/${file}`);
        await page.locator('#app button:visible').first().waitFor();
        const dimensions = await page.evaluate(() => ({width: innerWidth, scroll: document.documentElement.scrollWidth}));
        assert.ok(dimensions.scroll <= dimensions.width + 1, `${file}: horizontal overflow at ${width}`);
        await page.screenshot({path: path.join(resultDir,`${file}-${width}.png`), fullPage: true});
      }
      await context.close();
    }
    // Restore the user's exported Atlas evidence along with every checklist layer.
    const context = await browser.newContext({serviceWorkers: 'block'});
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    page.on('dialog', d => d.accept());
    await page.goto(`${base}/atlas.html`);
    const backup = {checks: {'test-0': true}, goalChecks: {'SOULSILVER:0': true},
      masterChecks: {'SOULSILVER:test': true}, history: [{label: 'prueba de restauración'}], game: 'SOULSILVER',
      evidence: {SOULSILVER: {game: 'SOULSILVER', caught: [145,146], seen: [145,146,381],
        gameClear: true, badgesTotal: 16, readAt: '2026-11-09T00:00:00Z'}}};
    await page.locator('#file-import').setInputFiles({name: 'synthetic-progress.json', mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(backup))});
    await page.waitForFunction(() => JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.SOULSILVER?.caught?.includes(145));
    let restored = await page.evaluate(() => JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1')));
    for (const field of ['checks', 'goalChecks', 'masterChecks', 'history']) assert.deepEqual(restored[field], backup[field]);
    assert.deepEqual(restored.evidence.SOULSILVER.caught, [145,146]);
    // An older backup without evidence preserves the evidence already held locally.
    const older = {...backup}; delete older.evidence;
    const olderRestored = page.waitForEvent('dialog');
    await page.locator('#file-import').setInputFiles({name: 'older-progress.json', mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(older))});
    await olderRestored;
    restored = await page.evaluate(() => JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1')));
    assert.deepEqual(restored.evidence.SOULSILVER.caught, [145,146]);
    await page.locator('[data-view="mastery"]').first().click();
    assert.match(await page.locator('#master-pokemon-145').innerText(), /Evidencia parcial/);
    // The Atlas uses the same local binary reader, without an intermediate JSON export.
    const atlasRequests=[];page.on('request',r=>atlasRequests.push({method:r.method(),data:r.postData()}));
    await page.locator('#file-save').setInputFiles({name:'synthetic.sav',mimeType:'application/octet-stream',
      buffer:Buffer.from(fixture({caught:[145,146],seen:[381]}))});
    await page.waitForFunction(()=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.SOULSILVER?.sourceType==='local-save');
    const atlasBinary=await page.evaluate(()=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1')));
    assert.deepEqual(atlasBinary.checks,backup.checks);
    assert.deepEqual(atlasBinary.evidence.SOULSILVER.caught,[145,146]);
    assert.ok(atlasBinary.evidenceArchive.SOULSILVER.length>0);
    await page.locator('[data-view="mastery"]').first().click();
    assert.match(await page.locator('#master-pokemon-145').innerText(), /integridad del bloque comprobada/);
    await page.locator('[data-view="mission"]').first().click();
    assert.ok(!/Siguiente objetivo no confirmado\s+Inicio en Pueblo Primavera/.test(await page.locator('body').innerText()));
    assert.match(await page.locator('body').innerText(),/Se prioriza contenido posterior/);
    assert.ok(atlasRequests.every(r=>r.method==='GET'&&r.data===null));
    // Import a synthetic binary through the actual UI; no network request contains it.
    const historical = {game: 'SOULSILVER', view: 'quiz', checked: {'soulsilver-1#0': true},
      notes: {'soulsilver-1': 'Nota anterior'}, history: [], quiz: {SOULSILVER: {red: 'yes'}},
      v8Manual: {'legacy-profile|fact': {value: true, provenance: 'Respuesta histórica'}},
      v8Profiles: {'legacy-profile': {checked: {'soulsilver-2#0': true}}}, v7ChainMigration: true};
    await page.evaluate(data => localStorage.setItem('archivo-pokemon-v2', JSON.stringify(data)), historical);
    await page.goto(`${base}/index.html`);
    await page.getByRole('heading', {name: 'Importa tu partida', exact: true}).waitFor();
    assert.equal(await page.locator('[data-view="quiz"], #quizForm, #v6QuizForm, #v8QuizForm, input[type="radio"]').count(), 0);
    const requests = [];
    page.on('request', r => requests.push({method: r.method(), data: r.postData()}));
    await page.locator('#saveImportFile').setInputFiles({name: 'synthetic.sav', mimeType: 'application/octet-stream',
      buffer: Buffer.from(fixture({caught: [145,146], seen: [381]}))});
    await page.waitForFunction(() => JSON.parse(localStorage.getItem('archivo-pokemon-v2'))?.snapshots?.SOULSILVER?.integrity?.generalChecksumValid);
    const progress = await page.evaluate(() => JSON.parse(localStorage.getItem('archivo-pokemon-v2')));
    assert.deepEqual(progress.snapshots.SOULSILVER.caught, [145,146]);
    assert.deepEqual(progress.quiz, historical.quiz);
    assert.deepEqual(progress.v8Manual, historical.v8Manual);
    assert.deepEqual(progress.checked, historical.checked);
    assert.equal(await page.locator('[data-view="quiz"], input[type="radio"]').count(), 0);
    await page.locator('.v6-primary-continue').first().waitFor();
    assert.ok(requests.every(r => r.method === 'GET' && r.data === null), 'save must stay local');
    // A corrupt upload must leave the previous diagnosis untouched.
    const corrupt = fixture({caught: [150]}); corrupt[0x12BC] ^= 1;
    const rejection = page.waitForEvent('dialog');
    await page.locator('#saveImportFile').setInputFiles({name: 'corrupt.sav', mimeType: 'application/octet-stream', buffer: Buffer.from(corrupt)});
    assert.match((await rejection).message(), /integridad/);
    const afterError = await page.evaluate(() => JSON.parse(localStorage.getItem('archivo-pokemon-v2')));
    assert.deepEqual(afterError.snapshots, progress.snapshots);
    // Identical content refreshes the diagnosis without adding a false progress diff.
    await page.locator('#saveImportFile').setInputFiles({name:'same.sav',mimeType:'application/octet-stream',
      buffer:Buffer.from(fixture({caught:[145,146],seen:[381]}))});
    await page.waitForFunction(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2'))?.snapshots?.SOULSILVER?.filename==='same.sav');
    assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2')).comparisons),progress.comparisons);
    // The diagnosis lists unknown requirements without converting them into completions.
    await page.locator('#openSaved').click();
    await page.getByRole('heading', {name: 'Qué hemos leído de tu partida', exact: true}).waitFor();
    assert.ok(await page.locator('.reading-gaps [data-open]').count() > 0);
    await page.locator('.reading-gaps').locator('..').locator('summary').click();
    const priorMission = page.locator('.reading-gaps li').filter({hasText: 'Terminar: Ciudad Iris: Morti y los perros legendarios'});
    assert.equal(await priorMission.getByRole('button').getAttribute('data-open'), 'soulsilver-7');
    await page.screenshot({path: path.join(resultDir,'diagnosis-direct-route.png'), fullPage: true});
    // Export and restore the old answers and manual records without resurrecting a quiz.
    const downloadEvent = page.waitForEvent('download');
    await page.locator('#backup').click();
    const exported = JSON.parse(await fs.promises.readFile(await (await downloadEvent).path(), 'utf8'));
    assert.deepEqual(exported.quiz, historical.quiz);
    assert.deepEqual(exported.v8Manual, historical.v8Manual);
    assert.deepEqual(exported.v8Profiles, historical.v8Profiles);
    const restoreContext = await browser.newContext({serviceWorkers: 'block'});
    const restorePage = await restoreContext.newPage();
    restorePage.on('pageerror', e => errors.push(e.message));
    restorePage.on('dialog', d => d.accept());
    await restorePage.goto(`${base}/index.html`);
    await restorePage.locator('#importFile').setInputFiles({name: 'historical-progress.json', mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(exported))});
    await restorePage.waitForFunction(() => JSON.parse(localStorage.getItem('archivo-pokemon-v2'))?.v8Manual?.['legacy-profile|fact']?.value === true);
    const recovered = await restorePage.evaluate(() => JSON.parse(localStorage.getItem('archivo-pokemon-v2')));
    for (const field of ['checked', 'notes', 'quiz', 'v8Manual', 'v8Profiles']) assert.deepEqual(recovered[field], exported[field]);
    assert.equal(await restorePage.locator('[data-view="quiz"], input[type="radio"]').count(), 0);
    await restoreContext.close();
    // Distinct trainers cannot create a cross-profile chronology or inherit manual steps.
    await page.locator('#saveImportFile').setInputFiles({name:'different-profile.sav',mimeType:'application/octet-stream',
      buffer:Buffer.from(fixture({tid:42,caught:[150],seen:[150]}))});
    await page.waitForFunction(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2'))?.snapshots?.SOULSILVER?.tid===42);
    let switched=await page.evaluate(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2')));
    assert.equal(switched.checked['soulsilver-1#0'],undefined);
    assert.deepEqual(switched.comparisons,progress.comparisons);
    await page.locator('#saveImportFile').setInputFiles({name:'original-profile.sav',mimeType:'application/octet-stream',
      buffer:Buffer.from(fixture({caught:[145,146],seen:[381]}))});
    await page.waitForFunction(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2'))?.snapshots?.SOULSILVER?.tid===0);
    switched=await page.evaluate(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2')));
    assert.deepEqual(switched.checked,historical.checked);assert.deepEqual(switched.notes,historical.notes);
    await page.locator('#saveImportFile').setInputFiles({name:'orb-present.sav',mimeType:'application/octet-stream',
      buffer:Buffer.from(fixture({caught:[145,146],seen:[381],keyItems:[{id:534,count:1}]}))});
    await page.waitForFunction(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2'))?.snapshots?.SOULSILVER?.keyItems?.some(i=>i.id===534));
    assert.equal(await page.locator('.v6-primary-continue').first().getAttribute('data-open'),'soulsilver-34');
    await page.locator('.v6-primary-continue').first().click();
    await page.locator('[data-taskbox="soulsilver-34"] .task-detail').waitFor();
    assert.match(await page.locator('[data-taskbox="soulsilver-34"]').innerText(),/Ya llevas el Orbe Rojo/);
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2')).checked['soulsilver-36#2']),undefined);
    await context.close();
    // A new reader learning SID must retain manual records for the exact same binary.
    const identityContext=await browser.newContext({serviceWorkers:'block'}),identityPage=await identityContext.newPage();
    identityPage.on('pageerror',e=>errors.push(e.message));identityPage.on('dialog',d=>d.accept());
    await identityPage.goto(`${base}/index.html`);
    const identityFile={name:'identity.sav',mimeType:'application/octet-stream',buffer:Buffer.from(fixture({sid:456}))};
    await identityPage.locator('#saveImportFile').setInputFiles(identityFile);
    await identityPage.waitForFunction(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2'))?.snapshots?.SOULSILVER?.sid===456);
    await identityPage.evaluate(()=>{const p=JSON.parse(localStorage.getItem('archivo-pokemon-v2'));delete p.snapshots.SOULSILVER.sid;
      p.checked['soulsilver-1#0']=true;p.v8Manual['SOULSILVER|SYNTH|0|?|SOULSILVER|red-won']={value:true,provenance:'Confirmación anterior'};
      localStorage.setItem('archivo-pokemon-v2',JSON.stringify(p));});
    await identityPage.reload();await identityPage.locator('#saveImportFile').setInputFiles(identityFile);
    await identityPage.waitForFunction(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2'))?.snapshots?.SOULSILVER?.sid===456);
    assert.equal(await identityPage.evaluate(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2')).v8ProfileAliases['SOULSILVER|SYNTH|0|456']),'SOULSILVER|SYNTH|0|?');
    assert.equal(await identityPage.evaluate(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2')).v8Manual['SOULSILVER|SYNTH|0|?|SOULSILVER|red-won'].value),true);
    assert.equal(await identityPage.evaluate(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2')).checked['soulsilver-1#0']),true);
    await identityPage.locator('#saveImportFile').setInputFiles({...identityFile,name:'other-sid.sav',buffer:Buffer.from(fixture({sid:789}))});
    await identityPage.waitForFunction(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2'))?.snapshots?.SOULSILVER?.sid===789);
    assert.equal(await identityPage.evaluate(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2')).checked['soulsilver-1#0']),undefined);
    await identityPage.locator('#saveImportFile').setInputFiles(identityFile);
    await identityPage.waitForFunction(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2'))?.snapshots?.SOULSILVER?.sid===456);
    assert.equal(await identityPage.evaluate(()=>JSON.parse(localStorage.getItem('archivo-pokemon-v2')).checked['soulsilver-1#0']),true);
    await identityContext.close();
    // Every catalogued edition must render its goals without duplicate IDs or runtime errors.
    const {catalogue}=require('../scripts/audit.cjs');
    const catalog=catalogue(fs.readFileSync(path.join(root,'atlas.html'),'utf8'));
    const allContext=await browser.newContext({serviceWorkers:'block'}),allPage=await allContext.newPage();
    allPage.on('pageerror',e=>errors.push(e.message));await allPage.setViewportSize({width:390,height:1000});await allPage.goto(`${base}/atlas.html`);
    for(const game of catalog.games){
      await allPage.evaluate(id=>localStorage.setItem('pokemon-atlas9-progress-v1',JSON.stringify({game:id,checks:{}})),game.id);
      await allPage.reload();
      assert.equal(await allPage.locator('#mobile-gen').inputValue(),String(game.generation));
      await allPage.locator('[data-view="mastery"]').first().click();
      await allPage.locator('[data-master]').first().waitFor();
      await allPage.locator('[data-view="dossier"]').first().click();
      await allPage.locator('[data-goal]').first().waitFor();
      if(game.generation===1){assert.equal(await allPage.locator('[data-goal]').count(),5);assert.match(await allPage.locator('body').innerText(),/Los entrenadores secundarios quedan fuera/);}
      const detailed=game.missions.find(m=>require('../src/guides/routes.js').get(game.id,m.id));
      assert.ok(detailed,game.id+': missing detailed route');
      await allPage.locator('[data-view="mission"]').first().click();
      await allPage.locator('[data-mid="'+detailed.id+'"] > summary').click();
      await allPage.locator('[data-mid="'+detailed.id+'"] .route-details').waitFor();
      assert.ok(await allPage.locator('[data-mid="'+detailed.id+'"] .route-details ol > li').count()>=3);
      assert.ok(await allPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),game.id+': expanded route overflow');
      if(['RED','GOLD','SWORD','ZA'].includes(game.id))await allPage.screenshot({path:path.join(resultDir,'route-'+game.id+'-390.png'),fullPage:true});
    }
    // Edition-specific puzzles and narrative gates must not inherit R/S instructions in Emerald.
    await allPage.locator('#mobile-gen').selectOption('3');
    await allPage.locator('#mobile-game').selectOption('EMERALD');
    await allPage.locator('[data-mid="EMERALD-09"] > summary').click();
    assert.match(await allPage.locator('[data-mid="EMERALD-09"] .route-details').innerText(),/Centro Espacial/);
    await allPage.locator('[data-mid="EMERALD-11"] > summary').click();
    const icePanel=allPage.locator('[data-ice-version="EMERALD"][data-ice-platform="1"]');
    await icePanel.locator('[data-ice-delta="1"]').click();
    assert.equal(await icePanel.getAttribute('data-ice-step'),'1');
    assert.match(await icePanel.locator('[role="status"]').innerText(),/Casilla 2 de 7/);
    await icePanel.locator('[data-ice-reset]').click();
    assert.equal(await icePanel.getAttribute('data-ice-step'),'0');
    assert.equal(await allPage.locator('[data-check]:checked').count(),0);
    assert.ok(await allPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    await allPage.screenshot({path:path.join(resultDir,'ice-EMERALD-390.png'),fullPage:true});
    await allPage.locator('#mobile-game').selectOption('RUBY');
    await allPage.locator('[data-mid="RUBY-11"] > summary').click();
    assert.equal(await allPage.locator('[data-ice-version="EMERALD"]').count(),0);
    assert.equal(await allPage.locator('[data-ice-version="RUBY_SAPPHIRE"]').count(),3);
    await allPage.locator('[data-view="coverage"]').first().click();
    assert.equal(await allPage.locator('[data-coverage-game]').count(),39);
    await allPage.setViewportSize({width:390,height:1000});
    assert.ok(await allPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    // Documented modern signals guide the route while mastery remains partial.
    const modern={game:'SCARLET',caught:[],seen:[],gameClear:null,integrity:{checksumsValid:true},progressSignals:[
      {id:'story.paldea.clear',label:'Indicador de final de Paldea',value:true,validation:'documented'},
      {id:'story.tealMask.clear',label:'Indicador de final de La máscara turquesa',value:null,validation:'documented'}]};
    allPage.on('dialog',d=>d.accept());
    await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-modern.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(modern))});
    await allPage.waitForFunction(()=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.SCARLET?.progressSignals?.length===2);
    await allPage.locator('[data-view="diagnostic"]').first().click();
    assert.match(await allPage.locator('body').innerText(),/sin lectura disponible/);
    await allPage.locator('[data-view="mission"]').first().click();
    assert.equal(await allPage.locator('[data-focus]').first().getAttribute('data-focus'),'SCARLET-08');
    await allPage.locator('[data-view="mastery"]').first().click();
    assert.match(await allPage.locator('#master-story').innerText(),/Evidencia parcial/);
    // Damaged persisted JSON remains recoverable rather than silently disappearing.
    const damaged='{"checked":';
    await allPage.evaluate(raw=>localStorage.setItem('archivo-pokemon-v2',raw),damaged);
    await allPage.goto(`${base}/index.html`);
    await allPage.locator('#app button:visible').first().waitFor();
    const recoveryDownload=allPage.waitForEvent('download');await allPage.locator('#backup').click();
    const recoveredRaw=JSON.parse(await fs.promises.readFile(await (await recoveryDownload).path(),'utf8'));
    assert.equal(recoveredRaw.recoveryBackup,damaged);
    await allContext.close();
    // Storage failure must leave an exportable diagnosis and a persistent warning.
    const quotaContext=await browser.newContext({serviceWorkers:'block'});
    await quotaContext.addInitScript(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){
      if(k==='archivo-pokemon-v2')throw new DOMException('Synthetic quota limit','QuotaExceededError');
      return original.call(this,k,v);
    };});
    const quotaPage=await quotaContext.newPage();quotaPage.on('pageerror',e=>errors.push(e.message));
    await quotaPage.goto(`${base}/index.html`);
    await quotaPage.locator('#saveImportFile').setInputFiles({name:'memory-only.sav',mimeType:'application/octet-stream',buffer:Buffer.from(fixture({caught:[145]}))});
    await quotaPage.getByRole('alert').filter({hasText:'Siguen en memoria'}).waitFor();
    const quotaDownload=quotaPage.waitForEvent('download');await quotaPage.locator('#backup').click();
    const inMemory=JSON.parse(await fs.promises.readFile(await (await quotaDownload).path(),'utf8'));
    assert.deepEqual(inMemory.snapshots.SOULSILVER.caught,[145]);
    await quotaContext.close();
    // Install, go offline, reload both entry points and the new reader module.
    const offline = await browser.newContext();
    const offlinePage = await offline.newPage();
    offlinePage.on('pageerror', e => errors.push(e.message));
    await offlinePage.goto(base);
    await offlinePage.evaluate(async () => {await navigator.serviceWorker.ready;});
    await offlinePage.reload();
    await offlinePage.waitForFunction(() => !!navigator.serviceWorker.controller);
    // Closing the origin exercises cached navigation in both engines. WebKit
    // offline emulation can fail before dispatching the service-worker fetch.
    server.closeAllConnections();
    await new Promise(resolve=>server.close(resolve));
    for (const file of ['index.html', 'atlas.html']) {
      await offlinePage.goto(`${base}/${file}`);
      await offlinePage.locator('#app button:visible').first().waitFor();
      if (file === 'index.html') assert.equal(await offlinePage.evaluate(() => typeof PokemonHGSSIntegrity.inspect), 'function');
      if(file==='atlas.html'){await offlinePage.setViewportSize({width:390,height:1000});await offlinePage.locator('#mobile-gen').selectOption('1');await offlinePage.locator('#mobile-game').selectOption('RED');await offlinePage.locator('[data-mid="RED-01"] > summary').click();await offlinePage.locator('[data-mid="RED-01"] .route-details').waitFor();assert.match(await offlinePage.locator('[data-mid="RED-01"] .route-details').innerText(),/paquete destinado al profesor/);await offlinePage.locator('#mobile-gen').selectOption('3');await offlinePage.locator('#mobile-game').selectOption('EMERALD');await offlinePage.locator('[data-mid="EMERALD-11"] > summary').click();await offlinePage.locator('[data-ice-platform="3"] [data-ice-delta="1"]').click();assert.equal(await offlinePage.locator('[data-ice-platform="3"]').getAttribute('data-ice-step'),'1');}
    }
    await offline.close();
    assert.deepEqual(errors, []);
    console.log(engine+': Responsive layout, direct route without quizzes, preserved historical answers, local import, rejected corruption, restoration, and offline navigation passed.');
  } finally {await browser.close();}
}
run().catch(e => {console.error(e); process.exitCode = 1;}).finally(() => server.close());
