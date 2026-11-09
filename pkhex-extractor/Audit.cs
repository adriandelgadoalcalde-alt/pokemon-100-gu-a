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
                (g1.Japanese ? new[] { "RED", "GREEN", "BLUE" } : new[] { "RED", "BLUE" }) :
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
            ["integrity"] = new { engine = "PKHeX.Core", checksumsValid = checksums,
                scope = "Propiedad de integridad upstream; algunos formatos no tienen checksums propios" },
            ["gameClear"] = save is SAV4 s4 ? s4.GameClear : save is SAV5 or SAV6 or SAV7 ? save.SecondsToFame > 0 : null,
            ["nationalDex"] = save is SAV4 n4 ? n4.NationalDex : save is SAV5 n5 ? n5.Zukan.IsNationalDexUnlocked :
                save is SAV6XY nx ? nx.Zukan.IsNationalDexUnlocked : save is SAV6AO na ? na.Zukan.IsNationalDexUnlocked : null,
            ["badgesTotal"] = save is SAV4HGSS hg ? BitOperations.PopCount(hg.Badges) + BitOperations.PopCount((uint)hg.Badges16) :
                save is SAV4 d4 ? BitOperations.PopCount(d4.Badges) : save is SAV5 b5 ? BitOperations.PopCount((uint)b5.Misc.Badges) :
                save is SAV6 b6 ? BitOperations.PopCount((uint)b6.Badges) : null,
            ["unparsed"] = unparsed,
            ["warnings"] = new[] { "Diagnóstico de estado, no certificación de legitimidad ni del 100 %.",
                "El identificador de perfil es un seudónimo; conserva este JSON como archivo privado." },
        };
        if (includeEvents)
        {
            IEventFlagArray? flags = save as IEventFlagArray;
            if (save is IEventFlagProvider37 provider) flags = provider.EventWork;
            if (flags is not null)
            {
                var active = Enumerable.Range(0, flags.EventFlagCount).Where(flags.GetEventFlag).ToArray();
                object? work = flags is IEventWorkArray<ushort> w16 ? Enumerable.Range(0,w16.EventWorkCount).Select(w16.GetWork).ToArray() :
                    flags is IEventWorkArray<byte> w8 ? Enumerable.Range(0,w8.EventWorkCount).Select(w8.GetWork).ToArray() : null;
                result["events"] = new { flagCount = flags.EventFlagCount, activeFlags = active, work,
                    interpretation = "Datos crudos sin equivalencia automática a misiones", engineCommit = EngineCommit };
            }
            else unparsed.Add("Flags/work no expuestos como arrays por esta familia; bloques hash requieren adaptador específico");
        }
        return result;
    }
}
