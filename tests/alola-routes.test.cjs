const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const walkthrough=require('../src/guides/routes.js'),{catalogue}=require('../scripts/audit.cjs');
// El Pokémon dominante se nombra en cualquier orden («Wishiwashi dominante» o «el dominante Wishiwashi»).
const dom=name=>new RegExp(name+' dominante|dominante '+name);
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
  assert.match(text(game,'03'),dom('Wishiwashi'));assert.match(text(game,'03'),dom('Salazzle'));
  assert.match(text(game,'05'),/Centro Pokémon[^.]*RotomDex[^.]*Charjabug[^.]*Pokémon dominante/);
  {const r=walkthrough.get(game,game+'-07').steps;const hela=r.findIndex(s=>/[Vv]ence a (la kahuna )?Hela/.test(s));assert.ok(hela>=0&&hela<r.findIndex(s=>s.includes('Kommo-o')),'Hela antes del cañón');}
  assert.match(text(game,'08'),/Kaudan(,| \()( tipo)? Lucha/);assert.match(text(game,'08'),/[Vv]ence a(l profesor)? Kukui/);
 }
 for(const game of ['ULTRASUN','ULTRAMOON']){
  assert.match(text(game,'03'),dom('Araquanid'));assert.match(text(game,'03'),dom('Marowak de Alola'));
  assert.match(text(game,'05'),dom('Togedemaru'));assert.match(text(game,'07'),/Ultra-Necrozma (de nivel 60|\(nv\. 60\))/);
  const r=walkthrough.get(game,game+'-07').steps;
  {const rib=r.findIndex(s=>/Ribombee/.test(s)),hela=r.findIndex(s=>/[Vv]ence a (la kahuna )?Hela/.test(s));assert.ok(rib>=0&&rib<hela,'Ribombee antes que Hela');}
  assert.match(text(game,'07'),game==='ULTRASUN'?/Jungla Umbría[^.]*Lulú|Lulú en Ultrasol/:/Jungla Umbría[^.]*Nereida|Nereida en Ultraluna/);
  assert.match(text(game,'08'),/Lario \(Acero\)/);assert.match(text(game,'08'),/[Vv]ence(r)? a Tilo/);
  assert.match(text(game,'08'),/no exige terminar la Liga/);
 }
});
