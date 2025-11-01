<template>
  <form @submit.prevent="callMongo" class="form-container">
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
import { track } from '@vercel/analytics'
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
        { value: 'amor', label: 'Amor' },
        { value: 'gratidão', label: 'Gratidão' },
        { value: 'paz', label: 'Paz' },
        { value: 'perseverança', label: 'Perseverança' },
        { value: 'sabedoria', label: 'Sabedoria' },
      ],
      selectedMood: '',
      moods: [
        { value: 'ansioso', label: 'Ansioso' },
        { value: 'feliz', label: 'Feliz' },
        { value: 'preocupado', label: 'Preocupado' },
        { value: 'reflexivo', label: 'Reflexivo' },
        { value: 'triste', label: 'Triste' }
      ],
      apiResponse: '',
      loading: false,
      disabledButton: false
    }
  },
  emits: ['form-submitted'], 
  methods: {
    async callMongo() {    
      if (this.selectedMood == '' || this.selectedTheme == '') return
      track('click_generate', {
        category: 'engagement',
        action: 'click_submit',
        timestamp: new Date().toISOString()
      })  
      this.loading = true
      this.disabledButton = true 
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}src?theme=${this.selectedTheme}&mood=${this.selectedMood}`,
        { 
          headers: { 
            "Content-Type": "application/json" 
          } 
        })
        
        this.apiResponse = response.data.message
      } catch (error) {
        console.error(error.message)
      } finally {
        this.loading = false
      }
      this.formSubmitted()
    },
    formSubmitted() {
      this.$emit("form-submitted", marked.parse(this.apiResponse))
    }
  }
}
</script>