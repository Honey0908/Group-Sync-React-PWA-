import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',

      filename: 'service-worker.ts',
      registerType: 'autoUpdate',

      injectRegister: 'auto',
      manifest: false,

      workbox: {
        globPatterns: ['**/*.{html,js,ts,tsx,css,png,jpg}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: new RegExp('http://localhost:5000/api/rooms/user/.*'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'rooms-api-cache',
              expiration: {
                maxEntries: 50, // Cache up to 50 API responses
                maxAgeSeconds: 24 * 60 * 60, // Cache responses for 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200], // Cache successful and opaque responses
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
});
