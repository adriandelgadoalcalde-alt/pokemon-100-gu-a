const fs = require('node:fs');
const path = require('node:path');
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
  const classic = fs.readFileSync(`${root}/clasica.html`, 'utf8');
  const atlas = fs.readFileSync(`${root}/atlas.html`, 'utf8');
  const db = JSON.parse(classic.match(/<script id="data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
  const catalog = catalogue(atlas);
  const classicTasks = db.games.flatMap(g => g.chapters.flatMap(c => c.tasks));
  const atlasTasks = catalog.games.flatMap(g => g.missions);
  const errors = [];
  for (const [name, html] of [['clasica.html', classic], ['atlas.html', atlas]])
    for (const code of scripts(html))
      for (const duplicate of duplicates(code)) errors.push(`${name}: función duplicada ${duplicate}`);
  const sw=acorn.parse(fs.readFileSync(`${root}/sw.js`,'utf8'),{ecmaVersion:'latest'});
  let cacheFiles=[];
  walk(sw,n=>{if(n.type==='VariableDeclarator'&&n.id.name==='CORE')cacheFiles=n.init.elements.map(x=>x.value);});
  for(const html of [classic,atlas])for(const match of html.matchAll(/<script\b[^>]*src="(\.[^"]+)"/g)){
    if(!fs.existsSync(path.join(root,match[1])))errors.push('Módulo local ausente: '+match[1]);
    if(!cacheFiles.includes(match[1]))errors.push('Módulo ausente de la caché offline: '+match[1]);
  }
  for(const folder of ['src/saves','src/engine','src/guides'])for(const file of fs.readdirSync(`${root}/${folder}`)){
    if(!file.endsWith('.js'))continue;
    for(const duplicate of duplicates(fs.readFileSync(`${root}/${folder}/${file}`,'utf8')))errors.push(`${file}: función duplicada ${duplicate}`);
  }
  let rules={},masters={};
  for(const code of scripts(classic))walk(acorn.parse(code,{ecmaVersion:'latest'}),n=>{
    if(n.type==='VariableDeclarator'&&n.id.name==='V8_OWN_SS_FINGERPRINT')errors.push('No vincular declaraciones personales incrustadas a una huella pública.');
    if(n.type==='VariableDeclarator'&&n.id.name==='V8_RULES')rules=JSON.parse(code.slice(n.init.start,n.init.end));
    if(n.type==='VariableDeclarator'&&n.id.name==='FIVE_SAVE_AUDITS'&&n.init.properties.length)errors.push('No incrustar diagnósticos personales en el HTML público.');
  });
  for(const code of scripts(atlas))walk(acorn.parse(code,{ecmaVersion:'latest'}),n=>{
    if(n.type==='VariableDeclarator'&&n.id.name==='MASTER_DATA')masters=JSON.parse(code.slice(n.init.start,n.init.end));
  });
  const lookup=new Map(classicTasks.map(t=>[t.id,t]));
  for(const [id,rule]of Object.entries(rules))for(const req of rule.req||[]){
    if(!lookup.has(id))errors.push('Regla para misión inexistente: '+id);
    if(req.task&&!lookup.has(req.task))errors.push('Prerrequisito inexistente: '+req.task);
    if(req.type==='step'&&lookup.has(req.task)&&(!Number.isInteger(req.index)||req.index<0||req.index>=lookup.get(req.task).steps.length))errors.push('Paso de prerrequisito inexistente: '+id);
  }
  for(const [id,goals]of Object.entries(masters))if(new Set(goals.map(g=>g.id)).size!==goals.length)errors.push('Objetivos de maestría duplicados: '+id);
  for (const [name, tasks] of [['clásica', classicTasks], ['Atlas', atlasTasks]]) {
    const ids = new Set();
    for (const task of tasks) {
      if (ids.has(task.id)) errors.push(`${name}: ID duplicado ${task.id}`);
      if (!task.steps?.length) errors.push(`${name}: objetivo sin pasos ${task.id}`);
      ids.add(task.id);
    }
  }
  for(const game of catalog.games)if(!game.missions.some(m=>m.id===game.mainStoryLastMission))errors.push('Límite de historia ausente o inválido: '+game.id);
  const book=require('../src/guides/routes.js'),routeKeys=new Set(),guideEditions=new Set();
  for(const r of book.routes){
    if(!r.games?.length||!r.mission||!r.location||!r.check||!Array.isArray(r.requires)||!Array.isArray(r.pitfalls)||!r.steps?.length||r.steps.some(s=>typeof s!=='string'||!s.trim()))errors.push('Ruta ampliada incompleta: '+r.mission);
    if(!r.sources?.length||r.sources.some(u=>!/^https:\/\/(www\.serebii\.net|github\.com|www\.pokemon\.com|legends\.arceus\.pokemon\.com|www\.smogon\.com|www\.wikidex\.net|bulbapedia\.bulbagarden\.net)\//.test(u)))errors.push('Ruta sin referencia pública válida: '+r.mission);
    for(const id of r.games||[]){
      const key=id+'-'+r.mission,g=catalog.games.find(g=>g.id===id);
      if(!g?.missions.some(m=>m.id===key))errors.push('Ruta para misión inexistente: '+key);
      if(routeKeys.has(key))errors.push('Ruta repetida: '+key);routeKeys.add(key);guideEditions.add(id);
    }
  }
  if(catalog.games.reduce((n,g)=>n+book.stats(g.id),0)!==routeKeys.size)errors.push('El recuento de rutas ampliadas duplica misiones entre ediciones.');
  const walkthrough={authoredRoutes:book.routes.length,detailedMissionLinks:routeKeys.size,editions:guideEditions.size,
    generations:new Set(catalog.games.filter(g=>guideEditions.has(g.id)).map(g=>g.generation)).size};
  const levels = {};
  for (const task of atlasTasks) levels[task.verified || 'sin etiqueta'] = (levels[task.verified || 'sin etiqueta'] || 0) + 1;
  return {classic: {editions: db.games.length, missions: classicTasks.length},
    atlas: {editions: catalog.games.length, generations: new Set(catalog.games.map(g => g.generation)).size,
      missions: atlasTasks.length, steps: atlasTasks.reduce((n, t) => n + t.steps.length, 0), levels},
    walkthrough,masteryGoals:Object.values(masters).reduce((n,g)=>n+g.length,0),browserReaders:require('../src/saves/diagnosis.js').supported,errors};
}
module.exports = {scripts, walk, duplicates, catalogue, audit};
if (require.main === module) {
  const result = audit();
  console.log(JSON.stringify(result, null, 2));
  if (result.errors.length) process.exitCode = 1;
}
