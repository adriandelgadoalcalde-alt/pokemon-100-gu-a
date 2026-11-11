#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Extrae de una copia propia de Negro 2/Blanco 2 el índice del nombre de lugar de cada zona.

Lee en solo lectura el NARC a/0/1/2 (cabeceras de zona, 48 bytes cada una) y escribe
research/gen5/b2w2-zones.json con el byte 0x1A de cada cabecera. No guarda nada más de la ROM.
Uso: python3 -I scripts/extract-gen5-zones.py <rom.nds> "<nombre del juego>"
"""
import hashlib
import json
import struct
import sys
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'research' / 'gen5' / 'b2w2-zones.json'


def nitro_file(rom, wanted):
    with open(rom, 'rb') as f:
        def rd(offset, size):
            f.seek(offset)
            return f.read(size)
        fnt_off, fnt_len, fat_off, _ = struct.unpack('<IIII', rd(0x40, 16))
        fnt = rd(fnt_off, fnt_len)

        def walk(dir_id, prefix, found):
            sub_off, first, _ = struct.unpack('<IHH', fnt[(dir_id & 0xFFF) * 8:(dir_id & 0xFFF) * 8 + 8])
            p, fid = sub_off, first
            while fnt[p]:
                kind = fnt[p]
                name = fnt[p + 1:p + 1 + (kind & 0x7F)].decode('latin1')
                p += 1 + (kind & 0x7F)
                if kind & 0x80:
                    walk(struct.unpack('<H', fnt[p:p + 2])[0], prefix + name + '/', found)
                    p += 2
                else:
                    found[prefix + name] = fid
                    fid += 1
            return found
        fid = walk(0xF000, '', {})[wanted]
        start, end = struct.unpack('<II', rd(fat_off + fid * 8, 8))
        return rd(start, end - start)


def narc_members(data):
    if data[:4] != b'NARC' or data[0x10:0x14] != b'BTAF':
        raise SystemExit('extract-gen5-zones: a/0/1/2 no es un NARC')
    size, count = struct.unpack('<IH', data[0x14:0x1A])
    entries = [struct.unpack('<II', data[0x1C + i * 8:0x24 + i * 8]) for i in range(count)]
    p = 0x10 + size
    p += struct.unpack('<I', data[p + 4:p + 8])[0]
    if data[p:p + 4] != b'GMIF':
        raise SystemExit('extract-gen5-zones: falta GMIF')
    return [data[p + 8 + a:p + 8 + b] for a, b in entries]


def main():
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    zones = narc_members(nitro_file(sys.argv[1], 'a/0/1/2'))[0]
    if len(zones) % 48:
        raise SystemExit('extract-gen5-zones: tamaño de cabeceras inesperado')
    head = {'game': sys.argv[2], 'narc': 'a/0/1/2', 'entrySize': 48, 'nameOffset': 26, 'count': len(zones) // 48,
            'sha256': hashlib.sha256(zones).hexdigest(),
            'note': 'Índice del nombre de lugar (byte 0x1A) de cada cabecera de zona. Extraído de una copia propia del juego con scripts/extract-gen5-zones.py; no se guarda ningún otro byte de la ROM.'}
    names = [zones[i * 48 + 26] for i in range(len(zones) // 48)]
    OUT.write_text(json.dumps(head, ensure_ascii=False, indent=1)[:-2] + ',\n "names": ' + json.dumps(names, separators=(',', ':')) + '\n}\n', encoding='utf-8', newline='\n')
    print(f'Escrito {OUT.name}: {len(names)} zonas.')


if __name__ == '__main__':
    main()
