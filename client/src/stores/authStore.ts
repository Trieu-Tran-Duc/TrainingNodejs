import { defineStore } from 'pinia'
import type { User, LoginRequest } from '../types/user'
import { loginApi } from '../services'
import router from '../router'
import { ROLE } from '../helper/EnumSystem'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null as User | null,
    isAdmin: false,
    isLoggedIn: false,
    error: '' as string,
    role: '' as string
  }),
  getters: {
    getCurrentUser: (state) => state.currentUser,
    getIsAdmin: (state) => state.isAdmin,
    getIsLoggedIn: (state) => state.isLoggedIn,
    getError: (state) => state.error
  },
  actions: {
    async login(payload: LoginRequest) {
      this.error = ''
      try {
        const response = await loginApi(payload)

        if (!response || !response.success) {
          this.error = response?.message || 'Login failed'
          this.isLoggedIn = false
          return
        }

        this.currentUser = response.user
        this.isAdmin = response.user.role === ROLE.ADMIN
        this.isLoggedIn = true
        this.role = response.user.role
        localStorage.setItem('user', JSON.stringify(response.user))

        router.push(this.isAdmin ? '/admin' : '/user')

      } catch (err: unknown) {

        if (err instanceof Error) {
          this.error = 'Something went wrong'
        } else {
          this.error = 'An unexpected error occurred'
        }
        router.push({ path: '/error', query: { message: this.error } })

        this.isLoggedIn = false
      }
    },

    async refreshToken() {
      return null
    },

    logout() {
      this.currentUser = null
      this.isAdmin = false
      this.isLoggedIn = false
      this.role = ''
      localStorage.removeItem('user')
      router.push('/login')
    },

    loadUserFromStorage() {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        try {
          const user: User = JSON.parse(userStr)
          this.currentUser = user
          this.isAdmin = user.role === ROLE.ADMIN
          this.isLoggedIn = true
          this.role = user.role
        } catch (err) {
          console.error('Failed to parse user from localStorage', err)
          this.logout() 
        }
      } else {
        this.isAdmin = false
        this.isLoggedIn = false
      }
    }
  }
})
