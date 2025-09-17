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
    </main>

    <!-- footer -->
    <footer class="footer">
      <h5>&copy; 2025 Lumina Devocional. Todos os direitos reservados.</h5>
    </footer>
  </div>
</template>

<script>
import '../assets/app.css'
import InsertDataForm from '../components/InsertDataForm.vue'
import ResultData from '../components/ResultData.vue'

export default {
  name: 'Default',
  components: {
    InsertDataForm,
    ResultData
  },
  data() {
    return {
      response: ''
    }
  },
  methods: {
    updateResult(value) {
      this.response = value
    }
  }
}
</script>