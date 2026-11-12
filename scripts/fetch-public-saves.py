"""Fetch only pinned public test saves. Never accepts or uploads personal saves."""
import concurrent.futures
import hashlib
import io
import json
import os
from pathlib import Path, PurePosixPath
import re
import stat
import sys
import tempfile
import urllib.parse
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / 'research/saves/public-corpus.json'
MAX_ARCHIVE = 32 * 1024 * 1024
MAX_FILE = 16 * 1024 * 1024


def digest(data):
    return hashlib.sha256(data).hexdigest()


def validate_descriptor(sample):
    if not re.fullmatch(r'[a-z0-9-]{1,80}', sample['id']):
        raise ValueError('Invalid sample ID')
    if not re.fullmatch(r'[0-9a-f]{40}', sample['commit']):
        raise ValueError('Unpinned source')
    if not re.fullmatch(r'[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+', sample['repository']):
        raise ValueError('Invalid public repository')
    parsed = urllib.parse.urlparse(sample['download']['url'])
    prefix = '/' + sample['repository'] + '/' + sample['commit'] + '/'
    if parsed.scheme != 'https' or parsed.netloc != 'raw.githubusercontent.com' or not parsed.path.startswith(prefix) or parsed.query or parsed.fragment:
        raise ValueError('Source is not a pinned GitHub raw URL')
    for size, limit in [(sample['download']['bytes'], MAX_ARCHIVE), (sample['fileBytes'], MAX_FILE)]:
        if not isinstance(size, int) or not 0 < size <= limit:
            raise ValueError('File exceeds bounded size')
    for value in [sample['download']['sha256'], sample['fileSha256']]:
        if not re.fullmatch(r'[0-9a-f]{64}', value):
            raise ValueError('Invalid checksum')


def decode_archive(payload, descriptor):
    if len(payload) != descriptor['download']['bytes'] or digest(payload) != descriptor['download']['sha256']:
        raise ValueError('Download checksum mismatch')
    kind = descriptor['download']['kind']
    if kind == 'raw':
        result = payload
    elif kind == 'zip':
        member = descriptor['download']['member']
        parts = PurePosixPath(member)
        if parts.is_absolute() or '..' in parts.parts or '\\' in member:
            raise ValueError('Unsafe archive member')
        with zipfile.ZipFile(io.BytesIO(payload)) as archive:
            entries = [entry for entry in archive.infolist() if entry.filename == member]
            if len(entries) != 1:
                raise ValueError('Ambiguous archive member')
            entry = entries[0]
            if entry.is_dir() or stat.S_ISLNK(entry.external_attr >> 16) or entry.flag_bits & 1 or entry.file_size != descriptor['fileBytes']:
                raise ValueError('Unexpected archive entry')
            result = archive.read(entry)
    else:
        raise ValueError('Unsupported archive type')
    if len(result) != descriptor['fileBytes'] or digest(result) != descriptor['fileSha256']:
        raise ValueError('Save checksum mismatch')
    return result


def store_new(destination, payload, descriptor):
    if os.path.lexists(destination):
        if destination.is_symlink() or not destination.is_file() or destination.stat().st_size != descriptor['fileBytes'] or digest(destination.read_bytes()) != descriptor['fileSha256']:
            raise ValueError('Existing destination differs; never overwrite')
        return
    if len(payload) != descriptor['fileBytes'] or digest(payload) != descriptor['fileSha256']:
        raise ValueError('Unverified output payload')
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(dir=destination.parent, prefix='.public-save-', delete=False) as stream:
            temporary = Path(stream.name)
            stream.write(payload)
            stream.flush()
            os.fsync(stream.fileno())
        os.chmod(temporary, 0o400)
        os.link(temporary, destination)  # Atomic and refuses replacement.
    finally:
        if temporary is not None:
            if temporary.exists():
                os.chmod(temporary, 0o600)  # Windows no permite borrar un archivo de solo lectura.
            temporary.unlink(missing_ok=True)


def fetch_one(sample, folder):
    validate_descriptor(sample)
    destination = folder / (sample['id'] + '.sav')
    if os.path.lexists(destination):
        store_new(destination, b'', sample)
        return
    with urllib.request.urlopen(sample['download']['url'], timeout=40) as response:
        if urllib.parse.urlparse(response.url).hostname != 'raw.githubusercontent.com':
            raise ValueError('Unexpected redirect destination')
        payload = response.read(sample['download']['bytes'] + 1)
    store_new(destination, decode_archive(payload, sample), sample)


def main():
    destination = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / 'fixtures/private/public-corpus'
    destination = destination.resolve() / 'files'
    destination.mkdir(parents=True, exist_ok=True)
    samples = json.loads(MANIFEST.read_text())['samples']
    if len({s['id'] for s in samples}) != len(samples):
        raise ValueError('Duplicate sample ID')
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        list(pool.map(lambda sample: fetch_one(sample, destination), samples))
    print(f'Guardados públicos fijados y comprobados: {len(samples)}. Sin subir ni sobrescribir archivos.')


if __name__ == '__main__':
    try:
        main()
    except Exception as error:
        print('No se pudo preparar el corpus público: ' + type(error).__name__, file=sys.stderr)
        sys.exit(1)
