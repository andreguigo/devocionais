import { createRouter, createWebHistory } from 'vue-router'
import Default from '../layouts/DefaultLayout.vue'

const routes = [
  { path: '/', component: Default },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
