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
      return `Escreva uma pequena reflexão bíblica sobre ${this.selectedTheme} com o sentimento ${this.selectedMood} em linguagem simples com uma oração guiada no final`
    }
  },
  emits: ['form-submitted'], 
  methods: {
    async iacall() {
      if (this.selectedMood == '' || this.selectedTheme == '') return
      this.loading = true
      this.disabledButton = true 
      try {
        const response = await axios.post('https://router.huggingface.co/v1/chat/completions',
        {
          messages: [
            {
              role: "user",
              content: this.generatedContent
            }
          ],
          model: "deepseek-ai/DeepSeek-V3-0324",
          stream: false
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN_IA}`,
            "Content-Type": "application/json"
          }
        })        
        this.responseApi = response.data.choices[0].message.content.toString()
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