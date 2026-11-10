/* Local cross-check: only synthetic fixture paths are accepted by the test workflow. */
const fs=require('node:fs'),assert=require('node:assert/strict'),{createHash}=require('node:crypto'),{reader}=require('../tests/helpers.cjs');
const dir=process.argv[2];if(!dir)throw Error('Provide the synthetic output directory.');
const fixtures=JSON.parse(fs.readFileSync(`${dir}/fixture-index.json`,'utf8'));
for(const name of fixtures){
 const bytes=new Uint8Array(fs.readFileSync(`${dir}/${name}.sav`));
 const fromCore=JSON.parse(fs.readFileSync(`${dir}/${name}.json`,'utf8'));
 const hash=b=>createHash('sha256').update(b).digest('hex'),before=hash(bytes);
 const fromJS=reader().parse(bytes);
 assert.equal(hash(bytes),before,name+': input was modified');
 const profile=createHash('sha256').update(`pokemon-save-audit-v1|${fromCore.detectedVersion}|${fromJS.trainer}|${fromJS.tid}|${fromJS.sid}`).digest('hex');
 assert.equal(profile,fromCore.profileId,name+': trainer identity mismatch');
 for(const key of ['game','gameClear','nationalDex'])if(fromCore[key]!==null)assert.equal(fromJS[key],fromCore[key],name+': '+key);
 if(fromCore.badgesTotal!==null)assert.equal(fromJS.badgesTotal??fromJS.badges,fromCore.badgesTotal,name+': badges');
 for(const key of ['caught','seen'])assert.deepEqual([...fromJS[key]],fromCore[key],name+': '+key);
 assert.deepEqual([...fromJS.events.activeFlags],fromCore.events.activeFlags,name+': flags');
 assert.deepEqual([...fromJS.events.work],fromCore.events.work,name+': work');
 if(fromJS.keyItems)assert.deepEqual(JSON.parse(JSON.stringify(fromJS.keyItems)),fromCore.keyItems,name+': key items');
 if(fromJS.inventory)assert.deepEqual(JSON.parse(JSON.stringify(fromJS.inventory)),fromCore.inventory,name+': full inventory');
 if(fromJS.passport)assert.deepEqual(JSON.parse(JSON.stringify(fromJS.passport)),fromCore.passport,name+': passport stamps');
 if(fromJS.medals)assert.deepEqual(JSON.parse(JSON.stringify(fromJS.medals)),fromCore.medals,name+': medals');
 const corrupt=bytes.slice();corrupt[fromJS.generation===4?0x12bc:fromJS.generation===5?0x21408:fromJS.game==='ULTRASUN'?0x2c88:0x15008]^=1;
 assert.throws(()=>reader().parse(corrupt),/integridad/,name+': corrupt data accepted');
 if(fromJS.passport){const passportCorrupt=bytes.slice();passportCorrupt[0x4408]^=1;assert.throws(()=>reader().parse(passportCorrupt),/integridad/,name+': corrupt passport accepted');}
 if(fromJS.inventory){const bagCorrupt=bytes.slice();bagCorrupt[0x400]^=1;assert.throws(()=>reader().parse(bagCorrupt),/integridad/,name+': corrupt inventory accepted');}
}
console.log('JavaScript and pinned PKHeX.Core agree on synthetic DS/3DS fields, all flags, and all work values.');
