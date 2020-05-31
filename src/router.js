import Vue from 'vue'
import Router from 'vue-router'
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
      component: () => import(/* webpackChunkName: "event" */ './modules/EventsPage')
    },
    {
      path: '/event/:eventName',
      name: 'event',
      component: () => import(/* webpackChunkName: "event" */ './modules/EventPage')
    },
    {
      path: '/personalPanel',
      name: 'personalPanel',
      component: () =>
        import(
          /* webpackChunkName: "personalPanel" */ './modules/PersonalPanelPage.vue'
        )
    },
    {
      path: '/adminPanel',
      name: 'adminPanel',
      component: () =>
        import(/* webpackChunkName: "adminPanel" */ './modules/AdminPanelPage')
    }
  ]
})
