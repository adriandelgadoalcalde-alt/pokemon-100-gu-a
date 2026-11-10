#!/usr/bin/env bash
set -euo pipefail
task_root="$(cd "$(dirname "$0")/.." && pwd)"
source_dir="$task_root/.cache/pkhex"
revision='96e33e7432d900e5345afdfd117eabfac43f5bbd'
if [ ! -d "$source_dir/.git" ]; then
  mkdir -p "$source_dir"
  git -C "$source_dir" init
  git -C "$source_dir" remote add origin https://github.com/kwsch/PKHeX.git
fi
git -C "$source_dir" fetch --depth 1 origin "$revision"
git -C "$source_dir" checkout --detach "$revision"
test "$(git -C "$source_dir" rev-parse HEAD)" = "$revision"
printf '%s\n' 'Fuente de PKHeX fijada y disponible para compilación local.'
