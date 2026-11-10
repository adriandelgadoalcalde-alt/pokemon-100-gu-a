/* Public-source regression: output only source metadata and pass/fail, never trainer IDs or event dumps. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto'),{spawnSync}=require('node:child_process');
const {reader}=require('../tests/helpers.cjs');
const {normalize}=require('../src/saves/diagnosis.js');
const root=path.resolve(__dirname,'..'),manifest=require('../research/saves/public-corpus.json');
const folder=path.resolve(process.argv[2]||'fixtures/private/public-corpus');
const dotnet=process.env.POKEMON_DOTNET||'dotnet',dll=path.join(root,'pkhex-extractor/bin/Release/net10.0/Pokemon.SaveAudit.dll');
const hash=data=>crypto.createHash('sha256').update(data).digest('hex');
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const probe=spawnSync(dotnet,['--version'],{encoding:'utf8',timeout:20000});
if(probe.status!==0||!fs.existsSync(dll))throw Error('Build the local extractor and configure POKEMON_DOTNET before this regression.');
const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'pokemon-public-validation-')),results=[];
try{
 for(const sample of manifest.samples){
  const source=path.join(folder,'files',sample.id+'.sav'),failures=[];
  if(fs.lstatSync(source).isSymbolicLink())throw Error('Refusing a symlink in the fixed public corpus.');
  const bytes=fs.readFileSync(source),before=hash(bytes);
  if(bytes.length!==sample.fileBytes||before!==sample.fileSha256)throw Error('The fixed public corpus changed: '+sample.id);
  const output=path.join(temporary,sample.id+'.json');
  const extraction=spawnSync(dotnet,[dll,source,output,'--include-events'],{encoding:'utf8',timeout:20000,maxBuffer:1024*1024});
  const coreStatus=extraction.status===0?'read':'rejected';
  const row={id:sample.id,repository:sample.repository,commit:sample.commit,sourcePath:sample.sourcePath,
   provenance:sample.provenance,originVerified:false,core:coreStatus};
  if(coreStatus!==sample.expected.core)failures.push('core.status');
  if(extraction.error||![0,1].includes(extraction.status))failures.push('core.execution');
  let core;
  if(coreStatus==='read'){
   core=JSON.parse(fs.readFileSync(output,'utf8'));
   if(core.extractor.engineCommit!==manifest.engineCommit)failures.push('engine.revision');
   for(const key of ['game','format','generation'])if(core[key]!==sample.expected[key])failures.push('core.'+key);
   if(!equal(core.gameCandidates,sample.expected.candidates))failures.push('core.candidates');
   if(core.integrity.checksumsValid!==true)failures.push('core.integrity');
   if(core.trainer!==undefined||core.tid!==undefined||core.sid!==undefined)failures.push('core.privacy');
   row.game=core.game;row.generation=core.generation;row.format=core.format;
   row.atlasDiagnosisCompatible=normalize({...core,game:core.game||'UNIDENTIFIED_FAMILY'})!==null;if(!row.atlasDiagnosisCompatible)failures.push('atlas.normalization');
   if('paldeaSignal' in sample.expected){const signal=core.progressSignals?.find(s=>s.id==='story.paldea.clear');
    if(signal?.value!==sample.expected.paldeaSignal||signal?.validation!=='documented')failures.push('documented.paldeaSignal');
    row.documentedPaldeaSignalRead=signal?.value===sample.expected.paldeaSignal;
   }
  }else{
   row.rejection=/integridad/.test(extraction.stderr||'')?'integrity':/no reconoce/.test(extraction.stderr||'')?'unrecognized':'interpretation';
   if(sample.expected.rejection&&row.rejection!==sample.expected.rejection)failures.push('core.rejection');
   if(fs.existsSync(output))failures.push('rejected.output');
  }
  let browser;
  try{browser=reader().parse(new Uint8Array(bytes));}catch{}
  row.browser=browser?'read':'rejected';
  if(row.browser!==sample.expected.browser)failures.push('browser.status');
  if(browser&&core){
   for(const field of ['game','gameClear','nationalDex'])if(core[field]!==null&&browser[field]!==core[field])failures.push('parity.'+field);
   if(core.badgesTotal!==null&&(browser.badgesTotal??browser.badges)!==core.badgesTotal)failures.push('parity.badges');
   for(const field of ['caught','seen'])if(!equal([...browser[field]],core[field]))failures.push('parity.'+field);
   for(const field of ['activeFlags','work'])if(!equal(browser.events?.[field],core.events?.[field]))failures.push('parity.events.'+field);
   if(browser.keyItems&&!equal(browser.keyItems,core.keyItems))failures.push('parity.keyItems');
   if(browser.inventory){row.inventoryParity=equal(browser.inventory,core.inventory);if(!row.inventoryParity)failures.push('parity.inventory');}
   if(browser.medals){row.medalParity=equal(browser.medals,core.medals);if(!row.medalParity)failures.push('parity.medals');}
   const identity=hash(`pokemon-save-audit-v1|${core.detectedVersion}|${browser.trainer}|${browser.tid}|${browser.sid}`);
   if(identity!==core.profileId)failures.push('parity.identity');
   row.browserParity=failures.every(f=>!f.startsWith('parity.'));
  }
  row.inputUnchanged=before===hash(fs.readFileSync(source));if(!row.inputUnchanged)failures.push('input.modified');
  row.failures=failures;results.push(row);
 }
 const report={checkedAt:new Date().toISOString().slice(0,10),scope:'Public archive containers, not proof of natural completion or controlled event history.',engineCommit:manifest.engineCommit,
  summary:{samples:results.length,uniqueSaveHashes:new Set(manifest.samples.map(s=>s.fileSha256)).size,coreRead:results.filter(r=>r.core==='read').length,browserRead:results.filter(r=>r.browser==='read').length,
   inventoryParitySamples:results.filter(r=>r.inventoryParity===true).length,
   medalParitySamples:results.filter(r=>r.medalParity===true).length,
   browserEditions:[...new Set(results.filter(r=>r.browserParity).map(r=>r.game))].sort(),generations:[...new Set(results.filter(r=>r.core==='read').map(r=>r.generation))].sort(),
   unchanged:results.every(r=>r.inputUnchanged),failed:results.filter(r=>r.failures.length).length},results};
 const destination=path.join(folder,'report.json');
 if(fs.existsSync(destination)&&(fs.lstatSync(destination).isSymbolicLink()||fs.statSync(destination).nlink>1))throw Error('Refusing a linked report destination.');
 fs.writeFileSync(destination,JSON.stringify(report,null,2)+'\n',{mode:0o600});
 console.log(JSON.stringify(report.summary));
 for(const row of results.filter(r=>r.failures.length))console.error(row.id+': '+row.failures.join(', '));
 if(report.summary.failed)process.exitCode=1;
}finally{fs.rmSync(temporary,{recursive:true,force:true});}
