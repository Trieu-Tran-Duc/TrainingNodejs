import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import AdminPage from '../views/AdminPage.vue'
import UserPage from '../views/UserPage.vue'
import { useAuthStore } from '../stores'
import { ROLE } from '../helper/EnumSystem'
import ErrorPage from '../views/ErrorPage.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/admin', name: 'Admin', component: AdminPage, meta: { requiresAuth: true, role: ROLE.ADMIN } },
  { path: '/user', name: 'User', component: UserPage, meta: { requiresAuth: true, role: ROLE.USER } },
  { path: '/error', component: ErrorPage, props: true },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  authStore.loadUserFromStorage()

  if (to.meta.requiresAuth) {
    
    if (!authStore.isLoggedIn) {
      return next('/')
    }

    type Role = typeof ROLE[keyof typeof ROLE]
    const currentRole: Role = authStore.isAdmin ? ROLE.ADMIN : ROLE.USER

    if (to.meta.role && to.meta.role !== currentRole) {
      return next('/')
    }

  }

  next()
})

export default router
