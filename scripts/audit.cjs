const fs = require('node:fs');
const acorn = require('acorn');

function scripts(html) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(m => !/application\/json|\bsrc\s*=/.test(m[1])).map(m => m[2]);
}
function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  visit(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(n => walk(n, visit));
    else if (value && typeof value === 'object') walk(value, visit);
  }
}
function duplicates(code) {
  const found = [];
  walk(acorn.parse(code, {ecmaVersion: 'latest'}), node => {
    if (!['Program', 'BlockStatement'].includes(node.type)) return;
    const seen = new Set();
    for (const child of node.body) {
      if (child.type !== 'FunctionDeclaration') continue;
      if (seen.has(child.id.name)) found.push(child.id.name);
      seen.add(child.id.name);
    }
  });
  return found;
}
function catalogue(html) {
  const code = scripts(html).find(s => s.includes('const CATALOG='));
  let data;
  walk(acorn.parse(code, {ecmaVersion: 'latest'}), n => {
    if (n.type === 'VariableDeclarator' && n.id.name === 'CATALOG')
      data = JSON.parse(code.slice(n.init.start, n.init.end));
  });
  return data;
}
function audit(root = '.') {
  const classic = fs.readFileSync(`${root}/index.html`, 'utf8');
  const atlas = fs.readFileSync(`${root}/atlas.html`, 'utf8');
  const db = JSON.parse(classic.match(/<script id="data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
  const catalog = catalogue(atlas);
  const classicTasks = db.games.flatMap(g => g.chapters.flatMap(c => c.tasks));
  const atlasTasks = catalog.games.flatMap(g => g.missions);
  const errors = [];
  for (const [name, html] of [['index.html', classic], ['atlas.html', atlas]])
    for (const code of scripts(html))
      for (const duplicate of duplicates(code)) errors.push(`${name}: función duplicada ${duplicate}`);
  for (const [name, tasks] of [['clásica', classicTasks], ['Atlas', atlasTasks]]) {
    const ids = new Set();
    for (const task of tasks) {
      if (ids.has(task.id)) errors.push(`${name}: ID duplicado ${task.id}`);
      if (!task.steps?.length) errors.push(`${name}: objetivo sin pasos ${task.id}`);
      ids.add(task.id);
    }
  }
  const levels = {};
  for (const task of atlasTasks) levels[task.verified || 'sin etiqueta'] = (levels[task.verified || 'sin etiqueta'] || 0) + 1;
  return {classic: {editions: db.games.length, missions: classicTasks.length},
    atlas: {editions: catalog.games.length, generations: new Set(catalog.games.map(g => g.generation)).size,
      missions: atlasTasks.length, steps: atlasTasks.reduce((n, t) => n + t.steps.length, 0), levels}, errors};
}
module.exports = {scripts, walk, duplicates, catalogue, audit};
if (require.main === module) {
  const result = audit();
  console.log(JSON.stringify(result, null, 2));
  if (result.errors.length) process.exitCode = 1;
}
