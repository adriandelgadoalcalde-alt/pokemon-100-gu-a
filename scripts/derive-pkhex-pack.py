#!/usr/bin/env python3
"""Genera src/saves/pkhex-data.js con las banderas documentadas en PKHeX.Core.

PKHeX incluye, para su editor de eventos, listas investigadas por la comunidad
(Resources/text/script/genN/flags_*_en.txt): índice, tipo y descripción. Este
script toma las capturas, derrotas, desapariciones y regalos de legendarios y
encuentros únicos, más la entrada al Salón de la Fama. No inventa pasos: cada
entrada enlaza con el recorrido de la misión de postgame de la edición.
Nivel de confianza: documentado por la comunidad en PKHeX, sin script fuente.

Uso: python3 -I scripts/derive-pkhex-pack.py [--check]
"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PKHEX = ROOT / '.cache' / 'pkhex' / 'PKHeX.Core'
REVISION = '96e33e7432d900e5345afdfd117eabfac43f5bbd'
OUT = ROOT / 'src' / 'saves' / 'pkhex-data.js'
# familia: (archivo, ediciones, misión de legendarios, etiquetas de versión → edición)
FAMILIES = {
    'DP': ('gen4/flags_dp_en.txt', ['DIAMOND', 'PEARL'], '11', {}, '10'),
    'BW': ('gen5/flags_bw_en.txt', ['BLACK', 'WHITE'], '10', {'(B)': 'BLACK', '(W)': 'WHITE'}, '09'),
    'B2W2': ('gen5/flags_b2w2_en.txt', ['BLACK2', 'WHITE2'], '10', {'(B2)': 'BLACK2', '(W2)': 'WHITE2'}, '09'),
    'XY': ('gen6/flags_xy_en.txt', ['X', 'Y'], '10', {'(X)': 'X', '(Y)': 'Y'}, '09'),
    'ORAS': ('gen6/flags_oras_en.txt', ['OMEGARUBY', 'ALPHASAPPHIRE'], '13', {'(OR)': 'OMEGARUBY', '(AS)': 'ALPHASAPPHIRE'}, '12'),
    'SM': ('gen7/flags_sm_en.txt', ['SUN', 'MOON'], '09', {'(S)': 'SUN', '(M)': 'MOON'}, '08'),
    'USUM': ('gen7/flags_usum_en.txt', ['ULTRASUN', 'ULTRAMOON'], '09', {'(US)': 'ULTRASUN', '(UM)': 'ULTRAMOON'}, '08'),
    'BDSP': ('gen8/flag_bdsp_en.txt', ['BD', 'SP'], '11', {', BD)': 'BD', ', SP)': 'SP'}, '10'),
}


def fail(message):
    raise SystemExit('derive-pkhex-pack: ' + message)


def species_table():
    names = (PKHEX / 'Resources' / 'text' / 'other' / 'en' / 'text_Species_en.txt').read_text(encoding='utf-8-sig').split('\n')
    return {n.strip(): i for i, n in enumerate(names) if n.strip() and i > 0}


def parse(path):
    rows = []
    for raw in path.read_text(encoding='utf-8-sig').splitlines():
        parts = raw.split('\t')
        if len(parts) >= 3 and parts[0].strip().isdigit():
            rows.append((int(parts[0]), parts[1].strip(), '\t'.join(parts[2:]).strip()))
        elif len(parts) == 2 and parts[0].strip().isdigit():
            rows.append((int(parts[0]), '', parts[1].strip()))
    return rows


def build():
    head = subprocess.run(['git', '-C', str(PKHEX.parent), 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
    if head != REVISION:
        fail('PKHeX no está en la revisión fijada; ejecuta scripts/prepare-pkhex.sh')
    species = species_table()
    families, secrets, story, game_families = {}, [], {}, {}
    spanish = (PKHEX / 'Resources' / 'text' / 'other' / 'es' / 'text_Species_es.txt').read_text(encoding='utf-8-sig').split('\n')
    for family, (relative, games, mission, tags, league) in FAMILIES.items():
        rows = parse(PKHEX / 'Resources' / 'text' / 'script' / relative)
        flags, by_subject = {}, {}
        hall = None
        for index, kind, text in rows:
            clean = re.sub(r'\s*\(Unreleased\)|\s*\(Illegal\)', '', text)
            if re.search(r'Entered Hall of Fame|First game clear|Is Alolan Champion', clean) and hall is None:
                hall = index
                flags[f'pkhex:{index}'] = index
                continue
            match = re.search(r'(Captured|Defeated|Disappeared|Received)', clean)
            if not match or kind not in ('r', 'g', 's'):
                continue
            restricted = [g for tag, g in tags.items() if tag in clean]
            # El nombre de la especie aparece en la descripción, con o sin prefijos de versión.
            found, rest = [], clean
            for name in sorted(species, key=len, reverse=True):
                if len(name) > 2 and re.search(r'(?<![A-Za-z])' + re.escape(name) + r'(?![a-z])', rest):
                    found.append(species[name])
                    rest = rest.replace(name, ' ')
            found.sort(key=lambda sp: clean.find(next(n for n, i in species.items() if i == sp)))
            if not found:
                continue
            subject = '/'.join(map(str, found)) + '|' + ','.join(restricted)
            entry = by_subject.setdefault(subject, {'species': found, 'games': restricted, 'state': {}, 'labels': {}})
            verb = match.group(1)
            if verb in entry['state'] or (verb == 'Received' and kind != 'g'):
                continue
            entry['state'][verb] = index
            entry['labels'][verb] = clean
            flags[f'pkhex:{index}'] = index
        if hall is not None:
            story[family] = [{'mission': league, 'flag': f'pkhex:{hall}', 'label': 'Salón de la Fama registrado'}]
        for subject, entry in by_subject.items():
            state = entry['state']
            if 'Captured' not in state and 'Received' not in state:
                continue
            done = state.get('Captured', state.get('Received'))
            gift = 'Received' in state and 'Captured' not in state
            cond = {'done': f'pkhex:{done}',
                    'meaning': ('Regalo recibido' if gift else 'Capturado') + ' según la lista de eventos documentada en PKHeX: «' + entry['labels'].get('Captured', entry['labels'].get('Received')) + '».'}
            lost = [f'pkhex:{state[v]}' for v in ('Defeated',) if v in state]
            if lost:
                cond['progress'] = [{'flag': lost[0], 'label': 'Derrotado sin capturar'}]
            title = ' / '.join(spanish[sp].strip() for sp in entry['species'])
            title = ('Regalo: ' if gift else '') + title
            secrets.append({'title': title, 'placeName': {family: 'Ver el recorrido de postgame'}, 'id': f'pkhex.{family.lower()}.{subject.split("|")[0].replace("/", "-")}{"." + entry["games"][0].lower() if entry["games"] else ""}',
                            'families': [family], **({'games': entry['games']} if entry['games'] else {}),
                            'category': 'Regalo' if gift else 'Legendario o encuentro único', 'species': entry['species'],
                            'speciesTitle': True, 'mission': mission,
                            'requires': 'Consulta los requisitos en el recorrido de postgame de esta edición.',
                            'steps': ['Sigue el recorrido de la misión de postgame enlazada: indica el lugar exacto y lo que necesitas para este encuentro.'],
                            'conditions': {family: cond}})
        families[family] = {'flags': flags, 'vars': {}, 'sources': {k: [relative] for k in flags}}
        game_families[family] = games
    data = {'pack': 'pkhex', 'confidence': 'documentado por la comunidad en PKHeX (sin script fuente)',
            'revisions': {'PKHeX': REVISION}, 'excludeLanguages': [], 'excludeReason': '', 'storyPartial': True,
            'gameFamilies': game_families, 'families': families, 'story': story, 'secrets': secrets}
    body = json.dumps(data, ensure_ascii=False, separators=(',', ':'), sort_keys=True)
    return ('// SPDX-License-Identifier: GPL-3.0-or-later\n'
            '// Generado por scripts/derive-pkhex-pack.py desde PKHeX.Core (GPL-3.0). No editar a mano.\n'
            '(function(root){const data=' + body + ';\n'
            "if(typeof module==='object'&&module.exports)module.exports=data;"
            'else(root.PokemonEventPacks=root.PokemonEventPacks||[]).push(data);})(globalThis);\n')


def main():
    output = build()
    if '--check' in sys.argv:
        if not OUT.exists() or OUT.read_text(encoding='utf-8') != output:
            fail('src/saves/pkhex-data.js no coincide con las fuentes; vuelve a generarlo')
        print('pkhex-data.js coincide con las fuentes fijadas.')
        return
    OUT.write_text(output, encoding='utf-8')
    print(f'Escrito {OUT.relative_to(ROOT)} ({len(output)} bytes).')


if __name__ == '__main__':
    main()
