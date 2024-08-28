import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [    
    {
      path: '/',
      name: 'inicio',
      component: () => import('../views/Inicio.vue')
    }
  ]
})

export default router
