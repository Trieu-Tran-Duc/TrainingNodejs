import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'
import AdminPage from '../views/AdminPage.vue'
import UserPage from '../views/UserPage.vue'
import { useAuthStore } from '../stores'


const routes = [
  { path: '/', name: 'Login', component: LoginPage },
  { path: '/admin', name: 'Admin', component: AdminPage, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/user', name: 'User', component: UserPage, meta: { requiresAuth: true, role: 'user' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()


  next()
})

export default router
