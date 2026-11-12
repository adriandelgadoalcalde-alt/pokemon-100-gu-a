// SPDX-License-Identifier: GPL-3.0-or-later
// Envoltorio mínimo: exporta el descompresor abierto de ooz (Powzix, GPL-3.0) para usarlo desde Python (ctypes).
#include <stddef.h>
typedef unsigned char byte;
int Kraken_Decompress(const byte *src, size_t src_len, byte *dst, size_t dst_len);
extern "C" __declspec(dllexport) int ooz_decompress(const byte *src, size_t src_len, byte *dst, size_t dst_len) {
  return Kraken_Decompress(src, src_len, dst, dst_len);
}
