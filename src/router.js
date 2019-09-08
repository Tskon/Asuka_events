import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/event',
      name: 'event',
      component: () => import(/* webpackChunkName: "event" */ './views/About.vue')
    },
    {
      path: '/personalPanel',
      name: 'personalPanel',
      component: () => import(/* webpackChunkName: "personalPanel" */ './views/About.vue')
    },
    {
      path: '/adminPanel',
      name: 'adminPanel',
      component: () => import(/* webpackChunkName: "adminPanel" */ './views/About.vue')
    }
  ]
})
