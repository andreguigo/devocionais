<template>
  <div class="install-container">
    <p v-if="!swActive">Checking offline support...</p>

    <button
			v-if="swActive && deferredPrompt"
      @click="installApp"
      class="install-button"
    >
      <span class="pi pi-download"></span> &nbsp; Instalar App
    </button>

    <p v-if="installed">App instalado!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deferredPrompt: null,
      swActive: false,
      installed: false,
    };
  },
  mounted() {
		// PWA is eligible
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault(); // prevent automatic banner
      this.deferredPrompt = e;
      console.log('PWA eligible for installation!');

      // here you can do analytics or show custom button
      console.log('Event beforeinstallprompt:', e);
    });

    // detects if the app has already been installed
    window.addEventListener('appinstalled', () => {
      console.log('PWA has been installed!');
      this.deferredPrompt = null;
    });
		
    // if Service Worker is active
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        this.swActive = true;
        console.log('Active Service Worker. Works offline.');
      });
    }

    // beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      console.log('Detected beforeinstallprompt event');
    });

    // app is installed
    window.addEventListener('appinstalled', () => {
      this.installed = true;
      this.deferredPrompt = null;
      console.log('Installed app sucessfully');
    });
  },
  methods: {
    async installApp() {
      if (!this.deferredPrompt) return;
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      console.log(`User responded to prompt: ${outcome}`);
      this.deferredPrompt = null;
    },
  },
};
</script>

<style scoped>
@import 'primeicons/primeicons.css';
.install-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  text-align: center;
}
.install-button {
  background: #0078ff;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  font-size: 15px;
}
.install-button:hover {
	transform: scale(1.1);
	transition: transform 0.2s ease;
}
</style>
