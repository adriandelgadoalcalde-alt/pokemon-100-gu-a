const CACHE='pokemon-100-v9-11-gba-progress';
const CORE=['./src/saves/species.js','./src/engine/completion.js','./src/guides/frlg.js','./src/guides/ice-puzzle.js','./src/guides/hoenn.js','./src/saves/public-coverage.js','./src/saves/core-browser.js','./src/guides/routes.js','./','./index.html','./manifest.webmanifest','./icons/icon.svg','./atlas.html','./src/saves/hgss-integrity.js','./src/saves/progress.js','./src/saves/chronology.js','./src/saves/reader.js','./src/saves/integrity.js','./src/saves/diagnosis.js','./src/engine/objectives.js','./src/engine/route.js'];
self.addEventListener('install',event=>event.waitUntil(
 caches.open(CACHE).then(cache=>cache.addAll(CORE.map(url=>new Request(url,{cache:'reload'}))))
 .then(()=>self.skipWaiting())
));
self.addEventListener('activate',event=>event.waitUntil(
 caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('pokemon-100-')&&key!==CACHE).map(key=>caches.delete(key))))
 .then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
 const request=event.request;if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{
  if(response.ok){const copy=response.clone();
   event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{}));
  }
  return response;
 }).catch(()=>caches.match('./index.html'))));
});
