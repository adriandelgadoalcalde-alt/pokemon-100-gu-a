/* Conservative objective evaluation. Explicit evidence types, three-valued logic, stable DAG. */
(function(root){
 'use strict';
 const UNKNOWN=()=>({value:null,proof:'unknown',facts:[],supportingFacts:[]});
 function references(expr){
  if(!expr)return [];
  if(expr.objective)return [expr.objective];
  return [...(expr.all||[]),...(expr.any||[])].flatMap(references);
 }
 function order(nodes){
  const ids=new Map();
  for(const [index,n]of nodes.entries()){
   if(!n.id||ids.has(n.id))throw Error('Objetivo sin ID o duplicado: '+n.id);
   ids.set(n.id,{...n,index});
  }
  const done=new Set(),visiting=new Set(),result=[];
  function visit(n){
   if(done.has(n.id))return;
   if(visiting.has(n.id))throw Error('Ciclo de requisitos: '+n.id);
   visiting.add(n.id);
   for(const id of [...references(n.prerequisites),...references(n.verification)]){
    const ref=ids.get(id);if(!ref)throw Error('Requisito inexistente: '+id);
    if(ref.gameId!==n.gameId)throw Error('Dependencia entre ediciones sin regla explícita: '+id);
    visit(ref);
   }
   visiting.delete(n.id);done.add(n.id);result.push(n);
  }
  [...ids.values()].sort((a,b)=>(a.order??a.index)-(b.order??b.index)||a.index-b.index).forEach(visit);
  return result;
 }
 function weakest(proofs){
  return proofs.includes('unknown')?'unknown':proofs.includes('derived')?'derived':proofs.includes('manual')?'manual':'direct';
 }
 function evaluate(nodes,facts,gameId){
  const results=new Map(),availableFacts=new Map();
  for(const fact of facts){
   if(fact.gameId!==gameId)continue;
   const key=fact.id,prior=availableFacts.get(key);
   if(prior&&JSON.stringify(prior.value)!==JSON.stringify(fact.value))
    availableFacts.set(key,{id:key,gameId,value:null,type:'conflict',validation:'unknown'});
   else if(!prior)availableFacts.set(key,fact);
  }
  function expr(rule){
   if(!rule)return UNKNOWN();
   if(rule.objective){
    const state=results.get(rule.objective);
    if(!state)return UNKNOWN();
    if(state.status==='COMPLETED_VERIFIED')return {value:true,proof:'direct',facts:state.verification.facts,supportingFacts:state.verification.supportingFacts||state.verification.facts};
    if(state.status==='COMPLETED_MANUAL')return {value:true,proof:'manual',facts:state.verification.facts,supportingFacts:state.verification.supportingFacts||state.verification.facts};
    if(state.verification.value===false&&state.verification.proof==='direct')return {value:false,proof:'direct',facts:state.verification.facts};
    return UNKNOWN();
   }
   if(rule.fact){
    const f=availableFacts.get(rule.fact);if(!f||f.value===null||f.value===undefined)return UNKNOWN();
    const value=rule.atLeast!==undefined?typeof f.value==='number'&&f.value>=rule.atLeast:
     Object.prototype.hasOwnProperty.call(rule,'equals')?f.value===rule.equals:f.value===true;
    const proof=f.type==='manual'?'manual':f.type==='direct'&&f.validation==='verified'?'direct':'derived';
    return {value,proof,facts:[f.id],supportingFacts:value?[f.id]:[]};
   }
   const items=rule.all??rule.any;
   if(!Array.isArray(items))return UNKNOWN();
   const values=items.map(expr),isAll=rule.all!==undefined;
   if(!values.length)return {value:isAll,proof:'direct',facts:[]};
   const decisive=values.filter(v=>v.value===(isAll?false:true));
   if(decisive.length){
    // Prefer a direct witness when any branch alone settles the expression.
    const direct=decisive.find(v=>v.proof==='direct'),manual=decisive.find(v=>v.proof==='manual'),witness=direct||manual||decisive[0];
    return {...witness};
   }
   if(values.some(v=>v.value===null))return {value:null,proof:'unknown',facts:values.flatMap(v=>v.facts),supportingFacts:values.flatMap(v=>v.supportingFacts||[])};
   return {value:isAll,proof:weakest(values.map(v=>v.proof)),facts:values.flatMap(v=>v.facts),supportingFacts:isAll?values.flatMap(v=>v.supportingFacts||v.facts):[]};
  }
  for(const n of order(nodes).filter(n=>n.gameId===gameId)){
   const prerequisites=expr(n.prerequisites||{all:[]}),verification=expr(n.verification);
   let status;
   if(n.available===false)status='UNAVAILABLE_THIS_VERSION';
   else if(n.historicalUnavailable===true)status='UNAVAILABLE_HISTORICAL_EVENT';
   else if(n.dlcPurchased===false)status='OPTIONAL_NOT_PURCHASED_DLC';
   else if(verification.value===true&&verification.proof==='direct')status='COMPLETED_VERIFIED';
   else if(verification.value===true&&verification.proof==='manual')status='COMPLETED_MANUAL';
   else if(verification.value===true)status='PARTIAL_EVIDENCE';
   else if(verification.value===null&&verification.supportingFacts?.length>0)status='PARTIAL_EVIDENCE';
   else if(prerequisites.value===false&&prerequisites.proof==='direct')status='BLOCKED_BY_PREREQUISITE';
   else if(prerequisites.value!==true||prerequisites.proof==='derived'||verification.value===null)status='UNKNOWN';
   else status='AVAILABLE';
   results.set(n.id,{id:n.id,title:n.title||n.id,status,prerequisites,verification,
    warnings:verification.value===true&&prerequisites.value===false?['La evidencia del objetivo contradice un requisito; revisar ambas fuentes.']:[]});
  }
  return order(nodes).filter(n=>n.gameId===gameId).map(n=>results.get(n.id));
 }
 function next(results){
  const ready=results.find(r=>r.status==='AVAILABLE');
  if(ready)return {objective:ready.id,action:'continue',reason:'Requisitos acreditados; objetivo pendiente.'};
  const unknown=results.find(r=>r.status==='UNKNOWN'||r.status==='PARTIAL_EVIDENCE');
  return unknown?{objective:unknown.id,action:'inspect-evidence',reason:'Falta evidencia suficiente; abrir instrucciones y alcance de lectura.'}:null;
 }
 function fromDiagnosis(d){
  if(!d?.game)return [];
  const validated=d.integrity?.checksumsValid===true||d.integrity?.generalChecksumValid===true;
  const facts=[],add=(id,value,field)=>facts.push({id,value,gameId:d.game,type:'direct',
   validation:validated||d.integrity?.verifiedFields?.includes(field)?'verified':'unverified',source:{kind:'save_field',engine:d.extractor?.engine||'PokemonSaveReader'}});
  for(const id of d.caught||[])add(`pokedex.caught.${id}`,true,'caught');
  for(const id of d.seen||[])add(`pokedex.seen.${id}`,true,'seen');
  const completion=(typeof module==='object'&&module.exports?require('./completion.js'):root.PokemonCompletion)?.dexStatus(d);
  if(completion)for(const [key,status]of Object.entries(completion)){
   add('pokedex.completion.'+key,status.complete,status.field);
   facts.at(-1).source={...facts.at(-1).source,definition:status.source,meaning:'Exact registered species set; not original encounters or reward collection'};
  }
  const medals=(typeof module==='object'&&module.exports?require('../guides/medals.js'):root.PokemonMedalBook)?.snapshot(d);
  if(medals)add('medals.b2w2.allReceived',medals.complete,'medals');
  // N2/B2: Rascacielos Negro (Negro 2) / Cavernogal Blanco (Blanco 2). Medallas de la ROM (a/0/0/2, textos 80 y 83):
  // 146/148 = llegar a la 5.ª zona, 147/149 = llegar a la 10.ª zona (índices desde 0; id = índice + 1). Cuenta el estado
  // «lista para recoger» (3) o «recibida» (4).
  if(medals&&Array.isArray(medals.entries)){
   const zone10=medals.entries.find(m=>m.id===(d.game==='BLACK2'?148:150));
   if(zone10&&zone10.state!==null)add('b2w2.dominionZone10',zone10.state>=3,'medals');
  }
  const passport=(typeof module==='object'&&module.exports?require('../saves/passport.js'):root.PokemonPassport)?.snapshot(d);
  if(passport)for(const stamp of passport.entries)add('passport.stamp.'+stamp.index,stamp.registered,'passport');
  if(typeof d.gameClear==='boolean')add('story.gameClear',d.gameClear,'gameClear');
  if(typeof d.nationalDex==='boolean')add('pokedex.nationalUnlocked',d.nationalDex,'nationalDex');
  if(Number.isInteger(d.badgesTotal??d.badges))add('story.badges.count',d.badgesTotal??d.badges,'badgesTotal');
  for(const item of d.keyItems||[])if(item.count>0)add(`inventory.keyItem.${item.id}.present`,true,'keyItems');
  // Esmeralda: estrella del Frente Batalla = plata y oro de las 7 instalaciones (HasAllFrontierSymbols, pokeemerald).
  if(d.field&&Array.isArray(d.field.flags)&&(d.field.family?d.field.family==='E':d.game==='EMERALD')){
   const G=typeof module==='object'&&module.exports?require('../saves/gen3-data.js'):root.PokemonGen3Data;
   const F=G?.families?.E?.flags,names=['TOWER','DOME','PALACE','ARENA','FACTORY','PIKE','PYRAMID'].flatMap(n=>['FLAG_SYS_'+n+'_SILVER','FLAG_SYS_'+n+'_GOLD']);
   if(F&&names.every(n=>Number.isInteger(F[n]))){const set=new Set(d.field.flags);add('card.emerald.frontierSymbols',names.every(n=>set.has(F[n])),'field');}
  }
  // Rubí/Zafiro/Esmeralda: estrella de los cuadros del museo. FLAG_COOL/BEAUTY/CUTE/SMART/TOUGH_PAINTING_MADE
  // (0xA0-0xA4, igual en pokeruby y pokeemerald) se activan en el vestíbulo de concursos al hacer cada cuadro.
  if(d.field&&Array.isArray(d.field.flags)&&['RS','E'].includes(d.field.family)){
   const set=new Set(d.field.flags);add('card.hoenn.paintings',[0xA0,0xA1,0xA2,0xA3,0xA4].every(f=>set.has(f)),'field');
  }
  // Gen. III: FLAG_SYS_GAME_CLEAR (pokeruby/pokeemerald/pokefirered; lo activa el Salón de la Fama) leída directamente
  // de las banderas de campo. Es la misma bandera que la señal documentada del motor, que queda como respaldo.
  if(typeof d.gameClear!=='boolean'&&d.field&&Array.isArray(d.field.flags)){
   const G=typeof module==='object'&&module.exports?require('../saves/gen3-data.js'):root.PokemonGen3Data;
   const flag=G?.families?.[d.field.family]?.flags?.FLAG_SYS_GAME_CLEAR;
   if(Number.isInteger(flag))add('story.gameClear',d.field.flags.includes(flag),'field');
  }
  // Casa Trampa (Ruta 110): VAR 0x4044 llega a 8 con los ocho puzles (pokeemerald VAR_TRICK_HOUSE_LEVEL,
  // pokeruby VAR_TRICK_HOUSE_ROOMS_COMPLETED; Route110_TrickHouseEntrance compara con 8).
  if(['RS','E'].includes(d.field?.family)&&Array.isArray(d.field.vars)&&Number.isInteger(d.field.vars[0x44]))add('challenge.hoenn.trickHouse',d.field.vars[0x44]>=8,'field');
  // Rubí Omega/Zafiro Alfa: «Contest Spectacular Progress» (variable 215 de PKHeX const_oras): 21 = Plubio y Lisia vencidos.
  if(['OMEGARUBY','ALPHASAPPHIRE'].includes(d.game)&&Array.isArray(d.events?.work)&&Number.isInteger(d.events.work[215]))add('contest.oras.spectacular',d.events.work[215]>=21,'events');
  // Rojo Fuego/Verde Hoja: revancha de la Liga = banderas de entrenador de TRAINER_ELITE_FOUR_*_2 (pokefirered; 0x500 +
  // 735..738). Las del Campeón no sirven: EventScript_ResetEliteFour (hall_of_fame.inc) las borra al entrar en el Salón.
  if(d.field?.family==='FRLG'&&Array.isArray(d.field.flags)){const set=new Set(d.field.flags);add('story.frlg.championRematch',[735,736,737,738].every(i=>set.has(0x500+i)),'field');}
  // Rubí/Zafiro: estrella de la Torre Batalla = mejor racha > 49 (pokeruby trainer_card.c, TrainerCard_GetStarCount).
  if(d.field?.family==='RS'&&Number.isInteger(d.field.battleTower?.bestStreak))add('card.rs.battleTower',d.field.battleTower.bestStreak>49,'field');
  // Rojo Fuego/Verde Hoja: estrella de minijuegos = 200 bayas en Dodrio a por bayas y 200 saltos seguidos en Salto Pokémon.
  const mg=d.field?.family==='FRLG'?d.field.minigames:null;
  if(mg&&Number.isInteger(mg.jumpsInRow)&&Number.isInteger(mg.berriesPicked))add('card.frlg.minigames',mg.jumpsInRow>=200&&mg.berriesPicked>=200,'field');
  // Rojo Fuego/Verde Hoja: Torre Desafío superada en las cuatro modalidades = récord por debajo del máximo en cada una.
  const tt=d.field?.family==='FRLG'?d.field.trainerTower:null;
  if(Array.isArray(tt)&&tt.length===4&&tt.every(x=>Number.isInteger(x?.bestTime)))add('challenge.frlg.trainerTower',tt.every(x=>x.bestTime<215999),'field');
  // Diamante/Perla/Platino: bandera de platino del Subsuelo = 50 banderas capturadas (pokeplatinum underground.c).
  if(Number.isInteger(d.underground4?.flagsCaptured))add('card.sinnoh.platinumFlag',d.underground4.flagsCaptured>=50,'underground4');
  // Metro Batalla: Fero y Caril, combate 49 de los súper trenes individual y doble (récord >= 49 en ambos).
  const sw=d.subway5;
  if(sw&&Number.isInteger(sw.superSingleRecord)&&Number.isInteger(sw.superDoubleRecord))add('battle.unova.subwayBosses',sw.superSingleRecord>=49&&sw.superDoubleRecord>=49,'subway5');
  // HeartGold/SoulSilver: estrellas de la tarjeta (pokeheartgold sub_020691E8, ScrCmd_GetTrcardStars). FLAG_UNK_0F1 =
  // mejor récord en las 10 pruebas del Pokéathlon (abre la sala «Potential», scr_seq_0127_D49R0106); FLAG_UNK_184 = corona
  // de hojas doradas entregada (scr_seq_0849_T20R0402, tras TryGiveShinyLeafCrown).
  if(['HEARTGOLD','SOULSILVER'].includes(d.game)&&Array.isArray(d.events?.activeFlags)){
   const fl=new Set(d.events.activeFlags);add('card.hgss.pokeathlon',fl.has(0xF1),'events');add('card.hgss.leafCrown',fl.has(0x184),'events');
  }
  // HeartGold/SoulSilver: las 28 formas de Unown en la Pokédex (lista de formas de Zukan4).
  if(['HEARTGOLD','SOULSILVER'].includes(d.game)&&Array.isArray(d.unownForms))add('pokedex.hgss.unown28',d.unownForms.length>=28,'caught');
  // Platino: estrella de la Torre Batalla = récord ≥ 100 en cualquier modalidad (TrainerCase_CalculateTrainerCardLevel).
  if(['HEARTGOLD','SOULSILVER'].includes(d.game)&&Array.isArray(d.tower4?.records)&&d.tower4.records.every(Number.isInteger))add('battle.hgss.tower100',d.tower4.records.some(v=>v>=100),'events');
  if(d.game==='PLATINUM'&&Array.isArray(d.tower4?.records)&&d.tower4.records.every(Number.isInteger))add('battle.pt.tower100',d.tower4.records.some(v=>v>=100),'tower4');
  // Rojo/Azul/Verde/Amarillo: revancha de la Liga = segunda entrada en el Salón de la Fama (wHallOfFameCount de pokered,
  // que crece con cada victoria ante el Campeón).
  if(Number.isInteger(d.hallOfFame1?.count))add('story.gen1.leagueRematch',d.hallOfFame1.count>=2,'hallOfFame1');
  // Escarlata/Púrpura y Z-A: cada Pokédex regional completa (capturados = total según PersonalInfo9 de PKHeX).
  if(d.dex9&&typeof d.dex9==='object')for(const [k,v]of Object.entries(d.dex9))if(Number.isInteger(v?.caught)&&Number.isInteger(v?.total)&&v.total>0)add('pokedex.gen9.'+k,v.caught>=v.total,'dex9');
  // Oro/Plata/Cristal: las 26 letras de Unown de la Pokédex (wUnownDex).
  if(Number.isInteger(d.unown2?.forms))add('pokedex.gen2.unown26',d.unown2.forms>=26,'unown2');
  // Rojo/Azul/Verde/Amarillo: Visor Silph (0x48), Poké Flauta (0x49) y MO01-MO05 (0xC4-0xC8) en la mochila o el PC
  // (índices internos de pokered, constants/item_constants.asm). Las MO se pueden tirar, así que la ausencia no prueba
  // nada: solo se acredita la presencia de todas.
  if(['RED','BLUE','GREEN','YELLOW'].includes(d.game)&&d.integrity?.checksumsValid===true&&Array.isArray(d.inventory)){
   const have=new Set();for(const p of d.inventory)for(const i of p?.items||[])if(i?.count>0)have.add(i.id);
   if([0x48,0x49,0xC4,0xC5,0xC6,0xC7,0xC8].every(id=>have.has(id)))add('inventory.gen1.fieldItems',true,'inventory');
  }
  // Oro/Plata/Cristal: Billete Barco (0x44) y Pase del Magnetotrén (0x86) en el inventario (pokecrystal item_constants;
  // objetos clave que no se pueden tirar). Solo se acredita la presencia.
  if(['GOLD','SILVER','CRYSTAL'].includes(d.game)&&d.integrity?.checksumsValid===true&&Array.isArray(d.inventory)){
   const have=new Set();for(const p of d.inventory)for(const i of p?.items||[])if(i?.count>0)have.add(i.id);
   if(have.has(0x44)&&have.has(0x86))add('inventory.gen2.tickets',true,'inventory');
  }
  // Rubí/Zafiro/Esmeralda: objetos clave de acceso (pokeruby/pokeemerald items.h): Gafas Aislantes 279 (desierto y
  // Ruinas de Regirock), Detector Devon 288 (Kecleon que cortan el paso) y, en Esmeralda, Emblema Magma 375 (Pico
  // Pirámide/Monte Pírico hacia Groudon). Solo se acredita la presencia: los objetos clave no se pueden tirar.
  if(['RUBY','SAPPHIRE','EMERALD'].includes(d.game)&&d.integrity?.checksumsValid===true&&Array.isArray(d.inventory)){
   const have=new Set();for(const p of d.inventory)for(const i of p?.items||[])if(i?.count>0)have.add(i.id);
   const need=d.game==='EMERALD'?[279,288,375]:[279,288];
   if(need.every(id=>have.has(id)))add('inventory.hoenn.accessItems',true,'inventory');
  }
  // Alola: los 18 cristales Z de tipo (807-824), el Arca de Zygarde (847) y la Pulsera Z (797) o Superpulsera Z (933 en
  // USUM), números de objeto de PKHeX. Solo se acredita la presencia en el inventario.
  if(['SUN','MOON','ULTRASUN','ULTRAMOON'].includes(d.game)&&d.integrity?.checksumsValid===true&&Array.isArray(d.inventory)){
   const have=new Set();for(const p of d.inventory)for(const i of p?.items||[])if(i?.count>0)have.add(i.id);
   const ring=['ULTRASUN','ULTRAMOON'].includes(d.game)?933:797;
   if(Array.from({length:18},(_,i)=>807+i).every(id=>have.has(id))&&have.has(847)&&have.has(ring))add('inventory.alola.zResources',true,'inventory');
  }
  // Rojo Fuego/Verde Hoja: Visor Silph (359), Poké Flauta (350) y MO01-MO07 (339-345), ids de pokefirered items.h.
  if(['FIRERED','LEAFGREEN'].includes(d.game)&&d.integrity?.checksumsValid===true&&Array.isArray(d.inventory)){
   const have=new Set();for(const p of d.inventory)for(const i of p?.items||[])if(i?.count>0)have.add(i.id);
   if([359,350,339,340,341,342,343,344,345].every(id=>have.has(id)))add('inventory.frlg.fieldItems',true,'inventory');
  }
  // Ultrasol/Ultraluna: episodio Rainbow Rocket terminado. flags_usum de PKHeX: 211 = «la mansión de Samina NO es el
  // castillo del Team Rocket» (también vale antes del episodio) y 1730-1732 = Electrode desaparecidos dentro del castillo
  // (solo durante el episodio). Las dos cosas juntas prueban que se entró y que la mansión volvió a la normalidad. La
  // ausencia no prueba nada (los Electrode son opcionales): solo se acredita la presencia.
  if(['ULTRASUN','ULTRAMOON'].includes(d.game)&&Array.isArray(d.events?.activeFlags)){
   const fl=new Set(d.events.activeFlags);
   if(fl.has(211)&&[1730,1731,1732].some(f=>fl.has(f)))add('story.usum.rainbowRocket',true,'events');
  }
  // La enfermera reconoce la tarjeta de oro (te llama por tu nombre y cura sin preguntar): bandera que el script pone la
  // primera vez. Esmeralda FLAG_NURSE_MENTIONS_GOLD_CARD 0x159 (pokeemerald), Platino FLAG_POKECENTER_GOLD_TRAINER_CARD_SEEN
  // 0x69 (pokeplatinum), HGSS FLAG_NURSE_NOTICED_CARD 0x64 (pokeheartgold). Solo se acredita la presencia.
  {
   const nurse={EMERALD:0x159,PLATINUM:0x69,DIAMOND:0x69,PEARL:0x69,HEARTGOLD:0x64,SOULSILVER:0x64,BD:68,SP:68}[d.game];
   const flags=d.game==='EMERALD'?d.field?.flags:d.events?.activeFlags;
   if(nurse!==undefined&&Array.isArray(flags)&&flags.includes(nurse))add('card.nurseRecognition',true,d.game==='EMERALD'?'field':'events');
  }
  // Diplomas del director del juego en Platino (Hotel Gran Lago): el script pone FLAG_RECEIVED_LOCAL_DEX_DIPLOMA (0xAB) y
  // FLAG_RECEIVED_NATIONAL_DEX_DIPLOMA (0xAC) al entregarlos (pokeplatinum, grand_lake_valor_lakefront_west_house y
  // generated/vars_flags.txt; misma numeración que la 0x69 de la enfermera). Solo se acredita la presencia.
  // Diamante/Perla: las mismas banderas, FE_RECONGNIZE_SHINOU/NATIONAL 0xAB/0xAC y FE_PC_GOLD 0x69 (FlagsEditorEXPlugin flags_gen4dp).
  if(['PLATINUM','DIAMOND','PEARL'].includes(d.game)&&Array.isArray(d.events?.activeFlags)){
   const fl=new Set(d.events.activeFlags);
   if(fl.has(0xAB))add('card.pt.diplomaSinnoh',true,'events');
   if(fl.has(0xAC))add('card.pt.diplomaNational',true,'events');
  }
  // X/Y: diplomas del director del juego (hotel de Ciudad Témpera), SYS_FLAG_C05R0302_AWARD_01-05 = 0xA7A-0xA7E (Kalos
  // Centro, Costa, Montaña, Kalos completa y Nacional). ROZA: SYS_FLAG_ZUKAN_AWARD_CHI 0xBC6 (Hoenn) y _ZEN 0xBC7 (Nacional).
  // Nombres y números de FlagsEditorEXPlugin (flags_gen6xy_en / flags_gen6oras_en). Solo se acredita la presencia.
  if(['X','Y','OMEGARUBY','ALPHASAPPHIRE'].includes(d.game)&&Array.isArray(d.events?.activeFlags)){
   const fl=new Set(d.events.activeFlags),xy=['X','Y'].includes(d.game);
   if(xy?[0xA7A,0xA7B,0xA7C,0xA7D].every(f=>fl.has(f)):fl.has(0xBC6))add('card.gen6.diplomaRegional',true,'events');
   if(fl.has(xy?0xA7E:0xBC7))add('card.gen6.diplomaNational',true,'events');
  }
  // Teselia: FE_AWARD_LOCAL / FE_AWARD_NATIONAL (FlagsEditorEXPlugin; N/B 0x11F/0x120, N2/B2 0xDD/0xDE). Contrastado con las
  // cuatro partidas del propietario: Negro solo el regional (su habitación muestra solo ese diploma), Negro 2 «100» los dos,
  // Blanco y Blanco 2 ninguno. Solo se acredita la presencia.
  if(['BLACK','WHITE','BLACK2','WHITE2'].includes(d.game)&&Array.isArray(d.events?.activeFlags)){
   const fl=new Set(d.events.activeFlags),bw=['BLACK','WHITE'].includes(d.game);
   if(fl.has(bw?0x11F:0xDD))add('card.unova.diplomaRegional',true,'events');
   if(fl.has(bw?0x120:0xDE))add('card.unova.diplomaNational',true,'events');
  }
  // X/Y: capítulo de Handsome completo = FE_HANDSOME_QUEST_ALL_CLEAR (0xC9, FlagsEditorEXPlugin flags_gen6xy). Contrastado
  // con las partidas del propietario: Y lo tiene (WK_SCENE_HANDSOME_QUEST = 7 y los seis episodios con estado), X no lo empezó.
  if(['X','Y'].includes(d.game)&&Array.isArray(d.events?.activeFlags))add('xy.handsomeComplete',d.events.activeFlags.includes(0xC9),'events');
  // ROZA: revancha del campeón (Máximo con su equipo reforzado) = TRID_CHAMPION_P_01/_P_02 (0x974/0xA7A, FlagsEditorEXPlugin
  // flags_gen6oras). En ROZA el combate con el campeón sí marca su bandera de entrenador: TRID_CHAMPION_01 (0x8F9) está activa
  // en las dos partidas del propietario, que solo han ganado la Liga una vez (WK_OTHER_BIGFOUR = 1) y tienen las de revancha a 0.
  if(['OMEGARUBY','ALPHASAPPHIRE'].includes(d.game)&&Array.isArray(d.events?.activeFlags)){
   const fl=new Set(d.events.activeFlags);
   if(fl.has(0x8F9))add('oras.stevenRematch',fl.has(0x974)||fl.has(0xA7A),'events');
  }
  // DBPR: EvWork.FLAG_INDEX de uDPR: FE_RECONGNIZE_SHINOU/NATIONAL 132/133 (diplomas) y FE_C10R0111_LEAGUE2_CHAMP_WIN 1713
  // (victoria contra Cintia en la revancha de la Liga; la primera es FE_C10R0111_CHAMP_WIN 141). Solo presencia.
  if(['BD','SP'].includes(d.game)&&Array.isArray(d.events?.activeFlags)){
   const fl=new Set(d.events.activeFlags);
   if(fl.has(132))add('card.bdsp.diplomaSinnoh',true,'events');
   if(fl.has(133))add('card.bdsp.diplomaNational',true,'events');
   if(fl.has(1713))add('bdsp.cynthiaRematch',true,'events');
   if(fl.has(1426))add('bdsp.towerMaster',true,'events'); // FE_TOWER_MASTER_WINED: victoria contra el As de la Torre Batalla.
  }
  // Alola: núcleos de Zygarde recogidos = SYS_FLAG_ZIGARUDE_CORE1..5_GET (SL 0xC63-0xC67, USUL 0x1023-0x1027;
  // FlagsEditorEXPlugin). Contrastado: Sol pública acabada (95 células) 5/5, partidas recién empezadas 0/5.
  if(['SUN','MOON','ULTRASUN','ULTRAMOON'].includes(d.game)&&Array.isArray(d.events?.activeFlags)){
   const fl=new Set(d.events.activeFlags),b=['SUN','MOON'].includes(d.game)?0xC63:0x1023;
   add('alola.zygardeCores',[0,1,2,3,4].every(i=>fl.has(b+i)),'events');
  }
  // HGSS: el director de la Mansión Azulona pone FLAG_SAW_JOHTO_DEX_CERTIFICATE 0x143 y FLAG_SAW_NATIONAL_DEX_CERTIFICATE
  // 0x144 al enseñar cada diploma (pokeheartgold, scr_seq_0798_T07R0203 y include/constants/flags.h).
  if(['HEARTGOLD','SOULSILVER'].includes(d.game)&&Array.isArray(d.events?.activeFlags)){
   const fl=new Set(d.events.activeFlags);
   if(fl.has(0x143))add('card.hgss.diplomaJohto',true,'events');
   if(fl.has(0x144))add('card.hgss.diplomaNational',true,'events');
  }
  // Esmeralda: combate con Máximo en la Cascada Meteoro tras la Liga, FLAG_DEFEATED_METEOR_FALLS_STEVEN 0x4F8 (pokeemerald).
  if(d.field&&Array.isArray(d.field.flags)&&(d.field.family?d.field.family==='E':d.game==='EMERALD'))add('battle.emerald.stevenMeteorFalls',d.field.flags.includes(0x4F8),'field');
  // Alola: células de Zygarde (SL, 95) y pegatinas dominantes (USUL, 100) recogidas, y los cuatro recorridos del Surfeo Mantine
  // con puntuación (USUL). Vector de EventWork7 de PKHeX (cells7 de Audit.cs).
  if(d.cells7&&Number.isInteger(d.cells7.received)&&Number.isInteger(d.cells7.total)&&d.cells7.total>0){
   add(d.cells7.kind==='totemStickers'?'alola.usum.totemStickers':'alola.sm.zygardeCells',d.cells7.received>=d.cells7.total,'cells7');
   // Variable 169 de EventWork7 (ZygardeCellCount de PKHeX) = células y núcleos reunidos. Contrastado: Sol pública 95+5=100,
   // Sol del propietario 95+0, Luna 71+4=75. En USUL no hay células por Alola: el Arca trae 40 (variable 161), Dexio da un
   // Zygarde al 10 % y en la Gruta Desenlace hay uno al 50 % (WikiDex «Arca de Zygarde»): total 100.
   if(d.cells7.kind==='totemStickers'&&Array.isArray(d.cells7.cellWork)&&Number.isInteger(d.cells7.cellWork[1]))add('alola.usum.zygardeCells',d.cells7.cellWork[1]>=100,'cells7');
   if(Array.isArray(d.cells7.surf)&&d.cells7.surf.length===4)add('alola.usum.mantineSurf4',d.cells7.surf.every(x=>Number.isInteger(x)&&x>0),'cells7');
  }
  // DBPR: estrella de las estatuas = 100 tipos distintos (PlayerWork.GetTrainerRank y UgItemWork.GetHaveStatueKindNum, uDPR).
  if(Number.isInteger(d.statues8b?.kinds))add('card.bdsp.statues100',d.statues8b.kinds>=100,'statues8b');
  // Leyendas Z-A: megapiedras (ItemStorage9ZA.MegaStones de PKHeX). WikiDex «Megapiedra»: todas se consiguen jugando salvo
  // 7 de los combates clasificatorios en línea (Sceptilita, Blazikenita, Swampertita, Chesnaughtita, Delphoxita,
  // Greninjanita, Baxcaliburita) y 4 de regalo misterioso (Diancita, Mewtwoita X e Y, Garchompita Z). Las 2635-2650 son de
  // Megadimensión. Solo se acredita la presencia: una megapiedra equipada a un Pokémon puede no estar en la bolsa.
  if(d.game==='ZA'&&Array.isArray(d.inventory)){
   const have=new Set();for(const p of d.inventory)for(const i of p?.items||[])if(i?.count>0)have.add(i.id);
   const r=(a,b)=>Array.from({length:b-a+1},(_,k)=>a+k),special=[753,664,752,2575,2576,2577,2648,764,662,663,2640];
   const all=[...r(656,685),...r(752,764),...r(767,770),...r(2559,2587),...r(2635,2650)];
   const base=all.filter(x=>x<2635&&!special.includes(x)),dlc=all.filter(x=>x>=2635&&!special.includes(x));
   if(base.every(x=>have.has(x)))add('za.megaStones.base',true,'inventory');
   if(dlc.every(x=>have.has(x)))add('za.megaStones.dlc',true,'inventory');
   if(special.every(x=>have.has(x)))add('za.megaStones.special',true,'inventory');
  }
  // Sol/Luna y USUL: defensas del título de campeón (récord 100 de PKHeX).
  if(Number.isInteger(d.records7?.titleDefense))add('alola.titleDefense',d.records7.titleDefense>=1,'records7');
  // DBPR: Griseosfera (objeto 112) en la bolsa = Giratina vencido en la Sala de la Distorsión del Parque Hansa (WikiDex).
  if(['BD','SP'].includes(d.game)&&Array.isArray(d.inventory)&&d.inventory.some(p=>(p?.items||[]).some(i=>i?.id===112&&i.count>0)))add('bdsp.griseousOrb',true,'inventory');
  // Espada/Escudo: fin de La isla de la armadura y de Las nieves de la corona (FSYS_R1/R2_GAME_CLEAR, clear8 de Audit.cs).
  if(['SWORD','SHIELD'].includes(d.game)&&d.clear8&&typeof d.clear8==='object'){
   if(typeof d.clear8.armor==='boolean')add('swsh.armorClear',d.clear8.armor,'clear8');
   if(typeof d.clear8.crown==='boolean')add('swsh.crownClear',d.clear8.crown,'clear8');
  }
  // Musical: los 100 complementos (bits de Musical5 de PKHeX). Se exige la colección entera, sin excluir los de evento.
  if(Number.isInteger(d.musical5?.props))add('musical.unova.allProps',d.musical5.props>=100,'musical5');
  // Zona Nexo de Negro 2/Blanco 2: estrella de la tarjeta con los niveles blanco y negro a 30 (Serebii, «Trainer Card» de B2W2).
  const en=d.entralink5;
  if(['BLACK2','WHITE2'].includes(d.game)&&Number.isInteger(en?.white)&&Number.isInteger(en?.black))add('entralink.b2w2.level30',en.white>=30&&en.black>=30,'entralink5');
  // N/B: los poderes regalo se ganan con las misiones del Nexo. Solo se afirma el «no»: Nexo sin tocar (0 misiones, niveles a 0 y
  // el bloque vacío). Con el Nexo usado no hay estructura documentada para el «sí» y el hecho queda sin evidencia.
  if(['BLACK','WHITE'].includes(d.game)&&en?.untouched===true&&en.missions===0&&en.white===0&&en.black===0)add('entralink.bw.allPowers',false,'entralink5');
  // Estudios Cinematográficos Pokéwood (N2/B2): las 40 películas completadas.
  if(Number.isInteger(d.pokestar5?.completed))add('pokestar.b2w2.allMovies',d.pokestar5.completed>=d.pokestar5.total,'pokestar5');
  // PWT: el récord 17 (PWTRecordID.Champion) cuenta las victorias en el Torneo Campeones.
  if(Array.isArray(d.pwt5?.records)&&Number.isInteger(d.pwt5.records[17]))add('battle.b2w2.pwtChampions',d.pwt5.records[17]>=1,'pwt5');
  // Árbol de Combate: los Campeones Legendarios esperan en el supercombate 50 (WikiDex «Árbol de Combate»).
  const tree=Array.isArray(d.battleTree?.modes)?d.battleTree.modes.slice(0,3).map(m=>m?.superBest).filter(Number.isInteger):[];
  if(tree.length)add('battle.alola.treeSuper50',tree.some(v=>v>=50),'battleTree');
  // Espada/Escudo: Pokédex de Galar, de la Isla de la Armadura y de las Nieves de la Corona completas (tarjeta de entrenador).
  if(d.card8&&typeof d.card8.galarDex==='boolean'){add('pokedex.swsh.galarCard',d.card8.galarDex,'card8');
   if(typeof d.card8.armorDex==='boolean'&&typeof d.card8.crownDex==='boolean')add('pokedex.swsh.allCards',d.card8.galarDex&&d.card8.armorDex&&d.card8.crownDex,'card8');}
  // Diamante Brillante/Perla Reluciente: rango Maestro de concursos = SYS_FLAG_CON_*_MASTER, banderas de sistema 9-13
  // (PKHeX system_bdsp; bdsp-flags.js las sitúa tras las 4000 normales).
  if(['BD','SP'].includes(d.game)&&Array.isArray(d.events?.activeFlags)&&d.events.systemOffset===4000)
   add('contest.bdsp.anyMaster',[9,10,11,12,13].some(i=>d.events.activeFlags.includes(4000+i)),'events');
  // Escarlata/Púrpura: bloques con nombre de SaveBlockAccessor9SV (PKHeX 96e33e7): FSYS_SCENARIO_GAME_CLEAR_SU1/SU2 (final de
  // La máscara turquesa y de El disco índigo) y OniballoonSave_isCleardHard (Ogre Oustin' en difícil). Solo valores booleanos.
  if(['SCARLET','VIOLET'].includes(d.game)&&Array.isArray(d.progressSignals)){
   const sig=id=>{const x=d.progressSignals.find(s=>s.id===id);return typeof x?.value==='boolean'?x.value:null;};
   for(const [id,fact] of [['story.tealMask.clear','sv.tealMaskClear'],['story.indigoDisk.clear','sv.indigoDiskClear'],['dlc.ogreOustin.hardCleared','sv.ogreOustinHard']]){
    const v=sig(id);if(v!==null)add(fact,v,'progressSignals');}
   const fly=['elementary','intermediate','advanced','superlative'].map(k=>sig('dlc.flyingTrial.'+k));
   if(fly.every(v=>v!==null))add('sv.flyingTrialAll',fly.every(Boolean),'progressSignals');
  }
  // Escarlata/Púrpura: las tres máscaras de Ogerpon en la mochila (Cimiento 2406, Fuente 2407, Horno 2408; text_Items de PKHeX).
  if(['SCARLET','VIOLET'].includes(d.game)&&Array.isArray(d.inventory)){const have=new Set(d.inventory.flatMap(p=>(p?.items||[]).filter(i=>i?.count>0).map(i=>i.id)));
   if([2406,2407,2408].every(id=>have.has(id)))add('inventory.sv.ogerponMasks',true,'inventory');}
  // Cristal: desafío de 7 combates de la Torre Batalla (pokecrystal battle_tower.asm y maps/BattleTower1F.asm). Estado 3/4 =
  // el último desafío se ganó; premio 0 = nunca se empezó un desafío (el premio se elige al entrar). Otro caso: sin evidencia.
  if(Number.isInteger(d.tower2?.state)&&Number.isInteger(d.tower2?.reward)){
   if(d.tower2.state===3||d.tower2.state===4)add('battle.crystal.towerComplete',true,'tower2');
   else if(d.tower2.reward===0)add('battle.crystal.towerComplete',false,'tower2');}
  // Leyendas Z-A: Floette flor eterna capturado (forma 5 de 670 en la Pokédex), recompensa del rango 15 de los Juegos Z-A infinitos.
  if(typeof d.za9?.floetteEternalCaught==='boolean')add('za.floetteEternal',d.za9.floetteEternalCaught,'za9');
  // Diamante/Perla: récord de racha de la Torre Batalla (GameStats 0x35-0x3D de pokediamond, GetTrainerCardLevel).
  if(Array.isArray(d.tower4dp?.maxStreaks)&&d.tower4dp.maxStreaks.length)add('battle.dp.tower100',d.tower4dp.maxStreaks.some(v=>v>=100),'tower4dp');
  // Diamante Brillante/Perla Reluciente: 100 rivales seguidos en alguna modalidad de la Torre Batalla.
  if(Array.isArray(d.tower8b?.maxStreaks)&&d.tower8b.maxStreaks.length)add('battle.bdsp.tower100',d.tower8b.maxStreaks.some(v=>v>=100),'tower8b');
  // X/Y: rango máximo del Bastión Batalla = Gran duque (5).
  if(Number.isInteger(d.chateau?.rank))add('battle.xy.chateauGrandDuke',d.chateau.rank>=5,'chateau');
  // Coleccionables que el guardado registra en bloques con nombre de PKHeX (solo lectura; umbrales según Serebii).
  const nb=d.namedBlocks&&typeof d.namedBlocks==='object'?d.namedBlocks:null;
  if(nb){
   const num=k=>Number.isInteger(nb[k])?nb[k]:null;
   if(num('KAlolanDiglettFound')!==null)add('collection.swsh.alolanDiglett',num('KAlolanDiglettFound')>=150,'namedBlocks');
   const prints=['KFootprintPercentageCobalion','KFootprintPercentageTerrakion','KFootprintPercentageVirizion'].map(num);
   if(prints.every(v=>v!==null))add('collection.swsh.footprints',prints.every(v=>v>=100),'namedBlocks');
   if(num('KDojoWattDonationProgress')!==null)add('collection.swsh.dojoWatts',num('KDojoWattDonationProgress')>=15,'namedBlocks');
   if(num('KRecordSparringTypesCleared')!==null)add('battle.swsh.restrictedSparring',num('KRecordSparringTypesCleared')>=18,'namedBlocks');
   // Espada/Escudo: la Torre Batalla y el Torneo Estrellas de Galar solo se abren tras ser campeón; una victoria en
   // cualquiera prueba el fin de la historia (nunca se deduce lo contrario de un cero).
   if(['SWORD','SHIELD'].includes(d.game)&&typeof d.gameClear!=='boolean'){
    const wins=['KBattleTowerSinglesVictory','KBattleTowerDoublesVictory','KGSTVictoriesTotal'].map(num).filter(v=>v!==null);
    if(wins.some(v=>v>0))add('story.gameClear',true,'namedBlocks');
   }
   // Espada/Escudo, Nieves de la Corona: aves de Galar, Regirock/Regice/Registeel/Regigigas, Regieleki o Regidrago
   // (excluyentes) por sus banderas de captura (SaveBlockAccessor8SWSH) y Calyrex (898) por la Pokédex.
   if(['SWORD','SHIELD'].includes(d.game)){
    const caps=['KCapturedGalarianArticuno','KCapturedGalarianZapdos','KCapturedGalarianMoltres','KCapturedRegirock','KCapturedRegice','KCapturedRegisteel','KCapturedRegigigas'];
    if(caps.every(k=>typeof nb[k]==='boolean')&&typeof nb.KCapturedRegieleki==='boolean'&&typeof nb.KCapturedRegidrago==='boolean')
     add('swsh.crownCaptures',caps.every(k=>nb[k]===true)&&(nb.KCapturedRegieleki===true||nb.KCapturedRegidrago===true)&&(d.caught||[]).includes(898),'namedBlocks');
   }
   // Escarlata/Púrpura: diploma de la Pokédex de Paldea recibido del director Clavel (KClaimedPokedexDiplomaPaldea,
   // FSYS_POKEDEX_SYOUJOU_EVENT de SaveBlockAccessor9SV; WikiDex, guía «Camino a casa»).
   if(['SCARLET','VIOLET'].includes(d.game)&&typeof nb.KClaimedPokedexDiplomaPaldea==='boolean')add('card.sv.diplomaPaldea',nb.KClaimedPokedexDiplomaPaldea,'namedBlocks');
   // Leyendas Z-A: misiones principales y secundarias (marcadores de diagnosis.js zaQuests desde KEventWorkQuest).
   for(const [k,v]of Object.entries(nb)){const m=/^ZA_MISSION_(\d\d)$/.exec(k);if(m&&typeof v==='boolean')add('za.mission.'+m[1],v,'namedBlocks');}
   if(typeof nb.ZA_SIDE_BASE_ALL==='boolean')add('za.side.base',nb.ZA_SIDE_BASE_ALL,'namedBlocks');
   // Leyendas Arceus: rango del Equipo Galaxia (0-10), Unown capturados (0-28) y fin de la historia (Dialga o Palkia
   // origen vencidos, como la fila final de la historia del paquete); nunca se deduce un falso de bloques ausentes.
   if(num('KExpeditionTeamRank')!==null)add('la.rank10',num('KExpeditionTeamRank')>=10,'namedBlocks');
   // Leyendas Arceus: FSYS_SCENARIO_CLEARED_URA (tras Volus, Giratina y Arceus) y la marca de la tarjeta del ensueño de
   // combates sin fin de Fero (racha de 50; KCompletedEternalBattleReverie de PKHeX).
   if(typeof nb.KDefeatedArceus==='boolean')add('la.arceusDefeated',nb.KDefeatedArceus,'namedBlocks');
   if(typeof nb.KCompletedEternalBattleReverie==='boolean')add('la.eternalReverie',nb.KCompletedEternalBattleReverie,'namedBlocks');
   // Peticiones: las 94 claves sub_NNN que crea cualquier partida (peticiones 1-94 de WikiDex, emparejadas por título con
   // questlist_sub de la ROM) y las 28 que añade la actualización 1.1 (95-122: 13 del Despertar y las 15 vías solitarias
   // de Fero). Contrastado con una partida nueva (94 claves), la fixture de PKHeX y dos partidas 1.1 (las mismas 28).
   if(d.game==='ARCEUS'&&d.requests8a&&typeof d.requests8a==='object'){
    const st=n=>d.requests8a[String(n).padStart(3,'0')],done=ids=>ids.every(n=>st(n)===255);
    const base=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,30,31,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,53,54,56,57,58,59,60,61,62,63,64,65,66,68,69,70,71,73,74,76,77,82,83,84,85,86,88,89,90,91,92,93,94,95,96,97,98,99,100,110,114,115,116,117,122,123];
    const daybreak=[201,202,203,204,205,206,207,208,250,252,256,257,258,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275];
    if(base.some(n=>st(n)!==undefined)){add('la.requests.base',done(base),'namedBlocks');add('la.requests.all',done(base)&&done(daybreak),'namedBlocks');}
   }
   if(num('KTotalUnownCaptured')!==null)add('la.unown',num('KTotalUnownCaptured')>=28,'namedBlocks');
   if(d.game==='ARCEUS'&&typeof d.gameClear!=='boolean'&&(nb.KDefeatedOriginDialga===true||nb.KDefeatedOriginPalkia===true))add('story.gameClear',true,'namedBlocks');
   const wisps=['00','01','02','03','04','05'].map(a=>num('KWispsFoundArea'+a));
   if(wisps.every(v=>v!==null))add('collection.la.wisps',wisps.reduce((a,b)=>a+b,0)>=107,'namedBlocks');
  }
  // Resultados de los paquetes de eventos (banderas documentadas): 'event.<secreto>' cuando el secreto está completo y
  // 'event.<secreto>.<bandera>' por cada condición con valor conocido; nunca se deduce un falso de una bandera ausente.
  const guide=typeof module==='object'&&module.exports?require('./event-guide.js'):root.PokemonEventGuide;
  let analysis=null;try{analysis=guide?.analyze(d,d.game);}catch{}
  if(analysis&&!analysis.mismatch)for(const secret of analysis.secrets||[]){
   if(secret.status==='completado')add('event.'+secret.id,true,'events');
   for(const cond of secret.done||[])if(typeof cond.set==='boolean'&&cond.flag)add(`event.${secret.id}.${cond.flag}`,cond.set,'events');
  }
  const signal=(typeof module==='object'&&module.exports?require('../saves/diagnosis.js'):root.PokemonDiagnosis)?.documentedClear(d);
  // Una señal documentada que ya tiene contraste natural (positivo y negativo con partidas reales) cuenta como directa.
  if(signal)facts.push({id:'story.gameClear',value:signal.value,gameId:d.game,type:signal.validation==='verified'?'direct':'derived',
   validation:signal.validation==='verified'?'verified':'documented',source:signal.source});
  // Combates repetibles que la partida no registra (revanchas, Cintia, Morimoto...): solo se puede afirmar el «no» cuando
  // todavía no son posibles, porque todos exigen haber acabado la historia (y la revancha de HGSS, las 16 medallas).
  const clear=facts.filter(f=>f.id==='story.gameClear'&&typeof f.value==='boolean');
  if(clear.length&&clear.every(f=>f.value===false))add('postgame.repeatableBattles',false,'gameClear');
  if(['HEARTGOLD','SOULSILVER'].includes(d.game)&&Number.isInteger(d.badgesTotal??d.badges)&&(d.badgesTotal??d.badges)<16)add('hgss.rematchLeague',false,'badgesTotal');
  else if(clear.length&&clear.every(f=>f.value===false)&&['HEARTGOLD','SOULSILVER'].includes(d.game))add('hgss.rematchLeague',false,'gameClear');
  return facts;
 }
 const api={order,evaluate,next,fromDiagnosis};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonObjectives=api;
})(typeof globalThis==='object'?globalThis:this);
