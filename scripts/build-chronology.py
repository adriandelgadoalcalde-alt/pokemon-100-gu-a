#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Escribe en MASTER_DATA (atlas.html) el paso a paso cronológico de los legendarios fijos.

Junta research/guides/legendarios-pkhex.json (lugar, nivel y si es errante, sacado de las tablas de encuentros de
PKHeX.Core) con research/guides/legendarios.json (cuándo se puede, requisitos, consejo, fase y orden, con fuentes) y
rellena «how», «phase» y «order» de cada objetivo «Registrar a …». Uso: python3 -I scripts/build-chronology.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ATLAS = ROOT / 'atlas.html'
CHRONO = json.loads((ROOT / 'research/guides/legendarios.json').read_text(encoding='utf-8'))
PKHEX = json.loads((ROOT / 'research/guides/legendarios-pkhex.json').read_text(encoding='utf-8'))


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
    ATLAS.write_text(s[:i] + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + s[end:], encoding='utf-8')
    print(f'Paso a paso escrito en {done} objetivos.')


if __name__ == '__main__':
    main()
