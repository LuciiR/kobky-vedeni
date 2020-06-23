import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
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
    path: '/uvodka',
    //name: 'Uvodka',
    //component: Uvodka
    
    
    
    
    //path: '/about',
    //name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */'../views/About.vue')
}, 

  /*{
    path: '/uvodka',
    name: 'Uvodka',
    component: Uvodka
  },*/

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
