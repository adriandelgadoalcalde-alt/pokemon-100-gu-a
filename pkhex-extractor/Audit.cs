// SPDX-License-Identifier: GPL-3.0-or-later
using System.Numerics;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using PKHeX.Core;

namespace Pokemon.SaveAudit;

public static class Audit
{
    public const string EngineCommit = "96e33e7432d900e5345afdfd117eabfac43f5bbd";
    public static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };

    private static object? ReadMedals(SaveFile save)
    {
        if (save is not SAV5B2W2 b2w2) return null;
        (string Name, int Start, int End)[] groups = [("Especial", 0, 7), ("Aventura", 7, 105),
            ("Combate", 105, 161), ("Entretenimiento", 161, 236), ("Desafío", 236, 255)];
        var block = b2w2.Medals;
        var entries = Enumerable.Range(0, 255).Select(index =>
        {
            var medal = block[index];
            string? date = null;
            if (medal.CanHaveDate && medal.HasDate)
            {
                try { date = medal.Date.ToString("yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture); }
                catch (ArgumentOutOfRangeException) { /* Invalid calendar data remains unknown. */ }
            }
            var state = (int)medal.State;
            return new { id = index + 1, group = groups.First(g => index >= g.Start && index < g.End).Name,
                state, obtained = state == 4, ready = state == 3, unread = medal.IsUnread, date };
        }).ToArray();
        var commonDate = entries.Where(m => m.obtained && m.date is not null).GroupBy(m => m.date)
            .OrderByDescending(g => g.Count()).FirstOrDefault();
        var obtained = entries.Count(m => m.obtained);
        return new { obtained, ready = entries.Count(m => m.ready), unknown = entries.Count(m => m.state > 4),
            total = 255, remaining = 255 - obtained,
            categories = groups.Select(g => new { name = g.Name,
                obtained = entries.Skip(g.Start).Take(g.End - g.Start).Count(m => m.obtained), total = g.End - g.Start }).ToArray(),
            medals = entries, rank = (int)block.Rank, tutorialCompleted = block.IsTutorialComplete,
            mostCommonDate = commonDate?.Key, mostCommonDateCount = commonDate?.Count() ?? 0,
            source = "PKHeX.Core SaveBlockAccessor5B2W2 (bloque 68), MedalList5 y Medal5",
            interpretation = "Recibidas en el guardado, no comprobación de consecución jugando." };
    }

    public static string? GameId(SaveFile save) => save is SAV3FRLG ? null : save.Version switch
    {
        GameVersion.RD => "RED", GameVersion.GN => save.Language == 1 ? "GREEN" : "BLUE",
        GameVersion.BU => "BLUE", GameVersion.YW => "YELLOW", GameVersion.GD => "GOLD",
        GameVersion.SI => "SILVER", GameVersion.C => "CRYSTAL", GameVersion.R => "RUBY",
        GameVersion.S => "SAPPHIRE", GameVersion.E => "EMERALD", GameVersion.FR => "FIRERED",
        GameVersion.LG => "LEAFGREEN", GameVersion.D => "DIAMOND", GameVersion.P => "PEARL",
        GameVersion.Pt => "PLATINUM", GameVersion.HG => "HEARTGOLD", GameVersion.SS => "SOULSILVER",
        GameVersion.B => "BLACK", GameVersion.W => "WHITE", GameVersion.B2 => "BLACK2",
        GameVersion.W2 => "WHITE2", GameVersion.X => "X", GameVersion.Y => "Y",
        GameVersion.OR => "OMEGARUBY", GameVersion.AS => "ALPHASAPPHIRE", GameVersion.SN => "SUN",
        GameVersion.MN => "MOON", GameVersion.US => "ULTRASUN", GameVersion.UM => "ULTRAMOON",
        GameVersion.GP => "LETGOP", GameVersion.GE => "LETGOE", GameVersion.SW => "SWORD",
        GameVersion.SH => "SHIELD", GameVersion.BD => "BD", GameVersion.SP => "SP",
        GameVersion.PLA => "ARCEUS", GameVersion.SL => "SCARLET", GameVersion.VL => "VIOLET",
        GameVersion.ZA => "ZA", _ => null,
    };

    public static Dictionary<string, object?> Extract(SaveFile save, string originalHash, bool includeEvents)
    {
        var game = GameId(save);
        var unparsed = new List<string> { "Semántica narrativa completa de eventos", "Cronología histórica no almacenada explícitamente" };
        bool implementsCaught = save.GetType().GetMethod(nameof(SaveFile.GetCaught))?.DeclaringType != typeof(SaveFile);
        bool implementsSeen = save.GetType().GetMethod(nameof(SaveFile.GetSeen))?.DeclaringType != typeof(SaveFile);
        var caught = new List<int>(); var seen = new List<int>();
        try
        {
            for (ushort id = 1; id <= save.MaxSpeciesID; id++)
            {
                if (implementsCaught && save.GetCaught(id)) caught.Add(id);
                if (implementsSeen && save.GetSeen(id)) seen.Add(id);
            }
        }
        catch (ArgumentOutOfRangeException)
        {
            implementsCaught = implementsSeen = false; caught.Clear(); seen.Clear();
            unparsed.Add("Pokédex no legible por completo; no interpretar una lectura parcial como cero capturas");
        }
        if (!implementsCaught || !implementsSeen) unparsed.Add("Una parte de Pokédex no está expuesta por el adaptador upstream");
        if (game is null) unparsed.Add("Edición individual no identificada; no asignar automáticamente una variante");
        string? revision = null;
        if (save is ISaveFileRevision rev)
        {
            try { revision = rev.SaveRevisionString; }
            catch (ArgumentOutOfRangeException) { unparsed.Add("La revisión numérica no tiene una etiqueta conocida en esta versión upstream"); }
        }
        bool? checksums = null;
        try { checksums = save.ChecksumsValid; }
        catch (ArgumentOutOfRangeException) { unparsed.Add("Integridad no disponible para este objeto sin contenedor completo"); }
        object? inventory = null; object? keyItems = null;
        try
        {
            var pouches = save.Inventory.Pouches;
            inventory = pouches.Select(p => new { pocket = p.Type.ToString(),
                items = p.Items.Where(i => i.Index > 0 && i.Count > 0).Select(i => new { id = i.Index, count = i.Count }).ToArray() }).ToArray();
            var keyPouch = pouches.FirstOrDefault(p => p.Type == InventoryType.KeyItems);
            keyItems = keyPouch?.Items.Where(i => i.Index > 0 && i.Count > 0).Select(i => new { id = i.Index, count = i.Count }).ToArray();
        }
        catch (ArgumentOutOfRangeException) { unparsed.Add("Inventario no disponible en este objeto o revisión"); }
        var identity = $"pokemon-save-audit-v1|{save.Version}|{save.OT}|{save.TID16}|{save.SID16}";
        var result = new Dictionary<string, object?>
        {
            ["schemaVersion"] = "1.0.0", ["game"] = game, ["generation"] = save.Generation,
            ["gameCandidates"] = game is not null ? new[] { game } : save is SAV3FRLG ? new[] { "FIRERED", "LEAFGREEN" } :
                save is SAV3RS ? new[] { "RUBY", "SAPPHIRE" } : save is SAV4DP ? new[] { "DIAMOND", "PEARL" } : save is SAV1 g1 ?
                // Verde solo salió en Japón, pero su traducción al inglés guarda con el formato internacional.
                (g1.Japanese ? new[] { "RED", "GREEN", "BLUE" } : new[] { "RED", "BLUE", "GREEN" }) :
                save is SAV2 ? new[] { "GOLD", "SILVER" } : Array.Empty<string>(),
            ["extractor"] = new { name = "pokemon-save-audit", engine = "PKHeX.Core", engineCommit = EngineCommit, readOnly = true },
            ["format"] = save.GetType().Name, ["detectedVersion"] = save.Version.ToString(),
            ["languageId"] = save.Language, ["region"] = null,
            ["revision"] = revision,
            ["sha256"] = originalHash, ["profileId"] = Convert.ToHexStringLower(SHA256.HashData(Encoding.UTF8.GetBytes(identity))),
            ["readAt"] = DateTimeOffset.UtcNow.ToString("O"), ["readonly"] = true,
            ["playtime"] = $"{save.PlayedHours} h {save.PlayedMinutes:00} min",
            ["caught"] = implementsCaught ? caught : null, ["seen"] = implementsSeen ? seen : null,
            ["caughtCount"] = implementsCaught ? caught.Count : null, ["seenCount"] = implementsSeen ? seen.Count : null,
            ["inventory"] = inventory, ["keyItems"] = keyItems,
            ["medals"] = ReadMedals(save),
            ["passport"] = save is SAV7 passport7 ? new { mask = passport7.Misc.Stamps } : null,
            ["integrity"] = new { engine = "PKHeX.Core", checksumsValid = checksums,
                scope = "Propiedad de integridad upstream; algunos formatos no tienen checksums propios" },
            // Gen. I: contador del Salón de la Fama (wNumHoFTeams, se incrementa al entrar; pokered hall_of_fame.asm).
            // Gen. II: EVENT_BEAT_ELITE_FOUR = 68 (pokegold/pokecrystal constants/event_flags.asm; HallOfFame.asm lo activa).
            // Negro/Blanco: bandera 2400 «Defeated Ghetsis (First game clear)» de PKHeX (flags_bw), además del tiempo a la fama.
            ["gameClear"] = save is SAV1 s1 ? s1.HallOfFameCount > 0 : save is SAV2 s2 ? s2.GetEventFlag(68) :
                save is SAV4 s4 ? s4.GameClear : save is SAV5BW bw ? bw.EventWork.GetEventFlag(2400) || bw.SecondsToFame > 0 :
                save is SAV5 or SAV6 or SAV7 ? save.SecondsToFame > 0 :
                // Let's Go: FSYS_GAME_CLEAR = bandera de sistema 0 «Completed Main Story» (PKHeX flags_gg).
                save is SAV7b lg ? lg.EventWork.GetFlag(EventVarType.System, 0) : null,
            ["nationalDex"] = save is SAV3 n3 ? n3.NationalDex : save is SAV4 n4 ? n4.NationalDex : save is SAV5 n5 ? n5.Zukan.IsNationalDexUnlocked :
                save is SAV6XY nx ? nx.Zukan.IsNationalDexUnlocked : save is SAV6AO na ? na.Zukan.IsNationalDexUnlocked : null,
            ["badgesMask"] = save is SAV3 b3 ? b3.Badges : (int?)null,
            ["badgesTotal"] = save is SAV1 badges1 ? BitOperations.PopCount((uint)badges1.Badges) : save is SAV2 badges2 ? BitOperations.PopCount((uint)badges2.Badges) :
                save is SAV3 badges3 ? BitOperations.PopCount((uint)badges3.Badges) : save is SAV4HGSS hg ? BitOperations.PopCount(hg.Badges) + BitOperations.PopCount((uint)hg.Badges16) :
                save is SAV4 d4 ? BitOperations.PopCount(d4.Badges) : save is SAV5 b5 ? BitOperations.PopCount((uint)b5.Misc.Badges) :
                save is SAV6 b6 ? BitOperations.PopCount((uint)b6.Badges) :
                save is SAV8SWSH b8 ? BitOperations.PopCount((uint)b8.Badges) :
                // Let's Go: FSYS_GYM_CLEAR_* = banderas de sistema 12-19 (un líder cada una; PKHeX flags_gg).
                save is SAV7b lgb ? Enumerable.Range(12, 8).Count(i => lgb.EventWork.GetFlag(EventVarType.System, i)) : null,
            // Diamante/Perla/Platino: banderas capturadas registradas en el PC del Subsuelo (UG_FlagsCaptured); la bandera
            // de platino de la tarjeta exige 50 (pokeplatinum underground.c, FLAG_CAPTURED_COUNT_PLATINUM).
            ["underground4"] = save is SAV4Sinnoh ug ? new { flagsCaptured = ug.UG_FlagsCaptured } : null,
            // Negro/Blanco y Negro 2/Blanco 2: récords del Metro Batalla (BattleSubway5 de PKHeX). Fero y Caril esperan en el
            // combate 49 de los súper trenes individual y doble (WikiDex «Ingo/Fero», «Emmet/Caril»).
            ["subway5"] = save is SAV5 sub ? new { singleRecord = sub.BattleSubway.SingleRecord, doubleRecord = sub.BattleSubway.DoubleRecord,
                superSingleRecord = sub.BattleSubway.SuperSingleRecord, superDoubleRecord = sub.BattleSubway.SuperDoubleRecord,
                superMultiNpcRecord = sub.BattleSubway.SuperMultiNPCRecord } : null,
            // Platino: récords de la Torre Batalla (BattleFrontierStats.soloStats de pokeplatinum: récord y racha actual de
            // individual, doble, múltiple, múltiple con conexión y Wi-Fi). El bloque empieza 4 bytes tras el grito de Chatot de
            // PKHeX (0x64EC + Chatter4.SIZE + 4 = 0x68DC), el mismo desfase que en Diamante/Perla (pokediamond: 4 + 0x3C hasta los
            // BP de 0x65F8) y en HGSS (contrastado con una partida pública).
            ["tower4"] = save is SAV4Pt pt ? new { records = Enumerable.Range(0, 5).Select(i =>
                (int)System.Buffers.Binary.BinaryPrimitives.ReadUInt16LittleEndian(pt.General[(0x64EC + Chatter4.SIZE + 4 + i * 4)..])).ToArray() } : null,
            // Oro/Plata/Cristal: letras de Unown registradas (wUnownDex de pokecrystal, 26 bytes tras la Pokédex de vistos;
            // SAV2Offsets.PokedexSeen + 0x20 en PKHeX). Cada byte es una letra 1-26; 0 = hueco libre.
            ["unown2"] = save is SAV2 un2 ? new { forms = Enumerable.Range(0x20, 26).Select(i => (int)un2.Data[new SAV2Offsets(un2).PokedexSeen + i])
                .Where(v => v is >= 1 and <= 26).Distinct().Count() } : null,
            // Negro/Blanco y Negro 2/Blanco 2: complementos del Musical (Musical5.GetHasProp de PKHeX, 100 bits).
            ["musical5"] = save is SAV5 mu ? new { props = Enumerable.Range(0, 100).Count(i => mu.Musical.GetHasProp(i)), total = 100 } : null,
            // Negro 2/Blanco 2: niveles blanco y negro de la Zona Nexo (Entralink5.WhiteForestLevel/BlackCityLevel de PKHeX).
            ["entralink5"] = save is SAV5B2W2 en ? new { white = (int)en.Entralink.WhiteForestLevel, black = (int)en.Entralink.BlackCityLevel } : null,
            // Negro 2/Blanco 2: récords del PWT por torneo (PWTBlock5.GetPWTRecord, orden de PWTRecordID: 17 = Campeones).
            ["pwt5"] = save is SAV5B2W2 pw ? new { records = Enumerable.Range(0, 29).Select(i => (int)pw.PWT.GetPWTRecord(i)).ToArray() } : null,
            // Sol/Luna y Ultrasol/Ultraluna: rachas del Árbol de Combate (BattleTree7.GetTreeStreak de PKHeX), mismo formato que el
            // lector propio (modalidad: normal y súper, actual y máxima).
            ["battleTree"] = save is SAV7 s7 ? new { modes = Enumerable.Range(0, 4).Select(t => new {
                normalCurrent = s7.BattleTree.GetTreeStreak(t, false, false), superCurrent = s7.BattleTree.GetTreeStreak(t, true, false),
                normalBest = s7.BattleTree.GetTreeStreak(t, false, true), superBest = s7.BattleTree.GetTreeStreak(t, true, true) }).ToArray(),
                source = "PKHeX.Core BattleTree7.GetTreeStreak" } : null,
            // Diamante Brillante/Perla Reluciente: racha actual y máxima de cada modalidad de la Torre Batalla (BattleTowerWork8b).
            ["tower8b"] = save is SAV8BS bs ? new { maxStreaks = bs.BattleTower.Records.Select(r => (long)Math.Max(r.RenshouCount, r.RenshouCountOld)).ToArray() } : null,
            // Espada/Escudo: marcas de Pokédex completa de la tarjeta de entrenador (TrainerCard8 de PKHeX).
            ["card8"] = save is SAV8SWSH c8 ? new { galarDex = c8.TrainerCard.PokeDexComplete, armorDex = c8.TrainerCard.ArmorDexComplete,
                crownDex = c8.TrainerCard.CrownDexComplete } : null,
            ["progressSignals"] = ProgressSignals.Read(save),
            ["unparsed"] = unparsed,
            ["warnings"] = new[] { "Diagnóstico de estado, no certificación de legitimidad ni del 100 %.",
                "El identificador de perfil es un seudónimo; conserva este JSON como archivo privado." },
        };
        if (includeEvents)
        {
            IEventFlagArray? flags = save as IEventFlagArray;
            if (save is IEventFlagProvider37 provider) flags = provider.EventWork;
            if (save is SAV7b lgpe)
            {
                // Let's Go: banderas en bruto de EventWork7b (zona 0, sistema 128, desaparición 640, evento 2176) y títulos de Maestro.
                var ew = lgpe.EventWork;
                var active = Enumerable.Range(0, ew.CountFlag).Where(i => ew.GetFlag(i)).ToArray();
                var work = Enumerable.Range(0, ew.CountWork).Select(i => ew.GetWork(i)).ToArray();
                var titles = Enumerable.Range(0, EventWork7b.MaxTitleFlag).Where(i => ew.GetTitleFlag(i)).ToArray();
                result["events"] = new { flagCount = ew.CountFlag, activeFlags = active, work, titles,
                    layout = "EventWork7b: zona 0, sistema 128, desaparición 640, evento 2176",
                    interpretation = "Datos crudos sin equivalencia automática a misiones", engineCommit = EngineCommit };
            }
            else if (flags is not null)
            {
                var active = Enumerable.Range(0, flags.EventFlagCount).Where(flags.GetEventFlag).ToArray();
                object? work = flags is IEventWorkArray<ushort> w16 ? Enumerable.Range(0,w16.EventWorkCount).Select(w16.GetWork).ToArray() :
                    flags is IEventWorkArray<byte> w8 ? Enumerable.Range(0,w8.EventWorkCount).Select(w8.GetWork).ToArray() : null;
                result["events"] = new { flagCount = flags.EventFlagCount, activeFlags = active, work,
                    interpretation = "Datos crudos sin equivalencia automática a misiones", engineCommit = EngineCommit };
            }
            else unparsed.Add("Flags/work no expuestos como arrays por esta familia; bloques hash requieren adaptador específico");
            var named = NamedBlocks.Read(save);
            if (named is not null)
                result["namedBlocks"] = named;
            var position = NamedBlocks.Position(save);
            if (position is not null)
                result["switchPosition"] = position;
            if (NamedBlocks.QuestWork9a(save) is { } quests)
                result["questWork9a"] = quests;
        }
        return result;
    }
}
