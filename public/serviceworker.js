const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html'];

// Install sw
// self or this means service worker here
const self = this;
self.addEventListener('install', (event) => {
    console.log("Indide install");
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("open cache");
            return cache.addAll(urlsToCache)
        })
    )
})

// Listen for requests
self.addEventListener('fetch', (event) => {
    console.log("inside fetch of sw ", event)
    event.respondWith(
        caches.match(event.request).then((data) => {
            return fetch(event.request).catch((err) => {
                console.log("Error in fetch request inside service worker ", err);
                return caches.match('offline.html');
            })
        })
    )
})

// acticate the sw
self.addEventListener('activate', (event) => {
    console.log("inside activate service worker");
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) =>{
            console.log("cache Names ", cacheNames)
            Promise.all(
                cacheNames.map((cacheName) => {
                    if(!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})


