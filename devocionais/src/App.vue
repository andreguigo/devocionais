<template>
    <div class="app-container">
        <!-- Header -->
        <header class="header">
            <h1 class="app-title">Lumina</h1>
            <h3>Receba uma palavra de fé sob medida para sua alma, a cada acesso.</h3>
        </header>

        <!-- Main content -->
        <main class="main-content">
            <InsertDataForm />
            <!-- <ResultData /> -->
        </main>

    <!-- Footer -->
        <footer class="footer">
            <h5>&copy; 2025 Lumina Devocional. Todos os direitos reservados.</h5>
        </footer>
    </div>
</template>

<script>
import './assets/app.css'

import InsertDataForm from './components/InsertDataForm.vue'
import ResultData from './components/ResultData.vue'
import Donation from './components/Donation.vue'

export default {
    name: 'App',
    components: {
        InsertDataForm,
        ResultData,
        Donation
    }
}
</script>