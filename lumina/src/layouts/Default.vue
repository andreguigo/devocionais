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
      
      <div v-if="response">
        <ShareContent
          :shareText=responseMkd
          shareTitle
          url
        />
        <!--
        <SaveContent
          :saveText=responseMkd
        />
        -->
      </div>
    </main>
    
    <Donate />
    <InstallButton />
    
    <!-- footer -->
    <footer class="footer">
      <div class="tooltip-container">
        <h5>Desenvolvido com <i class="pi pi-heart-fill"></i> por 
          Lumina Devocionais
          <span class="tooltip-text">
            Lumina Devocionais é um projeto independente desenvolvido por André Albuquerque, cristão e analista de sistemas. Atualmente é seminarista pelo Seminário Teológico do Nazareno no Brasil e atua em alguns ministérios da igreja na cidade de Paulista - PE.
          </span>
        </h5>
      </div>
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
import Donate from '@/components/Donate.vue'
import InstallButton from '@/components/InstallButton.vue'

export default {
  name: 'Default',
  components: {
    InsertDataForm,
    ResultData,
    ShareContent,
    SaveContent,
    ListContent,
    Donate,
    InstallButton
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
      this.$refs.ListContent.init()
    }
  }
}
</script>

<style scoped>
@import 'primeicons/primeicons.css';
</style>