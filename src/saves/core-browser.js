/* Lazy same-origin reader. Only static engine assets use the network; save bytes stay in this window and its local frame. */
(function(root){
 'use strict';
 let frame=null,loading=null,sequence=0;
 const pending=new Map();
 const engineURL=new URL('../../engine/index.html',document.currentScript.src);
 addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==frame?.contentWindow||event.data?.type!=='pokemon-local-result')return;
  const task=pending.get(event.data.id);if(!task)return;
  clearTimeout(task.timer);pending.delete(event.data.id);
  if(event.data.ok&&event.data.diagnosis)task.resolve(event.data.diagnosis);
  else{const e=Error(event.data.error||'No se ha podido interpretar el guardado. No se ha cambiado el progreso.');e.startup=event.data.startup===true;task.reject(e);}
 });
 // El motor (.NET 10 en WebAssembly) exige SIMD y gestión de excepciones de WebAssembly (dotnet.runtime los comprueba
 // al arrancar). Se detectan antes con dos módulos mínimos (los de wasm-feature-detect) para avisar con claridad:
 // en iPad/iPhone, Safari los trae desde iPadOS/iOS 16.4.
 const SIMD=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);
 const EH=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11]);
 function supported(){try{return typeof WebAssembly==='object'&&WebAssembly.validate(SIMD)&&WebAssembly.validate(EH);}catch{return false;}}
 function load(){
  if(loading)return loading;
  if(!supported())return Promise.reject(Error('Este navegador no puede ejecutar el lector ampliado (necesita WebAssembly con SIMD; en iPad o iPhone, iPadOS/iOS 16.4 o posterior). Los guardados que lee el lector propio de la página siguen funcionando.'));
  loading=new Promise((resolve,reject)=>{
   frame=document.createElement('iframe');frame.hidden=true;frame.title='Motor local de guardados';
   const timer=setTimeout(()=>{frame.remove();frame=null;loading=null;reject(Error('El motor local no se ha descargado. Conecta el dispositivo e inténtalo de nuevo.'));},300000);
   frame.onload=()=>{clearTimeout(timer);resolve();};
   frame.onerror=()=>{clearTimeout(timer);frame.remove();frame=null;loading=null;reject(Error('No se ha podido cargar el motor local.'));};
   frame.src=engineURL.href;document.body.append(frame);
  });return loading;
 }
 // Si el motor de WebAssembly no arranca (fallo intermitente observado en WebKit), se recarga el marco y se reintenta
 // hasta dos veces; los errores de interpretación del guardado no se reintentan.
 async function read(bytes){
  if(!(bytes instanceof Uint8Array)||!bytes.length||bytes.length>8*1024*1024)throw Error('Selecciona el guardado interno de hasta 8 MiB.');
  for(let attempt=0;;attempt++){
   try{return await readOnce(bytes);}
   catch(error){
    if(!error?.startup||attempt>=2)throw error;
    frame?.remove();frame=null;loading=null;
   }
  }
 }
 async function readOnce(bytes){
  await load();const id=String(++sequence);
  return new Promise((resolve,reject)=>{
   const timer=setTimeout(()=>{pending.delete(id);reject(Error('La lectura local ha tardado demasiado. No se ha cambiado el progreso.'));},300000);
   pending.set(id,{resolve,reject,timer});
   // A separate copy preserves the caller's bytes, including on failed analysis.
   const copy=bytes.slice().buffer;
   frame.contentWindow.postMessage({type:'pokemon-local-analyze',id,bytes:copy},location.origin,[copy]);
  });
 }
 root.PokemonCoreBrowser={read,supported};
})(globalThis);
