import axios from 'axios'
import { useAuthStore } from '../stores/authStore'
import router from '../router'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
})
const bypassRoutes = ['/api/login', '/api/register']
api.interceptors.response.use(
  (response) => response,
  
  async (error) => {
    
    const authStore = useAuthStore()
    const originalRequest = error.config

    if (bypassRoutes.includes(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 500) {
      router.push({ path: '/error', query: { message: 'Internal Server Error' } })
      return Promise.reject(error)
    }

    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      router.push({ path: '/error', query: { message: 'Cannot connect to server' } })
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await authStore.refreshToken()
        return api(originalRequest) 

      } catch (err) {
        authStore.logout()
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
)

export default api
