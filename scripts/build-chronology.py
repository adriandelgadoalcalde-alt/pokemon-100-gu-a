#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Escribe en MASTER_DATA (atlas.html) el paso a paso cronológico de los legendarios fijos y del resto de objetivos.

Junta research/guides/legendarios-pkhex.json (lugar, nivel y si es errante, sacado de las tablas de encuentros de
PKHeX.Core) con research/guides/legendarios.json (cuándo se puede, requisitos, consejo, fase y orden, con fuentes) y
rellena «how», «phase» y «order» de cada objetivo «Registrar a …». Uso: python3 -I scripts/build-chronology.py
"""
import json
import os
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ATLAS = ROOT / 'atlas.html'
CHRONO = json.loads((ROOT / 'research/guides/legendarios.json').read_text(encoding='utf-8'))
PKHEX = json.loads((ROOT / 'research/guides/legendarios-pkhex.json').read_text(encoding='utf-8'))
GOALS = json.loads((ROOT / 'research/guides/objetivos.json').read_text(encoding='utf-8'))['objetivos']
# Reescrituras precisas por generación (research/guides/precision/*.json), contrastadas con guías y con fuente al final:
# {"misiones": {"<misión>": {"pasos": [...], "precaucion": "..."}}, "objetivos": {"<JUEGO>:<objetivo>": "texto"}}.
# Mandan sobre todo lo anterior: las misiones van al CATALOG y los objetivos a MASTER_DATA.
PRECISION = [json.loads(f.read_text(encoding='utf-8')) for f in sorted((ROOT / 'research/guides/precision').glob('*.json'))]


def places(game, species):
    out = []
    for e in PKHEX.get(game, {}).get(str(species), []):
        # Fuera: lugares entre paréntesis (orígenes especiales de PKHeX) y los de nivel 3 de Let's Go (Parque GO).
        if not e['lugar'] or e['lugar'].startswith('(') or (game.startswith('LETGO') and e['nivel'] < 10):
            continue
        # En los errantes PKHeX guarda la ruta de partida del encuentro, no un lugar fijo: se dice «errante por la región».
        place = 'errante por la región' if e['errante'] else e['lugar']
        text = f"{place} (nivel {e['nivel']}{', regalo' if e['regalo'] else ''})"
        if text not in out:
            out.append(text)
    return out


def entries(game):
    spec = CHRONO['juegos'].get(game)
    if not spec:
        return {}
    if 'copia' in spec:
        spec = CHRONO['juegos'][spec['copia']]
    merged = {}
    for group in spec.get('grupos', []):
        merged.update(CHRONO['grupos'][group])
    merged.update({k: v for k, v in spec.items() if k != 'grupos'})
    return merged

# (fase, orden) por defecto. Fases: 0 historia, 1 objetos clave, 2 posliga y legendarios, 3 combates, 4 coleccionables,
# 5 Pokédex, 6 diplomas/amuletos/tarjeta, 7 eventos. Dentro de cada fase, el orden en que se desbloquean en la partida.
DEFAULT_ORDER = {
    'battle0': (3, 300), 'battle1': (3, 310), 'chateau-rank': (3, 320), 'restricted-sparring': (3, 315),
    'frontier-prints': (3, 330), 'black-tower': (3, 340), 'treehollow': (3, 340), 'blueberry-league': (3, 320),
    'ingo': (3, 310), 'final-boss-cynthia': (3, 380), 'final-boss': (3, 390),
    'trick-house': (2, 190), 'sevii-gems': (2, 205), 'unown': (2, 290), 'postgame': (2, 200), 'rocket': (2, 210),
    'mantine-surf': (4, 395), 'requests': (2, 210), 'ogre-oustin': (2, 235), 'flying-trial': (2, 255),
    'perrin': (2, 262), 'postgame-legendary': (2, 210), 'side-missions': (2, 280),
    'orb-red-blue': (1, 190), 'items0': (1, 150),
    'collect-unown': (4, 400), 'zygarde-cells': (4, 400), 'zygarde-cores': (4, 410), 'stickers': (4, 420),
    'alolan-diglett': (4, 400), 'dojo-watts': (4, 405), 'footprints': (4, 410), 'wisps': (4, 420),
    'mega-stones': (4, 400), 'mega-stones-dlc': (4, 410), 'mega-stones-special': (4, 420),
    'diploma-regional': (6, 612), 'oval-charm': (6, 613), 'diploma-nacional': (6, 615), 'shiny-charm': (6, 616),
    'medal-type': (6, 617), 'league-card-stars': (6, 620), 'medals': (6, 680), 'nurse-gold': (6, 690),
    ('ULTRASUN', 'zygarde-cells'): (4, 405), ('ULTRAMOON', 'zygarde-cells'): (4, 405),
    ('LETGOP', 'medal-type'): (6, 620), ('LETGOE', 'medal-type'): (6, 620),
    ('ARCEUS', 'medal-type'): (6, 600),
}


def main():
    s = ATLAS.read_text(encoding='utf-8')
    i = s.index('MASTER_DATA={') + 12
    data, end = json.JSONDecoder().raw_decode(s, i)
    done = 0
    for game, items in data.items():
        info = entries(game)
        for item in items:
            sp = item.get('species')
            if not isinstance(sp, int) or str(sp) not in info:
                continue
            e = info[str(sp)]
            where = [e['donde']] if e.get('donde') else places(game, sp)
            parts = ['Cuándo: ' + e['cuando']]
            if where:
                parts.append('Dónde: ' + '; '.join(where) + '.')
            parts.append('Cómo: ' + e['requisitos'])
            if e.get('consejo'):
                parts.append('Consejo: ' + e['consejo'])
            if e.get('pokekeep'):
                parts.append('Con Pokekeep: ' + e['pokekeep'])
            parts.append('Se acredita con el registro en la Pokédex de la partida.')
            item['how'] = ' '.join(parts)
            item['phase'] = e['fase']
            item['order'] = e['orden']
            done += 1
    # Objetivos no legendarios (research/guides/objetivos.json): cómo, qué hace falta, fase, orden y paso con Pokekeep.
    for goal in GOALS:
        for game in goal['juegos']:
            for item in data.get(game, []):
                if item['id'] != goal['id']:
                    continue
                text = goal['como']
                if goal.get('pokekeep'):
                    text += ' Con Pokekeep: ' + goal['pokekeep']
                item['how'] = text
                item['phase'] = goal['fase']
                item['order'] = goal['orden']
                if 'nivel' in goal:
                    item['tier'] = goal['nivel']
                done += 1
    used = set()
    for pack in PRECISION:
        for key, text in pack.get('objetivos', {}).items():
            game, goal = key.split(':', 1)
            hits = [item for item in data.get(game, []) if item['id'] == goal]
            if not hits:
                raise SystemExit(f'precisión: {key} no existe en MASTER_DATA')
            if 'PKHeX' in text:
                raise SystemExit(f'precisión: {key} nombra PKHeX (debe decir Pokekeep)')
            for item in hits:
                item['how'] = text
            used.add(key)
    # Fase y orden cronológico por defecto de los objetivos que no los fijan en los JSON de research/guides
    # (índices de MASTERY_PHASES en atlas.html): así ningún objetivo queda fuera del orden de la guía.
    fixed = 0
    for game, items in data.items():
        for item in items:
            if isinstance(item.get('phase'), int) and isinstance(item.get('order'), int):
                continue
            key = DEFAULT_ORDER.get((game, item['id'])) or DEFAULT_ORDER.get(item['id'])
            if key is None and item['id'].startswith('card-') and item['id'][5:].isdigit():
                key = (6, 600 + 10 * int(item['id'][5:]))
            if key is None:
                raise SystemExit(f'{game}/{item["id"]}: sin fase ni orden cronológico')
            item['phase'], item['order'] = key
            fixed += 1
    s = s[:i] + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + s[end:]
    # Misiones: el paso a paso preciso sustituye al «Recorrido paso a paso» (src/guides/precision.js, que lee routes.js);
    # las misiones sin recorrido detallado lo reciben como casillas del CATALOG.
    j = s.index('const CATALOG=') + len('const CATALOG=')
    catalog, cend = json.JSONDecoder().raw_decode(s, j)
    missions = {m['id']: m for g in catalog['games'] for m in g['missions']}
    detailed = dict(json.loads(subprocess.run(
        ['node', '-e', "const r=require('./src/guides/routes.js');const ids={};for(const x of r.routes)for(const g of x.games)ids[g+'-'+x.mission]=x.steps.join(' ').length;console.log(JSON.stringify(ids))"],
        cwd=ROOT, capture_output=True, text=True, check=True, env={**os.environ, 'POKEMON_SIN_PRECISION': '1'}).stdout))
    precise, changed, shorter = {}, 0, []
    for pack in PRECISION:
        for mid, spec in pack.get('misiones', {}).items():
            if mid not in missions:
                raise SystemExit(f'precisión: misión {mid} no existe en CATALOG')
            steps = spec.get('pasos') or []
            caution = spec.get('precaucion') or ''
            if len(steps) < 2 or any(not isinstance(x, str) or not x.strip() for x in steps):
                raise SystemExit(f'precisión: misión {mid} con pasos vacíos')
            if any('PKHeX' in x for x in steps + [caution]):
                raise SystemExit(f'precisión: misión {mid} nombra PKHeX (debe decir Pokekeep)')
            if mid in detailed:
                # Un paso a paso «preciso» bastante más corto que el recorrido actual perdería detalle: se queda el actual.
                if len(' '.join(steps)) < 0.7 * detailed[mid]:
                    shorter.append(mid)
                    continue
                precise[mid] = {'steps': steps, 'caution': caution}
            else:
                missions[mid]['steps'] = steps
                if caution:
                    missions[mid]['caution'] = caution
            changed += 1
    s = s[:j] + json.dumps(catalog, ensure_ascii=False, separators=(',', ':')) + s[cend:]
    (ROOT / 'src/guides/precision.js').write_text(
        '// SPDX-License-Identifier: GPL-3.0-or-later\n'
        '/* Generado por scripts/build-chronology.py desde research/guides/precision/*.json: paso a paso preciso de cada\n'
        '   misión con recorrido detallado (routes.js lo usa en lugar del suyo). No editar a mano. */\n'
        '(function(root){const missions=' + json.dumps(precise, ensure_ascii=False, sort_keys=True, indent=0) + ';\n'
        "const api={missions};if(typeof module==='object'&&module.exports)module.exports=api;else root.PokemonPrecision=api;\n"
        "})(typeof globalThis==='object'?globalThis:this);\n", encoding='utf-8')
    ATLAS.write_text(s, encoding='utf-8')
    if shorter:
        print('Precisión: se queda el recorrido actual, más detallado, en ' + ' '.join(sorted(shorter)))
    print(f'Precisión: {changed} misiones y {len(used)} objetivos reescritos.')
    print(f'Paso a paso escrito en {done} objetivos; {fixed} ordenados por la tabla por defecto.')


if __name__ == '__main__':
    main()
