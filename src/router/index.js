import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue'), meta: { guest: true } },
  { path: '/registro', name: 'register', component: () => import('../views/RegisterView.vue'), meta: { guest: true } },
  { path: '/', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('auth_token')
  const isAuth = !!token

  if (to.meta.requiresAuth && !isAuth) return next('/login')
  if (to.meta.guest && isAuth) return next('/')
  next()
})

export default router
