var CACHE_NAME = 'versefor-cache';

self.addEventListener("activate", event => {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            // console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    Promise.all([caches.open(CACHE_NAME), self.skipWaiting()])
      .then(function(cache) {
        fetch("asset-manifest.json")
          .then(response => {
            response.json()
          })
          .then(assets => {
            var urlsToCache = [
              "/",
              assets["main.js"]
            ]
            cache.addAll(urlsToCache)
            // console.log('cached');
          })
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
