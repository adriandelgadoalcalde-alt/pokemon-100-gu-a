#!/usr/bin/env python3
"""Genera src/saves/<pack>-data.js desde research/events/<pack>.json y decompilaciones fijadas.

Cada bandera o variable citada se resuelve en la cabecera de su edición y debe tener
al menos un sitio que la escriba (scripts o código), fuera de depuración. No usa ROM
ni partidas. Uso: python3 -I scripts/derive-event-pack.py <pack> [--check]
"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRET = ROOT / '.cache' / 'pret'
FLAG_SET = r'(?:SetFlag|setflag|FlagSet|SetScriptFlag|setevent|SetEvent|SetEventFlag|VarsFlags_SetFlag|SetEventReuseHL|SetEventReuseA|SetEventAfterBranchReuseHL|SetEvents|trainer)'
VAR_SET = r'(?:SetVar|setvar|VarSet|SetScriptVar|AddVar|addvar|CopyVar|TrySetVarToValue|VarsFlags_SetVar|SetSystemVar)'


def fail(message):
    raise SystemExit('derive-event-pack: ' + message)


def check_revision(repo, rev):
    head = subprocess.run(['git', '-C', str(PRET / repo), 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
    if head != rev:
        fail(f'{repo} está en {head or "ninguna revisión"}; se espera {rev}. Ejecuta scripts/prepare-pret.sh')


def c_defines(repo):
    table = {}
    for path in sorted((PRET / repo / 'include' / 'constants').rglob('*.h')):
        text = re.sub(r'/\*.*?\*/', '', path.read_text(encoding='utf-8', errors='replace'), flags=re.S)
        for line in text.splitlines():
            match = re.match(r'\s*#define\s+([A-Za-z_][A-Za-z0-9_]*)\s+(.+?)\s*$', line.split('//')[0])
            if match:
                table.setdefault(match.group(1), match.group(2))
    return table


def gb_constants(repo, relative):
    """const_def / const / const_skip / const_next de las decompilaciones de Game Boy."""
    table, counter, step = {}, 0, 1
    def number(text):
        expr = re.sub(r'\$([0-9A-Fa-f]+)', lambda m: str(int(m.group(1), 16)), text)
        if not re.fullmatch(r'[\d\s+\-*()]+', expr):
            fail('expresión no admitida en ' + relative + ': ' + text)
        return int(eval(expr, {'__builtins__': {}}))
    for raw in (PRET / repo / relative).read_text(encoding='utf-8').splitlines():
        line = raw.split(';')[0].strip()
        parts = line.split(None, 1)
        if not parts:
            continue
        args = [a.strip() for a in parts[1].split(',')] if len(parts) > 1 else []
        parts = [parts[0], *args]
        if parts[0] == 'const_def':
            counter = number(parts[1]) if len(parts) > 1 else 0
            step = number(parts[2]) if len(parts) > 2 else 1
        elif parts[0] == 'const':
            table[parts[1]] = str(counter)
            counter += step
        elif parts[0] == 'const_skip':
            counter += (number(parts[1]) if len(parts) > 1 else 1) * step
        elif parts[0] == 'const_next':
            target = number(parts[1])
            if target < counter:
                fail(f'const_next retrocede en {relative}')
            counter = target
    return table


def enum_list(repo, relative):
    """Lista enumerada (una entrada por línea, opcionalmente NOMBRE = EXPRESIÓN), como un enum de C."""
    table, counter = {}, 0
    for raw in (PRET / repo / relative).read_text(encoding='utf-8').splitlines():
        line = raw.split('//')[0].strip().rstrip(',')
        if not line:
            continue
        if '=' in line:
            name, expr = [x.strip() for x in line.split('=', 1)]
            table[name] = expr
            value = evaluate(name, table)
            if value is None:
                fail(f'no se puede evaluar {name} en {relative}')
        else:
            name, value = line, counter
        table[name] = str(value)
        counter = value + 1
    return table


def evaluate(name, table, stack=()):
    if name in stack or name not in table:
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
        expr = re.sub(r'0[xX][0-9A-Fa-f]+|[A-Za-z_][A-Za-z0-9_]*|\d+', replace, table[name])
    except KeyError:
        return None
    if not re.fullmatch(r'[\d\s+\-*/%()<>|&]+', expr):
        return None
    return int(eval(expr.replace('/', '//'), {'__builtins__': {}}))


def sites(repo, name, verb):
    pattern = re.compile(verb + r'\b[\s(]*(?:\w+,\s*)?' + re.escape(name) + r'\b')
    found = []
    base = PRET / repo
    for folder in ('data', 'files', 'src', 'asm', 'engine', 'maps', 'scripts', 'res'):
        root = base / folder
        if not root.exists():
            continue
        for path in root.rglob('*'):
            if path.suffix not in ('.s', '.inc', '.c', '.asm', '.pory') or 'debug' in str(path).lower():
                continue
            text = path.read_text(encoding='utf-8', errors='replace')
            if name not in text:
                continue
            for number, line in enumerate(text.splitlines(), 1):
                if pattern.search(line):
                    found.append(f'{path.relative_to(base)}:{number}')
                    if len(found) >= 3:
                        return found
    return found


def collect(spec, family):
    flags, variables = set(), set()
    def take(c):
        if c.get('flag'):
            flags.add(c['flag'])
        flags.update(c.get('flags', []))
        if c.get('var'):
            variables.add(c['var'])
    for row in spec['story'].get(family, []):
        take(row)
    for entry in spec['secrets']:
        cond = entry.get('conditions', {}).get(family)
        if not cond:
            continue
        for key in ('done', 'doneAlso'):
            if cond.get(key):
                flags.add(cond[key])
        flags.update(cond.get('doneAll', []))
        flags.update(cond.get('doneAny', []))
        flags.update(cond.get('lost', []))
        if cond.get('doneVar'):
            take(cond['doneVar'])
        for p in [*cond.get('progress', []), *cond.get('lostVar', [])]:
            take(p)
    return flags, variables


def build(pack):
    spec = json.loads((ROOT / 'research' / 'events' / f'{pack}.json').read_text())
    families = {}
    for family, source in spec['repos'].items():
        if source['kind'] == 'pkhexblocks':
            pkhex = ROOT / '.cache' / 'pkhex'
            head = subprocess.run(['git', '-C', str(pkhex), 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()
            if head != source['rev']:
                fail('PKHeX no está en la revisión fijada; ejecuta scripts/prepare-pkhex.sh')
            text = (pkhex / source['file']).read_text(encoding='utf-8')
            names, where = set(), {}
            for row in spec['story'].get(family, []):
                names.update(x[6:] for x in [row.get('flag', ''), *row.get('anyFlags', [])] if x.startswith('block:'))
            for entry in spec['secrets']:
                cond = entry.get('conditions', {}).get(family) or {}
                for x in [cond.get('done'), cond.get('doneAlso'), *cond.get('doneAll', []), *cond.get('doneAny', []), *cond.get('lost', [])] + [p.get('flag') for p in cond.get('progress', [])]:
                    if x and x.startswith('block:'):
                        names.add(x[6:])
            for name in sorted(names):
                if not re.search(r'const uint ' + re.escape(name) + r'\b', text):
                    fail(f'{name} no existe en {source["file"]}')
                where['block:' + name] = [source['file']]
            families[family] = {'flags': {}, 'vars': {}, 'sources': where}
            continue
        check_revision(source['repo'], source['rev'])
        table = c_defines(source['repo'])
        if source['kind'] == 'enumlist':
            table.update(enum_list(source['repo'], source['list']))
        elif source['kind'] == 'gbasm':
            table = gb_constants(source['repo'], source['list'])
        elif source['kind'] != 'c':
            fail('tipo de fuente no admitido: ' + source['kind'])
        def named(cond):
            if 'equalsName' in cond:
                value = evaluate(cond['equalsName'], table)
                if value is None:
                    fail(f"constante {cond['equalsName']} desconocida en {source['repo']}")
                cond['equals'] = value
        wanted_flags, wanted_vars = collect(spec, family)
        flags, variables, where = {}, {}, {}
        for name in sorted(wanted_flags):
            value = evaluate(name, table)
            if value is None:
                fail(f'{name} no existe en {source["repo"]}')
            found = sites(source['repo'], name, FLAG_SET)
            if not found:
                fail(f'{name} no se activa en ningún sitio de {source["repo"]}')
            flags[name], where[name] = value, found
        for name in sorted(wanted_vars):
            value = evaluate(name, table)
            if source['kind'] == 'gbasm':
                fail('las variables no se admiten en Game Boy: ' + name)
            if value is None or value < 0x4000:
                fail(f'{name} no es una variable guardada de {source["repo"]}')
            found = sites(source['repo'], name, VAR_SET)
            if not found:
                fail(f'{name} no se escribe en ningún sitio de {source["repo"]}')
            variables[name], where[name] = value - 0x4000, found
        for row in spec['story'].get(family, []):
            named(row)
        for entry in spec['secrets']:
            cond = entry.get('conditions', {}).get(family)
            if cond:
                for c in [cond.get('doneVar') or {}, *cond.get('progress', []), *cond.get('lostVar', [])]:
                    named(c)
        families[family] = {'flags': flags, 'vars': variables, 'sources': where}
    data = {'pack': pack, 'confidence': spec.get('confidence', 'documentado en código'),
            'excludeLanguages': spec.get('excludeLanguages', []), 'excludeReason': spec.get('excludeReason', ''),
            'revisions': {s.get('repo', 'PKHeX'): s['rev'] for s in spec['repos'].values()},
            'gameFamilies': spec['families'], 'families': families, 'story': spec['story'], 'secrets': spec['secrets']}
    body = json.dumps(data, ensure_ascii=False, separators=(',', ':'), sort_keys=True)
    return ('// SPDX-License-Identifier: GPL-3.0-or-later\n'
            f'// Generado por scripts/derive-event-pack.py {pack}. No editar a mano.\n'
            '(function(root){const data=' + body + ';\n'
            "if(typeof module==='object'&&module.exports)module.exports=data;"
            'else(root.PokemonEventPacks=root.PokemonEventPacks||[]).push(data);})(globalThis);\n')


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if len(args) != 1:
        fail('indica el paquete, por ejemplo gen4')
    pack = args[0]
    out = ROOT / 'src' / 'saves' / f'{pack}-data.js'
    output = build(pack)
    if '--check' in sys.argv:
        if not out.exists() or out.read_text(encoding='utf-8') != output:
            fail(f'{out.relative_to(ROOT)} no coincide con las fuentes; vuelve a generarlo')
        print(f'{out.name} coincide con las fuentes fijadas.')
        return
    out.write_text(output, encoding='utf-8')
    print(f'Escrito {out.relative_to(ROOT)} ({len(output)} bytes).')


if __name__ == '__main__':
    main()
