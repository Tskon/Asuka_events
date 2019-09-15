import axios from 'axios'
import {post} from "../../src_old/services/utils";

export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    signIn (context, body) {
      axios
        .post('/api/signin', body)
        .then(({data}) => {
          if (data.status !== 'ok') return

          context.commit('setUser', data.data)
        })
    },

    getUser (context) {
      axios
        .post('/api/user/get-user')
        .then(({data}) => {
          if (data.status !== 'ok') return

          context.commit('setUser', data.data)
        })
    },

    logout (context) {
      axios
        .post('/api/user/logout')
        .then((data) => {
          if (data.status !== 'ok') return

          context.commit('setUser', {})
        })
    }
  }
}