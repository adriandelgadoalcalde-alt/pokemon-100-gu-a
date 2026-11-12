"""Package the published static runtime for Pages; never includes saves or diagnoses."""
import hashlib
import json
import re
import shutil
import sys
import os
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[1]
published = Path(sys.argv[1]).resolve() / "wwwroot"
upstream = Path(sys.argv[2] if len(sys.argv)>2 else root / '.cache/pkhex').resolve()
revision = '96e33e7432d900e5345afdfd117eabfac43f5bbd'
if subprocess.check_output(['git','-C',str(upstream),'rev-parse','HEAD'],text=True).strip()!=revision:
    raise SystemExit('The upstream revision is not the pinned source.')
if subprocess.check_output(['git','-C',str(upstream),'status','--porcelain','--untracked-files=no'],text=True).strip():
    raise SystemExit('The upstream tracked source has changed.')
destination = root / "engine"
framework = published / "_framework"
if not framework.is_dir():
    raise SystemExit("Publish the browser project first.")
files = [p for p in framework.iterdir() if p.is_file() and p.suffix not in (".br", ".gz", ".pdb")]
logical_names = [re.sub(r'\.[a-z0-9]{10}\.(wasm|js|dat)$', r'.\1',p.name) for p in files]
if len(logical_names)!=len(set(logical_names)):
    raise SystemExit('Stale runtime assets detected. Publish to an empty directory.')
blazor = next(p.name for p in files if re.fullmatch(r"blazor\.webassembly\.[^.]+\.js", p.name))
dotnet = next(p.name for p in files if re.fullmatch(r"dotnet\.[^.]+\.js", p.name))
destination.mkdir(exist_ok=True)
shutil.copyfile(upstream / 'LICENSE', destination / 'COPYING-PKHeX.txt')
runtime_root = Path(os.environ.get('NUGET_PACKAGES',Path.home()/'.nuget/packages')) / 'microsoft.netcore.app.runtime.mono.browser-wasm'
# Avisos de licencia del runtime de WebAssembly instalado (la versión más reciente disponible).
candidates = sorted(runtime_root.iterdir(), key=lambda p: [int(x) for x in p.name.split('.') if x.isdigit()], reverse=True)
runtime = candidates[0]
print('Runtime de .NET para avisos de licencia:', runtime.name)
shutil.copyfile(runtime / 'LICENSE.TXT',destination / 'LICENSE-DOTNET.txt')
shutil.copyfile(runtime / 'THIRD-PARTY-NOTICES.TXT',destination / 'THIRD-PARTY-NOTICES-DOTNET.txt')
with (destination / 'PKHeX-corresponding-source.tar.gz').open('wb') as archive:
    subprocess.run(['git','-C',str(upstream),'archive','--format=tar.gz',revision,'PKHeX.Core','Directory.Build.props','LICENSE'],stdout=archive,check=True)
target = destination / "_framework"
if target.exists():
    shutil.rmtree(target)
target.mkdir()
for source in files:
    shutil.copyfile(source, target / source.name)
html = (root / "pkhex-browser/wwwroot/index.html").read_text()
html = html.replace("_framework/blazor.webassembly.js", "_framework/" + blazor)
html = html.replace("'_framework/dotnet.js'", "'_framework/" + dotnet + "'")
(destination / "index.html").write_text(html)
records = [{"file": p.name, "bytes": p.stat().st_size, "sha256": hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(target.iterdir())]
source_paths=['pkhex-extractor/Audit.cs','pkhex-extractor/ProgressSignals.cs','pkhex-browser/Pokemon.LocalReader.csproj','pkhex-browser/Program.cs','pkhex-browser/LocalAuditBridge.cs','pkhex-browser/BrowserMd5.cs','pkhex-browser/wwwroot/index.html']
source_records=[{"file": name, "sha256": hashlib.sha256((root/name).read_bytes()).hexdigest()} for name in source_paths]
(destination / "build.json").write_text(json.dumps({"engineCommit": revision, "project": "pkhex-browser/Pokemon.LocalReader.csproj", "sources":source_records, "assets": records}, indent=2) + "\n")
print(json.dumps({"assets": len(records), "bytes": sum(p["bytes"] for p in records)}))
