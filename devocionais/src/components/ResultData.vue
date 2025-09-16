<template>
  <div v-if="result" class="result-container">
    <h2 class="result-title">Seu Devocional</h2>
    <div class="result-content">
      <div v-html="result"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultData',
  props: {
    result: String
  }
}
</script>