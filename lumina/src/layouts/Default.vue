<template>
  <div class="app-container">
    <!-- header -->
    <header class="header">
      <h1 class="header-title">Lumina</h1>
      <h3>Receba uma palavra de fé sob medida para sua alma, a cada acesso.</h3>
    </header>

    <!-- main content -->
    <main class="main-content">
      <InsertDataForm @form-submitted="updateResult" />
      <ResultData :result="response" />
      <ShareContent
        :shareText=responseMkd
        shareTitle
        url
        v-if="response"
      />
      <SaveContent
        :saveText=responseMkd
        v-if="response"
      />
    </main>

    <!-- Spoiler: Nova funcionalidade de listar conteúdos salvos -->

    <!-- footer -->
    <footer class="footer">
      <h5>&copy; 2025 Lumina Devocional. Todos os direitos reservados.</h5>
    </footer>
  </div>
</template>

<script>
import '../assets/default.css'
import InsertDataForm from '../components/InsertDataForm.vue'
import ResultData from '../components/ResultData.vue'
import ShareContent from '@/components/ShareContent.vue'
import SaveContent from '@/components/SaveContent.vue'
import TurndownService from 'turndown'
import ListContent from '@/components/ListContent.vue'

export default {
  name: 'Default',
  components: {
    InsertDataForm,
    ResultData,
    ShareContent,
    SaveContent,
    ListContent
  },
  data() {
    return {
      response: "",
      responseMkd: ""
    }
  },
  methods: {
    updateResult(value) {
      this.response = value      
      const turndownService = new TurndownService()
      this.responseMkd = turndownService.turndown(value) 
    }
  }
}
</script>