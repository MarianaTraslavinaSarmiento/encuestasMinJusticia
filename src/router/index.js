import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [    
    {
      path: '/',
      name: 'inicio',
      component: () => import('../views/Inicio.vue')
    },
    {
      path: '/administracion_municipal_y_operadores_de_justicia',
      name: 'administracion_municipal_y_operadores_de_justicia',
      component: () => import('../views/Survey01.vue')
    },
    {
      path: '/necesidades_juridicas',
      name: 'necesidades_juridicas',
      component: () => import('../views/Survey04.vue')
    },
    {
      path: '/necesidades_juridicas_comunidades_etnicas',
      name: 'necesidades_juridicas_comunidades_etnicas',
      component: () => import('../views/Survey02.vue')
    },
    {
      path: '/necesidades_juridicas_sector_educativo',
      name: 'necesidades_juridicas_sector_educativo',
      component: () => import('../views/Survey03.vue')
    },
    {
      path: '/encuesta_finalizada',
      name: 'encuesta_finalizada',
      component: () => import('../views/Gracias.vue')
    },
    {
      path: '/pruebas',
      name: 'pruebas',
      component: () => import('../views/Survey05.vue')
    }
  ]
})

export default router