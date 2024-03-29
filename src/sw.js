const cacheVersion = 'v2';
const filesToCache = [
  '0.chunk.js',
  'favicon.ico',
  'index.html',
  'inline.bundle.js',
  'main.bundle.js',
  'polyfills.bundle.js',
  'register_sw.js',
  'styles.bundle.css',
  'vendor.bundle.js',
  '/assets/images/android_048.png',
  '/assets/images/android_057.png',
  '/assets/images/android_072.png',
  '/assets/images/android_076.png',
  '/assets/images/android_096.png',
  '/assets/images/android_114.png',
  '/assets/images/android_120.png',
  '/assets/images/android_144.png',
  '/assets/images/android_152.png',
  '/assets/images/android_167.png',
  '/assets/images/android_180.png',
  '/assets/images/android_192.png',
  '/assets/images/android_512.png'
];

self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheVersion)
    .then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys()
    .then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheVersion) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('[ServiceWorker] fetch', event.request);
  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
  );
});
