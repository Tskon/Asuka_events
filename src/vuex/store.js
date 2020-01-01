import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import map from './map'
import admin from './admin'
import modal from './modal'
import message from './message'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    map,
    admin,
    modal,
    message
  }
})
