/* Exact registered-species requirements from documented sources (primary where available); not encounter history. */
(function(root){
 'use strict';
 const range=(last,excluded=[])=>Array.from({length:last},(_,i)=>i+1).filter(id=>!excluded.includes(id));
 const mythicals4=[151,251,385,386,489,490,491,492,493];
 const frlg={source:'https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/src/pokedex.c',
  requirements:{kanto:range(150),national:range(386,[151,249,250,251,385,386])}};
 // Diploma de Sinnoh de DP: Pokedex_SinnohDexIsComplete pide 150 VISTOS de la Pokédex de Sinnoh sin Manaphy. La lista son
 // las entradas 1-151 de poketool/shinzukan.narc de la ROM española de Diamante (la 151 es Manaphy).
 const sinnohDP=[387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,63,64,65,129,130,406,315,407,41,42,169,74,75,76,95,208,408,409,410,411,66,67,68,54,55,412,413,414,265,266,267,268,269,415,416,417,418,419,420,421,422,423,214,190,424,425,426,427,428,92,93,94,200,429,198,430,431,432,118,119,339,340,433,358,434,435,307,308,436,437,77,78,438,185,439,122,440,113,242,173,35,36,441,172,25,26,163,164,442,443,444,445,446,143,201,447,448,194,195,278,279,203,449,450,298,183,184,451,452,453,454,455,223,224,456,457,72,73,349,350,458,226,459,460,215,461,480,481,482,483,484];
 const dp={source:'https://github.com/pret/pokediamond/blob/b623abef1b4dfe204ca50aab42447ac00c134290/arm9/src/pokedex.c',
  requirements:{national:range(493,[...mythicals4,249,250]),sinnoh:{atLeast:150,of:sinnohDP,field:'seen'}}};
 const platinum={source:'https://github.com/pret/pokeplatinum/blob/62bdaacdca6c56a6a396f3e9911e2f922b79bba8/src/pokedex.c',requirements:{national:dp.requirements.national}};
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
 const bdsp={source:'https://github.com/shatter9652/uDPR/blob/becc1c369460026fbd33ca28d83e8c18d3e30526/Assets/Scripts/Game/ZukanWork.cs',requirements:{national:range(493,[...mythicals4,249,250]),
  // ZukanWork.CheckShinouZukanCompSee: vistos todos los de ShinouZukanNos salvo Manaphy (la misma lista que DP).
  sinnoh:{atLeast:150,of:sinnohDP,field:'seen',source:'https://github.com/shatter9652/uDPR/blob/becc1c369460026fbd33ca28d83e8c18d3e30526/Assets/Scripts/Game/ZukanWork.cs'}}};
 // Diploma de GAME FREAK (Mansión Azulona, 3.ª planta): el juego cuenta TODOS los capturados y exige un total, no una
 // lista: pokered pide al menos 150 de 151 («discount Mew»); pokegold/pokecrystal, más de 248 de 251 (sin Mew ni Celebi).
 const gen1={source:'https://github.com/pret/pokered/blob/0dbf95cd12f5b1511c62ce69efe283000f780a8f/scripts/CeladonMansion3F.asm',requirements:{diploma:{atLeast:150,of:range(151)}}};
 const gen2={source:'https://github.com/pret/pokecrystal/blob/3c813b0b4d82b39bf62185aceffb76fd6026c70b/maps/CeladonMansion3F.asm',requirements:{diploma:{atLeast:249,of:range(251)}}};
 // Rubí/Zafiro/Esmeralda: HasAllHoennMons (pokeemerald) exige los 200 primeros de la Pokédex de Hoenn capturados.
 const hoenn3Data=typeof module==='object'&&module.exports?require('./hoenn-gen3-dex.js'):root.PokemonHoennGen3Dex;
 const hoenn3={source:hoenn3Data.source,requirements:{hoenn:hoenn3Data.required,national:range(386,[151,249,250,251,385,386])}};
 // Diploma nacional de Rubí/Zafiro: CompletedNationalPokedex (pokeruby) recorre 1-150, 153-250 y 253-384 por un error de
 // índice que el propio decomp documenta (no pide a Mew, Chikorita, Celebi, Treecko, Jirachi ni Deoxys; sí a Lugia y Ho-Oh).
 // Treecko ya lo exige la Pokédex de Hoenn. Esmeralda lo corrigió: HasAllMons (pokeemerald) excluye Mew, Lugia, Ho-Oh,
 // Celebi, Jirachi y Deoxys.
 const hoenn3RS={source:'https://github.com/pret/pokeruby/blob/5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f/src/pokedex.c',requirements:{hoenn:hoenn3Data.required,
  national:[...range(150),...range(250).filter(i=>i>=153),...range(384).filter(i=>i>=253)]}};
 const definitions={RUBY:hoenn3RS,SAPPHIRE:hoenn3RS,EMERALD:hoenn3,RED:gen1,BLUE:gen1,GREEN:gen1,YELLOW:gen1,GOLD:gen2,SILVER:gen2,CRYSTAL:gen2,BD:bdsp,SP:bdsp,LETGOP:letsgo,LETGOE:letsgo,SUN:sm,MOON:sm,ULTRASUN:usum,ULTRAMOON:usum,FIRERED:frlg,LEAFGREEN:frlg,DIAMOND:dp,PEARL:dp,PLATINUM:platinum,HEARTGOLD:hgss,SOULSILVER:hgss,BLACK:unova,WHITE:unova,BLACK2:unova,WHITE2:unova,X:xy,Y:xy,OMEGARUBY:oras,ALPHASAPPHIRE:oras};
 function dexStatus(d){
  const definition=definitions[d?.game];
  if(!definition)return null;
  const field=definition.field||'caught';
  if(!Array.isArray(d[field]))return null;
  const registered=new Set(d[field]);
  return Object.fromEntries(Object.entries(definition.requirements).map(([key,required])=>{
   if(!Array.isArray(required)){
    // Requisito por total (como lo cuenta el juego): cualquier combinación de especies sirve. Puede pedir otro campo
    // (por ejemplo, «vistos» en el diploma de Sinnoh de DP) distinto del de la definición.
    const f=required.field||field;if(!Array.isArray(d[f]))return [key,null];
    const reg=f===field?registered:new Set(d[f]);
    const missing=required.of.filter(id=>!reg.has(id)),count=required.of.length-missing.length;
    return [key,{required:required.atLeast,registered:Math.min(count,required.atLeast),missing:count>=required.atLeast?[]:missing,complete:count>=required.atLeast,source:required.source||definition.source,field:f}];
   }
   const missing=required.filter(id=>!registered.has(id));
   return [key,{required:required.length,registered:required.length-missing.length,missing,complete:missing.length===0,source:definition.source,field}];
  }).filter(([,v])=>v));
 }
 const api={dexStatus};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonCompletion=api;
})(globalThis);
