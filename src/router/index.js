import Vue from 'vue'
import VueRouter from 'vue-router'
import Uvodka from '../views/Uvodka.vue'
import Mistnost from '../views/Mistnost.vue'

Vue.use(VueRouter)

  const routes = [
 
  {
    path: '/',
    name: 'Uvodka',
    component: Uvodka
  }, 
  {
    path: '/mistnost',
    name: 'Mistnost',
    component: Mistnost
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
