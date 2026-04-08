import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import KvarPage from '../views/KvarPage.vue'

const routes = [
  { path: '/'   , name: 'Explore' , component: Home                                },
  { path: '/new', name: 'New Kvar', component: () => import('../views/Create.vue') },
  { path: '/my' , name: 'My Kvar' , component: () => import('../views/About.vue')  },
  { path: '/:id', name: 'Kvar'    , component: KvarPage                            },
  { path: '/:catchAll(.*)', name: 'NotFound'    , component: Home                  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
