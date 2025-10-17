const CACHE_NAME = 'pwa-cache-v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        '/',
        '/index.html',
        '/offline.html',
        '/favicon.ico',
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // ignores requests that are not http(s)
  if (!url.protocol.startsWith('http')) return;

  // cache-first strategy
  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request).catch(() => {
          // fallback to offline.html
          if (request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
        })
      );
    })
  );
})