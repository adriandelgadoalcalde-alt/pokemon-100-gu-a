"""Build the exact XY regional species set from a pinned, attributed data selection."""
import csv
import hashlib
import json
import sys
from pathlib import Path

root=Path(__file__).resolve().parents[1]
folder=root/'research/dex'
meta=json.loads((folder/'kalos-source.json').read_text())
raw=(folder/'kalos-numbers.csv').read_bytes()
if hashlib.sha256(raw).hexdigest()!=meta['selectedSha256']:
    raise SystemExit('Regional source selection does not match its recorded digest.')
rows=list(csv.DictReader(raw.decode().splitlines()))
for dex,total in [(12,153),(13,153),(14,151)]:
    ids=[int(r['pokedex_number']) for r in rows if int(r['pokedex_id'])==dex]
    if sorted(ids)!=list(range(1,total+1)):
        raise SystemExit('Regional numbering has a gap or duplicate.')
species=[int(r['species_id']) for r in rows]
if len(species)!=457 or len(set(species))!=457:
    raise SystemExit('Expected 457 distinct Kalos entries.')
excluded=set(meta['exclusions'])
if not excluded.issubset(species):
    raise SystemExit('Expected all seven exclusions in the regional selection.')
required=sorted(set(species)-excluded)
if len(required)!=450:
    raise SystemExit('Expected 450 required seen entries.')
license=(folder/'PokeAPI-LICENSE.md').read_text()
data={'required':required,'source':meta['source'],'requirementsSource':meta['requirementsSource']}
content='/* Regional data derived from PokéAPI; license follows.\n'+license+'\n*/\n(function(root){\n \'use strict\';\n const data='+json.dumps(data,separators=(',',':'))+';\n if(typeof module===\'object\'&&module.exports)module.exports=data;else root.PokemonKalosDex=data;\n})(globalThis);\n'
p=root/'src/engine/kalos-dex.js'
if '--check' in sys.argv:
    if p.read_text()!=content:
        raise SystemExit('Generated Kalos requirements differ from their pinned source.')
else:
    p.write_text(content)
print('Kalos: 457 regional entries, seven exclusions, 450 required seen species.')
