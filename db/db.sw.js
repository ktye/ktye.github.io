this.addEventListener("install", (event) => {
 console.log("sw install");
 event.waitUntil(
  caches
   .open("v1")
   .then((cache) =>
    cache.addAll([
     "index.html",
     "../k.wasm",
     "ref",
     "kelas16.png",
     "kelas32.png",
     "queries.k",
     "db"
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
