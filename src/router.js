import Vue from 'vue'
import Router from 'vue-router'
import path from 'path'
import HomePage from './modules/HomePage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/event',
      name: 'event',
      component: () => import(/* webpackChunkName: "event" */ path.resolve('./modules/EventPage'))
    },
    {
      path: '/personalPanel',
      name: 'personalPanel',
      component: () => import(/* webpackChunkName: "personalPanel" */ path.resolve('./modules/PersonalPanelPage.vue'))
    },
    {
      path: '/adminPanel',
      name: 'adminPanel',
      component: () => import(/* webpackChunkName: "adminPanel" */ path.resolve('./modules/AdminPanelPage.vue'))
    }
  ]
})
