#!/usr/bin/env python3
"""Genera src/saves/gen3-data.js desde fuentes fijadas, sin ROM ni partidas.

Fuentes: decompilaciones de pret (scripts/prepare-pret.sh) y PKHeX
(scripts/prepare-pkhex.sh), además del catálogo research/gen3/catalog.json.
Cada bandera citada debe existir en la cabecera de su edición y tener al menos
un sitio que la active (setflag/FlagSet) fuera del código de depuración.

Uso: python3 -I scripts/derive-gen3-semantics.py [--check]
"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRET = ROOT / '.cache' / 'pret'
PKHEX = ROOT / '.cache' / 'pkhex' / 'PKHeX.Core'
OUT = ROOT / 'src' / 'saves' / 'gen3-data.js'
REPOS = {'E': 'pokeemerald', 'RS': 'pokeruby', 'FRLG': 'pokefirered'}
REVISIONS = {'pokeemerald': '731ad5bfd6e6f265508d0efcca0ba42f9dcf5881',
             'pokeruby': '5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f',
             'pokefirered': 'ce6406d8c2eaf46d543c8a2606de0c3cb1951982',
             'PKHeX': '96e33e7432d900e5345afdfd117eabfac43f5bbd'}
EXTRA_VARS = ['VAR_MIRAGE_RND_H', 'VAR_MIRAGE_RND_L', 'VAR_DAYS', 'VAR_ABNORMAL_WEATHER_LOCATION']
DIRECTIONS = {'NORTH': 'norte', 'SOUTH': 'sur', 'WEST': 'oeste', 'EAST': 'este'}


def fail(message):
    raise SystemExit('derive-gen3-semantics: ' + message)


def head(repo):
    ref = subprocess.run(['git', '-C', str(PRET / repo), 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
    if ref != REVISIONS[repo]:
        fail(f'{repo} está en {ref}; ejecuta scripts/prepare-pret.sh')


def defines(repo):
    table = {}
    for path in sorted((PRET / repo / 'include' / 'constants').glob('*.h')):
        text = re.sub(r'/\*.*?\*/', '', path.read_text(encoding='utf-8', errors='replace'), flags=re.S)
        for line in text.splitlines():
            line = line.split('//')[0]
            match = re.match(r'\s*#define\s+([A-Za-z_][A-Za-z0-9_]*)\s+(.+?)\s*$', line)
            if match:
                table.setdefault(match.group(1), match.group(2))
    return table


def evaluate(name, table, stack=()):
    if name in stack:
        fail('definición circular ' + name)
    expr = table.get(name)
    if expr is None:
        return None
    def replace(match):
        token = match.group(0)
        if re.fullmatch(r'0[xX][0-9A-Fa-f]+|\d+', token):
            return str(int(token, 0))
        value = evaluate(token, table, stack + (name,))
        if value is None:
            raise KeyError(token)
        return str(value)
    try:
        python = re.sub(r'0[xX][0-9A-Fa-f]+|[A-Za-z_][A-Za-z0-9_]*|\d+', replace, expr)
    except KeyError:
        return None
    if not re.fullmatch(r'[\d\s+\-*/%()<>|&]+', python):
        return None
    return int(eval(python.replace('/', '//'), {'__builtins__': {}}))


def set_sites(repo, name):
    sites = []
    pattern = re.compile(r'\b(setflag|FlagSet)\b\s*\(?\s*' + re.escape(name) + r'\b')
    base = PRET / repo
    for folder in ('data', 'src'):
        for path in sorted((base / folder).rglob('*')):
            if path.suffix not in ('.inc', '.s', '.c', '.pory') or 'debug' in str(path).lower():
                continue
            for number, line in enumerate(path.read_text(encoding='utf-8', errors='replace').splitlines(), 1):
                if pattern.search(line):
                    sites.append(f'{path.relative_to(base)}:{number}')
    return sites


def spanish_locations():
    path = PKHEX / 'Resources' / 'text' / 'locations' / 'gen3' / 'text_rsefrlg_00000_es.txt'
    lines = path.read_text(encoding='utf-8-sig').split('\n')
    sections = json.loads((PRET / 'pokeemerald' / 'src' / 'data' / 'region_map' / 'region_map_sections.json').read_text())['map_sections']
    names = {}
    for index, section in enumerate(sections):
        names[section['id']] = lines[index].strip()
    return names


def clean_name(raw, family):
    if '/' in raw:
        parts = [p.strip() for p in raw.split('/')]
        tag = {'E': '(E)', 'RS': '(RZ)', 'FRLG': '(RFVH)'}[family]
        chosen = [p for p in parts if p.endswith(tag)]
        raw = chosen[0] if chosen else parts[0]
    return re.sub(r'\s*\((E|RZ|RFVH)\)$', '', raw)


FRLG_ALIASES = {'MAPSEC_NAVEL_ROCK': 'MAPSEC_NAVEL_ROCK_FRLG', 'MAPSEC_ALTERING_CAVE': 'MAPSEC_ALTERING_CAVE_FRLG',
                'MAPSEC_BIRTH_ISLAND': 'MAPSEC_BIRTH_ISLAND_FRLG'}


RS_ALIASES = {'MAPSEC_BATTLE_TOWER': 'MAPSEC_BATTLE_FRONTIER', 'MAPSEC_METEOR_FALLS_2': 'MAPSEC_METEOR_FALLS2',
              'MAPSEC_EVIL_TEAM_HIDEOUT': 'MAPSEC_AQUA_HIDEOUT_OLD', 'MAPSEC_FIERY_PATH_2': 'MAPSEC_FIERY_PATH2',
              'MAPSEC_JAGGED_PASS_2': 'MAPSEC_JAGGED_PASS2'}


def location_name(mapsec, family, spanish):
    aliases = FRLG_ALIASES if family == 'FRLG' else RS_ALIASES if family == 'RS' else {}
    key = aliases.get(mapsec, mapsec)
    if key not in spanish:
        fail(f'sin nombre español para {mapsec} ({family})')
    return clean_name(spanish[key], family)


def maps(repo, family, spanish, names, index):
    groups = json.loads((PRET / repo / 'data' / 'maps' / 'map_groups.json').read_text())
    result = {}
    for group_number, group in enumerate(groups['group_order']):
        for map_number, folder in enumerate(groups[group]):
            data = json.loads((PRET / repo / 'data' / 'maps' / folder / 'map.json').read_text())
            name = location_name(data['region_map_section'], family, spanish)
            if name not in index:
                index[name] = len(names)
                names.append(name)
            result[f'{group_number}.{map_number}'] = [index[name], folder]
    return result


def species_table():
    text = (PKHEX / 'PKM' / 'Util' / 'Conversion' / 'SpeciesConverter.cs').read_text()
    match = re.search(r'Table3InternalToNational =>\s*\[(.*?)\];', text, re.S)
    deltas = [int(x) for x in re.findall(r'-?\d+', match.group(1))]
    first = int(re.search(r'FirstUnalignedInternal3 = (\d+);', text).group(1))
    return {'firstUnaligned': first, 'aligned': 252, 'deltas': deltas}


def build():
    for repo in REPOS.values():
        head(repo)
    catalog = json.loads((ROOT / 'research' / 'gen3' / 'catalog.json').read_text())
    spanish = spanish_locations()
    names, index = [], {}
    families = {}
    for family, repo in REPOS.items():
        table = defines(repo)
        wanted = set()
        for row in catalog['story'][family]:
            wanted.add(row['flag'])
        for entry in catalog['secrets']:
            cond = entry.get('conditions', {}).get(family)
            if not cond:
                continue
            for key in ('done', 'doneAlso'):
                if cond.get(key):
                    wanted.add(cond[key])
            wanted.update(cond.get('lost', []))
            wanted.update(p['flag'] for p in cond.get('progress', []))
        wanted.update(f'FLAG_BADGE0{i}_GET' for i in range(1, 9))
        wanted.update(['FLAG_SYS_GAME_CLEAR', 'FLAG_SYS_NATIONAL_DEX'])
        flags, sources = {}, {}
        for name in sorted(wanted):
            value = evaluate(name, table)
            if value is None:
                fail(f'{name} no existe en {repo}')
            sites = set_sites(repo, name)
            if not sites:
                fail(f'{name} no se activa en ningún script de {repo}')
            flags[name] = value
            sources[name] = sites[:3]
        variables = {}
        for name in EXTRA_VARS:
            value = evaluate(name, table)
            if value is not None:
                variables[name] = value - 0x4000
        weather = {}
        if family == 'E':
            for name in table:
                if name.startswith('ABNORMAL_WEATHER_') and name != 'ABNORMAL_WEATHER_LOCATIONS':
                    value = evaluate(name, table)
                    parts = name[len('ABNORMAL_WEATHER_ROUTE_'):].split('_') if 'ROUTE' in name else None
                    if value is None or not parts or len(parts) != 2:
                        continue
                    cave = 'Cueva Terrena (Groudon)' if value < evaluate('MARINE_CAVE_LOCATIONS_START', table) else 'Cueva Marina (Kyogre)'
                    weather[value] = f'Ruta {parts[0]} ({DIRECTIONS[parts[1]]}) · {cave}'
        families[family] = {'maps': maps(repo, family, spanish, names, index), 'flags': flags, 'vars': variables,
                            'sources': sources, 'abnormalWeather': weather}
    secrets = []
    for entry in catalog['secrets']:
        item = dict(entry)
        item['placeName'] = {f: location_name(entry['place'], f, spanish) for f in entry['families']}
        secrets.append(item)
    data = {'revisions': REVISIONS, 'locationNames': names, 'species': species_table(), 'families': families,
            'gameFamilies': catalog['families'], 'story': catalog['story'], 'secrets': secrets}
    body = json.dumps(data, ensure_ascii=False, separators=(',', ':'), sort_keys=True)
    return ('// SPDX-License-Identifier: GPL-3.0-or-later\n'
            '// Generado por scripts/derive-gen3-semantics.py. No editar a mano.\n'
            '// Fuentes: pret (pokeemerald, pokeruby, pokefirered) y PKHeX.Core, revisiones fijadas en "revisions".\n'
            '(function(root){const data=' + body + ';\n'
            "if(typeof module==='object'&&module.exports)module.exports=data;else root.PokemonGen3Data=data;})(globalThis);\n")


def main():
    output = build()
    if '--check' in sys.argv:
        if not OUT.exists() or OUT.read_text(encoding='utf-8') != output:
            fail('src/saves/gen3-data.js no coincide con las fuentes; vuelve a generarlo')
        print('gen3-data.js coincide con las fuentes fijadas.')
        return
    OUT.write_text(output, encoding='utf-8')
    print(f'Escrito {OUT.relative_to(ROOT)} ({len(output)} bytes).')


if __name__ == '__main__':
    main()
