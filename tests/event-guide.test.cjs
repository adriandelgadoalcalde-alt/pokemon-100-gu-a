// Pruebas sintéticas del motor común de hitos y secretos (paquete de la 4.ª generación).
const test=require('node:test'),assert=require('node:assert/strict');
const guide=require('../src/engine/event-guide.js'),gen4=require('../src/saves/gen4-data.js');
const F=gen4.families.HGSS;
const events=(flags=[],vars={})=>{const work=new Array(400).fill(0);for(const [k,v]of Object.entries(vars))work[F.vars[k]]=v;return {activeFlags:flags.map(f=>F.flags[f]),work};};

test('los índices resueltos de HGSS coinciden con los documentados en la investigación previa',()=>{
 assert.equal(F.flags.FLAG_CAUGHT_ZAPDOS,0x14A);assert.equal(F.flags.FLAG_CAUGHT_MOLTRES,0x16D);assert.equal(F.flags.FLAG_CAUGHT_GROUDON,0x179);
 assert.equal(F.vars.VAR_UNK_40FD,253);assert.equal(F.vars.VAR_UNK_4131,305);assert.equal(F.vars.VAR_SCENE_EMBEDDED_TOWER,249);
});

test('la historia usa medallas y banderas, y el siguiente hito es el primero pendiente',()=>{
 const a=guide.analyze({events:events(['FLAG_GOT_STARTER']),badgesTotal:3,caught:[]},'SOULSILVER');
 assert.equal(a.story.rows[3].state,'direct');assert.equal(a.story.next.id,'SOULSILVER-05');
});

test('sin lectura de medallas el hito queda sin dato, no como cero',()=>{
 const a=guide.analyze({events:events(),caught:[]},'HEARTGOLD');
 assert.equal(a.story.rows[1].set,null);
});

test('errantes: capturado, derrotado (en curso) y sin resolver se distinguen',()=>{
 const a=guide.analyze({events:events([],{VAR_ROAMER_RAIKOU_STATUS:1,VAR_ROAMER_ENTEI_STATUS:2}),caught:[]},'HEARTGOLD');
 const s=id=>a.secrets.find(x=>x.id===id).status;
 assert.equal(s('hgss.raikou'),'completado');assert.equal(s('hgss.entei'),'en curso');assert.equal(s('hgss.latias'),'pendiente');
});

test('cada edición solo ve sus exclusivas',()=>{
 const ids=g=>guide.analyze({events:events(),caught:[]},g).secrets.map(x=>x.id);
 assert.ok(ids('SOULSILVER').includes('hgss.groudon'));assert.ok(!ids('SOULSILVER').includes('hgss.kyogre'));
 assert.ok(ids('HEARTGOLD').includes('hgss.latias'));assert.ok(!ids('HEARTGOLD').includes('hgss.latios'));
});

test('tener la especie en la Pokédex no completa el encuentro original',()=>{
 const a=guide.analyze({events:events(),caught:[145]},'SOULSILVER');
 const z=a.secrets.find(x=>x.id==='hgss.zapdos');
 assert.equal(z.status,'pendiente');assert.equal(z.species[0].caught,true);
});

test('el regalo de Oak se acredita desde la fase 3 de su variable',()=>{
 const s=v=>guide.analyze({events:events([],{VAR_UNK_4131:v}),caught:[]},'SOULSILVER').secrets.find(x=>x.id==='hgss.oak_kanto_starter').status;
 assert.equal(s(2),'pendiente');assert.equal(s(3),'completado');assert.equal(s(6),'completado');
});

test('Platino: Regis por estado de las ruinas, con no capturado como definitivo',()=>{
 const P=gen4.families.PT,work=new Array(400).fill(0);
 const regi=require('../src/saves/gen4-data.js').secrets.find(s=>s.id==='pt.regirock').conditions.PT;
 work[P.vars.VAR_ROCK_PEAK_RUINS_STATE]=regi.lostVar[0].equals;
 const a=guide.analyze({events:{activeFlags:[],work},caught:[]},'PLATINUM');
 assert.equal(a.secrets.find(x=>x.id==='pt.regirock').status,'perdido');
 work[P.vars.VAR_ROCK_PEAK_RUINS_STATE]=regi.doneVar.equals;
 assert.equal(guide.analyze({events:{activeFlags:[],work},caught:[]},'PLATINUM').secrets.find(x=>x.id==='pt.regirock').status,'completado');
});

test('Platino: la Liga se lee de su bandera de juego completado',()=>{
 const P=gen4.families.PT;
 const a=guide.analyze({events:{activeFlags:[P.flags.FLAG_GAME_COMPLETED],work:[]},badgesTotal:8,caught:[]},'PLATINUM');
 assert.equal(a.story.next,null);assert.equal(a.story.rows.at(-1).state,'direct');
});

test('Game Boy: eventos con nombre y exclusión de idiomas sin fuente',()=>{
 const gb=require('../src/saves/gen12-data.js'),C=gb.families.C;
 const ev={activeFlags:[C.flags.EVENT_GOT_A_POKEMON_FROM_ELM,C.flags.EVENT_BEAT_FALKNER],work:[]};
 const a=guide.analyze({events:ev,caught:[]},'CRYSTAL');
 assert.equal(a.story.next.id,'CRYSTAL-03');
 assert.equal(guide.analyze({events:ev,caught:[],languageId:1},'CRYSTAL'),null);
 const ho=a.secrets.find(s=>s.id==='gen2.hooh.c');assert.match(ho.requires,/Raikou, Entei y Suicune/);
});

test('Game Boy: el Dojo acredita cualquiera de los dos regalos',()=>{
 const gb=require('../src/saves/gen12-data.js'),R=gb.families.RB;
 const a=guide.analyze({events:{activeFlags:[R.flags.EVENT_GOT_HITMONCHAN],work:[]},caught:[]},'RED');
 assert.equal(a.secrets.find(s=>s.id==='gen1.dojo').status,'completado');
});
