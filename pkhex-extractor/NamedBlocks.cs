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
                    or SCTypeCode.Int64 => Convert.ToInt64(block.GetValue()),
                // Enteros de 64 bits sin signo (marcas de tiempo como KEnteredHallOfFame): se exportan si caben en Int64.
                SCTypeCode.UInt64 when (ulong)block.GetValue() <= long.MaxValue => (long)(ulong)block.GetValue(),
                _ => null,
            };
            if (value is not null)
                result[field.Name] = value;
        }
        return result;
    }

    // Leyendas Z-A: pares (clave u64, valor u64) de KEventWorkQuest (0xB9B223B9, quest_work) y de KEventWork
    // (0xFADA7742, system_work), en solo lectura. La clave es el FNV-1a 64 del nombre interno de la variable
    // (research/switch/za-quests.json); los nombres y su significado se resuelven fuera.
    public static SortedDictionary<string, object>? QuestWork9a(SaveFile save)
    {
        if (save is not SAV9ZA za)
            return null;
        var r = new SortedDictionary<string, object>(StringComparer.Ordinal);
        try
        {
            foreach (var (name, key) in new[] { ("questWork", 0xB9B223B9u), ("systemWork", 0xFADA7742u) })
            {
                var data = za.Blocks.GetBlock(key).Data;
                var pairs = new SortedDictionary<string, ulong>(StringComparer.Ordinal);
                for (int i = 0; i + 16 <= data.Length; i += 16)
                {
                    ulong k = System.Buffers.Binary.BinaryPrimitives.ReadUInt64LittleEndian(data[i..]);
                    if (k is 0 or 0xCBF29CE484222645)
                        continue;
                    pairs[k.ToString("X16")] = System.Buffers.Binary.BinaryPrimitives.ReadUInt64LittleEndian(data[(i + 8)..]);
                }
                r[name] = pairs;
            }
        }
        catch (Exception)
        {
            return r.Count == 0 ? null : r;
        }
        return r;
    }

    // Posición del jugador en Switch, con las clases de PKHeX (solo lectura). Se exporta en bruto: el nombre
    // interno del mapa (Leyendas), su hash (Let's Go, Espada/Escudo) o los bloques de Escarlata/Púrpura;
    // la traducción a lugares oficiales se hace fuera, con tablas documentadas.
    public static SortedDictionary<string, object>? Position(SaveFile save)
    {
        var r = new SortedDictionary<string, object>(StringComparer.Ordinal);
        try
        {
            switch (save)
            {
                case SAV8LA la:
                    r["map"] = la.Coordinates.M; r["x"] = la.Coordinates.X; r["y"] = la.Coordinates.Y; r["z"] = la.Coordinates.Z;
                    break;
                case SAV9ZA za:
                    r["map"] = za.Coordinates.Map; r["x"] = za.Coordinates.X; r["y"] = za.Coordinates.Y; r["z"] = za.Coordinates.Z;
                    break;
                case SAV8SWSH sw:
                    r["x"] = sw.Coordinates.X; r["y"] = sw.Coordinates.Y; r["z"] = sw.Coordinates.Z;
                    r["mapHash"] = sw.Coordinates.M.ToString("X16");
                    break;
                case SAV7b gg:
                    r["x"] = gg.Coordinates.X; r["y"] = gg.Coordinates.Y; r["z"] = gg.Coordinates.Z;
                    r["mapHash"] = gg.Coordinates.M.ToString("X16");
                    break;
                case SAV9SV sv:
                    // PlayerSave_LastRoomMapName, PlayerSave_CurrentLocationId y PlayerSave_LastSubField (SaveBlockAccessor9SV).
                    foreach (var (name, key) in new[] { ("lastRoomMapName", 0x9F1ABF26u), ("currentLocationId", 0x19FC5B7Bu), ("lastSubField", 0x37AF0454u) })
                    {
                        if (!sv.Blocks.TryGetBlock(key, out var block))
                            continue;
                        r[name] = block.Type switch
                        {
                            SCTypeCode.Bool1 => false,
                            SCTypeCode.Bool2 => true,
                            SCTypeCode.Byte or SCTypeCode.UInt16 or SCTypeCode.UInt32 or SCTypeCode.UInt64 or SCTypeCode.SByte
                                or SCTypeCode.Int16 or SCTypeCode.Int32 or SCTypeCode.Int64 => Convert.ToInt64(block.GetValue()),
                            _ => AsciiOrHex(block.Data),
                        };
                    }
                    break;
                default:
                    return null;
            }
        }
        catch (Exception)
        {
            // Un bloque ausente o más corto de lo esperado no debe impedir el diagnóstico.
        }
        return r.Count == 0 ? null : r;
    }

    private static string AsciiOrHex(ReadOnlySpan<byte> data)
    {
        var end = data.IndexOf((byte)0);
        var text = end >= 0 ? data[..end] : data;
        foreach (var b in text)
            if (b < 0x20 || b > 0x7E)
                return "hex:" + Convert.ToHexString(data[..Math.Min(data.Length, 64)]);
        return System.Text.Encoding.ASCII.GetString(text);
    }
    // Leyendas Arceus: estado de cada petición, bloque de 1 byte con clave FNV-1a 64 (32 bits bajos) de «sub_NNN»
    // (255 = completada; 0, 1, 10, 20 = sin empezar o en curso). Solo se exportan las claves que existen en la partida.
    public static SortedDictionary<string, int>? Requests8a(SaveFile save)
    {
        if (save is not SAV8LA la)
            return null;
        var r = new SortedDictionary<string, int>(StringComparer.Ordinal);
        for (int i = 1; i < 400; i++)
        {
            ulong h = 0xCBF29CE484222645;
            foreach (var c in $"sub_{i:000}") { h ^= (byte)c; h *= 0x100000001B3; }
            if (la.Blocks.TryGetBlock((uint)h, out var block) && block.Data.Length == 1)
                r[i.ToString("000")] = block.Data[0];
        }
        return r.Count == 0 ? null : r;
    }
}
