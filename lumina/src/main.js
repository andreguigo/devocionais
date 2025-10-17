import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Registered Service Worker:', reg);
    } catch (err) {
      console.error('Error registering Service Worker:', err);
    }
  });
}