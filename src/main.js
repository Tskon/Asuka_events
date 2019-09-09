import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { LayoutPlugin, ModalPlugin, DropdownPlugin, TablePlugin, CardPlugin } from 'bootstrap-vue'
import './assets/scss/vendor/bootstrap.scss'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(LayoutPlugin)
Vue.use(ModalPlugin)
Vue.use(CardPlugin)
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)

Vue.mixin({
  data() {
    return {
      baseUrl: process.env.BASE_URL
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
