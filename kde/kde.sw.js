this.addEventListener("install", (event) => {
 event.waitUntil(
  caches
   .open("v1")
   .then((cache) =>
    cache.addAll([
     "/k.js",
     "/k.wasm",
     "/kde/index.html",
     "/kde/kde.js",
     "/icon.svg"
    ])
   )
  )
})

self.addEventListener('fetch', function(event) {
 event.respondWith(
  caches.match(event.request).then(function(response) {
   return response || fetch(event.request);
  })
 );
});

self.addEventListener("activate",event=>{})
self.addEventListener("beforeinstallprompt",event=>{})
