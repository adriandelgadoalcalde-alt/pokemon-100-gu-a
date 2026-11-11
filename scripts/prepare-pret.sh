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
echo 'Decompilaciones pret fijadas en .cache/pret.'
