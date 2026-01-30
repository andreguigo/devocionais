import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useDevotionalStore = defineStore('devotional', {
    state: () => ({
        devotional: null,
        loading: false,
        error: null
    }),

    actions: {
        async fetchDevotionalByThemeAndMood(theme, mood) {
            this.loading = true
            this.error = null
            try {
                const response = await api.get(`/src?theme=${theme}&mood=${mood}`)
                this.devotional = response.data.message
            } catch (error) {
                this.error = error.response?.data?.message
            } finally {
                this.loading = false
            }
        }
    }
})