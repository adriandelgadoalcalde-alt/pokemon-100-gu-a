const fs = require('node:fs');
const vm = require('node:vm');
const integrity = require('../src/saves/hgss-integrity.js');
const {scripts} = require('../scripts/audit.cjs');
function writeCopy(bytes, base, {major = 1, minor = 1, hours = 1, caught = [], seen = []} = {}) {
  const v = new DataView(bytes.buffer), end = base + 0xF628;
  for (const offset of [509, 1018, 1527]) bytes[base + offset] = 1;
  bytes[base + 0x80] = 8; // SoulSilver ROM code.
  bytes[base + 0x7E] = 255; // Eight Johto badges.
  bytes[base + 0x83] = 255; // Eight Kanto badges.
  bytes[base + 0x81] = 3; // Game clear / National Dex.
  v.setUint16(base + 0x86, hours, true);
  v.setUint32(base + 0x3C, 1, true);
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
  const html = fs.readFileSync('index.html', 'utf8');
  const code = scripts(html).find(s => s.includes('root.PokemonSaveReader='));
  const context = vm.createContext({Uint8Array, PokemonHGSSIntegrity: integrity});
  vm.runInContext(code, context);
  return context.PokemonSaveReader;
}
module.exports = {fixture, writeCopy, reader};
