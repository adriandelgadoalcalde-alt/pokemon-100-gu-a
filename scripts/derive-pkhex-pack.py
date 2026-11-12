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


MAISON = 'Mansión Batalla'
# Desafíos seleccionados: (familia, id, título, lugar, misión, [(índice, texto esperado, etiqueta)], pasos)
CHALLENGES = [
    ('XY', 'maison', 'Mansión Batalla: las cinco estatuillas', MAISON, '11',
     [(381, 'Singles Statuette', 'Individual'), (382, 'Doubles Statuette', 'Dobles'), (383, 'Triples Statuette', 'Triples'),
      (384, 'Rotation Statuette', 'Rotatorio'), (385, 'Multi Statuette', 'Múltiple')],
     ['En la Mansión Batalla vence a los jefes de cada modalidad tras las rachas de la modalidad Súper.',
      'Cada estatuilla se registra por separado; la Múltiple exige compañero.']),
    ('ORAS', 'maison', 'Mansión Batalla: las cinco estatuillas', MAISON, '14',
     [(380, 'Singles Statuette', 'Individual'), (381, 'Doubles Statuette', 'Dobles'), (382, 'Triples Statuette', 'Triples'),
      (383, 'Rotation Statuette', 'Rotatorio'), (384, 'Multi Statuette', 'Múltiple')],
     ['En la Mansión Batalla vence a los jefes de cada modalidad tras las rachas de la modalidad Súper.',
      'Cada estatuilla se registra por separado; la Múltiple exige compañero.']),
    ('ORAS', 'delta', 'Episodio Delta completado', 'Hoenn', 'E01',
     [(2729, 'Completed Delta Episode', 'Episodio Delta')], ['Sigue el recorrido de la misión «Episodio Delta y Deoxys».']),
    ('ORAS', 'rematch', 'Volver a vencer al Alto Mando', 'Liga Pokémon', '13',
     [(361, 'Rematched Elite Four', 'Revancha del Alto Mando')],
     ['Tras el Episodio Delta, vuelve a la Liga: el Alto Mando y el Campeón usan equipos más fuertes.']),
    ('ORAS', 'regis', 'Puzles de los Regis', 'Cámara Sellada', '13',
     [(3007, 'Sealed Chamber Puzzle Completed', 'Cámara Sellada'), (3008, 'Regi Caves Unlocked', 'Cuevas de los Regis abiertas')],
     ['Sigue el recorrido de postgame: Cámara Sellada y las tres cuevas de los Regis.']),
    ('DP', 'contests', 'Concursos: rango Master en las cinco categorías', 'Ciudad Corazón', '12',
     [(2408, 'Cool Contest Master', 'Carisma'), (2409, 'Beauty Contest Master', 'Belleza'), (2410, 'Cute Contest Master', 'Dulzura'),
      (2411, 'Smart Contest Master', 'Ingenio'), (2412, 'Tough Contest Master', 'Dureza')],
     ['En la Sala de Concursos de Ciudad Corazón gana el rango Master de las cinco categorías.']),
    ('SM', 'ride', 'Los ocho Pokémon Montura', 'Alola', '08',
     [(3113, 'Received Ride Pager', 'Buscamontura'), (3114, 'Tauros Charge', 'Tauros'), (3115, 'Stoutland Search', 'Stoutland'),
      (3116, 'Machamp Shove', 'Machamp'), (3117, 'Mudsdale Gallop', 'Mudsdale'), (3118, 'Lapras Paddle', 'Lapras'),
      (3119, 'Sharpedo Jet', 'Sharpedo'), (3120, 'Charizard Glide', 'Charizard')], ['Se desbloquean a lo largo de las pruebas; consulta el recorrido de la historia.']),
    ('USUM', 'ride', 'Los ocho Pokémon Montura', 'Alola', '08',
     [(4073, 'Received Ride Pager', 'Buscamontura'), (4074, 'Tauros Charge', 'Tauros'), (4075, 'Stoutland Search', 'Stoutland'),
      (4076, 'Machamp Shove', 'Machamp'), (4077, 'Mudsdale Gallop', 'Mudsdale'), (4078, 'Lapras Paddle', 'Lapras'),
      (4079, 'Sharpedo Jet', 'Sharpedo'), (4080, 'Charizard Glide', 'Charizard')], ['Se desbloquean a lo largo de las pruebas; consulta el recorrido de la historia.']),
    ('SM', 'judge', 'Juez de valores individuales del PC', 'Alola', '09',
     [(3155, 'Unlocked IV Judge', 'Juez desbloqueado')], ['Función del PC que valora las estadísticas ocultas; su desbloqueo se explica en el recorrido de postgame enlazado.']),
    ('USUM', 'judge', 'Juez de valores individuales del PC', 'Alola', '09',
     [(4115, 'Unlocked IV Judge', 'Juez desbloqueado')], ['Función del PC que valora las estadísticas ocultas; su desbloqueo se explica en el recorrido de postgame enlazado.']),
]


LGPE_OFFSETS = {'z': 0, 's': 128, 'v': 640, 'e': 2176}  # EventWork7b: zona, sistema, desaparición, evento


def lgpe_family():
    rows = {}
    for raw in (PKHEX / 'Resources' / 'text' / 'script' / 'gen7' / 'flags_gg_en.txt').read_text(encoding='utf-8-sig').splitlines():
        m = re.match(r'([zsve])(\d{4})\t(.+)$', raw)
        if m:
            rows[m.group(1) + m.group(2)] = (LGPE_OFFSETS[m.group(1)] + int(m.group(2)), m.group(3))
    def ref(key, expected):
        index, text = rows[key]
        if expected not in text:
            fail(f'flags_gg_en.txt: {key} ya no describe «{expected}»')
        return f'pkhex:{index}'
    gyms = [('s0012', 'Brock', 'Medalla Roca'), ('s0013', 'Misty', 'Medalla Cascada'), ('s0014', 'Lt. Surge', 'Medalla Trueno'),
            ('s0015', 'Erika', 'Medalla Arcoíris'), ('s0016', 'Koga', 'Medalla Alma'), ('s0017', 'Sabrina', 'Medalla Pantano'),
            ('s0018', 'Blaine', 'Medalla Volcán'), ('s0019', 'Giovanni', 'Medalla Tierra')]
    story = [{'mission': '02', 'flags': [ref(k, n) for k, n, _ in gyms], 'label': 'Ocho gimnasios de Kanto'},
             {'mission': '04', 'flag': ref('s0000', 'Completed Main Story'), 'label': 'Liga superada (historia principal)'}]
    def secret(key, title, place, mission, cond, category='Legendario o encuentro único', species=None, steps=None):
        return {'id': f'pkhex.lgpe.{key}', 'title': title, 'families': ['LGPE'], 'category': category, 'placeName': {'LGPE': place},
                'mission': mission, **({'species': species} if species else {}), 'requires': 'Consulta el recorrido enlazado.',
                'steps': steps or ['Sigue el recorrido de la misión enlazada.'], 'conditions': {'LGPE': cond}}
    vanish = 'Encuentro resuelto: el Pokémon ya no aparece en su sitio (bandera de desaparición documentada en PKHeX).'
    secrets = [
        secret('red', 'Combate contra Rojo', 'Meseta Añil', '06', {'done': ref('e0000', 'Defeated Red'), 'meaning': 'Bandera documentada en PKHeX.'}, 'Desafío'),
        secret('snorlax', 'Los dos Snorlax de las Rutas 12 y 16', 'Ruta 12', '03',
               {'done': ref('e0192', 'Captured Route 12 Snorlax'), 'doneAlso': ref('e0193', 'Captured Route 16 Snorlax'), 'meaning': 'Capturas documentadas en PKHeX.'}, species=[143]),
        secret('birds', 'Articuno, Zapdos y Moltres', 'Kanto', '05',
               {'done': ref('v0500', 'Articuno'), 'doneAll': [ref('v0441', 'Zapdos'), ref('v0513', 'Moltres')],
                'progress': [{'flag': ref('v0500', 'Articuno'), 'label': 'Articuno'}, {'flag': ref('v0441', 'Zapdos'), 'label': 'Zapdos'}, {'flag': ref('v0513', 'Moltres'), 'label': 'Moltres'}], 'meaning': vanish}, species=[144, 145, 146]),
        secret('mewtwo', 'Mewtwo en la Cueva Celeste', 'Cueva Celeste', '05', {'done': ref('v0603', 'Mewtwo'), 'meaning': vanish}, species=[150]),
        secret('dojo', 'Hitmonlee o Hitmonchan del Dojo', 'Ciudad Azafrán', '03', {'done': ref('e0030', 'Received Hitmonlee/Hitmonchan'), 'meaning': 'Regalo recibido.'}, 'Regalo', [106, 107]),
        secret('gifts', 'Regalos de Kanto: iniciales, Lapras y Porygon', 'Kanto', '06',
               {'done': ref('e0046', 'Bulbasaur'), 'doneAll': [ref('e0047', 'Charmander'), ref('e0048', 'Squirtle'), ref('e0011', 'Lapras'), ref('e0081', 'Porygon')],
                'progress': [{'flag': ref(k, n), 'label': n} for k, n in [('e0046', 'Bulbasaur'), ('e0047', 'Charmander'), ('e0048', 'Squirtle'), ('e0011', 'Lapras'), ('e0081', 'Porygon')]],
                'meaning': 'Regalos documentados en PKHeX.'}, 'Regalo', [1, 4, 7, 131, 137]),
        secret('techniques', 'Las cinco técnicas secretas', 'Kanto', '02',
               {'done': ref('s0001', 'Chop Down'), 'doneAll': [ref('s0002', 'Sky Dash'), ref('s0003', 'Strong Push'), ref('s0004', 'Sea Skim'), ref('s0005', 'Light Up')],
                'progress': [{'flag': ref(k, e), 'label': l} for k, e, l in [('s0001', 'Chop Down', 'Corte'), ('s0002', 'Sky Dash', 'Vuelo'), ('s0003', 'Strong Push', 'Fuerza'), ('s0004', 'Sea Skim', 'Surf'), ('s0005', 'Light Up', 'Destello')]],
                'meaning': 'Técnicas secretas desbloqueadas.'}, 'Historia'),
        secret('masters', 'Entrenadores Maestros: los 153 títulos', 'Kanto', '06',
               {'titlesAtLeast': 153, 'titlesRange': [1, 153], 'meaning': 'Títulos de Entrenador Maestro (índices 1 a 153 de EventWork7b en PKHeX).'}, 'Desafío',
               steps=['Tras la Liga, vence a cada Entrenador Maestro con la especie que pide; cada victoria desbloquea su título.']),
    ]
    flags = {}
    for k, (index, _) in rows.items():
        flags[f'pkhex:{index}'] = index
    return {'flags': flags, 'vars': {}, 'sources': {}}, story, secrets


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
        if family == 'BDSP':
            for index, kind, text in parse(PKHEX / 'Resources' / 'text' / 'script' / 'gen8' / 'system_bdsp_en.txt'):
                if text.strip() == 'SYS_FLAG_GAME_CLEAR':
                    hall = 4000 + index  # banderas de sistema tras las 4000 normales (src/saves/bdsp-flags.js)
                    flags[f'pkhex:{hall}'] = hall
        if hall is not None:
            story[family] = [{'mission': league, 'flag': f'pkhex:{hall}', 'label': 'Salón de la Fama registrado'}]
        BADGE_STORY = {
            'BW': [('02', 2, 'Medalla Trío y 2.ª medalla (Ciudad Esmalte)'), ('03', 3, '3.ª medalla (Ciudad Porcelana)'), ('04', 4, 'Medalla Voltio'), ('05', 5, 'Medalla Temblor'),
                   ('06', 6, 'Medalla Jet'), ('07', 7, '7.ª medalla (Ciudad Teja)'), ('08', 8, 'Medalla Leyenda')],
            'B2W2': [('01', 1, 'Medalla Base'), ('02', 2, 'Medalla Ponzoña'), ('03', 3, '3.ª medalla (Ciudad Porcelana)'), ('04', 4, 'Medalla Voltio'),
                     ('05', 5, 'Medalla Temblor'), ('06', 6, 'Medalla Jet'), ('08', 8, 'Medalla Leyenda y 8.ª medalla (Ciudad Marga)')],
            'XY': [('02', 1, 'Medalla Insecto'), ('04', 2, 'Medalla Muro'), ('05', 3, 'Medalla Lid'), ('06', 5, 'Medallas Planta y Voltaje'),
                   ('07', 7, 'Medallas Hada y Psique'), ('09', 8, 'Medalla Iceberg')],
            'ORAS': [('02', 1, 'Medalla Piedra'), ('03', 2, 'Medalla Puño'), ('04', 3, 'Medalla Dinamo'), ('05', 4, 'Medalla Calor'),
                     ('06', 5, 'Medalla Equilibrio'), ('07', 6, 'Medalla Pluma'), ('09', 7, 'Medalla Mente'), ('11', 8, 'Medalla Lluvia')],
        }
        if family in BADGE_STORY and hall is not None:
            story[family] = [{'mission': m, 'badgesAtLeast': n, 'label': l} for m, n, l in BADGE_STORY[family]] + story[family]
        if family in ('SM', 'USUM') and hall is not None:
            # Pruebas de Alola: cada capitán o kahuna entrega un cristal Z (WikiDex «Reto de las islas/Recorrido
            # insular»); los identificadores son los de PKHeX (src/guides/alola-inventory.js). El cristal queda en la
            # mochila, así que su presencia prueba la prueba superada.
            trials = [('02', 807, 'Prueba de Liam (Normastal Z)'), ('02', 813, 'Gran prueba de Kaudan (Lizastal Z)'),
                      ('03', 809, 'Prueba de Nereida (Hidrostal Z)'), ('03', 808, 'Prueba de Kiawe (Pirostal Z)'),
                      ('03', 811, 'Prueba de Lulú (Fitostal Z)'), ('04', 819, 'Gran prueba de Olivia (Litostal Z)'),
                      ('05', 810, 'Prueba de Chris (Electrostal Z)'), ('05', 820, 'Prueba de Zarala (Espectrostal Z)'),
                      ('05', 822, 'Gran prueba de Denio (Nictostal Z)')]
            trials += ([('07', 824, 'Prueba de Mina (Feeristal Z)')] if family == 'USUM' else [])
            trials += [('07', 821, 'Prueba del Cañón de Poni (Dracostal Z)'), ('07', 815, 'Gran prueba de Hela (Geostal Z)')]
            story[family] = [{'mission': m, 'item': i, 'label': l} for m, i, l in trials] + story[family]
        if family in ('DP', 'BDSP') and hall is not None:
            # Medallas leídas por PKHeX.Core (DP) o por las banderas de sistema 124-131 (BDSP, src/saves/bdsp-flags.js);
            # orden de DP, que BDSP conserva con las mismas misiones: Lignito, Bosque, Adoquín, Ciénaga, Reliquia (tras Surf), Mina, Carámbano, Faro.
            story[family] = [{'mission': m, 'badgesAtLeast': n, 'label': l} for m, n, l in [
                ('02', 1, 'Medalla Lignito'), ('03', 2, 'Medalla Bosque'), ('04', 3, 'Medalla Adoquín'), ('05', 4, 'Medalla Ciénaga'),
                ('06', 6, 'Medallas Reliquia y Mina'), ('07', 7, 'Medalla Carámbano'), ('09', 8, 'Medalla Faro')]] + story[family]
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
        by_index = {index: text for index, kind, text in rows}
        for fam, key, title, place, mis, items, steps in CHALLENGES:
            if fam != family:
                continue
            for index, expected, _ in items:
                if expected not in by_index.get(index, ''):
                    fail(f'{relative}: el índice {index} ya no describe «{expected}»')
                flags[f'pkhex:{index}'] = index
            names = [f'pkhex:{i}' for i, _, _ in items]
            secrets.append({'id': f'pkhex.{family.lower()}.{key}', 'title': title, 'families': [family], 'category': 'Desafío',
                            'placeName': {family: place}, 'mission': mis, 'requires': 'Consulta el recorrido enlazado.', 'steps': steps,
                            'conditions': {family: {'done': names[0], 'doneAll': names[1:],
                                                    'progress': [{'flag': f'pkhex:{i}', 'label': l} for i, _, l in items],
                                                    'meaning': 'Banderas documentadas en la lista de eventos de PKHeX.'}}})
        families[family] = {'flags': flags, 'vars': {}, 'sources': {k: [relative] for k in flags}}
        game_families[family] = games
    lgpe, lgpe_story, lgpe_secrets = lgpe_family()
    families['LGPE'] = lgpe
    game_families['LGPE'] = ['LETGOP', 'LETGOE']
    story['LGPE'] = lgpe_story
    secrets.extend(lgpe_secrets)
    data = {'pack': 'pkhex', 'storyPartialFamilies': [f for f in families if f not in ('LGPE', 'DP', 'BW', 'B2W2', 'XY', 'ORAS', 'BDSP')], 'confidence': 'documentado por la comunidad en PKHeX (sin script fuente)',
            'revisions': {'PKHeX': REVISION}, 'excludeLanguages': [], 'excludeReason': '',
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
