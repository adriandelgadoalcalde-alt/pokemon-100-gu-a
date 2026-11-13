const {chromium,webkit,devices} = require('playwright');
// POKEMON_DEVICE (p. ej. "iPad Pro 11") emula un dispositivo de Playwright; con POKEMON_BROWSER=webkit es Safari de iPadOS.
const DEVICE=process.env.POKEMON_DEVICE?devices[process.env.POKEMON_DEVICE]:null;if(process.env.POKEMON_DEVICE&&!DEVICE)throw Error('Unknown device');
const ctx=(o={})=>DEVICE?{...DEVICE,...o,viewport:o.viewport||DEVICE.viewport}:o;
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {fixture} = require('./helpers.cjs');

const root = path.resolve(__dirname, '..');
const server = http.createServer((req, res) => {
  let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (name === '/') name = '/index.html';
  if (!/^\/(index\.html|clasica\.html|atlas\.html|sw\.js|manifest\.webmanifest|icons\/[\w.-]+|src\/(saves|engine|guides)\/[\w.-]+)$/.test(name)) {
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
  const browser = await ({chromium,webkit}[engine]).launch({headless: true, ...(process.env.POKEMON_BROWSER_PATH?{executablePath:process.env.POKEMON_BROWSER_PATH}:{})});
  const errors = [];
  try {
    fs.mkdirSync(resultDir, {recursive: true});
    for (const width of [390, 768, 1024, 1366, 1440]) {
      const context = await browser.newContext(ctx({viewport: {width, height: 1000}, serviceWorkers: 'block'}));
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      for (const file of ['clasica.html', 'atlas.html']) {
        await page.goto(`${base}/${file}`);
        await page.locator('#app button:visible').first().waitFor();
        const dimensions = await page.evaluate(() => ({width: innerWidth, scroll: document.documentElement.scrollWidth}));
        assert.ok(dimensions.scroll <= dimensions.width + 1, `${file}: horizontal overflow at ${width}`);
        await page.screenshot({path: path.join(resultDir,`${file}-${width}.png`), fullPage: true});
      }
      await context.close();
    }
    // Restore the user's exported Atlas evidence along with every checklist layer.
    const context = await browser.newContext(ctx({serviceWorkers: 'block'}));
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
    // Al leer una partida salta el test de lo que la partida no guarda; «Ahora no» lo deja para otra visita.
    assert.equal(await page.locator('#preguntas-partida').count(),1,'el test de la partida no ha saltado al leerla');
    assert.equal(await page.locator('#preguntas-partida input[type="radio"]').count(),0);
    await page.locator('#preguntas-luego').click();
    assert.equal(await page.locator('#preguntas-partida').count(),0);
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
    await page.goto(`${base}/clasica.html`);
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
    await page.locator('#openSaved:visible, .menu-mobile [data-view="save"]:visible').first().click(); // en móvil (≤760 px) se entra por la barra inferior «Partida»
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
    const restoreContext = await browser.newContext(ctx({serviceWorkers: 'block'}));
    const restorePage = await restoreContext.newPage();
    restorePage.on('pageerror', e => errors.push(e.message));
    restorePage.on('dialog', d => d.accept());
    await restorePage.goto(`${base}/clasica.html`);
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
    const identityContext=await browser.newContext(ctx({serviceWorkers:'block'})),identityPage=await identityContext.newPage();
    identityPage.on('pageerror',e=>errors.push(e.message));identityPage.on('dialog',d=>d.accept());
    await identityPage.goto(`${base}/clasica.html`);
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
    const allContext=await browser.newContext(ctx({serviceWorkers:'block'})),allPage=await allContext.newPage();
    allPage.on('pageerror',e=>errors.push(e.message));await allPage.setViewportSize({width:390,height:1000});await allPage.goto(`${base}/atlas.html`);
    for(const game of catalog.games){
      if(process.env.POKEMON_DEBUG)console.log('juego',game.id);
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
      const overflow=await allPage.evaluate(()=>{const W=innerWidth;if(document.documentElement.scrollWidth<=W+1)return null;
        return [...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>W+1&&r.width>0;}).slice(-4)
          .map(e=>e.tagName+'.'+String(e.className).slice(0,30)+' derecha='+Math.round(e.getBoundingClientRect().right)+' «'+(e.textContent||'').trim().slice(0,50)+'»').join(' | ');});
      assert.equal(overflow,null,game.id+': expanded route overflow: '+overflow);
      if(['RED','GOLD','SWORD','ZA'].includes(game.id))await allPage.screenshot({path:path.join(resultDir,'route-'+game.id+'-390.png'),fullPage:true});
    }
    // Platinum's starter, gym order and field moves differ from Diamond/Pearl.
    await allPage.locator('#mobile-gen').selectOption('4');
    await allPage.locator('#mobile-game').selectOption('PLATINUM');
    await allPage.locator('[data-mid="PLATINUM-01"] > summary').click();
    assert.match(await allPage.locator('[data-mid="PLATINUM-01"] .route-details').innerText(),/Ruta 201/);
    await allPage.locator('[data-mid="PLATINUM-04"] > summary').click();
    const platinumOrder=await allPage.locator('[data-mid="PLATINUM-04"] .route-details').innerText();
    assert.match(platinumOrder,/Fantina es la tercera/);
    assert.ok(/Brega, cuarta/.test(platinumOrder)||platinumOrder.search(/Fantina es la tercera/)<platinumOrder.search(/vence a Brega/),'Platino: Fantina (tercera) antes que Brega (cuarta)');
    assert.match(platinumOrder,/Ruinas Sosiego/);
    await allPage.locator('[data-mid="PLATINUM-06"] > summary').click();
    assert.match(await allPage.locator('[data-mid="PLATINUM-06"] .route-details').innerText(),/Quinoa[^.]*MO04 Fuerza/);
    await allPage.locator('[data-mid="PLATINUM-DETAIL1"] > summary').click();
    assert.match(await allPage.locator('[data-mid="PLATINUM-DETAIL1"] .route-details').innerText(),/habla con Cintia/);
    assert.equal(await allPage.locator('[data-check]:checked').count(),0);
    await allPage.screenshot({path:path.join(resultDir,'platinum-field-moves-390.png'),fullPage:true});
    for(const game of ['DIAMOND','PEARL']){
      await allPage.locator('#mobile-game').selectOption(game);
      await allPage.locator('[data-mid="'+game+'-04"] > summary').click();
      assert.match(await allPage.locator('[data-mid="'+game+'-04"] .route-details').innerText(),/Torre Perdida/);
      await allPage.locator('[data-mid="'+game+'-05"] > summary').click();
      assert.match(await allPage.locator('[data-mid="'+game+'-05"] .route-details').innerText(),/Gran Pantano/);
      await allPage.locator('[data-mid="'+game+'-06"] > summary').click();
      const originalRoute=await allPage.locator('[data-mid="'+game+'-06"] .route-details').innerText();
      assert.match(originalRoute,/15[^.]*40[^.]*39[^.]*15/);
      assert.match(originalRoute,/[Mm]edalla Reliquia/);
      assert.equal(await allPage.locator('[data-check]:checked').count(),0);
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
    // Identical registrations satisfy Sinnoh but still lack required HGSS species.
    const mythicals4=new Set([151,251,385,386,489,490,491,492,493]);
    const sinnohRegistered=Array.from({length:493},(_,i)=>i+1).filter(id=>!mythicals4.has(id)&&id!==249&&id!==250);
    for(const [game,required] of [['DIAMOND',482],['SOULSILVER',484]]){
      const diagnosis={game,caught:sinnohRegistered,seen:sinnohRegistered,integrity:{checksumsValid:true}};
      await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-gen4.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(diagnosis))});
      await allPage.waitForFunction(id=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.game===id,game);
      await allPage.locator('[data-view="diagnostic"]').first().click();
      assert.match(await allPage.locator('#dex-completion').innerText(),new RegExp('Nacional: 482/'+required));
      if(game==='SOULSILVER'){
        await allPage.locator('#dex-completion details > summary').click();
        assert.match(await allPage.locator('#dex-completion').innerText(),/#249 Lugia/);
        assert.match(await allPage.locator('#dex-completion').innerText(),/#250 Ho-Oh/);
      }
      await allPage.locator('[data-view="mastery"]').first().click();
      const proof=await allPage.locator('#master-card-1').innerText();
      if(game==='DIAMOND')assert.match(proof,/Evidencia/);else assert.doesNotMatch(proof,/Evidencia/);
      assert.equal(await allPage.locator('[data-master]:checked').count(),0);
    }
    // HGSS-specific actions must not inherit G/S gifts or skip the Kimono sequence.
    await allPage.locator('[data-view="mission"]').first().click();
    await allPage.locator('[data-mid="SOULSILVER-07"] > summary').click();
    assert.match(await allPage.locator('[data-mid="SOULSILVER-07"] .route-details').innerText(),/montañero[^.]*Monte Mortero/);
    await allPage.locator('[data-mid="SOULSILVER-09"] > summary').click();
    assert.match(await allPage.locator('[data-mid="SOULSILVER-09"] .route-details').innerText(),/cinco combates seguidos/);
    await allPage.locator('[data-mid="SOULSILVER-E03"] > summary').click();
    assert.match(await allPage.locator('[data-mid="SOULSILVER-E03"] .route-details').innerText(),/Piedra Agua[^.]*desde la bolsa/);
    await allPage.locator('#mobile-gen').selectOption('3');
    // Remake locations and exact completion sets must not inherit the original GB guide.
    await allPage.locator('#mobile-game').selectOption('FIRERED');
    await allPage.locator('[data-mid="FIRERED-15"] > summary').click();
    assert.match(await allPage.locator('[data-mid="FIRERED-15"] .route-details').innerText(),/Monte Ascuas/);
    await allPage.locator('[data-mid="FIRERED-11"] > summary').click();
    assert.match(await allPage.locator('[data-mid="FIRERED-11"] .route-details').innerText(),/superior derecha → inferior derecha → inferior izquierda → inferior izquierda/);
    const exclusions=new Set([151,249,250,251,385,386]);
    const required=Array.from({length:386},(_,i)=>i+1).filter(id=>!exclusions.has(id));
    const frlg={game:'FIRERED',profileId:'synthetic-frlg',caught:required.filter(id=>id!==16).concat(151),seen:[],integrity:{checksumsValid:true}};
    allPage.on('dialog',d=>d.accept());
    await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-frlg.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(frlg))});
    await allPage.waitForFunction(()=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.FIRERED?.caught?.includes(151));
    assert.match(await allPage.locator('#master-card-2').innerText(),/Según tu partida, todavía no/);
    await allPage.locator('[data-view="diagnostic"]').first().click();
    assert.match(await allPage.locator('#dex-completion').innerText(),/Nacional: 379\/380/);
    await allPage.locator('#dex-completion details > summary').first().click();
    assert.match(await allPage.locator('#dex-completion').innerText(),/#016 Pidgey/);
    await allPage.screenshot({path:path.join(resultDir,'frlg-exact-dex-390.png'),fullPage:true});
    await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-frlg-complete.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...frlg,caught:required}))});
    await allPage.waitForFunction(()=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.FIRERED?.caught?.includes(16));
    assert.match(await allPage.locator('#master-card-1').innerText(),/Evidencia/);
    assert.match(await allPage.locator('#master-card-2').innerText(),/Evidencia/);
    assert.equal(await allPage.locator('[data-master]:checked').count(),0);
    await allPage.locator('[data-view="coverage"]').first().click();
    assert.equal(await allPage.locator('[data-coverage-game]').count(),39);
    await allPage.setViewportSize({width:390,height:1000});
    assert.ok(await allPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    // Original/sequel chronology stays distinct in the actual rendered missions.
    await allPage.locator('#mobile-gen').selectOption('5');
    await allPage.locator('[data-view="mission"]').first().click();
    for(const game of ['BLACK','WHITE','BLACK2','WHITE2']){
      await allPage.locator('#mobile-game').selectOption(game);
      for(const suffix of ['05','06','08','09'])await allPage.locator(`[data-mid="${game}-${suffix}"] > summary`).click();
      const text=async suffix=>allPage.locator(`[data-mid="${game}-${suffix}"] .route-details`).innerText();
      if(game.endsWith('2')){
        assert.match(await text('05'),/Bel[^.]*MO02[^.]*Vuelo/);
        assert.match(await text('06'),/Cheren[^.]*MO03[^.]*Surf/);
        assert.match(await text('08'),/cuatro interruptores[^.]*contraseña|contraseña[^.]*cuatro interruptores/);
        assert.match(await text('09'),/[Dd]errota a Iris|Iris: véncela/);
      }else{
        assert.match(await text('05'),/Yakón/);
        assert.match(await text('06'),/Bel[^.]*Vuelo/);
        assert.match(await text('06'),/Huevo Suerte/);
        assert.match(await text('09'),/Mirto.*postgame/);
      }
      assert.ok(await allPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    }
    // A swapped event species cannot fill a National Dex gap in either Gen V family.
    const excluded5=new Set([151,251,385,386,489,490,491,492,493,494,647,648,649]);
    const national5=Array.from({length:649},(_,i)=>i+1).filter(id=>!excluded5.has(id));
    for(const game of ['BLACK','WHITE2']){
      const gap={game,caught:national5.filter(id=>id!==249).concat(151),seen:[],integrity:{verifiedFields:['caught']}};
      await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-unova-gap.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(gap))});
      await allPage.waitForFunction(g=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.[g]?.caught?.includes(151),game);
      assert.match(await allPage.locator('#master-card-1').innerText(),/Según tu partida, todavía no/);
      // Morimoto no deja nada en la partida: la guía lo pregunta en vez de darlo por pendiente.
      assert.match(await allPage.locator('#master-final-boss').innerText(),/Tu partida no guarda este dato: ¿lo has hecho\?/);
      await allPage.locator('[data-view="diagnostic"]').first().click();
      assert.match(await allPage.locator('#dex-completion').innerText(),/Nacional: 635\/636/);
      await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-unova-full.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...gap,caught:national5}))});
      await allPage.waitForFunction(g=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.[g]?.caught?.includes(249),game);
      assert.match(await allPage.locator('#master-card-1').innerText(),/Evidencia: Registro de Pokédex/);
      assert.equal(await allPage.locator('[data-master]:checked').count(),0);
    }
    await allPage.locator('[data-view="mission"]').first().click();
    await allPage.locator('[data-mid="WHITE2-N2"] > summary').click();
    assert.match(await allPage.locator('[data-mid="WHITE2-N2"] .route-details').innerText(),/seis casillas al sur y nueve al este|9 pasos al este y 6 al sur/);
    await allPage.locator('[data-mid="WHITE2-E02"] > summary').click();
    assert.match(await allPage.locator('[data-mid="WHITE2-E02"] .route-details').innerText(),/(Líderes del Mundo|Torneo Mundial de Líderes)[^.]*(diez|10) veces/);
    await allPage.locator('[data-mid="WHITE2-N3"] > summary').click();
    assert.match(await allPage.locator('[data-mid="WHITE2-N3"] .route-details').innerText(),/Pase antes de viajar|hay que recogerlo/);
    // Kalos requires seen registrations; full caught data cannot mask a seen gap.
    const kalosRequired=require('../src/engine/kalos-dex.js').required;
    for(const game of ['X','Y']){
      const d={game,caught:kalosRequired,seen:kalosRequired.filter(id=>id!==650).concat(719),integrity:{verifiedFields:['seen']}};
      await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-kalos-gap.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(d))});
      await allPage.waitForFunction(g=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.[g]?.seen?.includes(719),game);
      assert.match(await allPage.locator('#master-card-1').innerText(),/Según tu partida, todavía no/);
      await allPage.locator('[data-view="diagnostic"]').first().click();
      assert.match(await allPage.locator('#dex-completion').innerText(),/Kalos: 449\/450 vistas/);
      await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-kalos-full.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...d,caught:[],seen:kalosRequired}))});
      await allPage.waitForFunction(g=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.[g]?.seen?.includes(650),game);
      assert.match(await allPage.locator('#master-card-1').innerText(),/Evidencia/);
      assert.equal(await allPage.locator('[data-master]:checked').count(),0);
      await allPage.locator('[data-view="mission"]').first().click();
      for(const suffix of ['04','06','08'])await allPage.locator(`[data-mid="${game}-${suffix}"] > summary`).click();
      assert.match(await allPage.locator(`[data-mid="${game}-04"] .route-details`).innerText(),/Lino[^.]*MO04 Fuerza|MO04 Fuerza de Lino/);
      assert.match(await allPage.locator(`[data-mid="${game}-06"] .route-details`).innerText(),/Pikachu, Fletchling, Panpour/);
      assert.match(await allPage.locator(`[data-mid="${game}-08"] .route-details`).innerText(),game==='X'?/Xerneas/:/Yveltal/);
    }
    const hoennRequired=require('../src/engine/hoenn-dex.js').required;
    for(const game of ['OMEGARUBY','ALPHASAPPHIRE']){
      const d={game,caught:hoennRequired,seen:hoennRequired.filter(id=>id!==252).concat(384),integrity:{verifiedFields:['seen']}};
      await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-hoenn-gap.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(d))});
      await allPage.waitForFunction(g=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.[g]?.seen?.includes(384),game);
      assert.match(await allPage.locator('#master-card-1').innerText(),/Según tu partida, todavía no/);
      await allPage.locator('[data-view="diagnostic"]').first().click();
      assert.match(await allPage.locator('#dex-completion').innerText(),/Hoenn: 207\/208 vistas/);
      await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-hoenn-full.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...d,caught:[],seen:hoennRequired}))});
      await allPage.waitForFunction(g=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.[g]?.seen?.includes(252),game);
      assert.match(await allPage.locator('#master-card-1').innerText(),/Evidencia/);
      assert.doesNotMatch(await allPage.locator('#master-pokedex').innerText(),/Evidencia/);
      assert.equal(await allPage.locator('[data-master]:checked').count(),0);
      await allPage.locator('[data-view="mission"]').first().click();
      for(const suffix of ['04','05','09','11','13'])await allPage.locator(`[data-mid="${game}-${suffix}"] > summary`).click();
      assert.match(await allPage.locator(`[data-mid="${game}-04"] .route-details`).innerText(),/regalo del túnel no es MO04 Fuerza|este regalo no es la MO04 Fuerza/);
      assert.match(await allPage.locator(`[data-mid="${game}-05"] .route-details`).innerText(),/Aura o Bruno entrega MO04 Fuerza|\(Bruno o Aura\) te da la MO04 Fuerza/);
      assert.match(await allPage.locator(`[data-mid="${game}-09"] .route-details`).innerText(),/Máximo[^.]*a su casa/);
      assert.match(await allPage.locator(`[data-mid="${game}-11"] .route-details`).innerText(),/Plubio (tanto en Rubí Omega como en Zafiro Alfa|en las dos ediciones)/);
      assert.match(await allPage.locator(`[data-mid="${game}-13"] .route-details`).innerText(),/Mesprit (aparece|sale) de 04:00 a 19:59/);
    }
    // Original Alola and Ultra keep distinct required bosses, Poni order and first title.
    await allPage.locator('[data-view="mission"]').first().click();
    await allPage.locator('#mobile-gen').selectOption('7');
    for(const game of ['SUN','MOON','ULTRASUN','ULTRAMOON']){
      await allPage.locator('#mobile-game').selectOption(game);
      for(const suffix of ['03','05','07','08'])await allPage.locator(`[data-mid="${game}-${suffix}"] > summary`).click();
      const text=async id=>allPage.locator(`[data-mid="${game}-${id}"] .route-details`).innerText();
      assert.match(await text('03'),game.startsWith('ULTRA')?/Araquanid dominante|dominante Araquanid/:/Wishiwashi dominante|dominante Wishiwashi/);
      assert.match(await text('05'),game.startsWith('ULTRA')?/Togedemaru dominante|dominante Togedemaru/:/Vikavolt dominante|dominante Vikavolt/);
      // Contraseñas de la Mansión Misteriosa: distintas en Ultrasol/Ultraluna (WikiDex «Mansión Misteriosa»).
      assert.match(await text('05'),game.startsWith('ULTRA')?/Puya Nociva[^.]*Bounsweet[^.]*Skittolate[^.]*Nanay/:/Paliza[^.]*Golisopod[^.]*Skittolate[^.]*Nanay/);
      assert.match(await text('07'),game.startsWith('ULTRA')?/Ribombee dominante|dominante Ribombee/:/[Vv]ence a (la kahuna )?Hela[\s\S]*Kommo-o/);
      assert.match(await text('08'),game.startsWith('ULTRA')?/[Vv]ence(r)? a Tilo/:/[Vv]ence a(l profesor)? Kukui/);
      assert.ok(await allPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    }
    // A mythical cannot replace Mewtwo in the 150 Kanto registrations; no manual check is created.
    for(const game of ['LETGOP','LETGOE']){
      const required=Array.from({length:150},(_,i)=>i+1),d={game,caught:required.slice(0,149).concat(151),seen:required,integrity:{verifiedFields:['caught']}};
      await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-kanto-gap.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(d))});
      await allPage.waitForFunction(g=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.game===g,game);
      assert.doesNotMatch(await allPage.locator('#master-pokedex').innerText(),/Evidencia/);
      await allPage.locator('[data-view="diagnostic"]').first().click();
      assert.match(await allPage.locator('#dex-completion').innerText(),/Kanto: 149\/150 registradas/);
      await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-kanto-full.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...d,caught:required,seen:[]}))});
      await allPage.waitForFunction(g=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.[g]?.caught?.includes(150),game);
      assert.match(await allPage.locator('#master-pokedex').innerText(),/Evidencia/);
      assert.equal(await allPage.locator('[data-master]:checked').count(),0);
      await allPage.locator('[data-view="mission"]').first().click();
      await allPage.locator(`[data-mid="${game}-03"] > summary`).click();
      assert.ok(await allPage.locator(`[data-mid="${game}-03"] .route-details`).isVisible());
      assert.ok(await allPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    }
    // BDSP: la estrella de la Pokédex Nacional es CheckZenkokuZukanCompGet (PlayerWork.GetTrainerRank, uDPR), es decir, la
    // propia Pokédex capturada; un premio recibido (Amuleto Iris) sí exige su objeto.
    for(const game of ['BD','SP']){
      const excluded=new Set([151,249,250,251,385,386,489,490,491,492,493]),caught=Array.from({length:493},(_,i)=>i+1).filter(id=>!excluded.has(id));
      await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-bdsp-national.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({game,caught,seen:[],integrity:{verifiedFields:['caught']}}))});
      await allPage.waitForFunction(g=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.game===g,game);
      assert.match(await allPage.locator('#master-pokedex').innerText(),/Evidencia/);
      assert.match(await allPage.locator('#master-card-1').innerText(),/Evidencia/);
      assert.doesNotMatch(await allPage.locator('#master-shiny-charm').innerText(),/Evidencia/);
      await allPage.locator('[data-view="diagnostic"]').first().click();
      assert.match(await allPage.locator('#dex-completion').innerText(),/Nacional: 482\/482 registradas/);
      assert.equal(await allPage.locator('[data-master]:checked').count(),0);
      await allPage.locator('[data-view="mission"]').first().click();
      await allPage.locator(`[data-mid="${game}-12"] > summary`).click();
      assert.ok(await allPage.locator(`[data-mid="${game}-12"] .route-details`).isVisible());
      assert.ok(await allPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    }
    // Stone possession is read separately from manual completion and original gifts.
    const stoneDiagnosis={game:'OMEGARUBY',caught:[],seen:[],integrity:{checksumsValid:true},inventory:[{pocket:'Items',items:[{id:656,count:1},{id:758,count:2}]}]};
    await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-stones.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(stoneDiagnosis))});
    await allPage.waitForFunction(()=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.game==='OMEGARUBY');
    await allPage.locator('[data-view="diagnostic"]').first().click();
    const stoneBook=allPage.locator('[data-oras-stones]');
    assert.match(await stoneBook.locator('[data-stone-summary]').innerText(),/2\/47 tipos presentes/);
    assert.equal(await stoneBook.locator('[data-stone-item]').count(),47);
    await stoneBook.locator('[data-stone-filter]').selectOption('present');
    assert.equal(await stoneBook.locator('[data-stone-item]:visible').count(),2);
    await stoneBook.locator('[data-stone-query]').fill('Metágróssita');
    assert.equal(await stoneBook.locator('[data-stone-item]:visible').count(),1);
    await stoneBook.locator('[data-stone-item="758"] > summary').click();
    assert.match(await stoneBook.locator('[data-stone-item="758"]').innerText(),/primera revancha/);
    await stoneBook.locator('[data-stone-query]').fill('');
    await stoneBook.locator('[data-stone-filter]').selectOption('legacy');
    assert.equal(await stoneBook.locator('[data-stone-item]:visible').count(),1);
    assert.equal(await stoneBook.locator('[data-stone-item]:visible').getAttribute('data-stone-item'),'764');
    assert.equal(await allPage.evaluate(()=>Object.keys(JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1')).checks||{}).filter(k=>k.startsWith('OMEGARUBY-')).length),0);
    assert.ok(await allPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    await allPage.screenshot({path:path.join(resultDir,'oras-stones-390.png'),fullPage:true});
    const crystalDiagnosis={game:'ULTRASUN',caught:[],seen:[],integrity:{checksumsValid:true},inventory:[{pocket:'ZCrystals',items:[{id:807,count:1},{id:927,count:1},{id:776,count:1}]}]};
    await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-crystals.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(crystalDiagnosis))});
    await allPage.waitForFunction(()=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.game==='ULTRASUN');
    await allPage.locator('[data-view="diagnostic"]').first().click();
    const crystals=allPage.locator('[data-alola-crystals]');
    assert.match(await crystals.innerText(),/2\/35 tipos presentes/);
    await crystals.locator('summary').click();
    assert.equal(await crystals.locator('[data-crystal-state="present"]').count(),2);
    assert.equal(await crystals.locator('[data-crystal-id="807"]').getAttribute('data-crystal-state'),'present');
    assert.equal(await crystals.locator('[data-crystal-id="808"]').getAttribute('data-crystal-state'),'absent');
    assert.equal(await crystals.locator('[data-crystal-id="776"]').count(),0);
    assert.ok(await allPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    const alolaRequired=require('../src/engine/alola-dex.js');
    for(const game of ['SUN','MOON','ULTRASUN','ULTRAMOON']){
      const family=game.startsWith('ULTRA')?'ultra':'original',required=alolaRequired[family].alola;
      const d={game,caught:required,seen:[],passport:{mask:0},integrity:{checksumsValid:true}};
      await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-alola-dex.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(d))});
      await allPage.waitForFunction(g=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.game===g,game);
      assert.match(await allPage.locator('#master-pokedex').innerText(),/Evidencia/);
      assert.doesNotMatch(await allPage.locator('#master-card-10').innerText(),/Evidencia/);
      await allPage.locator('[data-view="diagnostic"]').first().click();
      assert.match(await allPage.locator('[data-passport]').innerText(),/0\/15 sellos/);
      assert.ok((await allPage.locator('#dex-completion').innerText()).includes('Alola: '+required.length+'/'+required.length+' registradas'));
      assert.ok(await allPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    }
    const finderDiagnosis={game:'ULTRAMOON',caught:[],seen:[],passport:{mask:1<<14},integrity:{verifiedFields:['passport']}};
    await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-finder-stamp.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(finderDiagnosis))});
    await allPage.waitForFunction(()=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.ULTRAMOON?.passport?.mask===(1<<14));
    assert.match(await allPage.locator('#master-card-13').innerText(),/Evidencia: Sello registrado/);
    assert.doesNotMatch(await allPage.locator('#master-card-14').innerText(),/Evidencia/);
    assert.equal(await allPage.locator('[data-master]:checked').count(),0);
    // Medal receipts, ready rewards and unknown states have separate searchable rows.
    const medalRows=Array.from({length:255},(_,i)=>({id:i+1,state:0}));
    medalRows[0]={id:1,state:4,date:'2026-02-31'};medalRows[1]={id:2,state:3,date:'2026-11-10'};medalRows[254]={id:255,state:7};
    const medalDiagnosis={game:'BLACK2',caught:[],seen:[],integrity:{verifiedFields:['medals']},medals:{medals:medalRows,obtained:255}};
    await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-medals.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(medalDiagnosis))});
    await allPage.waitForFunction(()=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.game==='BLACK2');
    await allPage.locator('[data-view="diagnostic"]').first().click();
    const medalBook=allPage.locator('[data-medal-book]');
    assert.match(await medalBook.innerText(),/1\/255 recibidas/);assert.doesNotMatch(await medalBook.innerText(),/31\/02\/2026/);
    await medalBook.locator('[data-medal-filter]').selectOption('ready');
    assert.equal(await medalBook.locator('[data-medal-id]:visible').count(),1);
    assert.equal(await medalBook.locator('[data-medal-id]:visible').getAttribute('data-medal-id'),'2');
    await medalBook.locator('[data-medal-query]').fill('finalísta');
    assert.equal(await medalBook.locator('[data-medal-id]:visible').count(),1);
    assert.ok(await allPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    await allPage.screenshot({path:path.join(resultDir,'medals-ready-390.png'),fullPage:true});
    await medalBook.locator('[data-medal-query]').fill('');await medalBook.locator('[data-medal-filter]').selectOption('unknown');
    assert.equal(await medalBook.locator('[data-medal-id]:visible').count(),1);
    await allPage.locator('[data-view="mastery"]').first().click();
    assert.doesNotMatch(await allPage.locator('#master-medals').innerText(),/Evidencia/);
    await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-all-medals.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...medalDiagnosis,medals:{medals:medalRows.map(m=>({...m,state:4,date:null}))}}))});
    await allPage.waitForFunction(()=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.BLACK2?.medals?.medals?.[254]?.state===4);
    await allPage.locator('[data-view="mastery"]').first().click();
    assert.match(await allPage.locator('#master-medals').innerText(),/255 medallas recibidas registradas/);
    assert.equal(await allPage.locator('[data-master]:checked').count(),0);
    // GBA documentary flags orient an imported save without ticking historical scenes.
    const gba={game:'FIRERED',caught:[],seen:[],gameClear:null,badgesTotal:8,badgesMask:255,nationalDex:true,
      integrity:{checksumsValid:true},progressSignals:[{id:'story.gba.gameClear',label:'Indicador de Liga superada (GBA)',value:true,validation:'documented'}]};
    await allPage.locator('#file-diagnosis').setInputFiles({name:'synthetic-gba.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(gba))});
    await allPage.waitForFunction(()=>JSON.parse(localStorage.getItem('pokemon-atlas9-progress-v1'))?.evidence?.FIRERED?.badgesMask===255);
    await allPage.locator('[data-view="mission"]').first().click();
    assert.match(await allPage.locator('#app').innerText(),/indicador documentado de Liga superada/);
    assert.equal(await allPage.locator('[data-step]:checked').count(),0);
    assert.equal(await allPage.locator('[data-focus]').first().getAttribute('data-focus'),'FIRERED-15');
    // Documented modern signals guide the route while mastery remains partial (without integrity, even the contrasted
    // end-of-Paldea signal stays partial).
    const modern={game:'SCARLET',caught:[],seen:[],gameClear:null,integrity:{checksumsValid:false},progressSignals:[
      {id:'story.paldea.clear',label:'Indicador de final de Paldea',value:true,validation:'documented'},
      {id:'story.tealMask.clear',label:'Indicador de final de La máscara turquesa',value:null,validation:'documented'}]};
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
    await allPage.goto(`${base}/clasica.html`);
    await allPage.locator('#app button:visible').first().waitFor();
    const recoveryDownload=allPage.waitForEvent('download');await allPage.locator('#backup').click();
    const recoveredRaw=JSON.parse(await fs.promises.readFile(await (await recoveryDownload).path(),'utf8'));
    assert.equal(recoveredRaw.recoveryBackup,damaged);
    await allContext.close();
    // Storage failure must leave an exportable diagnosis and a persistent warning.
    const quotaContext=await browser.newContext(ctx({serviceWorkers:'block'}));
    await quotaContext.addInitScript(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){
      if(k==='archivo-pokemon-v2')throw new DOMException('Synthetic quota limit','QuotaExceededError');
      return original.call(this,k,v);
    };});
    const quotaPage=await quotaContext.newPage();quotaPage.on('pageerror',e=>errors.push(e.message));
    await quotaPage.goto(`${base}/clasica.html`);
    await quotaPage.locator('#saveImportFile').setInputFiles({name:'memory-only.sav',mimeType:'application/octet-stream',buffer:Buffer.from(fixture({caught:[145]}))});
    await quotaPage.getByRole('alert').filter({hasText:'Siguen en memoria'}).waitFor();
    const quotaDownload=quotaPage.waitForEvent('download');await quotaPage.locator('#backup').click();
    const inMemory=JSON.parse(await fs.promises.readFile(await (await quotaDownload).path(),'utf8'));
    assert.deepEqual(inMemory.snapshots.SOULSILVER.caught,[145]);
    await quotaContext.close();
    // Install, go offline, reload both entry points and the new reader module.
    const offline = await browser.newContext(ctx());
    const offlinePage = await offline.newPage();
    offlinePage.on('pageerror', e => errors.push(e.message));
    // La dirección principal salta al Atlas: se instala desde él para no evaluar durante la redirección.
    await offlinePage.goto(`${base}/atlas.html`);
    await offlinePage.evaluate(async () => {await navigator.serviceWorker.ready;});
    await offlinePage.reload();
    await offlinePage.waitForFunction(() => !!navigator.serviceWorker.controller);
    // Closing the origin exercises cached navigation in both engines. WebKit
    // offline emulation can fail before dispatching the service-worker fetch.
    server.closeAllConnections();
    await new Promise(resolve=>server.close(resolve));
    for (const file of ['atlas.html']) {
      await offlinePage.goto(`${base}/${file}`);
      await offlinePage.locator('#app button:visible').first().waitFor();
      if (file === 'clasica.html') assert.equal(await offlinePage.evaluate(() => typeof PokemonHGSSIntegrity.inspect), 'function');
      if(file==='atlas.html'){await offlinePage.setViewportSize({width:390,height:1000});await offlinePage.locator('#mobile-gen').selectOption('1');await offlinePage.locator('#mobile-game').selectOption('RED');await offlinePage.locator('[data-mid="RED-01"] > summary').click();await offlinePage.locator('[data-mid="RED-01"] .route-details').waitFor();assert.match(await offlinePage.locator('[data-mid="RED-01"] .route-details').innerText(),/paquete destinado al profesor|Correo Oak \(el paquete del profesor\)/);await offlinePage.locator('#mobile-gen').selectOption('3');await offlinePage.locator('#mobile-game').selectOption('EMERALD');await offlinePage.locator('[data-mid="EMERALD-11"] > summary').click();await offlinePage.locator('[data-ice-platform="3"] [data-ice-delta="1"]').click();assert.equal(await offlinePage.locator('[data-ice-platform="3"]').getAttribute('data-ice-step'),'1');}
      if(file==='atlas.html'){
        await offlinePage.locator('#mobile-gen').selectOption('4');
        await offlinePage.locator('#mobile-game').selectOption('PLATINUM');
        await offlinePage.locator('[data-mid="PLATINUM-06"] > summary').click();
        assert.match(await offlinePage.locator('[data-mid="PLATINUM-06"] .route-details').innerText(),/Quinoa[^.]*MO04 Fuerza/);
        await offlinePage.locator('#mobile-game').selectOption('DIAMOND');
        await offlinePage.locator('[data-mid="DIAMOND-06"] > summary').click();
        assert.match(await offlinePage.locator('[data-mid="DIAMOND-06"] .route-details').innerText(),/15[^.]*40[^.]*39[^.]*15/);
        await offlinePage.locator('#mobile-game').selectOption('SOULSILVER');
        await offlinePage.locator('[data-mid="SOULSILVER-09"] > summary').click();
        assert.match(await offlinePage.locator('[data-mid="SOULSILVER-09"] .route-details').innerText(),/cinco combates seguidos/);
        await offlinePage.locator('#mobile-gen').selectOption('5');
        await offlinePage.locator('#mobile-game').selectOption('WHITE2');
        await offlinePage.locator('[data-mid="WHITE2-08"] > summary').click();
        assert.match(await offlinePage.locator('[data-mid="WHITE2-08"] .route-details').innerText(),/Tarjeta Plasma/);
        await offlinePage.locator('[data-mid="WHITE2-N2"] > summary').click();
        assert.match(await offlinePage.locator('[data-mid="WHITE2-N2"] .route-details').innerText(),/seis casillas al sur y nueve al este|9 pasos al este y 6 al sur/);
        await offlinePage.locator('#mobile-gen').selectOption('6');
        await offlinePage.locator('#mobile-game').selectOption('X');
        await offlinePage.locator('[data-mid="X-06"] > summary').click();
        assert.match(await offlinePage.locator('[data-mid="X-06"] .route-details').innerText(),/Pikachu, Fletchling, Panpour/);
        assert.equal(await offlinePage.evaluate(()=>PokemonCompletion.dexStatus({game:'X',seen:PokemonKalosDex.required}).kalos.complete),true);
        await offlinePage.locator('#mobile-game').selectOption('OMEGARUBY');
        await offlinePage.locator('[data-mid="OMEGARUBY-05"] > summary').click();
        assert.match(await offlinePage.locator('[data-mid="OMEGARUBY-05"] .route-details').innerText(),/Aura o Bruno entrega MO04 Fuerza|\(Bruno o Aura\) te da la MO04 Fuerza/);
        assert.equal(await offlinePage.evaluate(()=>PokemonCompletion.dexStatus({game:'OMEGARUBY',seen:PokemonHoennDex.required}).hoenn.complete),true);
        await offlinePage.locator('[data-mid="OMEGARUBY-14"] > summary').click();
        const offlineStones=offlinePage.locator('[data-oras-stones]');
        assert.equal(await offlineStones.locator('[data-stone-item]').count(),47);
        await offlineStones.locator('[data-stone-query]').fill('malvamar');
        assert.equal(await offlineStones.locator('[data-stone-item]:visible').count(),1);
        await offlineStones.locator('[data-stone-item="770"] > summary').click();
        assert.match(await offlineStones.locator('[data-stone-item="770"]').innerText(),/Llave Almacén/);
        await offlinePage.locator('#mobile-gen').selectOption('7');
        await offlinePage.locator('#mobile-game').selectOption('SUN');
        await offlinePage.locator('[data-mid="SUN-05"] > summary').click();
        assert.match(await offlinePage.locator('[data-mid="SUN-05"] .route-details').innerText(),/Centro Pokémon[^.]*RotomDex[^.]*Charjabug[^.]*Pokémon dominante/);
        await offlinePage.locator('#mobile-game').selectOption('ULTRAMOON');
        await offlinePage.locator('[data-mid="ULTRAMOON-07"] > summary').click();
        assert.match(await offlinePage.locator('[data-mid="ULTRAMOON-07"] .route-details').innerText(),/Flor Irisada/);
        await offlinePage.locator('#file-diagnosis').setInputFiles({name:'synthetic-crystals-offline.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(crystalDiagnosis))});
        await offlinePage.locator('[data-view="diagnostic"]').first().click();
        assert.match(await offlinePage.locator('[data-alola-crystals]').innerText(),/2\/35 tipos presentes/);
        await offlinePage.locator('#file-diagnosis').setInputFiles({name:'synthetic-passport-offline.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(finderDiagnosis))});
        await offlinePage.locator('[data-view="diagnostic"]').first().click();
        assert.match(await offlinePage.locator('[data-passport]').innerText(),/1\/15 sellos/);
        assert.equal(await offlinePage.evaluate(()=>PokemonCompletion.dexStatus({game:'ULTRASUN',caught:PokemonAlolaDex.ultra.alola}).alola.complete),true);







        await offlinePage.locator('#file-diagnosis').setInputFiles({name:'synthetic-medals-offline.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(medalDiagnosis))});
        await offlinePage.locator('[data-view="diagnostic"]').first().click();
        await offlinePage.locator('[data-medal-filter]').selectOption('ready');
        assert.equal(await offlinePage.locator('[data-medal-id]:visible').count(),1);
      }
    }
    await offline.close();
    assert.deepEqual(errors, []);
    console.log(engine+': Responsive layout, direct route without quizzes, preserved historical answers, local import, rejected corruption, restoration, and offline navigation passed.');
  } finally {await browser.close();}
}
run().catch(e => {console.error(e); process.exitCode = 1;}).finally(() => server.close());
