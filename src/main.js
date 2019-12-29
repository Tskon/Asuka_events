import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { LayoutPlugin, ModalPlugin, DropdownPlugin, TablePlugin, CardPlugin } from 'bootstrap-vue'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import './assets/scss/vendor/bootstrap.scss'
import './assets/scss/vendor/noty.scss'
import './assets/scss/global.scss'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import noty from './plugins/noty'
import './utils/axios'


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(LayoutPlugin)
Vue.use(ModalPlugin)
Vue.use(CardPlugin)
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)
Vue.use(noty)

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
