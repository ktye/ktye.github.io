this.addEventListener("install", (event) => {
 console.log("sw install");
 event.waitUntil(
  caches
   .open("v1")
   .then((cache) =>
    cache.addAll([
     "/e.html",
     "/codemirror/codemirror.min.css",
     "/codemirror/codemirror.min.js",
     "/codemirror/jquery.min.js",
     "/codemirror/matchbrackets.js"
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

self.addEventListener("activate",event=>{
 console.log("Service worker activated");
})
self.addEventListener("beforeinstallprompt",event=>{
 console.log("Service worker before install");
})
