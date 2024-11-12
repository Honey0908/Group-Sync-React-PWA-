/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

console.log('Service Worker is registering...');

// Precaching assets
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', () => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', () => {
  console.log('Service Worker activated');
});

// Stale-While-Revalidate for rooms API
registerRoute(
  ({ url }) =>
    url.origin === 'http://localhost:5000' &&
    url.pathname.startsWith('/api/rooms/user/'),
  new StaleWhileRevalidate({
    cacheName: 'rooms-api-cache',
  })
);

self.addEventListener('push', (event) => {
  const data = event?.data?.json();

  const options = {
    body: data.message,
    icon: '/logo.svg',
    badge: '/logo.svg',
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
