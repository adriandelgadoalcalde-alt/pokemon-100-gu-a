const test=require('node:test'),assert=require('node:assert/strict');
const {platforms,pathFor}=require('../src/guides/ice-puzzle.js');
const geometry=require('../research/routes/hoenn-ice-paths.json');
test('each edition-specific ice path visits every source ice tile exactly once and ends at the stair exit',()=>{
 assert.deepEqual(platforms,geometry.platforms);
 for(const puzzle of platforms){
  const path=pathFor(puzzle),cells=new Set(puzzle.cells.map(c=>c.join(',')));
  assert.deepEqual(path[0],puzzle.start);assert.deepEqual(path.at(-1),puzzle.exit);
  const visited=new Set();
  for(let i=0;i<path.length;i++){
   const key=path[i].join(',');assert.ok(cells.has(key),'The route crosses a non-ice tile.');
   assert.ok(!visited.has(key),'The route repeats and breaks a tile.');visited.add(key);
   if(i)assert.equal(Math.abs(path[i][0]-path[i-1][0])+Math.abs(path[i][1]-path[i-1][1]),1);
  }
  assert.equal(visited.size,cells.size);
 }
 // These are the script unlock thresholds, including the initial counter and
 // one increment at each completed staircase. They differ on the final floor.
 for(const [version,thresholds]of [['RUBY_SAPPHIRE',[8,28,69]],['EMERALD',[8,28,67]]]){
  let count=1;for(const p of platforms.filter(p=>p.version===version)){count+=p.cells.length;assert.equal(count,thresholds[p.platform-1]);count++;}
 }
 assert.notEqual(platforms[0].moves,platforms[3].moves);
});
