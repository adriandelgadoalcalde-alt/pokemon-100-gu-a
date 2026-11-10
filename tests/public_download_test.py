"""Bounded archive and no-overwrite tests, entirely synthetic and offline."""
import importlib.util
import io
import hashlib
from pathlib import Path
import tempfile
import unittest
import zipfile

spec = importlib.util.spec_from_file_location('public_fetch', Path(__file__).resolve().parents[1] / 'scripts/fetch-public-saves.py')
f = importlib.util.module_from_spec(spec)
spec.loader.exec_module(f)


def descriptor(payload, content, member='main'):
    return {'download': {'bytes': len(payload), 'sha256': f.digest(payload), 'kind': 'zip', 'member': member},
            'fileBytes': len(content), 'fileSha256': f.digest(content)}


class PublicDownloadTest(unittest.TestCase):
    def test_valid_member_is_read_without_extracting_other_paths(self):
        buffer = io.BytesIO()
        with zipfile.ZipFile(buffer, 'w') as z:
            z.writestr('folder/main', b'synthetic')
            z.writestr('../unrelated', b'never extracted')
        data = buffer.getvalue()
        self.assertEqual(f.decode_archive(data, descriptor(data, b'synthetic', 'folder/main')), b'synthetic')

    def test_wrong_hash_traversal_and_duplicate_members_are_rejected(self):
        buffer = io.BytesIO()
        with zipfile.ZipFile(buffer, 'w') as z:
            z.writestr('../main', b'synthetic')
        data = buffer.getvalue()
        with self.assertRaises(ValueError):
            f.decode_archive(data, descriptor(data, b'synthetic', '../main'))
        d = descriptor(data, b'synthetic', '../main')
        d['download']['sha256'] = '0' * 64
        with self.assertRaises(ValueError):
            f.decode_archive(data, d)
        buffer = io.BytesIO()
        with zipfile.ZipFile(buffer, 'w') as z:
            z.writestr('main', b'a')
            z.writestr('main', b'b')
        data = buffer.getvalue()
        with self.assertRaises(ValueError):
            f.decode_archive(data, descriptor(data, b'a'))

    def test_existing_file_and_symlink_are_not_overwritten(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            destination = root / 'sample.sav'
            d = {'fileBytes': 9, 'fileSha256': f.digest(b'synthetic')}
            f.store_new(destination, b'synthetic', d)
            f.store_new(destination, b'', d)  # Reuse only the exact pinned bytes.
            with self.assertRaises(ValueError):
                f.store_new(destination, b'other', {'fileBytes': 5, 'fileSha256': f.digest(b'other')})
            self.assertEqual(destination.read_bytes(), b'synthetic')
            alias = root / 'alias.sav'
            alias.symlink_to(destination)
            with self.assertRaises(ValueError):
                f.store_new(alias, b'synthetic', d)
            with self.assertRaises(ValueError):
                f.store_new(root / 'unverified.sav', b'bad', d)


if __name__ == '__main__':
    unittest.main()
