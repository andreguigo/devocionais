<template>
  <form @submit.prevent="iacall" class="form-container">
    <div class="form-group">
      <label for="theme">Tema desejado</label>
      <CustomSelect v-model="selectedTheme" :options="themes" />
    </div>

    <div class="form-group">
      <label for="mood">Como você está se sentido hoje?</label>
      <CustomSelect v-model="selectedMood" :options="moods" />
    </div>

    <button type="submit" class="submit-button" :disabled="disabledButton">Visualizar o seu devocional</button>
  </form>

  <div v-if="loading" class="result-container">
    <CustomLoader />
  </div>
</template>

<script>
import axios from "axios"
import { marked } from "marked"
import CustomSelect from "./ui/CustomSelect.vue"
import CustomLoader from "./ui/CustomLoader.vue"

export default {
  name: 'InsertDataForm',
  components: {
    CustomSelect,
    CustomLoader
  },
  data() {
    return {
      selectedTheme: '',
      themes: [
        { value: 'paz', label: 'Paz' },
        { value: 'gratidão', label: 'Gratidão' },
        { value: 'perseverança', label: 'Perseverança' },
        { value: 'sabedoria', label: 'Sabedoria' },
        { value: 'amor', label: 'Amor' }
      ],
      selectedMood: '',
      moods: [
        { value: 'ansioso', label: 'Ansioso' },
        { value: 'triste', label: 'Triste' },
        { value: 'reflexivo', label: 'Reflexivo' },
        { value: 'preocupado', label: 'Preocupado' }
      ],
      responseApi: '',
      loading: false,
      disabledButton: false
    }
  },
  computed: {
    generatedContent() {
      return `Crie uma frase em português brasileiro com o tema sobre ${this.selectedTheme} para alguém que está se sentindo ${this.SelectedMood}`
    }
  },
  emits: ['form-submitted'], 
  methods: {
    async iacall() {
      if (this.selectedMood == '' || this.selectedTheme == '') return
      this.loading = true
      this.disabledButton = true 
      try {
        const response = await axios.post('http://localhost:11434/api/generate', {
          model: "gemma2:2b",
          prompt: this.generatedContent,
          stream: false,
        })
        this.responseApi = response.data.response.toString()
      } catch (error) {
        console.error(error.message)
      } finally {
        this.loading = false
      }
      this.formSubmitted()
    },
    formSubmitted() {
      this.$emit("form-submitted", marked.parse(this.responseApi))
    }
  }
}
</script>