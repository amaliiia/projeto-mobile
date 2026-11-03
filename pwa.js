import { Platform } from 'react-native';

// Liga o manifest e o service worker (só na web).
export function iniciarPWA() {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  const add = (tag, attrs) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  };
  add('link', { rel: 'manifest', href: '/manifest.json' });
  add('link', { rel: 'apple-touch-icon', href: '/icon-192.png' });
  add('meta', { name: 'theme-color', content: '#0f766e' });
  if (!__DEV__ && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
}
