// SPDX-License-Identifier: GPL-3.0-or-later
/* Liga cada objetivo de maestría (MASTER_DATA de atlas.html) a la misión de la ruta en la que se hace y escribe
   src/guides/mission-goals.js. Orden de decisión:
   1. research/guides/mision-objetivos.json (decisiones a mano: {"JUEGO": {"objetivo": "JUEGO-NN"}});
   2. la regla de prueba de la misión (mission-proof.js);
   3. «story» va a la última misión de la historia;
   4. la misión cuyo título y paso a paso preciso nombran el objetivo (para «Registrar a X», el nombre de X; si
      no, las palabras propias de su título), la primera para un Pokémon y la más afín para lo demás;
   5. si nada encaja, la misión de completismo del juego (la última de «Postgame y 100%»).
   Uso: node scripts/build-mission-goals.cjs */
'use strict';
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(ROOT,'atlas.html'),'utf8');
const {catalogue}=require('./audit.cjs');
const routes=require('../src/guides/routes.js'),proof=require('../src/guides/mission-proof.js');
function json(after){const i=html.indexOf(after)+after.length;let d=0,j=i,str=false,esc=false;for(;j<html.length;j++){const ch=html[j];if(str){if(esc)esc=false;else if(ch==='\\')esc=true;else if(ch==='"')str=false;continue;}if(ch==='"')str=true;else if(ch==='{')d++;else if(ch==='}'){d--;if(!d){j++;break;}}}return JSON.parse(html.slice(i,j));}
const MD=json('MASTER_DATA=');const cat=catalogue(html);
const manualFile=path.join(ROOT,'research/guides/mision-objetivos.json');
const manual=fs.existsSync(manualFile)?JSON.parse(fs.readFileSync(manualFile,'utf8')):{};
const STOP=new Set('registrar pokédex partida esta edición según conseguir completar vencer derrotar obtener todos todas desde tras entre sobre contra hasta donde cuando cuatro cinco tres seis siete ocho nueve diez primera primer segunda tercer combate combates objeto objetos ambas regiones región juego juegos historia aplicable equipo equipos nivel'.split(' '));
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const words=s=>[...new Set(norm(s).split(/[^a-zñ0-9]+/).filter(w=>w.length>=5&&!STOP.has(w)))];
const out={},report={};
for(const g of cat.games){
 const missions=g.missions.map((m,idx)=>{const r=routes.get(g.id,m.id);const text=norm([m.title,...(r?r.steps:m.steps),m.caution||''].join(' '));return {m,idx,text,title:norm(m.title)};});
 const post=missions.filter(x=>x.m.section!=='Historia'&&!/DETAIL/.test(x.m.id)&&!/-E\d/.test(x.m.id)&&!/-N\d/.test(x.m.id));
 const fallback=(post.length?post[post.length-1]:missions[missions.length-1]).m.id;
 const map={},why={};
 for(const goal of MD[g.id]||[]){
  let mid=manual[g.id]?.[goal.id],how='a mano';
  if(!mid){const p=missions.find(x=>(proof.goalsFor(g.id,x.m.id)||[]).includes(goal.id));if(p){mid=p.m.id;how='regla de prueba';}}
  // Diplomas, amuletos, ficha y Pokédex (fases 5 y 6) se cierran al final: misión de completismo.
  if(!mid&&(goal.phase===5||goal.phase===6)){mid=fallback;how='completismo (fase '+goal.phase+')';}
  if(!mid&&goal.id==='story'){mid=g.mainStoryLastMission||missions.filter(x=>x.m.section==='Historia').pop().m.id;how='historia';}
  if(!mid){
   const sp=/^Registrar a (.+?) en la Pokédex/.exec(goal.label);
   if(sp){const name=norm(sp[1]);const hit=missions.find(x=>new RegExp('(^|[^a-z])'+name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'([^a-z]|$)').test(x.text));if(hit){mid=hit.m.id;how='nombra a '+sp[1];}}
   else{const ws=words(goal.label);let best=null,bs=0;for(const x of missions){let sc=0;for(const w of ws){if(x.title.includes(w))sc+=2;else if(x.text.includes(w))sc+=1;}if(sc>bs||(sc===bs&&sc>0&&x.m.section!=='Historia')){best=x;bs=sc;}}
    if(best&&bs>=2){mid=best.m.id;how='afinidad '+bs;}}
  }
  if(!mid){mid=fallback;how='completismo';}
  if(!g.missions.some(m=>m.id===mid))throw Error(g.id+'/'+goal.id+': misión inexistente '+mid);
  map[goal.id]=mid;why[goal.id]=how;
 }
 out[g.id]=map;report[g.id]=why;
}
const body='// SPDX-License-Identifier: GPL-3.0-or-later\n/* Generado por scripts/build-mission-goals.cjs: misión de la ruta en la que se hace cada objetivo de maestría.\n   No editar a mano; las decisiones manuales van en research/guides/mision-objetivos.json. */\n(function(root){const byGame='+JSON.stringify(out)+';\nfunction missionOf(game,goal){return byGame[game]?.[goal]||null;}\nfunction goalsOf(game,mission){return Object.entries(byGame[game]||{}).filter(([,m])=>m===mission).map(([g])=>g);}\nconst api={byGame,missionOf,goalsOf};if(typeof module===\'object\'&&module.exports)module.exports=api;else root.PokemonMissionGoals=api;\n})(typeof globalThis===\'object\'?globalThis:this);\n';
fs.writeFileSync(path.join(ROOT,'src/guides/mission-goals.js'),body);
if(process.argv.includes('--informe'))console.log(JSON.stringify(report,null,1));
const n=Object.values(out).reduce((a,m)=>a+Object.keys(m).length,0);console.log('Objetivos ligados a su misión:',n);
