/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies';
import { BackgroundSyncPlugin } from 'workbox-background-sync';

self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

// Precaching assets
precacheAndRoute(self.__WB_MANIFEST);

// Stale-While-Revalidate for rooms API
registerRoute(
  ({ url }) =>
    url.origin === import.meta.env.VITE_REACT_APP_API_URL &&
    url.pathname.startsWith('/api/rooms/user/'),
  new StaleWhileRevalidate({
    cacheName: 'rooms-api-cache',
  })
);

const bgSyncPlugin = new BackgroundSyncPlugin('sync-room', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
  onSync: async ({ queue }) => {
    let entry;
    // shift each request from queue and upload it
    while ((entry = await queue.shiftRequest())) {
      try {
        const options: NotificationOptions = {
          body: 'Syncing Rooms in background',
          icon: '/logo.svg',
          dir: 'ltr',
          lang: 'en-US',
          badge: '/logo.svg',
        };

        self.registration.showNotification('Syncing Rooms', options);
        await fetch(entry.request.clone());
      } catch (error) {
        // if request fails, again add it in queue
        const options: NotificationOptions = {
          body: 'failed to sync, will retry later',
          icon: '/logo.svg',
          dir: 'ltr',
          lang: 'en-US',
          badge: '/logo.svg',
        };

        self.registration.showNotification('Syncing failed', options);

        await queue.unshiftRequest(entry);
        throw error;
      }
    }
  },
});

// attach background sync plugin to post request
registerRoute(
  ({ url }) => url.pathname === '/api/rooms/create',
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);

// attach background sync plugin to post request
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/rooms/join/'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
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
