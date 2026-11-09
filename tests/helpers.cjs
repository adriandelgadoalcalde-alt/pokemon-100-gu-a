const fs = require('node:fs');
const vm = require('node:vm');
const integrity = require('../src/saves/hgss-integrity.js');
const {scripts} = require('../scripts/audit.cjs');
function writeCopy(bytes, base, {major = 1, minor = 1, hours = 1, tid = 0, trainer = 'SYNTH', caught = [], seen = [], keyItems = []} = {}) {
  const v = new DataView(bytes.buffer), end = base + 0xF628;
  for(let i=0;i<Math.min(7,trainer.length);i++)v.setUint16(base+0x64+i*2,0x12B+trainer.charCodeAt(i)-65,true);
  v.setUint16(base + 0x74, tid, true);
  bytes[base + 0x80] = 8; // SoulSilver ROM code.
  bytes[base + 0x7E] = 255; // Eight Johto badges.
  bytes[base + 0x83] = 255; // Eight Kanto badges.
  bytes[base + 0x81] = 3; // Game clear / National Dex.
  v.setUint16(base + 0x86, hours, true);
  v.setUint32(base + 0x3C, 1, true);
  keyItems.forEach((item,i)=>{v.setUint16(base+0x8D8+i*4,item.id,true);v.setUint16(base+0x8DA+i*4,item.count,true);});
  for (const [offset, list] of [[0x12BC, caught], [0x12FC, seen]])
    for (const id of list) bytes[base + offset + ((id - 1) >> 3)] |= 1 << ((id - 1) & 7);
  v.setUint32(end - 20, major, true);
  v.setUint32(end - 16, minor, true);
  v.setUint32(end - 12, 0xF628, true);
  v.setUint32(end - 8, 0x20060623, true);
  v.setUint16(end - 4, 0, true);
  v.setUint16(end - 2, integrity.crc16(bytes.subarray(base, end - 16)), true);
}
function fixture(first = {}, second) {
  const bytes = new Uint8Array(0x80000).fill(0xff);
  bytes.fill(0, 0, 0xF628);
  writeCopy(bytes, 0, first);
  if (second) {bytes.fill(0, 0x40000, 0x4F628); writeCopy(bytes, 0x40000, second);}
  return bytes;
}
function reader() {
  const code = fs.readFileSync('src/saves/reader.js', 'utf8');
  const context = vm.createContext({Uint8Array, PokemonHGSSIntegrity: integrity,
    PokemonSaveIntegrity:require('../src/saves/integrity.js')});
  vm.runInContext(code, context);
  return context.PokemonSaveReader;
}
module.exports = {fixture, writeCopy, reader};
