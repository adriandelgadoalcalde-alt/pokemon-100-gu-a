// SPDX-License-Identifier: GPL-3.0-or-later
using System.Security.Cryptography;
using System.Text.Json;
using PKHeX.Core;
using Pokemon.SaveAudit;

if (args.Length is < 2 or > 3 || (args.Length == 3 && args[2] != "--include-events"))
{
    Console.Error.WriteLine("Uso: Pokemon.SaveAudit <guardado> <nuevo-diagnostico.json> [--include-events]");
    return 2;
}
try
{
    var input = Path.GetFullPath(args[0]); var output = Path.GetFullPath(args[1]);
    if (input == output || File.Exists(output)) throw new AuditInputException("El destino debe ser un archivo nuevo; nunca se sobrescribe un archivo existente.");
    var info = new FileInfo(input);
    if (!info.Exists || info.Length is <= 0 or > 64 * 1024 * 1024) throw new AuditInputException("Selecciona un guardado interno de hasta 64 MiB.");
    var original = File.ReadAllBytes(input);
    var hash = Convert.ToHexStringLower(SHA256.HashData(original));
    // Upstream receives a copy; no reference to the original file is passed to it.
    var save = SaveUtil.GetSaveFile(original.ToArray().AsMemory()) ?? throw new AuditInputException("PKHeX no reconoce este formato de guardado.");
    if (!save.ChecksumsValid) throw new AuditInputException("El guardado no supera los controles de integridad de PKHeX. No se ha generado un diagnóstico acreditable.");
    var report = Audit.Extract(save, hash, args.Length == 3);
    if (hash != Convert.ToHexStringLower(SHA256.HashData(File.ReadAllBytes(input)))) throw new AuditInputException("El archivo cambió durante la lectura; repite el análisis con una copia estable.");
    var json = JsonSerializer.SerializeToUtf8Bytes(report, Audit.JsonOptions);
    var temporary = Path.Combine(Path.GetDirectoryName(output)!, ".pokemon-audit-" + Path.GetRandomFileName());
    try
    {
        var options = new FileStreamOptions { Mode = FileMode.CreateNew, Access = FileAccess.Write, Share = FileShare.None };
        if (!OperatingSystem.IsWindows()) options.UnixCreateMode = UnixFileMode.UserRead | UnixFileMode.UserWrite;
        using (var stream = new FileStream(temporary, options)) { stream.Write(json); stream.Flush(true); }
        File.Move(temporary, output, overwrite: false);
    }
    finally { if (File.Exists(temporary)) File.Delete(temporary); }
    Console.WriteLine("Diagnóstico local creado. Original intacto; no se ha enviado ningún archivo.");
    return 0;
}
catch (AuditInputException e)
{
    // Never include a trainer, raw save contents, or a private input path in diagnostics.
    Console.Error.WriteLine(e.Message);
    return 1;
}
catch (Exception)
{
    Console.Error.WriteLine("No se pudo interpretar este guardado de forma fiable. No se ha creado un diagnóstico ni modificado el original.");
    return 1;
}
file sealed class AuditInputException(string message) : Exception(message);
