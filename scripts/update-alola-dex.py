"""Generate Alola registration requirements, separated from the passport receipt bits."""
import csv,hashlib,json,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1];folder=root/'research/dex'
meta=json.loads((folder/'alola-source.json').read_text());raw=(folder/'alola-numbers.csv').read_bytes()
if hashlib.sha256(raw).hexdigest()!=meta['selectedSha256']:raise SystemExit('Alola selection digest changed.')
rows=list(csv.DictReader(raw.decode().splitlines()));totals={16:302,17:120,18:130,19:130,20:100,21:403,22:150,23:160,24:160,25:130};sets={}
for dex,total in totals.items():
    selected=[r for r in rows if int(r['pokedex_id'])==dex]
    if sorted(int(r['pokedex_number']) for r in selected)!=list(range(1,total+1)):raise SystemExit('Alola numbering gap/duplicate.')
    species={int(r['species_id']) for r in selected}
    if len(species)!=total:raise SystemExit('Alola species duplicate.')
    sets[dex]=species
result={}
for family,start,expected in [('original',16,300),('ultra',21,400)]:
    excluded=set(meta['exclusions'][family]);regional=sets[start]
    if not excluded.issubset(regional):raise SystemExit('Alola exclusions absent.')
    required=regional-excluded
    if len(required)!=expected:raise SystemExit('Wrong Alola registration total.')
    data={'alola':sorted(required)}
    for offset,name in enumerate(['melemele','akala','ulaula','poni'],1):
        species=sets[start+offset]
        if not species.issubset(regional) or species&excluded:raise SystemExit('Invalid island selection.')
        data[name]=sorted(species)
    result[family]=data
result['source']=meta['source'];result['requirementsSource']=meta['requirementsSource']
license=(folder/'PokeAPI-LICENSE.md').read_text()
content='/* Regional data derived from PokéAPI; license follows.\n'+license+'\n*/\n(function(root){\n \'use strict\';\n const data='+json.dumps(result,separators=(',',':'))+';\n if(typeof module===\'object\'&&module.exports)module.exports=data;else root.PokemonAlolaDex=data;\n})(globalThis);\n'
p=root/'src/engine/alola-dex.js'
if '--check' in sys.argv:
    if p.read_text()!=content:raise SystemExit('Generated Alola requirements differ from source.')
else:p.write_text(content)
print('Alola: 300/400 required caught species, with four exact island sets per family.')
