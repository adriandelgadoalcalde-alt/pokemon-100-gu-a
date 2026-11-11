#!/usr/bin/env bash
# Descarga las decompilaciones de pret en revisiones fijadas (solo código fuente; sin ROM).
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)/.cache/pret"
fetch(){ local name=$1 rev=$2 dir="$root/$1"
  if [ ! -d "$dir/.git" ]; then mkdir -p "$dir"; git -C "$dir" init -q; git -C "$dir" remote add origin "https://github.com/pret/$name.git"; fi
  git -C "$dir" fetch -q --depth 1 origin "$rev"; git -C "$dir" checkout -q --detach "$rev"
  test "$(git -C "$dir" rev-parse HEAD)" = "$rev"; }
fetch pokeemerald 731ad5bfd6e6f265508d0efcca0ba42f9dcf5881
fetch pokeruby 5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f
fetch pokefirered ce6406d8c2eaf46d543c8a2606de0c3cb1951982
fetch pokeheartgold 6bf138d6035aa6b43d6f8f4132a12df70f86dcec
fetch pokeplatinum 62bdaacdca6c56a6a396f3e9911e2f922b79bba8
fetch pokered 0dbf95cd12f5b1511c62ce69efe283000f780a8f
fetch pokeyellow b452f2ab07185075140061c5084ab866d5e4a794
fetch pokegold f2cde36f49b994c143bfd18582182302fdc76492
fetch pokecrystal 3c813b0b4d82b39bf62185aceffb76fd6026c70b
echo 'Decompilaciones pret fijadas en .cache/pret.'
