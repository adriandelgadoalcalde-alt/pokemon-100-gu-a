#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Compila ooz.dll (descompresor abierto de Kraken/Oodle de Powzix, GPL-3.0) para Windows con mingw-w64.
# Fuente: https://github.com/powzix/ooz @ 05038060aa68f9187ae9923b2388ca8db40e58d1
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"; src="${1:?ruta al clon de powzix/ooz}"; stubs="$(mktemp -d)"
: > "$stubs/SDKDDKVer.h"; echo '#include <windows.h>' > "$stubs/Windows.h"
x86_64-w64-mingw32-g++ -O2 -static -fpermissive -w -msse4.1 -I"$stubs" -include sys/stat.h -shared -Dmain=ooz_cli_main \
  -o "$here/ooz.dll" "$src/kraken.cpp" "$src/bitknit.cpp" "$src/lzna.cpp" "$here/ooz_export.cpp"
x86_64-w64-mingw32-strip "$here/ooz.dll"; gzip -9 -f "$here/ooz.dll"
