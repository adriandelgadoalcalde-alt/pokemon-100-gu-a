// SPDX-License-Identifier: GPL-3.0-or-later
// All write operations in this file create synthetic test fixtures, never user saves.
using System.Buffers.Binary;
using System.Security.Cryptography;
using System.Text.Json;
using PKHeX.Core;
using Pokemon.SaveAudit;
using Pokemon.LocalReader;

static void Check(bool condition, string message) { if (!condition) throw new Exception(message); }
foreach (var size in new[] { 0,1,55,56,63,64,65,128,1048576 })
{
    var input=Enumerable.Range(0,size).Select(i=>(byte)(i*37+19)).ToArray();
    var md5Original=input.ToArray();var actual=new byte[16];
    new BrowserMd5().HashData(input,actual);
    Check(actual.AsSpan().SequenceEqual(MD5.HashData(input)),"Browser MD5 known-length parity failed");
    Check(input.AsSpan().SequenceEqual(md5Original),"Browser MD5 modified input");
}
static byte[] SyntheticHgss(GameVersion version = GameVersion.SS)
{
    var bytes = Enumerable.Repeat((byte)255, 0x80000).ToArray();
    foreach (var partition in new[] { 0, 0x40000 })
    foreach (var (start, length, slot) in new[] { (0, 0xF628, 0), (0xF700, 0x12310, 1) })
    {
        var block = bytes.AsSpan(partition + start, length); block.Clear();
        BinaryPrimitives.WriteUInt32LittleEndian(block[^16..], 1);
        BinaryPrimitives.WriteUInt32LittleEndian(block[^12..], (uint)length);
        BinaryPrimitives.WriteUInt32LittleEndian(block[^8..], SAV4.MAGIC_JAPAN_INTL);
        BinaryPrimitives.WriteUInt16LittleEndian(block[^4..], (ushort)slot);
        BinaryPrimitives.WriteUInt16LittleEndian(block[^2..], Checksums.CRC16_CCITT(block[..^16]));
    }
    var hg = new SAV4HGSS(bytes) { Version = version, OT = version==GameVersion.HG?"ÁÑ1":"SYNTH", TID16 = 123, SID16 = 456,
        Language = (int)LanguageID.Spanish, Badges = 255, Badges16 = 255, GameClear = true, NationalDex = true,
        PlayedHours = 10, PlayedMinutes = 2 };
    hg.Dex.SetCaught(145, true); hg.Dex.SetCaught(146, true); hg.Dex.SetSeen(145, true); hg.Dex.SetSeen(146, true); hg.Dex.SetSeen(381, true);
    foreach (var flag in new[] { 0x14A, 0x16D, 0x179, 0x185 }) hg.SetEventFlag(flag, true);
    hg.SetWork(253, 1); hg.SetWork(305, 3); hg.SetWork(249, 2);
    var bag=hg.Inventory;var keyItems=bag.GetPouch(InventoryType.KeyItems).Items;
    keyItems[0].Index=version==GameVersion.HG?535:534;keyItems[0].Count=1;bag.CopyTo(hg);
    return hg.Write().ToArray();
}
static SaveFile SyntheticGba(GameVersion version)
{
    var bytes = Enumerable.Repeat((byte)255, 0x20000).ToArray();
    for(var slot=0;slot<2;slot++)for(var id=0;id<14;id++)
    {
        var sector=bytes.AsSpan(slot*0xE000+id*0x1000,0x1000);sector[..0xF80].Clear();
        BinaryPrimitives.WriteUInt16LittleEndian(sector[0xFF4..],(ushort)id);
        BinaryPrimitives.WriteUInt32LittleEndian(sector[0xFF8..],0x08012025);
        BinaryPrimitives.WriteUInt32LittleEndian(sector[0xFFC..],slot==0?1u:0u);
    }
    bytes[6]=bytes[7]=255;
    SAV3 save=version is GameVersion.FR or GameVersion.LG?new SAV3FRLG(bytes):
        version==GameVersion.E?new SAV3E(bytes):new SAV3RS(bytes);
    save.Version=version;save.OT="SYNTH";save.TID16=123;save.SID16=456;
    if(version is GameVersion.FR or GameVersion.LG)BinaryPrimitives.WriteUInt32LittleEndian(save.Small[0xAC..],1);
    if(version==GameVersion.E){BinaryPrimitives.WriteUInt32LittleEndian(save.Small[0xAC..],0x12345678);save.Small[0x890]=1;}
    return save;
}
static SaveFile SyntheticSinnoh(GameVersion version)
{
    SAV4 template=version==GameVersion.Pt?new SAV4Pt():new SAV4DP();
    var bytes=Enumerable.Repeat((byte)255,0x80000).ToArray();
    var general=template.General.Length;
    // Storage sizes from the pinned SAV4DP / SAV4Pt declarations.
    var storage=version==GameVersion.Pt?0x121E4:0x121E0;
    foreach(var partition in new[]{0,0x40000})foreach(var block in new[]{(start:0,length:general,id:0),(start:general,length:storage,id:1)})
    {
        var span=bytes.AsSpan(partition+block.start,block.length);span.Clear();
        BinaryPrimitives.WriteUInt32LittleEndian(span[^20..],1);BinaryPrimitives.WriteUInt32LittleEndian(span[^16..],1);
        BinaryPrimitives.WriteUInt32LittleEndian(span[^12..],(uint)block.length);BinaryPrimitives.WriteUInt32LittleEndian(span[^8..],SAV4.MAGIC_JAPAN_INTL);
        BinaryPrimitives.WriteUInt16LittleEndian(span[^4..],(ushort)block.id);BinaryPrimitives.WriteUInt16LittleEndian(span[^2..],Checksums.CRC16_CCITT(span[..^20]));
    }
    SAV4 result=version==GameVersion.Pt?new SAV4Pt(bytes):new SAV4DP(bytes);
    result.OT="SYNTH";result.Language=(int)LanguageID.English;result.TID16=123;result.SID16=456;return result;
}
static void SeedContainerMetadata(SaveFile model)
{
    if(model is SAV1 g1)
    {
        if(g1.Version==GameVersion.YW)g1.Starter=0x54;
        foreach(var offset in g1.Japanese?new[]{0x2ED5,0x302D}:new[]{0x2F2C,0x30C0}){model.Data[offset]=0;model.Data[offset+1]=255;}
    }
    if(model is SAV2 g2)
    {
        var offsets=g2.Japanese?(g2.Version==GameVersion.C?new[]{0x2D10,0x281A}:new[]{0x2D10,0x283E}):
            g2.Version==GameVersion.C?new[]{0x2865,0x2D10}:new[]{0x288A,0x2D6C};
        foreach(var offset in offsets){model.Data[offset]=0;model.Data[offset+1]=255;}
    }
    if(model is SAV_BEEF beef)
    {
        var start=beef.AllBlocks.Max(b=>(b.Offset+b.Length+0x1FF)&~0x1FF);
        var footer=model.Data[start..];BinaryPrimitives.WriteUInt32LittleEndian(footer[0x10..],0x42454546);
        foreach(var b in beef.AllBlocks){var at=0x14+(int)b.ID*8;BinaryPrimitives.WriteUInt32LittleEndian(footer[at..],(uint)b.Length);BinaryPrimitives.WriteUInt16LittleEndian(footer[(at+4)..],(ushort)b.ID);}
    }
}

Check(ProgressSignals.DecodeBooleanType(SCTypeCode.Bool1)==false,"False boolean block changed meaning");
Check(ProgressSignals.DecodeBooleanType(SCTypeCode.Bool2)==true,"True boolean block changed meaning");
Check(ProgressSignals.DecodeBooleanType(null) is null,"An absent block became false");
Check(ProgressSignals.DecodeBooleanType(SCTypeCode.Bool3) is null,"An array boolean became a scalar flag");
Check(ProgressSignals.DecodeBooleanType(SCTypeCode.Object) is null,"An object block became a scalar flag");

foreach (var version in new[] { GameVersion.R, GameVersion.S, GameVersion.E, GameVersion.FR, GameVersion.LG })
{
    var gba=(SAV3)SyntheticGba(version);
    gba.Badges=0b10100101;
    gba.NationalDex=true;
    var flagIndex=version is GameVersion.R or GameVersion.S?0x804:version==GameVersion.E?0x864:0x82C;
    foreach(var cleared in new[] { false,true })
    {
        gba.SetEventFlag(flagIndex,cleared);
        gba.SetEventFlag(flagIndex+1,!cleared);
        var container=gba.Write().ToArray();var original=SHA256.HashData(container);
        var decoded=SaveUtil.GetSaveFile(container.ToArray().AsMemory()) as SAV3;
        Check(decoded is not null && decoded.ChecksumsValid,"GBA synthetic container integrity failed");
        var diagnosis=Audit.Extract(decoded!,Convert.ToHexStringLower(original),true);
        Check((int?)diagnosis["badgesTotal"]==4,"GBA badge count is not a bit count");
        Check((int?)diagnosis["badgesMask"]==0b10100101,"GBA individual badge mask was lost");
        Check((bool?)diagnosis["nationalDex"]==true,"GBA national unlock was omitted");
        using var signals=JsonDocument.Parse(JsonSerializer.Serialize(diagnosis["progressSignals"],Audit.JsonOptions));
        Check(signals.RootElement[0].GetProperty("value").GetBoolean()==cleared,"GBA clear signal uses the wrong family flag");
        Check(signals.RootElement[0].GetProperty("validation").GetString()=="documented","GBA documentary flag was certified");
        Check(SHA256.HashData(container).AsSpan().SequenceEqual(original),"GBA input changed");
    }
}

var output = args.Length == 1 ? Path.GetFullPath(args[0]) : Path.Combine(Path.GetTempPath(), "pokemon-audit-synthetic");
Directory.CreateDirectory(output);
var bytes = SyntheticHgss(); var before = SHA256.HashData(bytes);
var parsed = SaveUtil.GetSaveFile(bytes.ToArray().AsMemory()) ?? throw new Exception("Synthetic fixture detection failed");
Check(parsed is SAV4HGSS, "Synthetic HGSS detection failed");
Check(parsed.ChecksumsValid, "Synthetic HGSS full checksums failed");
// Platino: Heatran reaparecido tras el arresto de Carón = una entrada del Salón posterior = revancha (pret/pokeplatinum).
foreach (var (caught, vs5, state, expected) in new[] { (false, true, 1, true), (true, true, 1, false), (false, true, 2, false), (false, false, 1, false) })
{
    var pt=(SAV4)SyntheticSinnoh(GameVersion.Pt);
    pt.SetEventFlag(214,true);pt.SetEventFlag(215,true);pt.SetEventFlag(288,caught);pt.SetEventFlag(2435,vs5);pt.SetWork(158,(ushort)state);
    using var lr=JsonDocument.Parse(JsonSerializer.Serialize(Audit.Extract(pt,"synthetic",false)["leagueRematch4"],Audit.JsonOptions));
    Check(lr.RootElement.GetProperty("heatranReset").GetBoolean()==expected&&lr.RootElement.GetProperty("proof").GetBoolean()==expected,
        $"Platinum Heatran reset misread (caught={caught}, vs5={vs5}, state={state})");
}
var report = Audit.Extract(parsed, Convert.ToHexStringLower(before), true);
Check((string?)report["game"] == "SOULSILVER", "Game identification mismatch");
Check((int?)report["badgesTotal"] == 16, "Badges mismatch");
Check(((List<int>)report["caught"]!).SequenceEqual(new[] { 145, 146 }), "Caught mismatch");
Check(((List<int>)report["seen"]!).SequenceEqual(new[] { 145, 146, 381 }), "Seen mismatch");
Check(SHA256.HashData(bytes).SequenceEqual(before), "Input bytes changed");
var json = JsonSerializer.Serialize(report, Audit.JsonOptions);
Check(!json.Contains("SYNTH"), "Trainer name leaked into default report");
Check(!report.ContainsKey("tid") && !report.ContainsKey("sid"), "Trainer IDs leaked into default report");
File.WriteAllBytes(Path.Combine(output, "synthetic-hgss.sav"), bytes);
File.WriteAllText(Path.Combine(output, "synthetic-hgss.json"), json);

// Complete synthetic containers for the existing DS/3DS browser families.
var familyFixtures = new List<string> { "synthetic-hgss" };
var heartgold=SyntheticHgss(GameVersion.HG);
var heartgoldSave=SaveUtil.GetSaveFile(heartgold.ToArray().AsMemory()) ?? throw new Exception("HeartGold fixture detection failed");
Check(heartgoldSave.ChecksumsValid,"HeartGold fixture integrity failed");
Check(heartgoldSave.OT=="ÁÑ1","HeartGold synthetic glyph encoding mismatch");
File.WriteAllBytes(Path.Combine(output,"synthetic-HG.sav"),heartgold);
File.WriteAllText(Path.Combine(output,"synthetic-HG.json"),JsonSerializer.Serialize(Audit.Extract(heartgoldSave,Convert.ToHexStringLower(SHA256.HashData(heartgold)),true),Audit.JsonOptions));
familyFixtures.Add("synthetic-HG");
foreach (var version in new[] { GameVersion.B2, GameVersion.W2, GameVersion.X, GameVersion.Y, GameVersion.OR, GameVersion.AS, GameVersion.US, GameVersion.UM })
{
    var model = BlankSaveFile.Get(version, "SYNTH", LanguageID.Spanish);
    model.PlayedHours = 10; model.PlayedMinutes = 2; model.SecondsToFame = 99;
    if (model is SAV5 b5)
    {
        b5.Misc.Badges = 255; b5.Zukan.IsNationalDexUnlocked = true;
        b5.Zukan.SetCaught(145); b5.Zukan.SetCaught(146); b5.Zukan.SetSeen(145, 0); b5.Zukan.SetSeen(146, 0); b5.Zukan.SetSeen(381, 0);
    }
    if (model is SAV5B2W2 medalSave)
    {
        var received = medalSave.Medals[0]; received.State = MedalState5.Obtained;
        received.RawDate = (ushort)(26 | (2 << 7) | (31 << 11)); // impossible calendar date
        var leap = medalSave.Medals[1]; leap.State = MedalState5.Obtained;
        leap.Date = new DateOnly(2000,2,29); leap.IsUnread = true;
        var ready = medalSave.Medals[2]; ready.State = MedalState5.ObtainReady;
        ready.Date = new DateOnly(2026,11,10);
        var hint = medalSave.Medals[3]; hint.State = MedalState5.HintObtained;
        hint.Date = new DateOnly(2026,11,9);
        var absent = medalSave.Medals[4]; absent.State = MedalState5.Unobtained;
        absent.Date = new DateOnly(2026,11,8); // stale bytes do not become a receipt
        var unknown = medalSave.Medals[5]; unknown.State = (MedalState5)7;
        unknown.Date = new DateOnly(2026,11,7);
        using var checkMedals=JsonDocument.Parse(JsonSerializer.Serialize(Audit.Extract(model,"synthetic",false)["medals"],Audit.JsonOptions));
        var values=checkMedals.RootElement.GetProperty("medals");
        Check(values[0].GetProperty("date").ValueKind==JsonValueKind.Null,"Impossible medal date accepted");
        Check(values[1].GetProperty("date").GetString()=="2000-02-29","Leap-day medal date lost");
        Check(!values[2].GetProperty("obtained").GetBoolean()&&values[2].GetProperty("ready").GetBoolean(),"Ready medal became received");
        Check(values[4].GetProperty("date").ValueKind==JsonValueKind.Null,"Absent medal acquired a stale date");
        Check(checkMedals.RootElement.GetProperty("unknown").GetInt32()==1,"Unknown medal state became pending or received");
    }
    if (model is SAV6 b6)
    {
        b6.Badges = 255; model.SetCaught(145, true); model.SetCaught(146, true);
        model.SetSeen(145, true); model.SetSeen(146, true); model.SetSeen(381, true);
        // First/last slots and zero-count holes catch pocket shifts and over-reading padding.
        var inventory6 = model.Inventory;
        foreach(var pouch in inventory6.Pouches)
        {
            var legal = inventory6.Info.GetItems(pouch.Type);
            pouch.Items[0].Index = legal[0]; pouch.Items[0].Count = 1;
            pouch.Items[1].Index = legal[1]; pouch.Items[1].Count = 0;
            pouch.Items[2].Index = 0; pouch.Items[2].Count = 7;
            pouch.Items[^1].Index = legal[^1]; pouch.Items[^1].Count = pouch.Type == InventoryType.Items ? 513 : 1;
        }
        inventory6.CopyTo(model);
        // Nonzero unused padding must not be interpreted as additional inventory slots.
        var pocketOffsets=model is SAV6AO?new[]{0,0x640,0x7C0,0x970,0xA70}:new[]{0,0x640,0x7C0,0x968,0xA68};
        for(var index=0;index<inventory6.Pouches.Count;index++)
        {
            var at=0x400+pocketOffsets[index]+inventory6.Pouches[index].Items.Length*4;
            BinaryPrimitives.WriteUInt16LittleEndian(model.Data[at..],656);
            BinaryPrimitives.WriteUInt16LittleEndian(model.Data[(at+2)..],37);
        }

        if (model is SAV6XY xy) xy.Zukan.IsNationalDexUnlocked = true;
        if (model is SAV6AO ao) ao.Zukan.IsNationalDexUnlocked = true;
    }
    if (model is SAV7 s7)
    {
        s7.Zukan.SetCaught(145); s7.Zukan.SetCaught(146); s7.Zukan.SetSeen(145, true); s7.Zukan.SetSeen(146, true); s7.Zukan.SetSeen(381, true);
        foreach(uint mask in new uint[]{0,1,1<<13,1<<14,0x5555,0x2AAA,0x7FFF})
        {
            s7.Misc.Stamps=mask;
            using var stampCheck=JsonDocument.Parse(JsonSerializer.Serialize(Audit.Extract(model,"synthetic",false)["passport"],Audit.JsonOptions));
            Check(stampCheck.RootElement.GetProperty("mask").GetUInt32()==mask,"Passport mask changed meaning");
        }
        s7.Misc.Stamps=0x5555;
        var stampRaw=BinaryPrimitives.ReadUInt32LittleEndian(model.Data[0x4408..]);
        BinaryPrimitives.WriteUInt32LittleEndian(model.Data[0x4408..],stampRaw|0xFFF8000F);
        var inventory7=model.Inventory;
        foreach(var pouch in inventory7.Pouches)
        {
            var legal=inventory7.Info.GetItems(pouch.Type);
            var first=(InventoryItem7)pouch.Items[0]; first.Index=legal[0]; first.Count=1;
            first.IsNew=true; first.FreeSpaceIndex=777;
            pouch.Items[1].Index=legal[1]; pouch.Items[1].Count=0;
            pouch.Items[2].Index=0; pouch.Items[2].Count=7;
            var last=(InventoryItem7)pouch.Items[^1]; last.Index=legal[^1];
            last.Count=pouch.Type==InventoryType.Items?513:1;last.FreeSpaceIndex=1023;
        }
        inventory7.CopyTo(model);
        // Reserved top bit and a bag-alignment gap must not contaminate ID/count.
        model.Data[3]|=0x80;
        BinaryPrimitives.WriteUInt32LittleEndian(model.Data[0xE28..],807u|(37u<<10));
        // Pegatinas dominantes, células, Surfeo Mantine y defensas del título con valores distintos de cero (paridad con la web).
        if(model is SAV7USUM u7)
        {
            for(var i=0;i<100;i+=3)u7.EventWork.SetZygardeCell(i,(ushort)(i%2==0?2:1));
            u7.EventWork.ZygardeCellTotal=40;u7.EventWork.ZygardeCellCount=73;
            for(var i=0;i<4;i++)u7.Misc.SetSurfScore(i,i==2?0:12345*(i+1));
            u7.SetRecord(100,version==GameVersion.US?9:0);
        }

    }
    if (model is IEventFlagProvider37 flags) { flags.EventWork.SetEventFlag(5, true); flags.EventWork.SetWork(7, 123); }
    if (model is SAV_BEEF beef)
    {
        var footer = beef.Data[^0x200..];
        BinaryPrimitives.WriteUInt32LittleEndian(footer[0x10..], 0x42454546);
        foreach (var block in beef.AllBlocks)
        {
            var offset = 0x14 + (int)block.ID * 8;
            BinaryPrimitives.WriteUInt32LittleEndian(footer[offset..], (uint)block.Length);
            BinaryPrimitives.WriteUInt16LittleEndian(footer[(offset + 4)..], (ushort)block.ID);
        }
    }
    var exported = model.Write().ToArray();
    var detected = SaveUtil.GetSaveFile(exported.ToArray().AsMemory()) ?? throw new Exception("Synthetic family detection failed: " + version);
    Check(detected.ChecksumsValid, "Synthetic family checksum failed: " + version);
    var familyReport = Audit.Extract(detected, Convert.ToHexStringLower(SHA256.HashData(exported)), true);
    var name = "synthetic-" + version;
    File.WriteAllBytes(Path.Combine(output, name + ".sav"), exported);
    File.WriteAllText(Path.Combine(output, name + ".json"), JsonSerializer.Serialize(familyReport, Audit.JsonOptions));
    familyFixtures.Add(name);
}
File.WriteAllText(Path.Combine(output, "fixture-index.json"), JsonSerializer.Serialize(familyFixtures));

// API smoke tests are deliberately separate from real-file support or natural-play validation.
var versions = new[] { GameVersion.RD, GameVersion.GN, GameVersion.BU, GameVersion.YW,
 GameVersion.GD, GameVersion.SI, GameVersion.C, GameVersion.R, GameVersion.S, GameVersion.E,
 GameVersion.FR, GameVersion.LG, GameVersion.D, GameVersion.P, GameVersion.Pt, GameVersion.HG,
 GameVersion.SS, GameVersion.B, GameVersion.W, GameVersion.B2, GameVersion.W2, GameVersion.X,
 GameVersion.Y, GameVersion.OR, GameVersion.AS, GameVersion.SN, GameVersion.MN, GameVersion.US,
 GameVersion.UM, GameVersion.GP, GameVersion.GE, GameVersion.SW, GameVersion.SH, GameVersion.BD,
 GameVersion.SP, GameVersion.PLA, GameVersion.SL, GameVersion.VL, GameVersion.ZA };
var smoke = new List<object>();
foreach (var version in versions)
{
    try
    {
        var language = version is GameVersion.GN or GameVersion.BU ? LanguageID.Japanese : LanguageID.English;
        var blank = BlankSaveFile.Get(version, "SYNTH", language);
        var r = Audit.Extract(blank, "synthetic-object-not-a-file", false);
        smoke.Add(new { requested = version.ToString(), game = r["game"], adapter = blank.GetType().Name, result = "object-read" });
    }
    catch (Exception e) { smoke.Add(new { requested = version.ToString(), result = "unsupported-blank-object", reason = e.GetType().Name }); }
}
File.WriteAllText(Path.Combine(output, "api-smoke.json"), JsonSerializer.Serialize(smoke, Audit.JsonOptions));
// Broader container round-trips are reported separately from the browser contract suite.
var otherContainers=new List<object>();var extractorFiles=new List<string>(familyFixtures);
var browserVersions=new[]{GameVersion.HG,GameVersion.SS,GameVersion.B2,GameVersion.W2,GameVersion.X,GameVersion.Y,GameVersion.OR,GameVersion.AS,GameVersion.US,GameVersion.UM};
foreach(var version in versions.Where(v=>!browserVersions.Contains(v)))
{
    try
    {
        var language=version is GameVersion.GN or GameVersion.BU?LanguageID.Japanese:LanguageID.English;
        var model=version is GameVersion.R or GameVersion.S or GameVersion.E or GameVersion.FR or GameVersion.LG?
            SyntheticGba(version):version is GameVersion.D or GameVersion.P or GameVersion.Pt?SyntheticSinnoh(version):BlankSaveFile.Get(version,"SYNTH",language);
        SeedContainerMetadata(model);
        var container=model.Write().ToArray();
        var parsedContainer=SaveUtil.GetSaveFile(container.ToArray().AsMemory());
        if(parsedContainer is null||!parsedContainer.ChecksumsValid)
        {
            otherContainers.Add(new{requested=version.ToString(),result="container-not-validated"});continue;
        }
        var name="container-"+version;
        var reportContainer=Audit.Extract(parsedContainer,Convert.ToHexStringLower(SHA256.HashData(container)),true);
        File.WriteAllBytes(Path.Combine(output,name+".sav"),container);
        File.WriteAllText(Path.Combine(output,name+".json"),JsonSerializer.Serialize(reportContainer,Audit.JsonOptions));
        extractorFiles.Add(name);
        otherContainers.Add(new{requested=version.ToString(),result="synthetic-container-read",game=reportContainer["game"],format=parsedContainer.GetType().Name});
    }
    catch(Exception e){otherContainers.Add(new{requested=version.ToString(),result="container-pending",reason=e.GetType().Name});}
}
File.WriteAllText(Path.Combine(output,"container-smoke.json"),JsonSerializer.Serialize(otherContainers,Audit.JsonOptions));
File.WriteAllText(Path.Combine(output,"extractor-fixture-index.json"),JsonSerializer.Serialize(extractorFiles));
Console.WriteLine("Synthetic HGSS detection, full integrity, fields, privacy and input immutability passed. API smoke report generated separately.");
