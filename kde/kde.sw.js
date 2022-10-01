this.addEventListener("install", (event) => {
 event.waitUntil(
  caches
   .open("v1")
   .then((cache) =>
    cache.addAll([
     "/k.js",
     "/k.wasm",
     "/kde/kwork.js",
     "/kde/index.html",
     "/kde/kde.js",
     "/kde/k.mode.js",
     "/kde/k.mode.css",
     "/icon.svg"
    ])
   )
  )
})

self.addEventListener('fetch', function(event) {
 event.respondWith(
  caches.match(event.request).then(function(response) {
   if(response){
    //new headers to enable high resolution timers for performance.now()
    const h=new Headers(response.headers)
    h.set("Cross-Origin-Embedder-Policy", "require-corp")
    h.set("Cross-Origin-Opener-Policy", "same-origin")
    const r=new Response(response.body, {
     status: response.status,
     statusText: response.statusText,
     headers: h,
    });
    return r
   }
   return fetch(event.request);
  })
 );
});

self.addEventListener("activate",event=>{})
self.addEventListener("beforeinstallprompt",event=>{})
