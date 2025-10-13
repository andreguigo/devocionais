<template>
  <div class="result-container">
    <h2 v-if="devocionais.length>=1" class="result-title">Seus itens salvos</h2>
    <ul>
      <li v-for="(item, limit) in contentVisible" :key="item.id ?? limit">
        <div class="result-content">
          <small>Salvo em {{ item.modified }}</small>
          <div v-html="renderMarkdown(item.text)"></div>
        </div>
      </li>
    </ul>
    <button v-if="loadMoreContent" @click="loadMore" class="submit-button">Carregar mais...</button>
  </div>
</template>

<script>
import { marked } from "marked"

export default {
  name: "ListContent",
  data() {
    return {
      db: null,
      devocionais: [],
      limit: 1
    }
  },
  computed: {
    contentVisible() {
      return [...this.devocionais].reverse().slice(0, this.limit)
    },
    loadMoreContent() {
      return this.limit < this.devocionais.length
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
    },
    loadMore() {
      if (this.loadMoreContent) {
        this.limit += 1
      }
    },
    captureBold(txt){
      const regex = /^\*\*(.*?)\*\*/
      const match = txt.match(regex)
      return match ? match[1] : null
    },
    renderMarkdown(text) {
      return marked(text)
    }
  }
}
</script>