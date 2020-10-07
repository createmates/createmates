const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
//cache--->storage of the browser
//if we load something once---we don't have to reload it--and take it from the cache

//now need 3 events:

//install SW
//in here is where we open the cache
//add the html files
//call event.waitUntil to wait for the caches

const self = this;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});
//self means the service worker itself
//it's a restricted global so we have to use "const" = this

//Listen for requests

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

//Activate the SW

self.addEventListener("activate", (event) => {
  //may have a lot of versions of our cache---and they may get changed
  //so we're going to remove previous caches and keep the new one
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    ) //also returns a promise
  );
});
