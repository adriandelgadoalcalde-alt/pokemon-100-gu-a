const {chromium} = require('playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {fixture} = require('./helpers.cjs');

const root = path.resolve(__dirname, '..');
const server = http.createServer((req, res) => {
  let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (name === '/') name = '/index.html';
  if (!/^\/(index\.html|atlas\.html|sw\.js|manifest\.webmanifest|icons\/[\w.-]+|src\/saves\/[\w.-]+)$/.test(name)) {
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
  const browser = await chromium.launch({headless: true});
  const errors = [];
  try {
    fs.mkdirSync('test-results', {recursive: true});
    for (const width of [390, 768, 1024, 1366, 1440]) {
      const context = await browser.newContext({viewport: {width, height: 1000}, serviceWorkers: 'block'});
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      for (const file of ['index.html', 'atlas.html']) {
        await page.goto(`${base}/${file}`);
        await page.locator('#app button:visible').first().waitFor();
        const dimensions = await page.evaluate(() => ({width: innerWidth, scroll: document.documentElement.scrollWidth}));
        assert.ok(dimensions.scroll <= dimensions.width + 1, `${file}: horizontal overflow at ${width}`);
        await page.screenshot({path: `test-results/${file}-${width}.png`, fullPage: true});
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
    // The diagnosis lists unknown requirements without converting them into completions.
    await page.locator('#openSaved').click();
    await page.getByRole('heading', {name: 'Qué hemos leído de tu partida', exact: true}).waitFor();
    assert.ok(await page.locator('.reading-gaps [data-open]').count() > 0);
    await page.locator('.reading-gaps').locator('..').locator('summary').click();
    const priorMission = page.locator('.reading-gaps li').filter({hasText: 'Terminar: Ciudad Iris: Morti y los perros legendarios'});
    assert.equal(await priorMission.getByRole('button').getAttribute('data-open'), 'soulsilver-7');
    await page.screenshot({path: 'test-results/diagnosis-direct-route.png', fullPage: true});
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
    await context.close();
    // Install, go offline, reload both entry points and the new reader module.
    const offline = await browser.newContext();
    const offlinePage = await offline.newPage();
    offlinePage.on('pageerror', e => errors.push(e.message));
    await offlinePage.goto(base);
    await offlinePage.evaluate(async () => {await navigator.serviceWorker.ready;});
    await offlinePage.reload();
    await offlinePage.waitForFunction(() => !!navigator.serviceWorker.controller);
    await offline.setOffline(true);
    for (const file of ['index.html', 'atlas.html']) {
      await offlinePage.goto(`${base}/${file}`);
      await offlinePage.locator('#app button:visible').first().waitFor();
      if (file === 'index.html') assert.equal(await offlinePage.evaluate(() => typeof PokemonHGSSIntegrity.inspect), 'function');
    }
    await offline.close();
    assert.deepEqual(errors, []);
    console.log('Responsive layout, direct route without quizzes, preserved historical answers, local import, rejected corruption, restoration, and offline navigation passed.');
  } finally {await browser.close();}
}
run().catch(e => {console.error(e); process.exitCode = 1;}).finally(() => server.close());
