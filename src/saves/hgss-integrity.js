/* Local, read-only HGSS general-block validation. See research/flags/hgss.md.
 * CRC-16/CCITT-FALSE: poly 0x1021, init 0xffff, no reflection or xorout.
 * No upstream source is embedded here. */
(function (root) {
  'use strict';
  const SIZE = 0xF628, PARTITION = 0x40000;
  function crc16(bytes) {
    let crc = 0xffff;
    for (const byte of bytes) {
      crc ^= byte << 8;
      for (let bit = 0; bit < 8; bit++)
        crc = ((crc << 1) ^ ((crc & 0x8000) ? 0x1021 : 0)) & 0xffff;
    }
    return crc;
  }
  // PKHeX's documented footer ordering: major first, minor on equal majors.
  function counterOrder(a, b) {
    if (a === 0xffffffff && b !== 0xfffffffe) return -1;
    if (b === 0xffffffff && a !== 0xfffffffe) return 1;
    return a === b ? 0 : a > b ? 1 : -1;
  }
  function inspect(bytes) {
    if (!(bytes instanceof Uint8Array) || bytes.length !== 0x80000)
      throw Error('SoulSilver necesita un guardado interno de 512 KiB.');
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const u32 = offset => view.getUint32(offset, true);
    const candidates = [0, PARTITION].map(base => {
      const end = base + SIZE;
      const recognizable = [0x20060623, 0x20070903].includes(u32(end - 8)) &&
        u32(end - 12) === SIZE;
      return {
        base, recognizable, major: u32(end - 20), minor: u32(end - 16),
        checksumValid: recognizable && view.getUint16(end - 4, true) === 0 &&
          crc16(bytes.subarray(base, end - 16)) === view.getUint16(end - 2, true)
      };
    }).filter(c => c.recognizable);
    if (!candidates.length) return null;
    const selected = candidates.reduce((a, b) => {
      const order = counterOrder(a.major, b.major) || counterOrder(a.minor, b.minor);
      return order < 0 ? b : a;
    });
    // Do not silently substitute an older copy and report stale progress.
    if (!selected.checksumValid)
      throw Error('La copia más reciente de SoulSilver no supera el control de integridad del bloque general. No se ha importado progreso. Conserva el original y exporta otra copia desde el juego.');
    return { base: selected.base, generalChecksumValid: true,
      checkedBlocks: ['general'], uncheckedBlocks: ['storage', 'extra'],
      selection: 'major-minor-counters', candidates };
  }
  const api = { inspect, crc16, counterOrder };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PokemonHGSSIntegrity = api;
})(typeof globalThis === 'object' ? globalThis : this);
