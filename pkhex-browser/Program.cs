// SPDX-License-Identifier: GPL-3.0-or-later
using PKHeX.Core;
using Pokemon.LocalReader;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.JSInterop;
RuntimeCryptographyProvider.Md5 = new BrowserMd5();
var builder = WebAssemblyHostBuilder.CreateDefault(args);
var host = builder.Build();
await host.Services.GetRequiredService<IJSRuntime>().InvokeVoidAsync("pokemonLocalAssemblyReady");
await host.RunAsync();
