import axios from 'axios'

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
    getUser (context, body) {
      axios
        .post('/api/signin', body)
        .then(({data}) => {
          console.log(data)
          if (data.status !== 'ok') return

          context.commit('setUser', data.data)
        })
    }
  }
}