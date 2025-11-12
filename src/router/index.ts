import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  history:
    import.meta.env.VITE_APP_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/AnalyzerView.vue'),
    },
    {
      path: '/usage',
      name: 'Usage',
      component: () => import('@/views/UsageView.vue'),
    },
  ],
})

export default router
