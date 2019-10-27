import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './user'
import map from './map'
import admin from './admin'
import modal from './modal'
import message from './message'

export default new Vuex.Store({
  modules: {
    user,
    map,
    admin,
    modal,
    message
  }
})
