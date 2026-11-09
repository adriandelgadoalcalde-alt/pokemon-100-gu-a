const test = require('node:test');
const assert = require('node:assert/strict');
const {createHash} = require('node:crypto');
const {inspect, crc16} = require('../src/saves/hgss-integrity.js');
const {fixture, reader} = require('./helpers.cjs');

test('CRC standard independent known vector', () => {
  assert.equal(crc16(new TextEncoder().encode('123456789')), 0x29b1);
});
test('select major counter before minor counter or playtime', () => {
  const bytes = fixture({major: 4, minor: 99, hours: 300, caught: [145]},
    {major: 5, minor: 1, hours: 2, caught: [146]});
  const result = reader().parse(bytes);
  assert.equal(result.saveBase, 0x40000);
  assert.ok(result.caught.includes(146));
  assert.ok(!result.caught.includes(145));
  assert.equal(result.integrity.generalChecksumValid, true);
  assert.deepEqual([...result.integrity.uncheckedBlocks], ['storage', 'extra']);
});
test('minor counter resolves equal majors; equal counters prefer first copy', () => {
  assert.equal(inspect(fixture({major: 8, minor: 1}, {major: 8, minor: 2})).base, 0x40000);
  assert.equal(inspect(fixture({major: 8}, {major: 8, hours: 400})).base, 0);
});
test('large counters are not discarded and rollover follows documented ordering', () => {
  assert.equal(inspect(fixture({major: 100000001}, {major: 9})).base, 0);
  assert.equal(inspect(fixture({major: 0}, {major: 0xffffffff})).base, 0);
  assert.equal(inspect(fixture({major: 0xfffffffe}, {major: 0xffffffff})).base, 0x40000);
});
test('reject corrupted active general block, without silently importing older progress', () => {
  const bytes = fixture({major: 1}, {major: 2});
  bytes[0x40000 + 0x12BC] ^= 1;
  assert.throws(() => reader().parse(bytes), /integridad/);
});
test('corrupt backup does not invalidate intact active general block', () => {
  const bytes = fixture({major: 3}, {major: 2});
  bytes[0x40000 + 0x12BC] ^= 1;
  assert.equal(reader().parse(bytes).saveBase, 0);
});
test('Pokédex differentiates caught from seen and does not assert original encounter', () => {
  const result = reader().parse(fixture({caught: [145, 146], seen: [145, 146, 381]}));
  assert.ok(result.caught.includes(145) && result.caught.includes(146));
  assert.ok(result.seen.includes(381) && !result.caught.includes(381));
  assert.equal(result.originalEncounterCompleted, undefined);
});
test('read-only parsing leaves every input byte unchanged', () => {
  const bytes = fixture({caught: [145]});
  const hash = b => createHash('sha256').update(b).digest('hex');
  const before = hash(bytes);
  reader().parse(bytes);
  assert.equal(hash(bytes), before);
});
test('truncated input cannot generate a diagnosis', () => {
  assert.throws(() => reader().parse(fixture().slice(0, 10000)), /Tamaño no reconocido/);
});
