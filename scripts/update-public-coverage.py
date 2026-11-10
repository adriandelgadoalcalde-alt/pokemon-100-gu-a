"""Generate public container counts without copying any diagnosis or trainer data."""
import json
import sys
from pathlib import Path

root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/'research/saves/public-corpus.json').read_text())
report=json.loads((root/'research/saves/public-validation.json').read_text())
samples={s['id']:s for s in manifest['samples']}
counts={}
for result in report['results']:
    if result['core']!='read':
        continue
    for game in samples[result['id']]['expected']['candidates']:
        row=counts.setdefault(game,{'identified':0,'family':0,'native':0})
        row['identified' if result.get('game')==game else 'family']+=1
        row['native']+=int(result['browser']=='read' and result.get('game')==game)
content='/* Sanitized public-corpus coverage; counts are containers, not natural event validation. */\nglobalThis.PokemonPublicCoverage='+json.dumps(counts,separators=(',',':'))+';\n'
destination=root/'src/saves/public-coverage.js'
if '--check' in sys.argv:
    if destination.read_text()!=content:
        raise SystemExit('Public coverage differs from its source report.')
else:
    destination.write_text(content)
