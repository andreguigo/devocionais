import axios from "axios";
import { useDevotionalStore } from '@/stores/devotional'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {}
})

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            const devotional = useDevotionalStore()
            devotional.$reset()
        }
        return Promise.reject(error)
    }
)

export default api;