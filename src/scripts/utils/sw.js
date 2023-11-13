import 'regenerator-runtime/runtime';
import { setCacheNameDetails } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

setCacheNameDetails({
  prefix: 'find-resto',
  suffix: 'v1',
  precache: 'precache',
  runtime: 'runtime',
});

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'my-resto-cache',
  }),
);

registerRoute(
  /^https:\/\/restaurant-api\.dicoding\.dev\/(?:(list|detail))/,
  new NetworkFirst({
    cacheName: 'dicoding-resto-api-cache',
    plugins: [
      new ExpirationPlugin({
        // Only cache requests for a month 60 seconds * 60 minutes * 24 hours * 30 days
        maxAgeSeconds: 60 * 60 * 24 * 30,
        // max item in cache 100
        maxEntries: 100,
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'resto-image-cache',
    plugins: [
      new ExpirationPlugin({
        // Only cache requests for a month 60 seconds * 60 minutes * 24 hours * 30 days
        maxAgeSeconds: 60 * 60 * 24 * 30,
        // max item in cache 50
        maxEntries: 50,
      }),
    ],
  }),
);

// cache fonts request
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'resto-google-fonts-cache',
    // max item in cache 50
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  }),
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
  ({ request }) => request.destination === 'style'
  || request.destination === 'script'
  || request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'resto-assets-cache',
  }),
);

cleanupOutdatedCaches();

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('push', (event) => {
  const parseNotif = JSON.parse(event.data);
  const notificationData = {
    title: parseNotif.title,
    options: {
      body: parseNotif.body,
      icon: '/favicon.png',
      image: '/icons/512.png',
    },
  };
  const showNotification = self.registration.showNotification(
    notificationData.title,
    notificationData.options,
  );
  event.waitUntil(showNotification);
});
