const test = require('node:test');
const assert = require('node:assert/strict');
const {audit} = require('../scripts/audit.cjs');
test('both catalogues retain unique objective IDs, steps, and unshadowed functions', () => {
  const result = audit();
  assert.deepEqual(result.errors, []);
  assert.equal(result.classic.missions, 278);
  assert.equal(result.atlas.editions, 39);
  assert.equal(result.atlas.generations, 9);
});
