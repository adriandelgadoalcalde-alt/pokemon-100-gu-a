"""Build the exact ORAS regional species set from a pinned, attributed data selection."""
import csv
import hashlib
import json
import sys
from pathlib import Path

root=Path(__file__).resolve().parents[1]
folder=root/'research/dex'
meta=json.loads((folder/'hoenn-source.json').read_text())
raw=(folder/'hoenn-numbers.csv').read_bytes()
if hashlib.sha256(raw).hexdigest()!=meta['selectedSha256']:
    raise SystemExit('Regional source selection does not match its recorded digest.')
rows=list(csv.DictReader(raw.decode().splitlines()))
for dex,total in [(15,211)]:
    ids=[int(r['pokedex_number']) for r in rows if int(r['pokedex_id'])==dex]
    if sorted(ids)!=list(range(1,total+1)):
        raise SystemExit('Regional numbering has a gap or duplicate.')
species=[int(r['species_id']) for r in rows]
if len(species)!=211 or len(set(species))!=211:
    raise SystemExit('Expected 211 distinct updated Hoenn entries.')
excluded=set(meta['exclusions'])
if not excluded.issubset(species):
    raise SystemExit('Expected all three exclusions in the regional selection.')
required=sorted(set(species)-excluded)
if len(required)!=208:
    raise SystemExit('Expected 208 required seen entries.')
license=(folder/'PokeAPI-LICENSE.md').read_text()
data={'required':required,'source':meta['source'],'requirementsSource':meta['requirementsSource']}
content='/* Regional data derived from PokéAPI; license follows.\n'+license+'\n*/\n(function(root){\n \'use strict\';\n const data='+json.dumps(data,separators=(',',':'))+';\n if(typeof module===\'object\'&&module.exports)module.exports=data;else root.PokemonHoennDex=data;\n})(globalThis);\n'
p=root/'src/engine/hoenn-dex.js'
if '--check' in sys.argv:
    if p.read_text()!=content:
        raise SystemExit('Generated Hoenn requirements differ from their pinned source.')
else:
    p.write_text(content)
print('Hoenn: 211 regional entries, three exclusions, 208 required seen species.')
