/* Independent standard CRC implementations and documented save-container layout checks. */
(function(root){
 'use strict';
 const ccitt=typeof module==='object'&&module.exports?require('./hgss-integrity.js').crc16:root.PokemonHGSSIntegrity.crc16;
 function usb(bytes){let crc=0xffff;for(const byte of bytes){crc^=byte;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xa001:0);}return (crc^0xffff)&0xffff;}
 function beef(bytes,count,algorithm){
  const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),footer=bytes.length-0x200;
  if(view.getUint32(footer+0x10,true)!==0x42454546)throw Error('No se encuentra la firma del guardado descifrado.');
  let start=0;
  for(let id=0;id<count;id++){
   const descriptor=footer+0x14+id*8,length=view.getUint32(descriptor,true),storedID=view.getUint16(descriptor+4,true);
   if(storedID!==id||length<=0||start+length>footer)throw Error('La tabla de bloques del guardado no es válida.');
   const data=algorithm==='usb'&&id===36?Uint8Array.from(bytes.subarray(start,start+length)):bytes.subarray(start,start+length);
   // PKHeX normalizes the USUM signature region before checking its containing block.
   // Normalize only a copy; the uploaded file must remain byte-for-byte intact.
   if(algorithm==='usb'&&id===36)data.fill(0,0x100,0x180);
   const actual=(algorithm==='usb'?usb:ccitt)(data);
   if(actual!==view.getUint16(descriptor+6,true))throw Error('El guardado no supera el control de integridad de sus bloques. No se ha importado progreso.');
   start=Math.ceil((start+length)/0x200)*0x200;
  }
  if(start!==footer)throw Error('El tamaño de los bloques no coincide con este formato de guardado.');
  return {checksumsValid:true,checkedBlocks:count,uncheckedRegions:algorithm==='usb'?['Firma MemeCrypto']:[],method:algorithm==='usb'?'CRC-16/USB':'CRC-16/CCITT-FALSE',
   scope:'Bloques declarados en la tabla del archivo; no certifica autenticidad de la partida.'};
 }
 function b2w2(bytes){
  const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
  // Physical field ranges from pinned SaveBlockAccessor5B2W2, documented in research/save-integrity.md.
  const blocks=[
   [25,0x18400,0x9ec,0x18dee,0x25f32], [27,0x19400,0xb0,0x194b2,0x25f36], [37,0x1d900,0x5c,0x1d95e,0x25f4a], [42,0x1f700,0x2a4,0x1f9a6,0x25f54],
   [45,0x1ff00,0x4e0,0x203e2,0x25f5a], [52,0x21100,0xf0,0x211f2,0x25f68], [53,0x21200,0x1b4,0x213b6,0x25f6a],
   [54,0x21400,0x4dc,0x218de,0x25f6c], [57,0x21b00,0x1ac,0x21cae,0x25f72], [63,0x23700,0xa8,0x237aa,0x25f7e], [68,0x25300,0x498,0x2579a,0x25f88],
   [71,0x25a00,0x3e4,0x25de6,0x25f8e], [73,0x25f00,0x94,0x25fa2,0x25fa2]
  ];
  for(const [id,start,length,checksum,mirror]of blocks){
   const actual=ccitt(bytes.subarray(start,start+length));
   if(actual!==view.getUint16(checksum,true)||actual!==view.getUint16(mirror,true))
    throw Error('El guardado de Negro 2/Blanco 2 no supera el control de integridad de los datos analizados.');
  }
  return {selectedChecksumsValid:true,checkedBlocks:blocks.map(b=>b[0]),
   verifiedFields:['caught','seen','gameClear','nationalDex','badges','badgesTotal','events','medals','subway5','musical5','pwt5','entralink5','keyItems','pokestar5'],
   scope:'Mochila, datos de entrenador, aventura, eventos, medallas, Pokédex, medallero, Musical, Pokéstar Studios, Zona Nexo, Metro Batalla, PWT y tabla CRC; otros bloques pendientes.'};
 }
 const api={beef,b2w2,usb};if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonSaveIntegrity=api;
})(typeof globalThis==='object'?globalThis:this);
