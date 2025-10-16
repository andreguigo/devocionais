<template>
  <Analytics />
  <SpeedInsights />

  <Default />
</template>

<script>
import Default from './layouts/Default.vue'
import { Analytics } from '@vercel/analytics/vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'

export default {
  name: 'App',
  components: {
    Default,
    Analytics,
    SpeedInsights,
  }
}
</script>