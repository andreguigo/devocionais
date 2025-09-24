<template>
  <p class="clicksave" @click="addContent">
    <span :class="iconClass"></span>
  </p>
</template>

<script>
export default {
  name: "SaveContent",
  data() {
    return {
      saved: false,
      db: null,
    }
  },
  props: {
    saveText: "",
  },
  computed: {
    iconClass() {
      return this.saved ? "pi pi-bookmark-fill" : "pi pi-bookmark"
    }
  },
  mounted() {
    this.openDB();
  },
  methods: {
    openDB() {
      const request = window.indexedDB.open("LuminaDB", 1)
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        if (!db.objectStoreNames.contains("devocionais")) {
          db.createObjectStore("devocionais", { keyPath: "id", autoIncrement: true })
        }
      }
      request.onsuccess = (event) => {
        this.db = event.target.result
        this.loadContent()
      }
      request.onerror = (event) => {
        console.log('error opening database', event)
      }
    },
    addContent() {
      const tx = this.db.transaction("devocionais", "readwrite")
      const store = tx.objectStore("devocionais")
      const content = {
        text: this.saveText
      }
      store.add(content)
      tx.oncomplete = () => {
        this.saved = !this.saved
        this.saveText
        this.loadContent()
      }
    },
    loadContent() {
      const tx = this.db.transaction("devocionais", "readonly");
      const store = tx.objectStore("devocionais");
      const request = store.getAll();
      request.onsuccess = () => {
        this.devocionais = request.result;
      };
    }
  }
}
</script>

<style scoped>
@import 'primeicons/primeicons.css';
.clicksave {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer; 
  padding: 0.5rem;
}
</style>