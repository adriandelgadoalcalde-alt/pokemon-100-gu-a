// SPDX-License-Identifier: GPL-3.0-or-later
using System.Buffers.Binary;
using System.Numerics;
using PKHeX.Core;

namespace Pokemon.LocalReader;

// RFC 1321 compatibility for the game's BDSP checksum. Not a security primitive.
// Browser WebCrypto does not provide MD5; the upstream provider is replaceable.
public sealed class BrowserMd5 : IMd5Provider
{
    private static readonly int[] Rotations = [7,12,17,22, 5,9,14,20, 4,11,16,23, 6,10,15,21];
    private static readonly uint[] Constants = Enumerable.Range(1,64)
        .Select(i => (uint)(Math.Abs(Math.Sin(i)) * 4294967296.0)).ToArray();

    public void HashData(ReadOnlySpan<byte> source, Span<byte> destination)
    {
        if (destination.Length < 16) throw new ArgumentException("Checksum destination is too short.");
        var length = checked(((source.Length + 8) / 64 + 1) * 64);
        var padded = new byte[length];
        source.CopyTo(padded);
        padded[source.Length] = 0x80;
        BinaryPrimitives.WriteUInt64LittleEndian(padded.AsSpan(length-8), (ulong)source.Length * 8);
        uint a0=0x67452301, b0=0xefcdab89, c0=0x98badcfe, d0=0x10325476;
        for (var offset=0; offset<length; offset+=64)
        {
            uint a=a0, b=b0, c=c0, d=d0;
            for (var i=0; i<64; i++)
            {
                uint f; int g;
                if (i<16) { f=(b&c)|(~b&d); g=i; }
                else if (i<32) { f=(d&b)|(~d&c); g=(5*i+1)%16; }
                else if (i<48) { f=b^c^d; g=(3*i+5)%16; }
                else { f=c^(b|~d); g=(7*i)%16; }
                var word=BinaryPrimitives.ReadUInt32LittleEndian(padded.AsSpan(offset+g*4));
                var next=unchecked(b+BitOperations.RotateLeft(unchecked(a+f+Constants[i]+word),Rotations[(i/16)*4+i%4]));
                a=d; d=c; c=b; b=next;
            }
            unchecked { a0+=a; b0+=b; c0+=c; d0+=d; }
        }
        BinaryPrimitives.WriteUInt32LittleEndian(destination,a0);
        BinaryPrimitives.WriteUInt32LittleEndian(destination[4..],b0);
        BinaryPrimitives.WriteUInt32LittleEndian(destination[8..],c0);
        BinaryPrimitives.WriteUInt32LittleEndian(destination[12..],d0);
    }
}
