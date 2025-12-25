import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

const api = axios.create({
  baseURL: 'https://your-api.com',
  withCredentials: true
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await authStore.refreshToken()
        return api(originalRequest) 

      } catch (err) {
        authStore.logout()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api
