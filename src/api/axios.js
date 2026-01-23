import axios from "axios";
import { useDevotionalStore } from '@/stores/devotional'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {}
})

api.interceptors.request.use(config => {
    const apiKey = import.meta.env.VITE_LUMINA_ACCESS_KEY;
    
    if (apiKey) 
        config.headers['x-api-key'] = apiKey;
    
    return config;
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