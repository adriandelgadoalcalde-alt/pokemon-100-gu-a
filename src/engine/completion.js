/* Exact registered-species requirements from documented sources (primary where available); not encounter history. */
(function(root){
 'use strict';
 const range=(last,excluded=[])=>Array.from({length:last},(_,i)=>i+1).filter(id=>!excluded.includes(id));
 const mythicals4=[151,251,385,386,489,490,491,492,493];
 const frlg={source:'https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/src/pokedex.c',
  requirements:{kanto:range(150),national:range(386,[151,249,250,251,385,386])}};
 const dp={source:'https://github.com/pret/pokediamond/blob/b623abef1b4dfe204ca50aab42447ac00c134290/arm9/src/pokedex.c',
  requirements:{national:range(493,[...mythicals4,249,250])}};
 const platinum={source:'https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/src/pokedex.c',requirements:dp.requirements};
 const hgss={source:'https://github.com/pret/pokeheartgold/blob/6bf138d6035aa6b43d6f8f4132a12df70f86dcec/src/pokedex.c',
  requirements:{national:range(493,mythicals4)}};
 const unova={source:'https://bulbapedia.bulbagarden.net/wiki/Trainer_Card_level#Black_2_and_White_2',
  requirements:{national:range(649,[...mythicals4,494,647,648,649])}};
 const kalosData=typeof module==='object'&&module.exports?require('./kalos-dex.js'):root.PokemonKalosDex;
 const xy={source:kalosData.requirementsSource,requirements:{kalos:kalosData.required},field:'seen'};
 const hoennData=typeof module==='object'&&module.exports?require('./hoenn-dex.js'):root.PokemonHoennDex;
 const oras={source:hoennData.requirementsSource,requirements:{hoenn:hoennData.required},field:'seen'};
 const alolaData=typeof module==='object'&&module.exports?require('./alola-dex.js'):root.PokemonAlolaDex;
 const sm={source:alolaData.requirementsSource,requirements:alolaData.original};
 const usum={source:alolaData.requirementsSource,requirements:alolaData.ultra};
 const letsgo={source:'https://bulbapedia.bulbagarden.net/wiki/Diploma',requirements:{kanto:range(150)}};
 const bdsp={source:'https://github.com/shatter9652/uDPR/blob/becc1c369460026fbd33ca28d83e8c18d3e30526/Assets/Scripts/Game/ZukanWork.cs',requirements:{national:range(493,[...mythicals4,249,250])}};
 const definitions={BD:bdsp,SP:bdsp,LETGOP:letsgo,LETGOE:letsgo,SUN:sm,MOON:sm,ULTRASUN:usum,ULTRAMOON:usum,FIRERED:frlg,LEAFGREEN:frlg,DIAMOND:dp,PEARL:dp,PLATINUM:platinum,HEARTGOLD:hgss,SOULSILVER:hgss,BLACK:unova,WHITE:unova,BLACK2:unova,WHITE2:unova,X:xy,Y:xy,OMEGARUBY:oras,ALPHASAPPHIRE:oras};
 function dexStatus(d){
  const definition=definitions[d?.game];
  if(!definition)return null;
  const field=definition.field||'caught';
  if(!Array.isArray(d[field]))return null;
  const registered=new Set(d[field]);
  return Object.fromEntries(Object.entries(definition.requirements).map(([key,required])=>{
   const missing=required.filter(id=>!registered.has(id));
   return [key,{required:required.length,registered:required.length-missing.length,missing,complete:missing.length===0,source:definition.source,field}];
  }));
 }
 const api={dexStatus};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonCompletion=api;
})(globalThis);
