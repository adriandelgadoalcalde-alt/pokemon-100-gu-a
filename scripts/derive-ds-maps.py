#!/usr/bin/env python3
"""Genera src/saves/ds-maps-data.js: número de mapa → nombre oficial en español (DS).

Fuentes fijadas: cabeceras de mapa de pret (mapa → MAPSEC) y textos de lugares de
PKHeX.Core en español (el índice coincide con MAPSEC). Comprueba varios nombres
conocidos antes de escribir nada. Uso: python3 -I scripts/derive-ds-maps.py [--check]
"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRET = ROOT / '.cache' / 'pret'
PKHEX = ROOT / '.cache' / 'pkhex' / 'PKHeX.Core'
OUT = ROOT / 'src' / 'saves' / 'ds-maps-data.js'
SOURCES = {
    'HGSS': {'repo': 'pokeheartgold', 'rev': '6bf138d6035aa6b43d6f8f4132a12df70f86dcec',
             'maps': 'include/constants/maps.h', 'sections': 'include/constants/map_sections.h', 'headers': 'src/data/map_headers.h',
             'names': 'gen4/text_hgss_00000_es.txt',
             'expect': {'MAPSEC_NEW_BARK_TOWN': 'Pueblo Primavera', 'MAPSEC_TWINLEAF_TOWN': 'Pueblo Hojaverde', 'MAPSEC_RUINS_OF_ALPH': 'Ruinas Alfa'}},
}


def fail(message):
    raise SystemExit('derive-ds-maps: ' + message)


def defines(path):
    table = {}
    for line in path.read_text(encoding='utf-8').splitlines():
        m = re.match(r'\s*#define\s+(\w+)\s+(\d+)', line)
        if m:
            table[m.group(1)] = int(m.group(2))
    return table


def platinum():
    repo = PRET / 'pokeplatinum'
    rev = subprocess.run(['git', '-C', str(repo), 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
    if rev != '62bdaacdca6c56a6a396f3e9911e2f922b79bba8':
        fail('pokeplatinum no está en la revisión fijada')
    names = (PKHEX / 'Resources' / 'text' / 'locations' / 'gen4' / 'text_hgss_00000_es.txt').read_text(encoding='utf-8-sig').split('\n')
    bank = [m['id'] for m in json.loads((repo / 'res' / 'text' / 'location_names.json').read_text(encoding='utf-8'))['messages']]
    for label, expected in [('LocationNames_Text_EternaCity', 'Ciudad Vetusta'), ('LocationNames_Text_TwinleafTown', 'Pueblo Hojaverde')]:
        if names[bank.index(label)].strip() != expected:
            fail(f'{label} no corresponde a «{expected}»')
    headers = [l.strip() for l in (repo / 'generated' / 'map_headers.txt').read_text(encoding='utf-8').splitlines() if l.strip()]
    table, used = {}, {}
    for number, header in enumerate(headers):
        folder = repo / 'res' / 'field' / 'maps' / header[len('MAP_HEADER_'):].lower() / 'header.json'
        if not folder.exists():
            continue
        label = json.loads(folder.read_text(encoding='utf-8')).get('locationName')
        if label not in bank:
            continue
        index = bank.index(label)
        used[index] = names[index].strip()
        table[number] = [index, header[len('MAP_HEADER_'):]]
    if table.get(65, [None, ''])[1] != 'ETERNA_CITY':
        fail('la numeración de mapas de Platino no coincide')
    return {'maps': table, 'names': used, 'source': 'pokeplatinum@62bdaacdca6c56a6a396f3e9911e2f922b79bba8'}


def build():
    head = subprocess.run(['git', '-C', str(PKHEX.parent), 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
    if head != '96e33e7432d900e5345afdfd117eabfac43f5bbd':
        fail('PKHeX no está en la revisión fijada')
    data = {}
    for family, src in SOURCES.items():
        repo = PRET / src['repo']
        rev = subprocess.run(['git', '-C', str(repo), 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
        if rev != src['rev']:
            fail(f'{src["repo"]} no está en la revisión fijada')
        maps = defines(repo / src['maps'])
        sections = defines(repo / src['sections'])
        names = (PKHEX / 'Resources' / 'text' / 'locations' / src['names']).read_text(encoding='utf-8-sig').split('\n')
        for sec, expected in src['expect'].items():
            if names[sections[sec]].strip() != expected:
                fail(f'{sec} no corresponde a «{expected}»')
        text = (repo / src['headers']).read_text(encoding='utf-8')
        table, used = {}, {}
        for m in re.finditer(r'\[(MAP_\w+)\]\s*=\s*\{(.*?)\n\s*\},', text, re.S):
            sec = re.search(r'\.mapsec\s*=\s*(MAPSEC_\w+)', m.group(2))
            if not sec or m.group(1) not in maps:
                continue
            index = sections[sec.group(1)]
            used[index] = names[index].strip()
            table[maps[m.group(1)]] = [index, m.group(1)[4:]]
        data[family] = {'maps': table, 'names': used, 'source': src['repo'] + '@' + src['rev']}
    data['PT'] = platinum()
    body = json.dumps(data, ensure_ascii=False, separators=(',', ':'), sort_keys=True)
    return ('// SPDX-License-Identifier: GPL-3.0-or-later\n'
            '// Generado por scripts/derive-ds-maps.py (pret + textos de PKHeX.Core). No editar a mano.\n'
            '(function(root){const data=' + body + ';\n'
            "if(typeof module==='object'&&module.exports)module.exports=data;else root.PokemonDSMaps=data;})(globalThis);\n")


def main():
    output = build()
    if '--check' in sys.argv:
        if not OUT.exists() or OUT.read_text(encoding='utf-8') != output:
            fail('src/saves/ds-maps-data.js no coincide con las fuentes')
        print('ds-maps-data.js coincide con las fuentes fijadas.')
        return
    OUT.write_text(output, encoding='utf-8')
    print(f'Escrito {OUT.relative_to(ROOT)} ({len(output)} bytes).')


if __name__ == '__main__':
    main()
