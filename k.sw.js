this.addEventListener("install", (event) => {
 console.log("sw install");
 event.waitUntil(
  caches
   .open("v1")
   .then((cache) =>
    cache.addAll([
     "/k.html",
     "/k.js",
     "/k.wasm",
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