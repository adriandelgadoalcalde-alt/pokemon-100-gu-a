const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const {spawnSync}=require('node:child_process'),assert=require('node:assert/strict');
const fixtureDir=process.argv[2];if(!fixtureDir)throw Error('Provide the synthetic fixture directory.');
const dotnet=process.env.POKEMON_DOTNET||'dotnet';
const dll=path.resolve('pkhex-extractor/bin/Release/net10.0/Pokemon.SaveAudit.dll');
const input=path.resolve(fixtureDir,'synthetic-hgss.sav');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'pokemon-cli-contract-'));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const invoke=(source,destination,...args)=>spawnSync(dotnet,[dll,source,destination,...args],{encoding:'utf8'});
try{
 const original=hash(input),output=path.join(temp,'diagnosis.json');
 const ok=invoke(input,output,'--include-events');assert.equal(ok.status,0,ok.stderr);
 const report=JSON.parse(fs.readFileSync(output,'utf8'));assert.equal(report.game,'SOULSILVER');
 assert.equal(report.integrity.checksumsValid,true);assert.equal(report.extractor.readOnly,true);
 assert.equal(report.sha256,original);assert.equal(hash(input),original);
 if(process.platform!=='win32')assert.equal(fs.statSync(output).mode&0o077,0,'diagnosis permissions must be private');
 assert.equal(report.trainer,undefined);assert.equal(report.tid,undefined);assert.equal(report.sid,undefined);
 assert.notEqual(invoke(input,input).status,0);assert.equal(hash(input),original);
 const outputBefore=hash(output);assert.notEqual(invoke(input,output).status,0);assert.equal(hash(output),outputBefore);
 const alias=path.join(temp,'input-alias.sav');fs.symlinkSync(input,alias);
 assert.notEqual(invoke(input,alias).status,0);assert.equal(hash(input),original);
 const corrupt=path.join(temp,'corrupt.sav'),bytes=fs.readFileSync(input);bytes[0x12BC]^=1;fs.writeFileSync(corrupt,bytes);
 const badOutput=path.join(temp,'bad.json');assert.notEqual(invoke(corrupt,badOutput).status,0);assert.ok(!fs.existsSync(badOutput));
 const noise=path.join(temp,'truncated.sav');fs.writeFileSync(noise,bytes.subarray(0,1000));
 assert.notEqual(invoke(noise,path.join(temp,'truncated.json')).status,0);
 const extraIndex=path.join(fixtureDir,'extractor-fixture-index.json');
 if(fs.existsSync(extraIndex))for(const name of JSON.parse(fs.readFileSync(extraIndex,'utf8'))){
  const source=path.resolve(fixtureDir,name+'.sav'),expected=hash(source),destination=path.join(temp,name+'.json');
  const result=invoke(source,destination,'--include-events');assert.equal(result.status,0,name+': '+result.stderr);
  const data=JSON.parse(fs.readFileSync(destination,'utf8'));assert.equal(data.sha256,expected);assert.equal(hash(source),expected);
  assert.equal(data.trainer,undefined);assert.equal(data.tid,undefined);assert.equal(data.sid,undefined);
  if(data.game===null)assert.ok(data.gameCandidates.length>0,name+': unidentified family must remain explicit');
 }
 console.log('CLI privacy, original-byte integrity, existing destinations, symlink protection, corruption and truncation passed.');
}finally{fs.rmSync(temp,{recursive:true,force:true});}
