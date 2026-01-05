import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores'
import { ROLE } from '../helper/EnumSystem'
import MainLayout from '../components/MainLayout.vue'

import {
  LoginPage,
  AdminPage,
  UserPage,
  ErrorPage,
  DashboardPage,
  ScannerPage
} from '../views/'

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/",
    component: MainLayout, 
    meta: { requiresAuth: true },
    children: [
      {
        path: "admin",
        name: "Admin",
        component: AdminPage,
        meta: { role: ROLE.ADMIN },
      },
      {
        path: "user",
        name: "User",
        component: UserPage,
        meta: { role: ROLE.USER },
      },
      {
        path: "scanner",
        name: "Scanner",
        component: ScannerPage,
        meta: { role: ROLE.ADMIN },
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: DashboardPage,
        meta: { role: ROLE.ADMIN },
      },
      {
        path: "error",
        name: "Error",
        component: ErrorPage,
        props: true,
      },
      { path: "", redirect: "/login" }
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/error" },
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
      return next('/login')
    }

    type Role = typeof ROLE[keyof typeof ROLE]
    const currentRole: Role = authStore.isAdmin ? ROLE.ADMIN : ROLE.USER

    if (to.meta.role && to.meta.role !== currentRole) {
      return next('/login')
    }
  }

  next()
})

export default router
