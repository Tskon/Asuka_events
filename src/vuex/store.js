import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './user'
import map from './map'
import admin from './admin'

export default new Vuex.Store({
  modules: {
    user,
    map,
    admin
  }
})
