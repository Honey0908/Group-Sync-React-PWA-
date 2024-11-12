import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

export default function registerSW() {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      console.log(import.meta.env.MODE);

      const swUrl =
        import.meta.env.MODE === 'production'
          ? '/sw.js'
          : '/dev-/ sw.js?dev-sw';

      navigator.serviceWorker.register(swUrl, { scope: '/', type: 'module' });
    }
  });
}
