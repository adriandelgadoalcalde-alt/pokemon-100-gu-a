// SPDX-License-Identifier: GPL-3.0-or-later
using PKHeX.Core;

namespace Pokemon.SaveAudit;

// Semantic names are documented in the pinned upstream accessor. These are
// documented signals, not certification from a controlled natural before/after pair.
public static class ProgressSignals
{
    private const string Source = "https://github.com/kwsch/PKHeX/blob/96e33e7432d900e5345afdfd117eabfac43f5bbd/PKHeX.Core/Saves/Access/SaveBlockAccessor9SV.cs";
    public static bool? DecodeBooleanType(SCTypeCode? type) => type switch
    {
        SCTypeCode.Bool1 => false,
        SCTypeCode.Bool2 => true,
        _ => null,
    };

    public static object[] Read(SaveFile save)
    {
        if (save is not SAV9SV sv) return [];
        (uint Key, string Id, string Label, string ScriptName)[] definitions =
        [
            (0x92CE2CF6, "story.paldea.clear", "Indicador de final de Paldea", "FSYS_SCENARIO_GAME_CLEAR"),
            (0x0DDBBC62, "story.tealMask.clear", "Indicador de final de La máscara turquesa", "FSYS_SCENARIO_GAME_CLEAR_SU1"),
            (0x0DDBBAAF, "story.indigoDisk.clear", "Indicador de final de El disco índigo", "FSYS_SCENARIO_GAME_CLEAR_SU2"),
            (0xF0D246CC, "pokedex.paldea.diplomaAvailable", "Diploma de Paldea disponible", "FSYS_POKEDEX_SYOUJOU_ENABLE"),
            (0xF7900D11, "pokedex.paldea.diplomaClaimed", "Indicador de diploma de Paldea recibido", "FSYS_POKEDEX_SYOUJOU_EVENT"),
        ];
        return definitions.Select(d =>
        {
            bool found = sv.Blocks.TryGetBlock(d.Key, out var block);
            return (object)new { id = d.Id, label = d.Label,
                value = DecodeBooleanType(found ? block!.Type : null), validation = "documented",
                source = new { url = Source, engineCommit = Audit.EngineCommit, blockKey = $"0x{d.Key:X8}", scriptName = d.ScriptName },
                limitation = "Interpretación documentada en upstream; pendiente de contraste natural controlado. Un bloque ausente o de otro tipo no se interpreta como falso." };
        }).ToArray();
    }
}
