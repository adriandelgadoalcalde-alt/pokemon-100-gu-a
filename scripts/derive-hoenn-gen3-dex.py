#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Genera src/engine/hoenn-gen3-dex.js: la Pokédex de Hoenn de Rubí/Zafiro/Esmeralda en números nacionales.

Fuente: pokeemerald (revisión fijada), include/constants/pokedex.h: el orden de HOENN_DEX_* y su nombre
NATIONAL_DEX_* equivalente. HasAllHoennMons (src/pokedex.c) exige los HOENN_DEX_COUNT - 2 primeros
(sin Jirachi ni Deoxys). Uso: python3 -I scripts/derive-hoenn-gen3-dex.py [--check]
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REPO = ROOT / '.cache' / 'pret' / 'pokeemerald'
REV = '731ad5bfd6e6f265508d0efcca0ba42f9dcf5881'
OUT = ROOT / 'src' / 'engine' / 'hoenn-gen3-dex.js'


def enum(text, prefix):
    names, inside = [], False
    for line in text.splitlines():
        line = line.split('//')[0].strip()
        if re.match(r'enum\b', line):
            inside, names = True, []
            continue
        if inside and line.startswith('}'):
            if names and names[0].startswith(prefix):
                return names
            inside = False
            continue
        if inside:
            m = re.match(r'(\w+)', line)
            if m:
                names.append(m.group(1))
    raise SystemExit('derive-hoenn-gen3-dex: no se encuentra la enumeración ' + prefix)


def main():
    rev = subprocess.run(['git', '-C', str(REPO), 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
    if rev != REV:
        raise SystemExit('derive-hoenn-gen3-dex: pokeemerald no está en la revisión fijada')
    text = (REPO / 'include' / 'constants' / 'pokedex.h').read_text(encoding='utf-8')
    national = enum(text, 'NATIONAL_DEX_NONE')
    hoenn = enum(text, 'HOENN_DEX_NONE')
    nat = {n[len('NATIONAL_DEX_'):]: i for i, n in enumerate(national)}
    hoenn = hoenn[:hoenn.index('HOENN_DEX_DEOXYS') + 1]  # HOENN_DEX_COUNT = HOENN_DEX_DEOXYS
    order = [nat[n[len('HOENN_DEX_'):]] for n in hoenn[1:]]
    if order[-2:] != [nat['JIRACHI'], nat['DEOXYS']] or len(order) != 202:
        raise SystemExit('derive-hoenn-gen3-dex: la Pokédex de Hoenn no tiene la forma esperada')
    required = order[:-2]
    if required[0] != 252 or required[-1] != 384:
        raise SystemExit('derive-hoenn-gen3-dex: inicio o final inesperados')
    out = ('// SPDX-License-Identifier: GPL-3.0-or-later\n'
           f'// Generado por scripts/derive-hoenn-gen3-dex.py desde pokeemerald@{REV}. No editar a mano.\n'
           '(function(root){const data={source:"https://github.com/pret/pokeemerald/blob/' + REV + '/src/pokedex.c",'
           'required:' + str(required).replace(' ', '') + '};\n'
           "if(typeof module==='object'&&module.exports)module.exports=data;else root.PokemonHoennGen3Dex=data;})(globalThis);\n")
    if '--check' in sys.argv:
        if OUT.read_text(encoding='utf-8') != out:
            raise SystemExit('derive-hoenn-gen3-dex: el fichero no coincide con la fuente')
        print('hoenn-gen3-dex.js coincide con la fuente fijada.')
        return
    OUT.write_text(out, encoding='utf-8')
    print(f'Escrito {OUT.name}: {len(required)} especies.')


if __name__ == '__main__':
    main()
