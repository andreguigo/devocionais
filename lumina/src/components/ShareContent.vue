<template>
  <p class="clickshare" @click="shareContent">
    <span class="pi pi-share-alt"></span>
  </p>
</template>

<script>
export default {
  name: "ShareContent",
  props: {
    shareText: "",
    shareTitle: "Lumina Devocionais",
    shareUrl: window.location.href
  },
  methods: {
    textCopy() {
      navigator.clipboard.writeText(this.shareText)
    },
    async shareContent() {
      if (navigator.share) {
        try {
          await navigator.share({
            title: this.shareTitle,
            text: this.shareText,
            url: this.shareUrl
          })
        } catch (err) {
          console.log(err)
        }
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
  gap: 0.4rem;
  cursor: pointer; 
  padding: 0.5rem;
}
</style>