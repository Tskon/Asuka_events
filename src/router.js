import Vue from 'vue'
import Router from 'vue-router'
import Home from './modules/Home.vue'

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
      component: () => import(/* webpackChunkName: "event" */ './modules/event')
    },
    {
      path: '/personalPanel',
      name: 'personalPanel',
      component: () => import(/* webpackChunkName: "personalPanel" */ './modules/About.vue')
    },
    {
      path: '/adminPanel',
      name: 'adminPanel',
      component: () => import(/* webpackChunkName: "adminPanel" */ './modules/About.vue')
    }
  ]
})
