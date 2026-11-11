// SPDX-License-Identifier: GPL-3.0-or-later
using System.Reflection;
using PKHeX.Core;

namespace Pokemon.SaveAudit;

// Exporta, por el nombre de su constante en el accesor fijado de PKHeX, los bloques
// de Switch que son booleanos o enteros escalares. Solo lectura: no se crea ni se
// modifica ningún bloque. Los nombres son los de upstream; su significado narrativo
// se documenta aparte y no se certifica automáticamente.
public static class NamedBlocks
{
    public static SortedDictionary<string, object>? Read(SaveFile save)
    {
        (SCBlockAccessor? accessor, Type? type) = save switch
        {
            SAV8SWSH s => ((SCBlockAccessor)s.Blocks, typeof(SaveBlockAccessor8SWSH)),
            SAV8LA s => (s.Blocks, typeof(SaveBlockAccessor8LA)),
            SAV9SV s => (s.Blocks, typeof(SaveBlockAccessor9SV)),
            SAV9ZA s => (s.Blocks, typeof(SaveBlockAccessor9ZA)),
            _ => (null, null),
        };
        if (accessor is null || type is null)
            return null;
        var result = new SortedDictionary<string, object>(StringComparer.Ordinal);
        const BindingFlags flags = BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic;
        foreach (var field in type.GetFields(flags))
        {
            if (!field.IsLiteral || field.FieldType != typeof(uint) || !field.Name.StartsWith('K'))
                continue;
            var key = (uint)field.GetRawConstantValue()!;
            if (!accessor.TryGetBlock(key, out var block))
                continue;
            object? value = block.Type switch
            {
                SCTypeCode.Bool1 => false,
                SCTypeCode.Bool2 => true,
                SCTypeCode.Byte or SCTypeCode.UInt16 or SCTypeCode.UInt32 or SCTypeCode.SByte or SCTypeCode.Int16 or SCTypeCode.Int32
                    => Convert.ToInt64(block.GetValue()),
                _ => null,
            };
            if (value is not null)
                result[field.Name] = value;
        }
        return result;
    }
}
