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
  // Coleccionables que el guardado registra en bloques con nombre de PKHeX (solo lectura; umbrales según Serebii).
  const nb=d.namedBlocks&&typeof d.namedBlocks==='object'?d.namedBlocks:null;
  if(nb){
   const num=k=>Number.isInteger(nb[k])?nb[k]:null;
   if(num('KAlolanDiglettFound')!==null)add('collection.swsh.alolanDiglett',num('KAlolanDiglettFound')>=150,'namedBlocks');
   const prints=['KFootprintPercentageCobalion','KFootprintPercentageTerrakion','KFootprintPercentageVirizion'].map(num);
   if(prints.every(v=>v!==null))add('collection.swsh.footprints',prints.every(v=>v>=100),'namedBlocks');
   if(num('KDojoWattDonationProgress')!==null)add('collection.swsh.dojoWatts',num('KDojoWattDonationProgress')>=15,'namedBlocks');
   if(num('KRecordSparringTypesCleared')!==null)add('battle.swsh.restrictedSparring',num('KRecordSparringTypesCleared')>=18,'namedBlocks');
   const wisps=['00','01','02','03','04','05'].map(a=>num('KWispsFoundArea'+a));
   if(wisps.every(v=>v!==null))add('collection.la.wisps',wisps.reduce((a,b)=>a+b,0)>=107,'namedBlocks');
  }
  const signal=(typeof module==='object'&&module.exports?require('../saves/diagnosis.js'):root.PokemonDiagnosis)?.documentedClear(d);
  if(signal)facts.push({id:'story.gameClear',value:signal.value,gameId:d.game,type:'derived',validation:'documented',source:signal.source});
  return facts;
 }
 const api={order,evaluate,next,fromDiagnosis};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonObjectives=api;
})(typeof globalThis==='object'?globalThis:this);
