// SPDX-License-Identifier: GPL-3.0-or-later
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{execFileSync}=require('node:child_process');
const goals=require('../src/guides/mission-goals.js'),{catalogue}=require('../scripts/audit.cjs');
test('cada objetivo de maestría tiene su bloque en una misión existente de su juego',()=>{
 const html=fs.readFileSync('atlas.html','utf8'),cat=catalogue(html);
 const i=html.indexOf('MASTER_DATA={')+12;let d=0,j=i,str=false,esc=false;for(;j<html.length;j++){const c=html[j];if(str){if(esc)esc=false;else if(c==='\\')esc=true;else if(c==='"')str=false;continue;}if(c==='"')str=true;else if(c==='{')d++;else if(c==='}'){d--;if(!d){j++;break;}}}
 const MD=JSON.parse(html.slice(i,j));let n=0;
 for(const g of cat.games)for(const o of MD[g.id]||[]){const m=goals.missionOf(g.id,o.id);assert.ok(m,g.id+'/'+o.id+' sin misión');assert.ok(g.missions.some(x=>x.id===m),g.id+'/'+o.id+' → '+m);n++;}
 assert.equal(n,Object.values(MD).flat().length);
});
test('el fichero generado está al día con atlas.html',()=>{
 const before=fs.readFileSync('src/guides/mission-goals.js','utf8');execFileSync('node',['scripts/build-mission-goals.cjs']);
 assert.equal(fs.readFileSync('src/guides/mission-goals.js','utf8'),before);
});
test('las ligaduras conocidas de SoulSilver caen en su misión',()=>{
 assert.equal(goals.missionOf('SOULSILVER','unown'),'SOULSILVER-E03');assert.equal(goals.missionOf('SOULSILVER','card-3'),'SOULSILVER-15');
 assert.equal(goals.missionOf('SOULSILVER','story'),'SOULSILVER-09');assert.equal(goals.missionOf('SOULSILVER','pokemon-250'),'SOULSILVER-14');
});
