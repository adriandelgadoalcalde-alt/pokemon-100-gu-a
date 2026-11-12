#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Genera src/saves/za-quests-data.js desde research/switch/za-quests.json (misiones de Leyendas Z-A).

Cada variable de misión se guarda en KEventWorkQuest con clave FNV-1a 64 de su nombre interno; aquí se
comprueba ese hash, la numeración (42 misiones principales con título) y que los títulos no estén vacíos.
Uso: python3 -I scripts/derive-za-quests.py [--check]
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'research' / 'switch' / 'za-quests.json'
OUT = ROOT / 'src' / 'saves' / 'za-quests-data.js'


def fail(message):
    raise SystemExit('derive-za-quests: ' + message)


def fnv(text):
    h = 0xcbf29ce484222645
    for c in text.encode():
        h = ((h ^ c) * 0x100000001b3) & 0xFFFFFFFFFFFFFFFF
    return '%016X' % h


def build():
    spec = json.loads(SRC.read_text(encoding='utf-8'))
    main, side = [], []
    for row in spec['main']:
        if fnv(row['work']) != row['hash']:
            fail(f'hash erróneo para {row["work"]}')
        if 'mission' in row:
            if not row['title']:
                fail(f'misión {row["mission"]} sin título')
            main.append([row['mission'], row['hash'], row['chapter'], row['title']])
    if [m[0] for m in main] != list(range(1, 43)):
        fail('las misiones principales con título deben ser 1..42')
    if main[36][3] != 'El plan para salvar Ciudad Luminalia' or main[39][3] != 'El que da':
        fail('la numeración de las misiones no corresponde a la del juego')
    for row in spec['side']:
        if fnv(row['work']) != row['hash']:
            fail(f'hash erróneo para {row["work"]}')
        side.append([row['number'], row['hash'], row['title']])
    data = {'main': main, 'side': side, 'done': 255, 'clearMission': 37, 'source': 'research/switch/za-quests.json'}
    body = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
    return ('// SPDX-License-Identifier: GPL-3.0-or-later\n'
            '// Generado por scripts/derive-za-quests.py desde research/switch/za-quests.json. No editar a mano.\n'
            '(function(root){const data=' + body + ';\n'
            "if(typeof module==='object'&&module.exports)module.exports=data;else root.PokemonZAQuests=data;})(globalThis);\n")


def main():
    text = build()
    if '--check' in sys.argv:
        if OUT.read_text(encoding='utf-8') != text:
            fail('za-quests-data.js no coincide con la tabla; ejecuta el script')
        print('za-quests-data.js coincide con la tabla.')
        return
    OUT.write_text(text, encoding='utf-8', newline='\n')
    print(f'Escrito {OUT.relative_to(ROOT)} ({len(text)} bytes).')


if __name__ == '__main__':
    main()
