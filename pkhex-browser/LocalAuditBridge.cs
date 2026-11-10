// SPDX-License-Identifier: GPL-3.0-or-later
using Microsoft.JSInterop;
using PKHeX.Core;
using Pokemon.SaveAudit;
using System.Security.Cryptography;
using System.Text.Json;
public static class LocalAuditBridge
{
 [JSInvokable]
 public static string Analyze(string encoded)
 {
  try
  {
   if(encoded.Length>12*1024*1024)throw new ArgumentException();
   var original=Convert.FromBase64String(encoded);
   if(original.Length is <=0 or >8*1024*1024)throw new ArgumentException();
   var hash=Convert.ToHexStringLower(SHA256.HashData(original));
   var save=SaveUtil.GetSaveFile(original.ToArray().AsMemory());
   if(save is null)return JsonSerializer.Serialize(new{ok=false,error="Formato no reconocido"});
   if(!save.ChecksumsValid)return JsonSerializer.Serialize(new{ok=false,error="Integridad no válida"});
   var report=Audit.Extract(save,hash,true);
   if(hash!=Convert.ToHexStringLower(SHA256.HashData(original)))throw new InvalidOperationException();
   return JsonSerializer.Serialize(new{ok=true,diagnosis=report},Audit.JsonOptions);
  }
  catch{return JsonSerializer.Serialize(new{ok=false,error="No se ha podido interpretar el guardado"});}
 }
}
