#!/usr/bin/env bash
set -euo pipefail
task_root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$task_root"
source_dir="${PKHEX_SOURCE:-$task_root/.cache/pkhex}"
if [ ! -d "$source_dir/.git" ]; then bash scripts/prepare-pkhex.sh; fi
mkdir -p .cache
publish_dir="$(mktemp -d "$task_root/.cache/browser-publish-XXXXXX")"
trap 'rm -rf "$publish_dir"' EXIT
"${POKEMON_DOTNET:-dotnet}" publish pkhex-browser/Pokemon.LocalReader.csproj -c Release -o "$publish_dir" -p:PKHeXSource="$source_dir" --nologo
python3 scripts/package-browser-engine.py "$publish_dir" "$source_dir"
