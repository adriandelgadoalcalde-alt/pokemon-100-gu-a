/* Exact registered-species requirements from the pinned FRLG pokedex.c, not encounter history. */
(function(root){
 'use strict';
 const source='https://github.com/pret/pokefirered/blob/ce6406d8c2eaf46d543c8a2606de0c3cb1951982/src/pokedex.c';
 const excluded=new Set([151,249,250,251,385,386]);
 const requirements={kanto:Array.from({length:150},(_,i)=>i+1),
  national:Array.from({length:386},(_,i)=>i+1).filter(id=>!excluded.has(id))};
 function dexStatus(d){
  if(!['FIRERED','LEAFGREEN'].includes(d?.game)||!Array.isArray(d.caught))return null;
  const registered=new Set(d.caught);
  return Object.fromEntries(Object.entries(requirements).map(([key,required])=>{
   const missing=required.filter(id=>!registered.has(id));
   return [key,{required:required.length,registered:required.length-missing.length,missing,complete:missing.length===0,source}];
  }));
 }
 const api={dexStatus};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonCompletion=api;
})(globalThis);
