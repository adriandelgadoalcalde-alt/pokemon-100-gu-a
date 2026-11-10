"""Verify the bag-crystal IDs and names against bundled corresponding PKHeX sources."""
import json
import re
import sys
import tarfile
from pathlib import Path
root=Path(__file__).resolve().parents[1]
with tarfile.open(root/'engine/PKHeX-corresponding-source.tar.gz','r:gz') as archive:
    def resource(member):
        info=archive.getmember(member)
        if not info.isfile() or info.size>1024*1024:raise SystemExit('Invalid item resource.')
        return archive.extractfile(info).read().decode('utf-8')
    labels=resource('PKHeX.Core/Resources/text/items/text_Items_es.txt').splitlines()
    sm=resource('PKHeX.Core/Items/ItemStorage7SM.cs')
    usum=resource('PKHeX.Core/Items/ItemStorage7USUM.cs')
def ids(source):
    data=source.split('public static ReadOnlySpan<ushort> ZCrystalKey =>',1)[1].split('];',1)[0]
    return [int(n) for n in re.findall(r'\b\d+\b',re.sub(r'//[^\n]*','',data))]
originals=list(range(807,836));ultra=originals+list(range(927,933))
if ids(sm)!=originals or ids(usum)!=ultra:raise SystemExit('Crystal bag identifiers changed upstream.')
names={str(id):labels[id] for id in ultra}
p=root/'src/guides/alola-inventory.js';content=p.read_text();match=re.search(r'^ const names=(.+);$',content,re.M)
if not match:raise SystemExit('Crystal names declaration missing.')
if '--check' in sys.argv:
    if json.loads(match.group(1))!=names:raise SystemExit('Crystal names differ from pinned source.')
else:p.write_text(content[:match.start(1)]+json.dumps(names,ensure_ascii=False)+content[match.end(1):])
print('Alola: 29 original and 35 Ultra bag-crystal IDs/names match the pinned source.')
