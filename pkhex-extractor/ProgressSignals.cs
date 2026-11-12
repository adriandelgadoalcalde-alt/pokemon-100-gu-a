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
        if (save is SAV3 gba) return ReadGba(gba);
        if (save is not SAV9SV sv) return [];
        (uint Key, string Id, string Label, string ScriptName)[] definitions =
        [
            (0x92CE2CF6, "story.paldea.clear", "Indicador de final de Paldea", "FSYS_SCENARIO_GAME_CLEAR"),
            (0x0DDBBC62, "story.tealMask.clear", "Indicador de final de La máscara turquesa", "FSYS_SCENARIO_GAME_CLEAR_SU1"),
            (0x0DDBBAAF, "story.indigoDisk.clear", "Indicador de final de El disco índigo", "FSYS_SCENARIO_GAME_CLEAR_SU2"),
            (0xF0D246CC, "pokedex.paldea.diplomaAvailable", "Diploma de Paldea disponible", "FSYS_POKEDEX_SYOUJOU_ENABLE"),
            (0xF7900D11, "pokedex.paldea.diplomaClaimed", "Indicador de diploma de Paldea recibido", "FSYS_POKEDEX_SYOUJOU_EVENT"),
            (0x17AD6C82, "dlc.ogreOustin.hardCleared", "Ogre Oustin' superado en difícil", "OniballoonSave_isCleardHard"),
            // Nombres sacados de las constantes de los scripts Lua de la ROM (script/lua/bin/release/main); la clave del
            // bloque es la mitad baja del FNV-1a de 64 bits del nombre, igual que las de SaveBlockAccessor9SV.
            (0x370AAED3, "dlc.flyingTrial.elementary", "Vuelo contrarreloj de Amarys: nivel básico", "FEVT_SDC02_HAGANE_CLEAR_ELEMENTARY"),
            (0x3EB0BCA0, "dlc.flyingTrial.intermediate", "Vuelo contrarreloj de Amarys: nivel medio", "FEVT_SDC02_HAGANE_CLEAR_INTERMEDIANTE"),
            (0x96EDAF73, "dlc.flyingTrial.advanced", "Vuelo contrarreloj de Amarys: nivel avanzado", "FEVT_SDC02_HAGANE_CLEAR_ADVANCED"),
            (0x7D215B69, "dlc.flyingTrial.superlative", "Vuelo contrarreloj de Amarys: nivel máximo", "FEVT_SDC02_HAGANE_CLEAR_SUPERLATIVE"),
        ];
        return definitions.Select(d =>
        {
            bool found = sv.Blocks.TryGetBlock(d.Key, out var block);
            // FSYS_SCENARIO_GAME_CLEAR: contraste natural con dos partidas reales del propietario (12/11/2026): Púrpura con
            // la historia acabada = verdadero (y diploma recibido); Escarlata sin acabar = falso (sin diploma disponible).
            bool contrasted = d.Id == "story.paldea.clear";
            return (object)new { id = d.Id, label = d.Label,
                value = DecodeBooleanType(found ? block!.Type : null), validation = contrasted ? "verified" : "documented",
                source = new { url = Source, engineCommit = Audit.EngineCommit, blockKey = $"0x{d.Key:X8}", scriptName = d.ScriptName },
                limitation = "Interpretación documentada en upstream; pendiente de contraste natural controlado. Un bloque ausente o de otro tipo no se interpreta como falso." };
        }).ToArray();
    }

    private static object[] ReadGba(SAV3 save)
    {
        // Definitions are edition-specific in the game's sources. In particular,
        // Emerald's system flags start at 0x860; Ruby/Sapphire's start at 0x800.
        (int Index, string Repository, string Revision) definition = save switch
        {
            SAV3RS => (0x804, "pokeruby", "5784633ce4ef7ade1a7f2d2d0c288e3d5e6cdd7f"),
            SAV3E => (0x864, "pokeemerald", "731ad5bfd6e6f265508d0efcca0ba42f9dcf5881"),
            SAV3FRLG => (0x82C, "pokefirered", "ce6406d8c2eaf46d543c8a2606de0c3cb1951982"),
            _ => throw new NotSupportedException("Unknown GBA save family."),
        };
        return [new {
            id = "story.gba.gameClear", label = "Indicador de Liga superada (GBA)",
            value = save.GetEventFlag(definition.Index), validation = "documented",
            source = new {
                url = $"https://github.com/pret/{definition.Repository}/blob/{definition.Revision}/include/constants/flags.h",
                triggerUrl = $"https://github.com/pret/{definition.Repository}/blob/{definition.Revision}/src/post_battle_event_funcs.c",
                sourceCommit = definition.Revision, engineCommit = Audit.EngineCommit,
                flagIndex = definition.Index, scriptName = "FLAG_SYS_GAME_CLEAR",
            },
            limitation = "Definición documentada en los scripts del juego; pendiente de comparación natural controlada. No acredita escenas previas ni cronología.",
        }];
    }
}
