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
  // Rojo Fuego/Verde Hoja: estrella de minijuegos = 200 bayas en Dodrio Berry Picking y 200 saltos seguidos en Pokémon Jump.
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
   const nurse={EMERALD:0x159,PLATINUM:0x69,HEARTGOLD:0x64,SOULSILVER:0x64}[d.game];
   const flags=d.game==='EMERALD'?d.field?.flags:d.events?.activeFlags;
   if(nurse!==undefined&&Array.isArray(flags)&&flags.includes(nurse))add('card.nurseRecognition',true,d.game==='EMERALD'?'field':'events');
  }
  // Diplomas del director del juego en Platino (Hotel Gran Lago): el script pone FLAG_RECEIVED_LOCAL_DEX_DIPLOMA (0xAB) y
  // FLAG_RECEIVED_NATIONAL_DEX_DIPLOMA (0xAC) al entregarlos (pokeplatinum, grand_lake_valor_lakefront_west_house y
  // generated/vars_flags.txt; misma numeración que la 0x69 de la enfermera). Solo se acredita la presencia.
  if(d.game==='PLATINUM'&&Array.isArray(d.events?.activeFlags)){
   const fl=new Set(d.events.activeFlags);
   if(fl.has(0xAB))add('card.pt.diplomaSinnoh',true,'events');
   if(fl.has(0xAC))add('card.pt.diplomaNational',true,'events');
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
  // Musical: los 100 complementos (bits de Musical5 de PKHeX). Se exige la colección entera, sin excluir los de evento.
  if(Number.isInteger(d.musical5?.props))add('musical.unova.allProps',d.musical5.props>=100,'musical5');
  // Zona Nexo de Negro 2/Blanco 2: estrella de la tarjeta con los niveles blanco y negro a 30 (Serebii, «Trainer Card» de B2W2).
  const en=d.entralink5;
  if(Number.isInteger(en?.white)&&Number.isInteger(en?.black))add('entralink.b2w2.level30',en.white>=30&&en.black>=30,'entralink5');
  // Pokéstar Studios (N2/B2): las 40 películas completadas.
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
  // Diamante Brillante/Perla Reluciente: 100 rivales seguidos en alguna modalidad de la Torre Batalla.
  if(Array.isArray(d.tower8b?.maxStreaks)&&d.tower8b.maxStreaks.length)add('battle.bdsp.tower100',d.tower8b.maxStreaks.some(v=>v>=100),'tower8b');
  // X/Y: rango máximo del Castillo Batalla = Gran Duque (5).
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
   // Espada/Escudo: la Torre Batalla y el Torneo de las Estrellas solo se abren tras ser campeón; una victoria en
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
   // Leyendas Z-A: misiones principales y secundarias (marcadores de diagnosis.js zaQuests desde KEventWorkQuest).
   for(const [k,v]of Object.entries(nb)){const m=/^ZA_MISSION_(\d\d)$/.exec(k);if(m&&typeof v==='boolean')add('za.mission.'+m[1],v,'namedBlocks');}
   if(typeof nb.ZA_SIDE_BASE_ALL==='boolean')add('za.side.base',nb.ZA_SIDE_BASE_ALL,'namedBlocks');
   // Leyendas Arceus: rango del Equipo Galaxia (0-10), Unown capturados (0-28) y fin de la historia (Dialga o Palkia
   // origen vencidos, como la fila final de la historia del paquete); nunca se deduce un falso de bloques ausentes.
   if(num('KExpeditionTeamRank')!==null)add('la.rank10',num('KExpeditionTeamRank')>=10,'namedBlocks');
   // Leyendas Arceus: FSYS_SCENARIO_CLEARED_URA (tras Volo, Giratina y Arceus) y la marca de la tarjeta del ensueño de
   // combates sin fin de Fero (racha de 50; KCompletedEternalBattleReverie de PKHeX).
   if(typeof nb.KDefeatedArceus==='boolean')add('la.arceusDefeated',nb.KDefeatedArceus,'namedBlocks');
   if(typeof nb.KCompletedEternalBattleReverie==='boolean')add('la.eternalReverie',nb.KCompletedEternalBattleReverie,'namedBlocks');
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
  return facts;
 }
 const api={order,evaluate,next,fromDiagnosis};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonObjectives=api;
})(typeof globalThis==='object'?globalThis:this);
