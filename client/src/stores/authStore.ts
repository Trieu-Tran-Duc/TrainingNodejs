import { defineStore } from 'pinia'
import type { User, LoginRequest } from '../types/user'
import { loginApi } from '../services'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    stateCurrentUser: null as User | null,
    stateIsAdmin: false,
    error: '' as string
  }),
  getters: {
    isLoggedIn: (state) => !!state.stateCurrentUser,
    isAdmin: (state) => state.stateIsAdmin,
    currentUser: (state) => state.stateCurrentUser
  },
  actions: {
    async login(payload: LoginRequest) {
      this.error = ''
      try {
        const response = await loginApi(payload)
        this.stateCurrentUser = response.user
        this.stateIsAdmin = response.user.role === 'admin'
        localStorage.setItem('user', JSON.stringify(response.user))

        if (response.user.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/user')
        }

      } catch (err: unknown) {
        this.error = (err as Error).message
      } 
    },
    async refreshToken() {
      // const res = await api.post('/auth/refresh')
      // this.user = res.data.user
      return null
    },
    logout() {
      this.stateCurrentUser = null
      this.stateIsAdmin = false
      localStorage.removeItem('user')
      router.push('/login')
    },
    loadUserFromStorage() {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        try {
          const user = JSON.parse(userStr) as User
          this.stateCurrentUser = user
          this.stateIsAdmin = user.role === 'admin'
        } catch (err) {
          console.error('Failed to parse user from localStorage', err)
          this.stateCurrentUser = null
          this.stateIsAdmin = false
          localStorage.removeItem('user')
        }
      } else {
        this.stateIsAdmin = false
      }
    }
  }
})
