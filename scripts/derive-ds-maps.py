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

def diamond():
    """Diamante/Perla: sMapHeaders de pokediamond (campo mapsec, una entrada por línea en el orden de maps.h)."""
    repo = PRET / 'pokediamond'
    rev = subprocess.run(['git', '-C', str(repo), 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
    if rev != 'b623abef1b4dfe204ca50aab42447ac00c134290':
        fail('pokediamond no está en la revisión fijada')
    maps = defines(repo / 'include' / 'constants' / 'maps.h')
    sections = defines(repo / 'include' / 'constants' / 'map_sections.h')
    names = (PKHEX / 'Resources' / 'text' / 'locations' / 'gen4' / 'text_hgss_00000_es.txt').read_text(encoding='utf-8-sig').split('\n')
    for sec, expected in [('MAPSEC_ETERNA_CITY', 'Ciudad Vetusta'), ('MAPSEC_TWINLEAF_TOWN', 'Pueblo Hojaverde')]:
        if names[sections[sec]].strip() != expected:
            fail(f'{sec} no corresponde a «{expected}»')
    byindex = {v: k for k, v in maps.items()}
    text = (repo / 'arm9' / 'src' / 'map_header.c').read_text(encoding='utf-8')
    body = text[text.index('sMapHeaders[]'):]
    table, used, position = {}, {}, 0
    for m in re.finditer(r'^\s*\{([^\n]*)\},\s*//\s*(MAP_\w+)', body, re.M):
        name = byindex.get(position)
        if name is None:
            fail(f'la posición {position} no existe en maps.h')
        sec = re.search(r'\b(MAPSEC_\w+)\b', m.group(1))
        if sec:
            index = sections[sec.group(1)]
            used[index] = names[index].strip()
            table[position] = [index, name[4:]]
        position += 1
    if position != len(maps):
        fail(f'sMapHeaders tiene {position} entradas y maps.h {len(maps)}')
    return {'maps': table, 'names': used, 'source': 'pokediamond@b623abef1b4dfe204ca50aab42447ac00c134290'}


def unova2():
    """Negro 2/Blanco 2: zona → índice del nombre (research/gen5/b2w2-zones.json, extraído de la ROM propia)."""
    spec = json.loads((ROOT / 'research' / 'gen5' / 'b2w2-zones.json').read_text(encoding='utf-8'))
    names = (PKHEX / 'Resources' / 'text' / 'locations' / 'gen5' / 'text_bw2_00000_es.txt').read_text(encoding='utf-8-sig').split('\n')
    if spec['count'] != len(spec['names']) or spec['count'] != 615:
        fail('la tabla de zonas de Negro 2/Blanco 2 no tiene 615 entradas')
    # Ciudad Engobe (inicio del juego), Ciudad Gres y Monte Tuerca, contrastados con partidas públicas.
    for zone, expected in [(427, 'Ciudad Engobe'), (6, 'Ciudad Gres'), (200, 'Monte Tuerca')]:
        if names[spec['names'][zone]].strip() != expected:
            fail(f'la zona {zone} no corresponde a «{expected}»')
    table, used = {}, {}
    for zone, index in enumerate(spec['names']):
        if index == 0 or index >= len(names) or not names[index].strip() or names[index].strip().startswith('－'):
            continue
        used[index] = names[index].strip()
        table[zone] = [index, f'ZONE_{zone}']
    used[51] = names[51].strip()
    return {'maps': table, 'names': used, 'source': 'ROM propia (' + spec['game'] + ') sha256:' + spec['sha256'][:16]}


def kalos_hoenn(key, expected, gen='gen6', text='text_xy_00000_es.txt'):
    """X/Y, ROZA y USUM: zona → índice del nombre (research/<gen>/<key>-zones.json, extraído de la ROM propia)."""
    spec = json.loads((ROOT / 'research' / gen / f'{key}-zones.json').read_text(encoding='utf-8'))
    names = (PKHEX / 'Resources' / 'text' / 'locations' / gen / text).read_text(encoding='utf-8-sig').split('\n')
    if spec['count'] != len(spec['names']):
        fail(f'la tabla de zonas {key} está incompleta')
    for zone, name in expected:
        if names[spec['names'][zone]].strip() != name:
            fail(f'la zona {zone} de {key} no corresponde a «{name}»')
    table, used = {}, {}
    for zone, index in enumerate(spec['names']):
        if index == 0 or index >= len(names) or not names[index].strip():
            continue
        used[index] = names[index].strip()
        table[zone] = [index, f'ZONE_{zone}']
    return {'maps': table, 'names': used, 'source': 'ROM propia (' + spec['game'] + ') sha256:' + spec['sha256'][:16]}


def bdsp():
    """Diamante Brillante/Perla Reluciente: la zona es el identificador de ubicación (gen8b de PKHeX)."""
    names = (PKHEX / 'Resources' / 'text' / 'locations' / 'gen8b' / 'text_bdsp_00000_es.txt').read_text(encoding='utf-8-sig').split('\n')
    for zone, expected in [(0, 'Ciudad Jubileo'), (350, 'Orilla Valor'), (420, 'Ruta 229')]:
        if names[zone].strip() != expected:
            fail(f'la zona {zone} de BDSP no corresponde a «{expected}»')
    table, used = {}, {}
    for zone, name in enumerate(names):
        if name.strip():
            used[zone] = name.strip()
            table[zone] = [zone, f'ZONE_{zone}']
    return {'maps': table, 'names': used, 'source': 'PKHeX.Core gen8b/text_bdsp_00000_es.txt (zona = ubicación)'}


def kanto_gb(repo_name, rev):
    """Rojo/Azul/Amarillo: wCurMap → lugar del mapa de Kanto (town_map_entries.asm), nombre oficial en español."""
    repo = PRET / repo_name
    head = subprocess.run(['git', '-C', str(repo), 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
    if head != rev:
        fail(f'{repo_name} no está en la revisión fijada')
    base = PKHEX / 'Resources' / 'text' / 'locations'
    norm = lambda t: re.sub(r'[^A-Z0-9]', '', t.upper().replace('É', 'E').replace('POKEMON', 'PKMN'))
    spanish = {}
    for en_file, es_file in [('gen3/text_rsefrlg_00000_en.txt', 'gen3/text_rsefrlg_00000_es.txt'), ('gen4/text_hgss_00000_en.txt', 'gen4/text_hgss_00000_es.txt')]:
        en = (base / en_file).read_text(encoding='utf-8-sig').split('\n')
        es = (base / es_file).read_text(encoding='utf-8-sig').split('\n')
        for a, b in zip(en, es):
            spanish.setdefault(norm(a.split(' (')[0]), re.sub(r'\s*\((E|RZ|RFVH)\)$', '', b.strip()))
    labels = {}
    for line in (repo / 'data' / 'maps' / 'names.asm').read_text(encoding='utf-8').splitlines():
        m = re.match(r'(\w+Name):\s+db\s+"(.*)@"', line)
        if m:
            english = m.group(2).replace('#', 'POKé')
            key = norm(english.replace('SEA ROUTE', 'ROUTE').replace('ROCKET HQ', 'ROCKET HIDEOUT'))
            labels[m.group(1)] = spanish.get(key) or (english.title() + ' (Ruta 25)' if english == 'SEA COTTAGE' else english.title())
    if labels.get('PalletTownName') != 'Pueblo Paleta':
        fail('la traducción de Kanto no es la esperada')
    consts, groups, counter, first_indoor = [], {}, 0, None
    for line in (repo / 'constants' / 'map_constants.asm').read_text(encoding='utf-8').splitlines():
        line = line.split(';')[0].strip()
        if line.startswith('map_const '):
            consts.append(line.split()[1].rstrip(','))
            counter += 1
        elif line.startswith('end_indoor_group '):
            groups[line.split()[1]] = counter
        elif line.startswith('DEF FIRST_INDOOR_MAP'):
            first_indoor = counter
    entries = (repo / 'data' / 'maps' / 'town_map_entries.asm').read_text(encoding='utf-8')
    outdoor = re.findall(r'outdoor_map\s+\d+,\s*\d+,\s*(\w+)', entries)
    indoor = re.findall(r'indoor_map\s+(\w+),\s*\d+,\s*\d+,\s*(\w+)', entries)
    names, table = {}, {}
    def put(number, const, label):
        names.setdefault(label, len(names))
        table[number] = [names[label], const]
    for number, const in enumerate(consts):
        if number < first_indoor:
            if number < len(outdoor):
                put(number, const, outdoor[number])
        else:
            for group, label in indoor:
                if number < groups[group]:
                    put(number, const, label)
                    break
    index_names = {i: labels[l] for l, i in names.items()}
    return {'maps': table, 'names': index_names, 'source': f'{repo_name}@{rev}'}


def johto_gb(repo_name, rev):
    """Oro/Plata/Cristal: (grupo, número) → punto de referencia (data/maps/maps.asm) → nombre oficial en español."""
    repo = PRET / repo_name
    head = subprocess.run(['git', '-C', str(repo), 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
    if head != rev:
        fail(f'{repo_name} no está en la revisión fijada')
    base = PKHEX / 'Resources' / 'text' / 'locations'
    norm = lambda t: re.sub(r'[^A-Z0-9]', '', t.upper().replace('É', 'E').replace('POKEMON', 'PKMN'))
    spanish = {}
    for en_file, es_file in [('gen4/text_hgss_00000_en.txt', 'gen4/text_hgss_00000_es.txt'), ('gen3/text_rsefrlg_00000_en.txt', 'gen3/text_rsefrlg_00000_es.txt')]:
        en = (base / en_file).read_text(encoding='utf-8-sig').split('\n')
        es = (base / es_file).read_text(encoding='utf-8-sig').split('\n')
        for a, b in zip(en, es):
            spanish.setdefault(norm(a.split(' (')[0]), re.sub(r'\s*\((E|RZ|RFVH)\)$', '', b.strip()))
    text = (repo / 'data' / 'maps' / 'landmarks.asm').read_text(encoding='utf-8')
    strings = {m.group(1): m.group(2).replace('<BSP>', ' ').replace('#', 'POKé') for m in re.finditer(r'(\w+Name):\s+db\s+"(.*?)@"', text)}
    order = re.findall(r'landmark\s+-?\d+,\s*-?\d+,\s*(\w+)', text)
    consts = re.findall(r'^\s*const (LANDMARK_\w+)', (repo / 'constants' / 'landmark_constants.asm').read_text(encoding='utf-8'), re.M)
    landmark = {c: strings.get(order[i], '') for i, c in enumerate(consts) if i < len(order)}
    # Nombres renombrados en HGSS (lista oficial de PKHeX): Tin Tower → Bell Tower, Silver Cave → Mt. Silver Cave, Fast Ship → S.S. Aqua.
    aliases = {'TIN TOWER': 'BELL TOWER', 'SILVER CAVE': 'MT. SILVER CAVE', 'FAST SHIP': 'S.S. AQUA', 'LAV RADIO TOWER': 'RADIO TOWER'}
    def es(english):
        english = aliases.get(english, english)
        key = norm(english.replace('SEA ROUTE', 'ROUTE'))
        if english == 'SPECIAL':
            return 'Zona especial'
        return spanish.get(key) or english.title()
    maps_text = (repo / 'data' / 'maps' / 'maps.asm').read_text(encoding='utf-8')
    groups = re.findall(r'dw (MapGroup_\w+)', maps_text)
    names, table = {}, {}
    for g, label in enumerate(groups, 1):
        block = maps_text.split(label + ':', 1)[1].split('MapGroup_', 1)[0]
        for n, m in enumerate(re.finditer(r'^\s*map (\w+),\s*\w+,\s*\w+,\s*(LANDMARK_\w+)', block, re.M), 1):
            name = es(landmark.get(m.group(2), ''))
            if landmark.get(m.group(2)) == 'UNDERGROUND':
                name = 'Túnel Trigal' if m.group(1).startswith('Goldenrod') else 'Vía Subterránea'
            names.setdefault(name, len(names))
            table[f'{g}.{n}'] = [names[name], m.group(1)]
    if es(landmark['LANDMARK_NEW_BARK_TOWN']) != 'Pueblo Primavera':
        fail('la traducción de Johto no es la esperada')
    return {'maps': table, 'names': {i: n for n, i in names.items()}, 'source': f'{repo_name}@{rev}'}


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
    data['DP'] = diamond()
    data['B2W2'] = unova2()
    data['BDSP'] = bdsp()
    data['XY'] = kalos_hoenn('xy', [(0, 'Pueblo Boceto'), (8, 'Pueblo Acuarela'), (53, 'Ciudad Novarte')])
    data['USUM'] = kalos_hoenn('usum', [(0, 'Ruta 1'), (7, 'Ruta 2'), (22, 'Ruinas de la Guerra')], 'gen7', 'text_sm_00000_es.txt')
    data['ORAS'] = kalos_hoenn('oras', [(0, 'Villa Raíz'), (13, 'Ciudad Petalia')])
    data['RB'] = kanto_gb('pokered', '0dbf95cd12f5b1511c62ce69efe283000f780a8f')
    data['Y'] = kanto_gb('pokeyellow', 'b452f2ab07185075140061c5084ab866d5e4a794')
    data['GS'] = johto_gb('pokegold', 'f2cde36f49b994c143bfd18582182302fdc76492')
    data['C'] = johto_gb('pokecrystal', '3c813b0b4d82b39bf62185aceffb76fd6026c70b')
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
