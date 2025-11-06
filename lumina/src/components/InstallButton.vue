<template>
  <div class="install-container">
    <p v-if="!swActive">Checking offline support...</p>
    <button
			v-if="swActive && deferredPrompt"
      @click="installApp"
      class="install-button"
    >
      <span :class="plataform"></span> &nbsp; Instalar como app
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
      plataform: ''
    };
  },
  mounted() {
    this.detectPlatform()
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault() // prevent automatic banner
      this.deferredPrompt = e
    })

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null
    })		

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        this.swActive = true
      })
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.deferredPrompt = e
    })

    window.addEventListener('appinstalled', () => {
      this.installed = true
      this.deferredPrompt = null
    })
  },
  methods: {
    async installApp() {
      if (!this.deferredPrompt) return
      this.deferredPrompt.prompt()
      const { outcome } = await this.deferredPrompt.userChoice
      this.deferredPrompt = null
    },
    detectPlatform() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera      
      if (/android/i.test(userAgent)) { return this.plataform = 'pi pi-android' }
      else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) { return this.plataform = 'pi pi-apple' }
      else { return this.plataform = 'pi pi-desktop' }
    },
  },
};
</script>

<style scoped>
@import 'primeicons/primeicons.css';
.install-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  text-align: center;
}
.install-button {
  background: white;
  color: #2b7dda;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  font-size: 10pt;
}
.install-button:hover {
	transform: scale(1.1);
	transition: transform 0.2s ease;
}
</style>
