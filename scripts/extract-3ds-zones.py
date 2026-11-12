#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-3.0-or-later
"""Extrae de una copia propia (sin cifrar) de un juego de 3DS el índice del nombre de lugar de cada zona.

Solo lectura: RomFS -> GARC -> miembro con las cabeceras de zona. Guarda únicamente el campo del
nombre de lugar de cada zona, nunca otros bytes del juego.
  xy:   a/0/1/2, miembro 360, 56 bytes por zona (360 zonas); 9 bits bajos del u16 en 0x1C
  oras: a/0/1/3, miembro 536, 56 bytes por zona (536 zonas); 9 bits bajos del u16 en 0x1C
  sm, usum: a/0/7/7 (GARC «zonedata»), miembro 0 comprimido con LZ11, 0x54 bytes por zona; int32 en 0x1C
        («ParentMap», índice de la lista de lugares; ZoneData7 de pk3DS)
Uso: python3 -I scripts/extract-3ds-zones.py <xy|oras|sm|usum> <rom.3ds> "<nombre del juego>" [salida.json]
"""
import hashlib
import json
import struct
import sys
from pathlib import Path

# juego: (GARC, miembro, zonas esperadas o None, tamaño de registro, campo, máscara, LZ11)
LAYOUTS = {'xy': ('a/0/1/2', 360, 360, 56, 0x1C, 0x1FF, False), 'oras': ('a/0/1/3', 536, 536, 56, 0x1C, 0x1FF, False),
           'sm': ('a/0/7/7', 0, None, 0x54, 0x1C, 0xFFFF, True), 'usum': ('a/0/7/7', 0, None, 0x54, 0x1C, 0xFFFF, True)}


def lz11(b):
    if b[0] != 0x11:
        raise SystemExit('extract-3ds-zones: el miembro no está en LZ11')
    size, p, out = int.from_bytes(b[1:4], 'little'), 4, bytearray()
    if size == 0:
        size, p = int.from_bytes(b[4:8], 'little'), 8
    while len(out) < size:
        flags = b[p]
        p += 1
        for bit in range(7, -1, -1):
            if len(out) >= size:
                break
            if not flags >> bit & 1:
                out.append(b[p])
                p += 1
                continue
            kind = b[p] >> 4
            if kind == 0:
                length, disp = (((b[p] & 0xF) << 4) | (b[p + 1] >> 4)) + 0x11, (((b[p + 1] & 0xF) << 8) | b[p + 2]) + 1
                p += 3
            elif kind == 1:
                length = (((b[p] & 0xF) << 12) | (b[p + 1] << 4) | (b[p + 2] >> 4)) + 0x111
                disp = (((b[p + 2] & 0xF) << 8) | b[p + 3]) + 1
                p += 4
            else:
                length, disp = kind + 1, (((b[p] & 0xF) << 8) | b[p + 1]) + 1
                p += 2
            for _ in range(length):
                out.append(out[-disp])
    return bytes(out)


class Rom:
    def __init__(self, path):
        self.f = open(path, 'rb')
        part, _ = struct.unpack('<II', self.rd(0x120, 8))
        base = part * 0x200
        if self.rd(base + 0x100, 4) != b'NCCH' or not self.rd(base + 0x188, 8)[7] & 4:
            raise SystemExit('extract-3ds-zones: la partición no es NCCH sin cifrar')
        romfs = struct.unpack('<I', self.rd(base + 0x1B0, 4))[0] * 0x200 + base
        if self.rd(romfs, 4) != b'IVFC':
            raise SystemExit('extract-3ds-zones: RomFS no encontrada')
        master = struct.unpack('<I', self.rd(romfs + 8, 4))[0]
        block = 1 << struct.unpack('<I', self.rd(romfs + 0x4C, 4))[0]
        l3 = romfs + ((0x60 + master + block - 1) & ~(block - 1))
        h = struct.unpack('<10I', self.rd(l3, 40))
        self.dirs, self.meta, self.data, self.files = self.rd(l3 + h[3], h[4]), self.rd(l3 + h[7], h[8]), l3 + h[9], {}
        self.walk(0, '')

    def rd(self, offset, size):
        self.f.seek(offset)
        return self.f.read(size)

    def walk(self, d, prefix):
        _, _, child, fil, _, _ = struct.unpack('<6I', self.dirs[d:d + 24])
        while child != 0xFFFFFFFF:
            size = struct.unpack('<I', self.dirs[child + 20:child + 24])[0]
            self.walk(child, prefix + self.dirs[child + 24:child + 24 + size].decode('utf-16-le') + '/')
            child = struct.unpack('<I', self.dirs[child + 4:child + 8])[0]
        while fil != 0xFFFFFFFF:
            _, sibling, offset, size, _, length = struct.unpack('<IIQQII', self.meta[fil:fil + 32])
            self.files[prefix + self.meta[fil + 32:fil + 32 + length].decode('utf-16-le')] = (self.data + offset, size)
            fil = sibling

    def get(self, name):
        return self.rd(*self.files[name])


def garc(b):
    if b[:4] != b'CRAG':
        raise SystemExit('extract-3ds-zones: no es un GARC')
    header, data = struct.unpack('<I', b[4:8])[0], struct.unpack('<I', b[0x10:0x14])[0]
    p = header + struct.unpack('<I', b[header + 4:header + 8])[0]
    count, q, members = struct.unpack('<I', b[p + 8:p + 12])[0], p + 12, []
    for _ in range(count):
        bits = struct.unpack('<I', b[q:q + 4])[0]
        q += 4
        sub = []
        for k in range(32):
            if bits >> k & 1:
                start, end, _ = struct.unpack('<III', b[q:q + 12])
                q += 12
                sub.append(b[data + start:data + end])
        members.append(sub)
    return members


def main():
    if len(sys.argv) not in (4, 5) or sys.argv[1] not in LAYOUTS:
        raise SystemExit(__doc__)
    path, member, expected, size, field, mask, packed = LAYOUTS[sys.argv[1]]
    zones = garc(Rom(sys.argv[2]).get(path))[member][0]
    if packed:
        zones = lz11(zones)
    count = len(zones) // size
    if len(zones) % size or (expected is not None and count != expected):
        raise SystemExit(f'extract-3ds-zones: {len(zones)} bytes no encajan con registros de {size}')
    names = [struct.unpack('<H', zones[i * size + field:i * size + field + 2])[0] & mask for i in range(count)]
    head = {'game': sys.argv[3], 'garc': path, 'member': member, 'entrySize': size, 'nameField': field, 'nameMask': mask,
            'count': count, 'sha256': hashlib.sha256(zones).hexdigest(),
            'note': 'Índice del nombre de lugar de cada cabecera de zona. Extraído de una copia propia del juego con scripts/extract-3ds-zones.py; no se guarda ningún otro byte del juego.'}
    out = Path(sys.argv[4]) if len(sys.argv) == 5 else Path(__file__).resolve().parent.parent / 'research' / ('gen7' if sys.argv[1] in ('sm', 'usum') else 'gen6') / f'{sys.argv[1]}-zones.json'
    out.write_text(json.dumps(head, ensure_ascii=False, indent=1)[:-2] + ',\n "names": ' + json.dumps(names, separators=(',', ':')) + '\n}\n', encoding='utf-8', newline='\n')
    print(f'Escrito {out.name}: {len(names)} zonas.')


if __name__ == '__main__':
    main()
