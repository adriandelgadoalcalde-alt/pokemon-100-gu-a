const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),manifest=require('../engine/build.json');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
for(const entry of manifest.assets){
 if(!/^[\w.-]+$/.test(entry.file))throw Error('Invalid engine asset path.');
 const bytes=fs.readFileSync(path.join(root,'engine/_framework',entry.file));
 if(bytes.length!==entry.bytes||hash(bytes)!==entry.sha256)throw Error('A distributed engine asset differs from its build manifest.');
}
if(fs.readdirSync(path.join(root,'engine/_framework')).length!==manifest.assets.length)throw Error('Unrecorded engine asset.');
for(const entry of manifest.sources){
 if(!/^(pkhex-browser|pkhex-extractor)\/[\w./-]+$/.test(entry.file)||entry.file.includes('..'))throw Error('Invalid engine source path.');
 if(hash(fs.readFileSync(path.join(root,entry.file)))!==entry.sha256)throw Error('Engine source changed: rebuild the distributed browser engine.');
}
for(const name of ['COPYING-PKHeX.txt','LICENSE-DOTNET.txt','THIRD-PARTY-NOTICES-DOTNET.txt','PKHeX-corresponding-source.tar.gz','NOTICE.md'])
 if(!fs.statSync(path.join(root,'engine',name)).size)throw Error('Missing engine license or source notice.');
console.log('Distributed engine asset and source hashes match.');
