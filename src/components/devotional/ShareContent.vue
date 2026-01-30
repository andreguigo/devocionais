<template>
  <p class="clickshare" @click="shareContent">
    <span class="pi pi-share-alt"></span> compartilhar
  </p>
</template>

<script>
export default {
  name: "ShareContent",
  props: {
    shareText: String,
    shareTitle: { 
      type: String, 
      default: "Lumina Devocionais"
    },
    shareUrl: window.location.href
  },
  methods: {
    textCopy() {
      navigator.clipboard.writeText(this.shareText)
    },
    async shareContent() {
      if (navigator.share) {
        await navigator.share({
          title: this.shareTitle,
          text: `${this.shareText} \n\nLumina Devocionais \nhttps://www.luminadevocionais.com/`,
          url: this.shareUrl
        })
      } else { // fallback for desktop or browsers
        this.textCopy()
        alert('Your browser does not support direct sharing. The text has been copied.')
      }
    }
  }
}
</script>

<style scoped>
@import 'primeicons/primeicons.css';
.clickshare {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer; 
  padding: 0.7rem;
}
</style>