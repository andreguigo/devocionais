import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    await navigator.serviceWorker.register('/service-worker.js');
  });
}