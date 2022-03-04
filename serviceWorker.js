/* eslint no-restricted-globals: "off" */

self.addEventListener('install', event => {
  event.waitUntil(Promise.resolve());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim()); // make Chrome happy
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
