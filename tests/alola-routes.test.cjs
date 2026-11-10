const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const walkthrough=require('../src/guides/routes.js'),{catalogue}=require('../scripts/audit.cjs');
const text=(game,id)=>walkthrough.get(game,game+'-'+id).steps.join(' ');
test('all four Alola stories retain mission IDs and gain referenced edition-specific routes',()=>{
 const cat=catalogue(fs.readFileSync('atlas.html','utf8'));
 for(const game of ['SUN','MOON','ULTRASUN','ULTRAMOON']){
  const g=cat.games.find(g=>g.id===game);assert.equal(g.mainStoryLastMission,game+'-08');
  for(let i=1;i<=8;i++){const id=String(i).padStart(2,'0'),r=walkthrough.get(game,game+'-'+id);assert.ok(r?.sources.length);assert.ok(r.steps.length>=5);assert.equal(g.missions.find(m=>m.id===game+'-'+id).steps.length,2);}
  assert.doesNotMatch(g.missions.find(m=>m.id===game+'-05').steps.join(' '),/Nereida\/Acerola/);
 }
});
test('Alola trial mechanics and Poni order are not transferred between originals and Ultra',()=>{
 for(const game of ['SUN','MOON']){
  assert.match(text(game,'03'),/Wishiwashi dominante/);assert.match(text(game,'03'),/Salazzle dominante/);
  assert.match(text(game,'05'),/Centro Pokémon, RotomDex, Charjabug y Pokémon dominante/);
  assert.match(text(game,'07'),/Hela antes de internarte en el cañón/);
  assert.match(text(game,'08'),/Kaudan \(Lucha\)/);assert.match(text(game,'08'),/Vence a Kukui/);
 }
 for(const game of ['ULTRASUN','ULTRAMOON']){
  assert.match(text(game,'03'),/Araquanid dominante/);assert.match(text(game,'03'),/Marowak de Alola dominante/);
  assert.match(text(game,'05'),/Togedemaru dominante/);assert.match(text(game,'07'),/Ultra-Necrozma de nivel 60/);
  const r=walkthrough.get(game,game+'-07').steps;
  assert.ok(r.findIndex(s=>s.includes('vence al Ribombee dominante'))<r.findIndex(s=>s.includes('Vence a Hela')));
  assert.match(text(game,'07'),/Lulú en Ultrasol o Nereida en Ultraluna/);
  assert.match(text(game,'08'),/Lario \(Acero\)/);assert.match(text(game,'08'),/vence a Tilo para obtener el primer título/);
  assert.match(text(game,'08'),/no exige terminar la Liga/);
 }
});
