// SPDX-License-Identifier: GPL-3.0-or-later
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
test('El menú de ediciones de la guía clásica lista las mismas 39 ediciones que el Atlas',()=>{
 const atlas=fs.readFileSync(path.join(root,'atlas.html'),'utf8'),index=fs.readFileSync(path.join(root,'clasica.html'),'utf8');
 const at=atlas.indexOf('const CATALOG=')+'const CATALOG='.length;
 let depth=0,end=at;for(;end<atlas.length;end++){const c=atlas[end];if(c==='{')depth++;else if(c==='}'&&--depth===0){end++;break;}}
 const catalog=JSON.parse(atlas.slice(at,end)).games.map(g=>({id:g.id,name:g.name,generation:g.generation}));
 const m=/const ATLAS_EDITIONS=(\[.*?\]);/.exec(index);assert.ok(m,'falta ATLAS_EDITIONS');
 assert.deepEqual(JSON.parse(m[1]),catalog);
 assert.ok(atlas.includes("new URLSearchParams(location.search).get('game')"),'el Atlas no abre la edición enlazada');
});
test('La guía clásica no manda usar PKHeX: los eventos se hacen con Pokekeep',()=>{
 const index=fs.readFileSync(path.join(root,'clasica.html'),'utf8');
 const bad=index.match(/PKHeX(?![.\w-]*Core)(?!\.Core)(?!\/)/g)||[];
 assert.deepEqual(bad.filter(x=>x),[],'menciones de PKHeX fuera de las referencias técnicas a PKHeX.Core');
});

test('Una sola página: la dirección principal abre el Atlas y nada enlaza a la guía clásica',()=>{
 const index=fs.readFileSync(path.join(root,'index.html'),'utf8'),atlas=fs.readFileSync(path.join(root,'atlas.html'),'utf8');
 assert.match(index,/location\.replace\('\.\/atlas\.html'/);
 assert.ok(!/clasica\.html|index\.html|Lector de guardados v8|guía clásica/.test(atlas),'el Atlas enlaza a la guía antigua');
});
