<template>
  <h3>Devocionais salvos</h3>
  <ul>
    <li v-for="dev in devocionais" :key="dev.id">
      <p>{{ dev.text.slice(0,50) }}...</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ListContent",
  data() {
    return {
      db: null,
      devocionais: []
    }
  },
  mounted() {
    this.openDB()
  },
  methods: {
    openDB() {
      const request = window.indexedDB.open("LuminaDB", 1)
      request.onsuccess = (event) => {
        this.db = event.target.result
        this.loadContent()
      }
      request.onerror = (event) => {
        console.log('error opening database', event)
      }
    },
    loadContent() {
      const tx = this.db.transaction("devocionais", "readonly")
      const store = tx.objectStore("devocionais")
      const request = store.getAll()
      request.onsuccess = () => {
        this.devocionais = request.result
      }
    }
  }
}
</script>