export default function registerSW() {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      const swUrl =
        import.meta.env.MODE === 'production'
          ? '/service-worker.js'
          : '/dev-/ sw.js?dev-sw';
      navigator.serviceWorker.register(swUrl, { scope: '/', type: 'module' });
    }
  });
}
