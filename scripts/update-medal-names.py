"""Keep the 255 Spanish medal labels in their pinned Core order, without extracting files."""
import json
import re
import sys
import tarfile
from pathlib import Path

root = Path(__file__).resolve().parents[1]
member = 'PKHeX.Core/Resources/text/game/medals_b2w2/text_medals_es.txt'
with tarfile.open(root / 'engine/PKHeX-corresponding-source.tar.gz', 'r:gz') as archive:
    info = archive.getmember(member)
    if not info.isfile() or info.size > 1024 * 1024:
        raise SystemExit('Invalid medal resource in corresponding sources.')
    names = archive.extractfile(info).read().decode('utf-8').splitlines()
if len(names) != 255 or any(not name.strip() for name in names):
    raise SystemExit('Expected 255 named medals in the pinned resource.')
file = root / 'src/guides/medals.js'
content = file.read_text()
match = re.search(r'^ const names=(.+);$', content, re.M)
if not match:
    raise SystemExit('Medal name declaration not found.')
if '--check' in sys.argv:
    if json.loads(match.group(1)) != names:
        raise SystemExit('Medal names differ from the corresponding Core resource.')
else:
    file.write_text(content[:match.start(1)] + json.dumps(names, ensure_ascii=False) + content[match.end(1):])
print('All 255 Spanish medal labels match their pinned source order.')
