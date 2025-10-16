import { createRouter, createWebHistory } from 'vue-router'
import Default from '../layouts/Default.vue'

const routes = [
  { path: '/', component: Default },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
