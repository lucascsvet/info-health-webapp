import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue'), meta: { guest: true } },
  { path: '/acesso/:id', name: 'public-login', component: () => import('../views/PublicLoginView.vue'), props: true },
  { path: '/registro', name: 'register', component: () => import('../views/RegisterView.vue'), meta: { guest: true } },
  { path: '/', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { requiresAuth: true } },
  { path: '/qr-code', name: 'qr-code', component: () => import('../views/QrCodeView.vue'), meta: { requiresAuth: true, requiresNormalAuth: true } },
  { path: '/editar-dados', name: 'editar-dados', component: () => import('../views/RegisterView.vue'), meta: { requiresAuth: true, requiresNormalAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('auth_token')
  const isAuth = !!token
  const isPublicLogin = localStorage.getItem('auth_public_login') === 'true'

  if (to.meta.requiresAuth && !isAuth) return next('/login')
  if (to.meta.requiresNormalAuth && isPublicLogin) return next('/')
  if (to.meta.guest && isAuth) return next('/')
  next()
})

export default router
