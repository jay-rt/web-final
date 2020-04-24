const cacheName = `quiz-cache`

self.addEventListener("install", event => {
    event.waitUntil(caches.open(cacheName).then(cache => {
      return cache.addAll([
        "/circle.png",
        "/index.html",
        "/script.js",
        "/style.css"
        ])
    }))
  })


self.addEventListener("fetch", event => {
event.respondWith(
    caches.open(cacheName).then(cache => {
    return cache.match(event.request.url).then(response => {
        return response || fetch(event.request.url)
    })
    }))
})