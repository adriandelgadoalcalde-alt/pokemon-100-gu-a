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

test('PKHeX: las exclusivas siguen la etiqueta de versión y la historia por medallas guía desde el principio',()=>{
 const pk=require('../src/saves/pkhex-data.js'),O=pk.families.ORAS;
 const ids=g=>guide.analyze({events:{activeFlags:[],work:[]},caught:[]},g).secrets.map(s=>s.title);
 assert.ok(ids('OMEGARUBY').includes('Groudon'));assert.ok(!ids('OMEGARUBY').includes('Kyogre'));
 const route=require('../src/engine/route.js');
 const game={id:'BLACK',mainStoryLastMission:'BLACK-09',missions:Array.from({length:11},(_,i)=>({id:'BLACK-'+String(i+1).padStart(2,'0'),section:i<9?'Historia':'Postgame',steps:['x']}))};
 const r=route.nextMission(game,{events:{activeFlags:[],work:[]},badgesTotal:0,caught:[]},()=>false,()=>false);
 assert.equal(r.mission.id,'BLACK-02');
 const u=route.nextMission({...game,id:'SUN',mainStoryLastMission:'SUN-08',missions:game.missions.map(m=>({...m,id:m.id.replace('BLACK','SUN')}))},{events:{activeFlags:[],work:[]},caught:[]},()=>false,()=>false);
 assert.equal(u.mission.id,'SUN-01');
 const B=pk.families.BW,hall=pk.story.BW.find(r=>r.flag).flag;
 const r2=route.nextMission(game,{events:{activeFlags:[B.flags[hall]],work:[]},caught:[]},()=>false,()=>false);
 assert.equal(r2.mission.id,'BLACK-10');
});

test('BDSP: banderas int32, medallas y Liga desde las banderas de sistema; valores raros se descartan',()=>{
 const B=require('../src/saves/bdsp-flags.js'),bytes=new Uint8Array(0x4+5500*4+16),v=new DataView(bytes.buffer);
 const sys=i=>v.setInt32(0x4+(500+4000+i)*4,1,true);[124,125,126].forEach(sys);sys(5);v.setInt32(0x4+(500+1283)*4,1,true);
 const r=B.read(bytes);assert.equal(r.badgesTotal,3);assert.equal(r.gameClear,true);assert.ok(r.events.activeFlags.includes(1283));
 const a=guide.analyze({events:r.events,caught:[]},'BD');assert.equal(a.secrets.find(s=>s.title==='Regirock').status,'completado');
 v.setInt32(0x4+(500+10)*4,7,true);assert.equal(B.read(bytes),null);
});

test("Let's Go: gimnasios como historia, capturas y títulos de Maestro contados",()=>{
 const sys=i=>128+i,ev=i=>2176+i;
 const all=[0,12,13,14,15,16,17,18,19].map(sys);
 const a=guide.analyze({events:{activeFlags:all,work:[],titles:Array.from({length:153},(_,i)=>i+1)},caught:[]},'LETGOE');
 assert.equal(a.story.next,null);assert.equal(a.storyPartial,false);
 assert.equal(a.secrets.find(s=>s.id==='pkhex.lgpe.masters').status,'completado');
 const b=guide.analyze({events:{activeFlags:[ev(192)],work:[],titles:[1,2]},caught:[]},'LETGOP');
 assert.equal(b.secrets.find(s=>s.id==='pkhex.lgpe.masters').status,'pendiente');
 assert.equal(b.secrets.find(s=>s.id==='pkhex.lgpe.snorlax').status,'en curso');
 assert.equal(b.story.next.id,'LETGOP-02');
});

test('posición DS: HGSS y Platino eligen la copia válida y descartan mapas inexistentes',()=>{
 const L=require('../src/saves/ds-location.js'),I=require('../src/saves/hgss-integrity.js'),maps=require('../src/saves/ds-maps-data.js');
 const bytes=new Uint8Array(0x80000),v=new DataView(bytes.buffer);
 const write=(base,major,map,x,y)=>{const size=0xCF2C,end=base+size;v.setInt32(base+0x1280,map,true);v.setInt32(base+0x1288,x,true);v.setInt32(base+0x128C,y,true);
  v.setUint32(end-20,major,true);v.setUint32(end-12,size,true);v.setUint16(end-2,I.crc16(bytes.subarray(base,end-0x14)),true);};
 write(0,5,65,10,20);write(0x40000,9,418,1,2);
 assert.equal(L.read(bytes,'PLATINUM').name,maps.PT.names[maps.PT.maps[418][0]]);
 bytes[0x40010]^=1;assert.equal(L.read(bytes,'PLATINUM').map,'ETERNA_CITY');
 v.setInt32(0x1280,99999,true);v.setUint16(0xCF2C-2,I.crc16(bytes.subarray(0,0xCF2C-0x14)),true);
 assert.equal(L.read(bytes,'PLATINUM'),null);
 assert.equal(maps.HGSS.names[maps.HGSS.maps[280][0]],'Carpa Pokéathlon');
});

test('posición DS: Diamante/Perla leen su bloque de 0xC100 y no confunden Platino',()=>{
 const L=require('../src/saves/ds-location.js'),I=require('../src/saves/hgss-integrity.js'),maps=require('../src/saves/ds-maps-data.js');
 const bytes=new Uint8Array(0x80000),v=new DataView(bytes.buffer),size=0xC100;
 v.setInt32(0x1238,65,true);v.setInt32(0x1240,7,true);v.setInt32(0x1244,9,true);
 v.setUint32(size-20,1,true);v.setUint32(size-12,size,true);v.setUint16(size-2,I.crc16(bytes.subarray(0,size-0x14)),true);
 const r=L.read(bytes,'PEARL');assert.equal(r.name,'Ciudad Vetusta');assert.equal(r.map,'ETERNA');assert.equal(r.x,7);assert.equal(r.y,9);
 assert.equal(L.read(bytes,'PLATINUM'),null);
 assert.equal(maps.DP.names[maps.DP.maps[3][0]],'Ciudad Jubileo');
});

test('posición Negro 2/Blanco 2: bloque con suma válida, zona con nombre y Bosque Blanco en Blanco 2',()=>{
 const L=require('../src/saves/ds-location.js'),I=require('../src/saves/hgss-integrity.js');
 const bytes=new Uint8Array(0x80000),v=new DataView(bytes.buffer),seal=()=>v.setUint16(0x195AA,I.crc16(bytes.subarray(0x19500,0x195A8)),true);
 v.setInt32(0x19580,427,true);v.setUint16(0x19586,48,true);v.setUint16(0x1958E,740,true);seal();
 const r=L.read(bytes,'BLACK2');assert.equal(r.name,'Ciudad Engobe');assert.equal(r.x,48);assert.equal(r.y,740);
 v.setInt32(0x19580,0,true);seal();
 assert.equal(L.read(bytes,'BLACK2').name,'Ciudad Negra');assert.equal(L.read(bytes,'WHITE2').name,'Bosque Blanco');
 bytes[0x19500]^=1;assert.equal(L.read(bytes,'BLACK2'),null);
});

test('posición X/Y y ROZA: bloque Situation con suma de su tabla y zonas con nombre',()=>{
 const L=require('../src/saves/ds-location.js'),I=require('../src/saves/hgss-integrity.js');
 const make=(size,zone)=>{const b=new Uint8Array(size),v=new DataView(b.buffer),bo=size-0x200,info=bo+0x14+4*8;
  v.setUint32(bo+0x10,0x42454546,true);v.setUint16(info+4,4,true);v.setUint16(0x1402,zone,true);v.setFloat32(0x1410,12.4,true);v.setFloat32(0x1418,7.6,true);
  v.setUint16(info+6,I.crc16(b.subarray(0x1400,0x1550)),true);return b;};
 const xy=make(0x65600,53),r=L.read(xy,'Y');assert.equal(r.name,'Ciudad Novarte');assert.equal(r.x,12);assert.equal(r.y,8);
 assert.equal(L.read(make(0x76000,0),'ALPHASAPPHIRE').name,'Villa Raíz');
 assert.equal(L.read(xy,'OMEGARUBY'),null);
 xy[0x1400]^=1;assert.equal(L.read(xy,'X'),null);
});

test('posición Ultrasol/Ultraluna: CRC16 invertido del bloque Situation y otra tabla en Sol/Luna',()=>{
 const L=require('../src/saves/ds-location.js'),size=0x6CC00,b=new Uint8Array(size),v=new DataView(b.buffer),bo=size-0x200,info=bo+0x14+8;
 v.setUint32(bo+0x10,0x42454546,true);v.setUint16(info+4,1,true);v.setUint16(0x1000,22,true);v.setFloat32(0x1008,2400,true);v.setFloat32(0x1010,2160,true);
 v.setUint16(info+6,L.crc16inv(b.subarray(0x1000,0x107C)),true);
 const r=L.read(b,'ULTRASUN');assert.equal(r.name,'Ruinas de la Guerra');assert.equal(r.x,2400);
 assert.equal(L.read(b,'SUN'),null);
 b[0x1001]^=1;assert.equal(L.read(b,'ULTRAMOON'),null);
});

test('posición Sol/Luna: bloque Situation en 0xE00, su propia tabla de zonas y subtítulo del lugar',()=>{
 const L=require('../src/saves/ds-location.js'),size=0x6BE00,b=new Uint8Array(size),v=new DataView(b.buffer),bo=size-0x200,info=bo+0x14+8;
 v.setUint32(bo+0x10,0x42454546,true);v.setUint16(info+4,1,true);
 const put=zone=>{v.setUint16(0xE00,zone,true);v.setUint16(info+6,L.crc16inv(b.subarray(0xE00,0xE7C)),true);};
 put(80);assert.equal(L.read(b,'SUN').name,'Ruinas de la Vida');
 put(7);assert.equal(L.read(b,'MOON').name,'Ciudad Hauoli (Paseo Marítimo)');
 assert.equal(L.read(b,'ULTRASUN'),null);
 b[0xE01]^=1;assert.equal(L.read(b,'SUN'),null);
});

test('posición BDSP por zona = ubicación y región de Escarlata/Púrpura por bloques',()=>{
 const L=require('../src/saves/ds-location.js'),b=new Uint8Array(0xEDC20),v=new DataView(b.buffer);
 v.setInt16(0x5634,350,true);assert.equal(L.read(b,'BD').name,'Orilla Valor');
 v.setInt16(0x5634,0,true);assert.equal(L.read(b,'SP').name,'Ciudad Jubileo');
 assert.equal(L.read(new Uint8Array(0x1000),'BD'),null);
 assert.equal(L.read(null,'VIOLET',undefined,undefined,{KPlayerCurrentFieldID:2}).name,'Academia Arándano');
 assert.equal(L.read(null,'SCARLET',undefined,undefined,{KPlayerCurrentFieldID:0}).precision,'region');
 assert.equal(L.read(null,'SCARLET',undefined,undefined,{}),null);
});

test('posición Switch desde el motor: SV por identificador de lugar, Leyendas por mapa interno',()=>{
 const L=require('../src/saves/ds-location.js');
 assert.equal(L.read(null,'SCARLET',0,0,{KPlayerCurrentFieldID:0},{currentLocationId:'hex:82000000',lastRoomMapName:'a_sch_entrance01'}).name,'Academia Naranja');
 assert.equal(L.read(null,'VIOLET',0,0,{},{currentLocationId:'hex:0A000000'}).name,'Liga Pokémon');
 assert.equal(L.read(null,'VIOLET',0,0,{KPlayerCurrentFieldID:1},{currentLocationId:'hex:FFFF0000'}).name,'Noroteo');
 const la=L.read(null,'ARCEUS',0,0,{},{map:'ha_area00_s02'});assert.equal(la.name,'Villa Jubileo');assert.match(la.detail,/interior/);
 assert.equal(L.read(null,'ARCEUS',0,0,{},{map:'ha_area05'}).name,'Tundra Alba');
 assert.equal(L.read(null,'ARCEUS',0,0,{},{map:'ha_area09'}),null);
 assert.equal(L.read(null,'ZA',0,0,{},{map:'t1'}).name,'Ciudad Luminalia');
 const gg=L.read(null,'LETGOE',0,0,{},{mapHash:'C575D7D020856017'});assert.equal(gg.name,'Pueblo Paleta');assert.equal(gg.detail,'dentro de un edificio');
 assert.equal(L.read(null,'LETGOP',0,0,{},{mapHash:L.fnv64('t011gym')}).detail,'gimnasio');
 assert.equal(L.read(null,'LETGOP',0,0,{},{mapHash:L.fnv64('r023d01')}).name,'Calle Victoria');
 assert.equal(L.read(null,'LETGOP',0,0,{},{mapHash:L.fnv64('s001r01')}),null);
 assert.equal(L.read(null,'ZA',0,0,{},{map:'d9'}),null);
 assert.equal(L.fnv64('a_t0101_i0101'),'B6F6DA200E8FFE23');assert.equal(L.fnv64('a_wr0201'),'5EA5C3539AB81C81');
 const sw=L.read(null,'SWORD',0,0,{},{mapHash:'B6F6DA200E8FFE23'});assert.equal(sw.name,'Pueblo Yarda');assert.equal(sw.detail,'dentro de un edificio');
 assert.equal(L.read(null,'SHIELD',0,0,{},{mapHash:'5EA5C3539AB81C81'}).name,'Isla de la Armadura');
 assert.equal(L.read(null,'SHIELD',0,0,{},{mapHash:'23F8A2E146592267'}),null);
 assert.equal(L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_t0501_g0101')}).name,'Pueblo Ladera');
 assert.equal(L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_wr0301_i0101')}).name,'Nieves de la Corona');
 assert.equal(L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_wr0101')}).name,'Área Silvestre');
 assert.equal(L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_btl24_c0301')}).name,'Ciudad Artejo');
 assert.equal(L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_r0501_i0101')}).name,'Ruta 5');
 // Áreas con varias zonas: la posición elige la del punto colocado más cercano (plano X/Y del guardado).
 const maps=require('../src/saves/ds-maps-data.js'),a0101=maps.SWITCH.SWSH.a_0101,r1=a0101.find(r=>r[0]==='Ruta 1')[2];
 assert.equal(L.read(null,'SHIELD',0,0,{},{mapHash:L.fnv64('a_0101'),x:19456.9,y:54360.2,z:1549.6}).name,'Pueblo Yarda');
 assert.equal(L.read(null,'SHIELD',0,0,{},{mapHash:L.fnv64('a_0101'),x:r1[0],y:r1[1],z:0}).name,'Ruta 1');
 assert.equal(L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_0401'),x:12407.1,y:8118,z:-366.2}).name,'Pueblo Amura');
 const sinPos=L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_0101')});assert.equal(sinPos.precision,'region');assert.match(sinPos.name,/Pueblo Yarda \/ Ruta 1/);
 const lake=maps.SWITCH.SWSH.a_wr0101.find(r=>r[0]==='Lago Milotic (norte)')[2];
 const wr=L.read(null,'SWORD',0,0,{},{mapHash:L.fnv64('a_wr0101'),x:lake[0],y:lake[1]});
 assert.equal(wr.name,'Lago Milotic (norte)');assert.equal(wr.detail,'Área Silvestre');
});

test('Espada/Escudo: historia por medallas y título solo con prueba de la Torre Batalla',()=>{
 const a=guide.analyze({namedBlocks:{KBattleTowerSinglesVictory:0,KBattleTowerDoublesVictory:0},badgesTotal:3,caught:[]},'SWORD');
 assert.equal(a.storyPartial,true);assert.equal(a.story.next.label,'4.ª medalla (Pueblo Ladera: Lucha en Espada, Fantasma en Escudo)');
 const b=guide.analyze({namedBlocks:{KBattleTowerSinglesVictory:0,KBattleTowerDoublesVictory:0},badgesTotal:8,caught:[]},'SHIELD');
 assert.match(b.story.next.label,/Campeón de Galar/);
 const c=guide.analyze({namedBlocks:{KBattleTowerSinglesVictory:6},badgesTotal:8,caught:[]},'SHIELD');
 assert.equal(c.story.next,null);
});

test('Diamante Brillante/Perla Reluciente: historia por medallas con las misiones de su guía',()=>{
 const a=guide.analyze({events:{activeFlags:[],work:[]},badgesTotal:3,caught:[]},'BD');
 assert.equal(a.storyPartial,false);assert.equal(a.story.next.label,'Medalla Ciénaga');assert.equal(a.story.next.mission,'05');
 assert.equal(guide.analyze({events:{activeFlags:[],work:[]},badgesTotal:8,caught:[]},'SP').story.next.label,'Salón de la Fama registrado');
});

test('posición Negro/Blanco: bloque 28 de 0x9C bytes, tabla de zonas propia y Bosque Blanco en Blanco',()=>{
 const L=require('../src/saves/ds-location.js'),I=require('../src/saves/hgss-integrity.js');
 const b=new Uint8Array(0x80000),v=new DataView(b.buffer),seal=()=>v.setUint16(0x1959E,I.crc16(b.subarray(0x19500,0x1959C)),true);
 v.setInt32(0x19580,278,true);seal();assert.equal(L.read(b,'BLACK').name,'Palacio de N');
 v.setInt32(0x19580,6,true);seal();assert.equal(L.read(b,'WHITE').name,'Ciudad Gres');
 v.setInt32(0x19580,0,true);seal();assert.equal(L.read(b,'BLACK').name,'Ciudad Negra');assert.equal(L.read(b,'WHITE').name,'Bosque Blanco');
 assert.equal(L.read(b,'BLACK2'),null);
});

test('posición Game Boy: Kanto y Johto con nombres oficiales; japonés y coreano excluidos',()=>{
 const L=require('../src/saves/ds-location.js'),bytes=new Uint8Array(0x8000);
 bytes[0x260A]=40;bytes[0x260D]=3;bytes[0x260E]=5;
 const r=L.read(bytes,'RED');assert.equal(r.name,'Pueblo Paleta');assert.equal(r.map,'OAKS_LAB');assert.equal(r.x,5);
 assert.equal(L.read(bytes,'RED',undefined,1),null);
 bytes[0x2843]=26;bytes[0x2844]=3;const c=L.read(bytes,'CRYSTAL');assert.equal(c.name,'Ciudad Cerezo');
 bytes[0x2843]=99;assert.equal(L.read(bytes,'CRYSTAL'),null);
});

test('coleccionables del guardado: Diglett, huellas, vatios, combates restringidos y fuegos fatuos',()=>{
 const O=require('../src/engine/objectives.js'),get=(d,id)=>O.fromDiagnosis(d).find(f=>f.id===id)?.value;
 const sh={game:'SHIELD',namedBlocks:{KAlolanDiglettFound:1,KFootprintPercentageCobalion:100,KFootprintPercentageTerrakion:100,KFootprintPercentageVirizion:100,KDojoWattDonationProgress:1,KRecordSparringTypesCleared:0}};
 assert.equal(get(sh,'collection.swsh.footprints'),true);assert.equal(get(sh,'collection.swsh.alolanDiglett'),false);
 assert.equal(get({game:'SWORD',namedBlocks:{KAlolanDiglettFound:150}},'collection.swsh.alolanDiglett'),true);
 assert.equal(get({game:'SWORD',namedBlocks:{KDojoWattDonationProgress:15}},'collection.swsh.dojoWatts'),true);
 assert.equal(get({game:'SWORD',namedBlocks:{KRecordSparringTypesCleared:18}},'battle.swsh.restrictedSparring'),true);
 const la=n=>({game:'ARCEUS',namedBlocks:{KWispsFoundArea00:7,KWispsFoundArea01:20,KWispsFoundArea02:20,KWispsFoundArea03:20,KWispsFoundArea04:20,KWispsFoundArea05:n}});
 assert.equal(get(la(20),'collection.la.wisps'),true);assert.equal(get(la(19),'collection.la.wisps'),false);
 assert.equal(get({game:'SWORD',namedBlocks:{}},'collection.swsh.footprints'),undefined);
});

test('Esmeralda: estrella del Frente Batalla con las 14 banderas de símbolos y solo en la familia E',()=>{
 const O=require('../src/engine/objectives.js'),G=require('../src/saves/gen3-data.js'),F=G.families.E.flags;
 const all=['TOWER','DOME','PALACE','ARENA','FACTORY','PIKE','PYRAMID'].flatMap(n=>['FLAG_SYS_'+n+'_SILVER','FLAG_SYS_'+n+'_GOLD']).map(n=>F[n]);
 const get=(field,game='EMERALD')=>O.fromDiagnosis({game,field}).find(f=>f.id==='card.emerald.frontierSymbols')?.value;
 assert.equal(get({family:'E',flags:all}),true);
 assert.equal(get({family:'E',flags:all.slice(0,-1)}),false);
 assert.equal(get({family:'RS',flags:all}),undefined);
});

test('Rubí/Zafiro/Esmeralda: estrella de los cinco cuadros del museo; Rojo Fuego excluido',()=>{
 const O=require('../src/engine/objectives.js'),get=(field)=>O.fromDiagnosis({game:'RUBY',field}).find(f=>f.id==='card.hoenn.paintings')?.value;
 assert.equal(get({family:'RS',flags:[0xA0,0xA1,0xA2,0xA3,0xA4]}),true);
 assert.equal(get({family:'E',flags:[0xA0,0xA1,0xA2,0xA3]}),false);
 assert.equal(get({family:'FRLG',flags:[0xA0,0xA1,0xA2,0xA3,0xA4]}),undefined);
});

test('Gen. III con el lector nativo: fin de la historia por FLAG_SYS_GAME_CLEAR de cada familia',()=>{
 const O=require('../src/engine/objectives.js'),clear=(game,family,flags,extra={})=>O.fromDiagnosis({game,field:{family,flags},...extra}).find(f=>f.id==='story.gameClear')?.value;
 assert.equal(clear('EMERALD','E',[2148]),true);assert.equal(clear('EMERALD','E',[2052]),false);
 assert.equal(clear('RUBY','RS',[2052]),true);assert.equal(clear('FIRERED','FRLG',[2092]),true);assert.equal(clear('LEAFGREEN','FRLG',[]),false);
 assert.equal(clear('EMERALD','E',[2148],{gameClear:false}),false); // manda el dato directo
});

test('Espada/Escudo: fin de la historia por victorias en la Torre Batalla o el Torneo de las Estrellas, nunca falso por un cero',()=>{
 const O=require('../src/engine/objectives.js'),clear=nb=>O.fromDiagnosis({game:'SWORD',namedBlocks:nb}).find(f=>f.id==='story.gameClear')?.value;
 assert.equal(clear({KBattleTowerSinglesVictory:9,KBattleTowerDoublesVictory:0}),true);
 assert.equal(clear({KBattleTowerSinglesVictory:0,KBattleTowerDoublesVictory:0,KGSTVictoriesTotal:1}),true);
 assert.equal(clear({KBattleTowerSinglesVictory:0,KBattleTowerDoublesVictory:0}),undefined);
});

test("Let's Go: áreas exteriores por rectángulos de zona (el menor gana si se solapan)",()=>{
 const L=require('../src/saves/ds-location.js'),at=(area,x,y)=>L.read(null,'LETGOE',0,0,{},{mapHash:L.fnv64(area),x,y});
 assert.equal(at('area07',2450,6300).name,'Ciudad Azafrán'); // partida del propietario
 assert.equal(at('area02',2000,1000).name,'Pueblo Paleta');assert.equal(at('area02',2000,-2000).name,'Ruta 1');
 const sin=L.read(null,'LETGOP',0,0,{},{mapHash:L.fnv64('area02')});assert.equal(sin.precision,'region');assert.match(sin.name,/Pueblo Paleta/);
 assert.equal(L.read(null,'LETGOP',0,0,{},{mapHash:L.fnv64('t001r01')}).name,'Pueblo Paleta');
});

test('Leyendas Z-A: misiones desde KEventWorkQuest (FNV-1a del nombre, 255 = completada) e historia por misión',()=>{
 const D=require('../src/saves/diagnosis.js'),Q=require('../src/saves/za-quests-data.js'),G=require('../src/engine/event-guide.js'),O=require('../src/engine/objectives.js');
 const work=done=>Object.fromEntries([...Q.main.map(([n,h])=>[h,n<=done?255:0]),...Q.side.map(([n,h])=>[h,0])]);
 const half=D.zaQuests({game:'ZA',questWork9a:{questWork:work(20)}});
 assert.equal(half.namedBlocks.ZA_MISSION_20,true);assert.equal(half.namedBlocks.ZA_MISSION_21,false);assert.equal(half.gameClear,false);
 const a=G.analyze(half,'ZA');assert.equal(a.story.next.label,'Misión principal 21: '+Q.main[20][3]);
 const full=D.zaQuests({game:'ZA',questWork9a:{questWork:work(42)}});assert.equal(full.gameClear,true);assert.equal(full.namedBlocks.ZA_MISSIONS_DONE,42);
 assert.equal(O.fromDiagnosis(full).find(f=>f.id==='story.gameClear').value,true);
 assert.equal(D.zaQuests({game:'ZA',questWork9a:{questWork:{}}}).gameClear,undefined); // sin claves no se deduce nada
});

test('Rubí/Zafiro: estrella de la Torre Batalla con la mejor racha (> 49, pokeruby)',()=>{
 const O=require('../src/engine/objectives.js'),get=bt=>O.fromDiagnosis({game:'RUBY',field:{family:'RS',flags:[],battleTower:bt}}).find(f=>f.id==='card.rs.battleTower')?.value;
 assert.equal(get({totalWins:70,bestStreak:50}),true);assert.equal(get({totalWins:70,bestStreak:49}),false);assert.equal(get(null),undefined);
});

test('Alola: historia por pruebas con los cristales Z de la mochila (solo con integridad comprobada)',()=>{
 const G=require('../src/engine/event-guide.js');
 const d=(items,ok=true)=>({game:'SUN',events:{activeFlags:[]},integrity:{checksumsValid:ok},inventory:[{pocket:'ZCrystals',items:items.map(id=>({id,count:1}))}]});
 const a=G.analyze(d([807]),'SUN');
 assert.equal(a.story.rows.find(r=>r.item===807).state,'direct');
 assert.equal(a.story.next.label,'Gran prueba de Kaudan (Lizastal Z)');
 const u=G.analyze({...d([807,813,809,808,811,819,810,820,822]),game:'ULTRAMOON'},'ULTRAMOON');
 assert.equal(u.story.next.label,'Prueba de Mina (Feeristal Z)');
 assert.equal(G.analyze(d([807],false),'SUN').story.rows.find(r=>r.item===807).set,null); // sin integridad no se deduce
});

test('Rojo del Monte Plateado: Oro/Plata/Cristal por su bandera de objeto y HGSS por VAR_UNK_40FD',()=>{
 const G=require('../src/engine/event-guide.js'),P=require('../src/saves/gen12-data.js'),H=require('../src/saves/gen4-data.js');
 const f=P.families.C.flags,red=(flags)=>G.analyze({game:'CRYSTAL',events:{activeFlags:flags,work:[]}},'CRYSTAL').secrets.find(s=>s.id==='gen2.red').status;
 assert.equal(red([f.EVENT_BEAT_ELITE_FOUR,f.EVENT_RED_IN_MT_SILVER]),'completado');
 assert.equal(red([f.EVENT_BEAT_ELITE_FOUR]),'en curso');
 const v=H.families.HGSS.vars.VAR_UNK_40FD,work=Array(256).fill(0);work[v]=1;
 assert.equal(G.analyze({game:'SOULSILVER',events:{activeFlags:[],work}},'SOULSILVER').secrets.find(s=>s.id==='hgss.red').status,'completado');
});

test('Rojo Fuego/Verde Hoja: estrella de minijuegos con 200 saltos y 200 bayas (pokefirered)',()=>{
 const O=require('../src/engine/objectives.js'),get=mg=>O.fromDiagnosis({game:'FIRERED',field:{family:'FRLG',flags:[],minigames:mg}}).find(f=>f.id==='card.frlg.minigames')?.value;
 assert.equal(get({jumpsInRow:200,berriesPicked:250}),true);assert.equal(get({jumpsInRow:199,berriesPicked:250}),false);assert.equal(get(null),undefined);
});

test('Sinnoh: bandera de platino del Subsuelo con 50 banderas capturadas (pokeplatinum)',()=>{
 const O=require('../src/engine/objectives.js'),get=u=>O.fromDiagnosis({game:'PLATINUM',underground4:u}).find(f=>f.id==='card.sinnoh.platinumFlag')?.value;
 assert.equal(get({flagsCaptured:50}),true);assert.equal(get({flagsCaptured:49}),false);assert.equal(get(undefined),undefined);
});

test('Leyendas Arceus: rango 10, 28 Unown y fin de la historia por Dialga o Palkia origen',()=>{
 const O=require('../src/engine/objectives.js'),f=(nb,id)=>O.fromDiagnosis({game:'ARCEUS',namedBlocks:nb}).find(x=>x.id===id)?.value;
 assert.equal(f({KExpeditionTeamRank:10},'la.rank10'),true);assert.equal(f({KExpeditionTeamRank:9},'la.rank10'),false);
 assert.equal(f({KTotalUnownCaptured:6},'la.unown'),false);assert.equal(f({KTotalUnownCaptured:28},'la.unown'),true);
 assert.equal(f({KDefeatedOriginPalkia:true},'story.gameClear'),true);assert.equal(f({KDefeatedOriginDialga:false},'story.gameClear'),undefined);
});

test('Metro Batalla (Fero y Caril en el combate 49) y Castillo Batalla (Gran Duque)',()=>{
 const O=require('../src/engine/objectives.js'),f=(d,id)=>O.fromDiagnosis(d).find(x=>x.id===id)?.value;
 assert.equal(f({game:'BLACK',subway5:{superSingleRecord:49,superDoubleRecord:60}},'battle.unova.subwayBosses'),true);
 assert.equal(f({game:'BLACK',subway5:{superSingleRecord:48,superDoubleRecord:60}},'battle.unova.subwayBosses'),false);
 assert.equal(f({game:'X',chateau:{rank:5}},'battle.xy.chateauGrandDuke'),true);assert.equal(f({game:'Y',chateau:{rank:4}},'battle.xy.chateauGrandDuke'),false);
});

test('Árbol de Combate: supercombate 50 en cualquier modalidad',()=>{
 const O=require('../src/engine/objectives.js'),f=modes=>O.fromDiagnosis({game:'ULTRASUN',battleTree:{modes}}).find(x=>x.id==='battle.alola.treeSuper50')?.value;
 assert.equal(f([{superBest:12},{superBest:50},{superBest:0},{superBest:999}]),true);assert.equal(f([{superBest:49},{superBest:3},{superBest:0},{superBest:999}]),false);
});

test('Diamante Brillante/Perla Reluciente: 100 rivales seguidos en alguna modalidad de la Torre Batalla',()=>{
 const O=require('../src/engine/objectives.js'),f=s=>O.fromDiagnosis({game:'BD',tower8b:{maxStreaks:s}}).find(x=>x.id==='battle.bdsp.tower100')?.value;
 assert.equal(f([3,100,0,0]),true);assert.equal(f([99,0,0,0]),false);assert.equal(f([]),undefined);
});

test('BDSP: rango Maestro de un Superconcurso por las banderas de sistema SYS_FLAG_CON_*_MASTER',()=>{
 const O=require('../src/engine/objectives.js'),f=flags=>O.fromDiagnosis({game:'SP',events:{activeFlags:flags,systemOffset:4000}}).find(x=>x.id==='contest.bdsp.anyMaster')?.value;
 assert.equal(f([4011]),true);assert.equal(f([4005]),false);
});

test('Espada/Escudo: Pokédex completas según la tarjeta de entrenador',()=>{
 const O=require('../src/engine/objectives.js'),f=c=>O.fromDiagnosis({game:'SWORD',card8:c}).find(x=>x.id==='pokedex.swsh.allCards')?.value;
 assert.equal(f({galarDex:true,armorDex:true,crownDex:true}),true);assert.equal(f({galarDex:true,armorDex:false,crownDex:true}),false);
});

test('Casa Trampa (VAR 0x4044 = 8) y Concursos Espectáculo de ORAS (variable 215 = 21)',()=>{
 const O=require('../src/engine/objectives.js'),vars=v=>{const a=Array(256).fill(0);a[0x44]=v;return a;};
 const th=v=>O.fromDiagnosis({game:'EMERALD',field:{family:'E',flags:[],vars:vars(v)}}).find(x=>x.id==='challenge.hoenn.trickHouse')?.value;
 assert.equal(th(8),true);assert.equal(th(7),false);
 const work=v=>{const a=Array(376).fill(0);a[215]=v;return a;},c=v=>O.fromDiagnosis({game:'OMEGARUBY',events:{activeFlags:[],work:work(v)}}).find(x=>x.id==='contest.oras.spectacular')?.value;
 assert.equal(c(21),true);assert.equal(c(13),false);
});

test('Musical (100 complementos) y Torneo Campeones del PWT (récord 17)',()=>{
 const O=require('../src/engine/objectives.js'),f=(d,id)=>O.fromDiagnosis(d).find(x=>x.id===id)?.value;
 assert.equal(f({game:'BLACK',musical5:{props:100}},'musical.unova.allProps'),true);
 assert.equal(f({game:'WHITE',musical5:{props:99}},'musical.unova.allProps'),false);
 const r=Array(29).fill(0);assert.equal(f({game:'WHITE2',pwt5:{records:r}},'battle.b2w2.pwtChampions'),false);
 r[17]=1;assert.equal(f({game:'BLACK2',pwt5:{records:r}},'battle.b2w2.pwtChampions'),true);
 assert.equal(f({game:'BLACK2',entralink5:{white:30,black:30}},'entralink.b2w2.level30'),true);
 assert.equal(f({game:'WHITE2',entralink5:{white:1,black:0}},'entralink.b2w2.level30'),false);
});

test('HGSS: las 28 formas de Unown de la Pokédex',()=>{
 const O=require('../src/engine/objectives.js'),f=(d,id)=>O.fromDiagnosis(d).find(x=>x.id===id)?.value;
 assert.equal(f({game:'HEARTGOLD',unownForms:Array.from({length:28},(_,i)=>i)},'pokedex.hgss.unown28'),true);
 assert.equal(f({game:'SOULSILVER',unownForms:[0]},'pokedex.hgss.unown28'),false);
 assert.equal(f({game:'CRYSTAL',unown2:{forms:26}},'pokedex.gen2.unown26'),true);
 assert.equal(f({game:'CRYSTAL',unown2:{forms:14}},'pokedex.gen2.unown26'),false);
});

test('Leyendas Arceus: Arceus vencido y ensueño de combates sin fin de Fero',()=>{
 const O=require('../src/engine/objectives.js'),f=(d,id)=>O.fromDiagnosis({game:'ARCEUS',namedBlocks:d}).find(x=>x.id===id)?.value;
 assert.equal(f({KDefeatedArceus:true},'la.arceusDefeated'),true);
 assert.equal(f({KCompletedEternalBattleReverie:false},'la.eternalReverie'),false);
 assert.equal(f({KCompletedEternalBattleReverie:true},'la.eternalReverie'),true);
});

test('Gen. I: Visor Silph, Poké Flauta y las cinco MO (solo se acredita la presencia)',()=>{
 const O=require('../src/engine/objectives.js'),f=items=>O.fromDiagnosis({game:'GREEN',integrity:{checksumsValid:true},inventory:[{pocket:'Items',items:items.map(id=>({id,count:1}))}]}).find(x=>x.id==='inventory.gen1.fieldItems')?.value;
 assert.equal(f([0x48,0x49,0xC4,0xC5,0xC6,0xC7,0xC8]),true);
 assert.equal(f([0x48,0x49,0xC8]),undefined);
});

test('HGSS: estrellas del Pokéathlon (FLAG_UNK_0F1) y de la corona de hojas (FLAG_UNK_184)',()=>{
 const O=require('../src/engine/objectives.js'),f=(flags,id)=>O.fromDiagnosis({game:'HEARTGOLD',events:{activeFlags:flags}}).find(x=>x.id===id)?.value;
 assert.equal(f([0xF1],'card.hgss.pokeathlon'),true);assert.equal(f([0xF0],'card.hgss.pokeathlon'),false);
 assert.equal(f([0x184],'card.hgss.leafCrown'),true);assert.equal(f([],'card.hgss.leafCrown'),false);
});

test('Platino: estrella de la Torre Batalla (récord de 100 en cualquier modalidad)',()=>{
 const O=require('../src/engine/objectives.js'),f=r=>O.fromDiagnosis({game:'PLATINUM',tower4:{records:r}}).find(x=>x.id==='battle.pt.tower100')?.value;
 assert.equal(f([0,0,0,100,0]),true);assert.equal(f([99,42,0,0,49]),false);
});

test('HGSS: estrella de la Torre Batalla (récord de 100)',()=>{
 const O=require('../src/engine/objectives.js'),f=r=>O.fromDiagnosis({game:'SOULSILVER',tower4:{records:r}}).find(x=>x.id==='battle.hgss.tower100')?.value;
 assert.equal(f([105,0,0,0,0]),true);assert.equal(f([0,0,0,0,0]),false);
});

test('Gen. I: revancha de la Liga (segunda entrada del Salón de la Fama)',()=>{
 const O=require('../src/engine/objectives.js'),f=n=>O.fromDiagnosis({game:'RED',hallOfFame1:{count:n}}).find(x=>x.id==='story.gen1.leagueRematch')?.value;
 assert.equal(f(2),true);assert.equal(f(1),false);
});

test('Rojo Fuego/Verde Hoja: revancha de la Liga (banderas del Alto Mando 2)',()=>{
 const O=require('../src/engine/objectives.js'),f=fl=>O.fromDiagnosis({game:'FIRERED',field:{family:'FRLG',flags:fl}}).find(x=>x.id==='story.frlg.championRematch')?.value;
 assert.equal(f([735,736,737,738].map(i=>0x500+i)),true);assert.equal(f([0x500+740,0x500+735]),false);
});

test('Gen. II: Billete Barco y Pase (solo presencia)',()=>{
 const O=require('../src/engine/objectives.js'),f=ids=>O.fromDiagnosis({game:'GOLD',integrity:{checksumsValid:true},inventory:[{pocket:'KeyItems',items:ids.map(id=>({id,count:1}))}]}).find(x=>x.id==='inventory.gen2.tickets')?.value;
 assert.equal(f([0x44,0x86]),true);assert.equal(f([0x44]),undefined);
});

test('Hoenn: objetos clave de acceso (Esmeralda exige además el Emblema Magma)',()=>{
 const O=require('../src/engine/objectives.js'),f=(g,ids)=>O.fromDiagnosis({game:g,integrity:{checksumsValid:true},inventory:[{pocket:'KeyItems',items:ids.map(id=>({id,count:1}))}]}).find(x=>x.id==='inventory.hoenn.accessItems')?.value;
 assert.equal(f('RUBY',[279,288]),true);assert.equal(f('EMERALD',[279,288]),undefined);assert.equal(f('EMERALD',[279,288,375]),true);
});

test('Alola: cristales Z de tipo, Arca de Zygarde y Pulsera Z',()=>{
 const O=require('../src/engine/objectives.js'),f=(g,ids)=>O.fromDiagnosis({game:g,integrity:{checksumsValid:true},inventory:[{pocket:'ZCrystals',items:ids.map(id=>({id,count:1}))}]}).find(x=>x.id==='inventory.alola.zResources')?.value;
 const z=Array.from({length:18},(_,i)=>807+i);
 assert.equal(f('MOON',[...z,847,797]),true);assert.equal(f('ULTRASUN',[...z,847,797]),undefined);assert.equal(f('ULTRASUN',[...z,847,933]),true);
});

test('Rojo Fuego/Verde Hoja: Visor Silph, Poké Flauta y MO01-MO07',()=>{
 const O=require('../src/engine/objectives.js'),f=ids=>O.fromDiagnosis({game:'LEAFGREEN',integrity:{checksumsValid:true},inventory:[{pocket:'KeyItems',items:ids.map(id=>({id,count:1}))}]}).find(x=>x.id==='inventory.frlg.fieldItems')?.value;
 assert.equal(f([359,350,339,340,341,342,343,344,345]),true);assert.equal(f([359,350]),undefined);
});

test('Gen. IX: Pokédex regionales completas (capturados = total)',()=>{
 const O=require('../src/engine/objectives.js'),f=(dex,id)=>O.fromDiagnosis({game:'SCARLET',dex9:dex}).find(x=>x.id===id)?.value;
 assert.equal(f({paldea:{caught:400,total:400}},'pokedex.gen9.paldea'),true);assert.equal(f({kitakami:{caught:10,total:200}},'pokedex.gen9.kitakami'),false);
});

test('Espada/Escudo: capturas de las Nieves de la Corona',()=>{
 const O=require('../src/engine/objectives.js');
 const nb={KCapturedGalarianArticuno:true,KCapturedGalarianZapdos:true,KCapturedGalarianMoltres:true,KCapturedRegirock:true,KCapturedRegice:true,KCapturedRegisteel:true,KCapturedRegigigas:true,KCapturedRegieleki:false,KCapturedRegidrago:true};
 const f=(n,c)=>O.fromDiagnosis({game:'SWORD',namedBlocks:n,caught:c}).find(x=>x.id==='swsh.crownCaptures')?.value;
 assert.equal(f(nb,[898]),true);assert.equal(f(nb,[]),false);assert.equal(f({...nb,KCapturedRegidrago:false},[898]),false);
});

test('Rojo Fuego/Verde Hoja: Torre Desafío en las cuatro modalidades',()=>{
 const O=require('../src/engine/objectives.js'),f=t=>O.fromDiagnosis({game:'FIRERED',field:{family:'FRLG',trainerTower:t.map(bestTime=>({bestTime}))}}).find(x=>x.id==='challenge.frlg.trainerTower')?.value;
 assert.equal(f([3000,4000,5000,6000]),true);assert.equal(f([3000,215999,5000,6000]),false);
});

test('USUM: episodio Rainbow Rocket (mansión normal y Electrode del castillo)',()=>{
 const O=require('../src/engine/objectives.js'),f=fl=>O.fromDiagnosis({game:'ULTRAMOON',events:{activeFlags:fl}}).find(x=>x.id==='story.usum.rainbowRocket')?.value;
 assert.equal(f([211,1731]),true);assert.equal(f([211]),undefined);assert.equal(f([1730]),undefined);
});

test('Enfermera que reconoce la tarjeta de oro (Esmeralda, Platino, HGSS)',()=>{
 const O=require('../src/engine/objectives.js'),f=d=>O.fromDiagnosis(d).find(x=>x.id==='card.nurseRecognition')?.value;
 assert.equal(f({game:'EMERALD',field:{family:'E',flags:[0x159]}}),true);
 assert.equal(f({game:'PLATINUM',events:{activeFlags:[0x69]}}),true);
 assert.equal(f({game:'SOULSILVER',events:{activeFlags:[0x63]}}),undefined);
});

test('N2/B2: las 40 películas de Pokéstar Studios',()=>{
 const O=require('../src/engine/objectives.js'),f=n=>O.fromDiagnosis({game:'BLACK2',pokestar5:{completed:n,total:40}}).find(x=>x.id==='pokestar.b2w2.allMovies')?.value;
 assert.equal(f(40),true);assert.equal(f(0),false);
});

test('Diplomas de Platino por sus banderas de entrega y Máximo en la Cascada Meteoro (Esmeralda)',()=>{
 const O=require('../src/engine/objectives.js'),v=(d,id)=>O.fromDiagnosis(d).find(x=>x.id===id)?.value;
 assert.equal(v({game:'PLATINUM',events:{activeFlags:[0xAB]}},'card.pt.diplomaSinnoh'),true);
 assert.equal(v({game:'PLATINUM',events:{activeFlags:[0xAB]}},'card.pt.diplomaNational'),undefined);
 assert.equal(v({game:'PLATINUM',events:{activeFlags:[0xAC]}},'card.pt.diplomaNational'),true);
 assert.equal(v({game:'EMERALD',field:{family:'E',flags:[0x4F8]}},'battle.emerald.stevenMeteorFalls'),true);
 assert.equal(v({game:'EMERALD',field:{family:'E',flags:[0x4F7]}},'battle.emerald.stevenMeteorFalls'),false);
});

test('Diploma nacional de Rubí/Zafiro (pokeruby, con su error de índice) frente al de Esmeralda',()=>{
 const C=require('../src/engine/completion.js'),all=Array.from({length:386},(_,i)=>i+1);
 const without=ids=>all.filter(i=>!ids.includes(i));
 // Rubí: sin Mew, Chikorita, Celebi, Jirachi ni Deoxys sigue completo; sin Lugia, no.
 assert.equal(C.dexStatus({game:'RUBY',caught:without([151,152,251,385,386])}).national.complete,true);
 assert.equal(C.dexStatus({game:'RUBY',caught:without([249])}).national.complete,false);
 // Esmeralda: Lugia y Ho-Oh no cuentan; Chikorita sí.
 assert.equal(C.dexStatus({game:'EMERALD',caught:without([151,249,250,251,385,386])}).national.complete,true);
 assert.equal(C.dexStatus({game:'EMERALD',caught:without([152])}).national.complete,false);
});

test('Diploma de Sinnoh de DP: 150 vistos de la Pokédex de Sinnoh sin Manaphy (y Platino no lo hereda)',()=>{
 const C=require('../src/engine/completion.js'),dp=C.dexStatus({game:'DIAMOND',caught:[],seen:[]}).sinnoh;
 assert.equal(dp.required,150);assert.equal(dp.field,'seen');
 const seen=Array.from({length:493},(_,i)=>i+1).filter(i=>i!==490);
 assert.equal(C.dexStatus({game:'PEARL',caught:[],seen}).sinnoh.complete,true);
 assert.equal(C.dexStatus({game:'PEARL',caught:[],seen:seen.filter(i=>i!==387)}).sinnoh.complete,false);
 assert.equal(C.dexStatus({game:'PLATINUM',caught:[],seen}).sinnoh,undefined);
});

test('Diplomas de HGSS por sus banderas (0x143 Johto, 0x144 Nacional)',()=>{
 const O=require('../src/engine/objectives.js'),v=(f,id)=>O.fromDiagnosis({game:'HEARTGOLD',events:{activeFlags:f}}).find(x=>x.id===id)?.value;
 assert.equal(v([0x143],'card.hgss.diplomaJohto'),true);assert.equal(v([0x143],'card.hgss.diplomaNational'),undefined);
 assert.equal(v([0x144],'card.hgss.diplomaNational'),true);
});

test('Leyendas Arceus: 94 peticiones del juego base y 122 con las del Despertar (sub_NNN = 255)',()=>{
 const O=require('../src/engine/objectives.js'),pad=n=>String(n).padStart(3,'0');
 const base=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,30,31,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,53,54,56,57,58,59,60,61,62,63,64,65,66,68,69,70,71,73,74,76,77,82,83,84,85,86,88,89,90,91,92,93,94,95,96,97,98,99,100,110,114,115,116,117,122,123];
 const day=[201,202,203,204,205,206,207,208,250,252,256,257,258,...Array.from({length:15},(_,i)=>261+i)];
 assert.equal(base.length,94);assert.equal(day.length,28);
 const r=(ids,v=255)=>Object.fromEntries(ids.map(n=>[pad(n),v]));
 const v=(req,id)=>O.fromDiagnosis({game:'ARCEUS',namedBlocks:{},requests8a:req}).find(x=>x.id===id)?.value;
 assert.equal(v(r(base),'la.requests.base'),true);assert.equal(v(r(base),'la.requests.all'),false);
 assert.equal(v({...r(base),...r(day)},'la.requests.all'),true);
 assert.equal(v({...r(base),'006':1},'la.requests.base'),false);
 assert.equal(v({},'la.requests.base'),undefined);
});

test('Alola: células de Zygarde (SL), dominsignias y Mantine Surf (USUL) desde cells7',()=>{
 const O=require('../src/engine/objectives.js'),v=(d,id)=>O.fromDiagnosis({game:d.g,cells7:d.c}).find(x=>x.id===id)?.value;
 assert.equal(v({g:'SUN',c:{kind:'zygardeCells',total:95,received:95,surf:null}},'alola.sm.zygardeCells'),true);
 assert.equal(v({g:'SUN',c:{kind:'zygardeCells',total:95,received:94,surf:null}},'alola.sm.zygardeCells'),false);
 assert.equal(v({g:'ULTRAMOON',c:{kind:'totemStickers',total:100,received:100,surf:[1,2,3,4]}},'alola.usum.totemStickers'),true);
 assert.equal(v({g:'ULTRAMOON',c:{kind:'totemStickers',total:100,received:100,surf:[1,2,3,0]}},'alola.usum.mantineSurf4'),false);
 assert.equal(v({g:'SUN',c:{kind:'zygardeCells',total:95,received:95,surf:null}},'alola.usum.mantineSurf4'),undefined);
});

test('DBPR: estrella de las 100 estatuas distintas (statues8b)',()=>{
 const O=require('../src/engine/objectives.js'),v=k=>O.fromDiagnosis({game:'BD',statues8b:{kinds:k}}).find(x=>x.id==='card.bdsp.statues100')?.value;
 assert.equal(v(100),true);assert.equal(v(99),false);
});

test('Leyendas Z-A: megapiedras del juego base (67), de Megadimensión (14) y especiales (11)',()=>{
 const O=require('../src/engine/objectives.js'),r=(a,b)=>Array.from({length:b-a+1},(_,k)=>a+k);
 const all=[...r(656,685),...r(752,764),...r(767,770),...r(2559,2587),...r(2635,2650)];
 const v=(ids,id)=>O.fromDiagnosis({game:'ZA',inventory:[{pocket:'MegaStones',items:ids.map(x=>({id:x,count:1}))}]}).find(x=>x.id===id)?.value;
 // Como la partida del propietario: le faltan Blazikenita, Swampertita, Sceptilita y Garchompita Z.
 const owner=all.filter(x=>![664,752,753,2640].includes(x));
 assert.equal(v(owner,'za.megaStones.base'),true);assert.equal(v(owner,'za.megaStones.dlc'),true);
 assert.equal(v(owner,'za.megaStones.special'),undefined);
 assert.equal(v(owner.filter(x=>x!==656),'za.megaStones.base'),undefined);
 assert.equal(v(all,'za.megaStones.special'),true);
});

test('DBPR: diploma de Sinnoh con la lista de ZukanWork (vistos, sin Manaphy) y nacional',()=>{
 const C=require('../src/engine/completion.js'),seen=Array.from({length:493},(_,i)=>i+1).filter(i=>i!==490);
 assert.equal(C.dexStatus({game:'BD',caught:[],seen}).sinnoh.complete,true);
 assert.equal(C.dexStatus({game:'SP',caught:[],seen:seen.filter(i=>i!==484)}).sinnoh.complete,false);
 assert.equal(C.dexStatus({game:'SP',caught:[],seen}).national.required,482);
});
