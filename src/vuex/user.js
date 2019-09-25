import axios from 'axios'

const stateInit = {
  name: '',
  id: 0,
  isAdmin: false,
  isPlayer: false,
  personalData: {
    clanName: 'Unknown clan',
    clanTag: 'UNKNWN',
    imageUrl: 'https://avatanplus.com/files/resources/mid/58e0ccb473a4915b2e1fa0fa.png'
  }
}

export default {
  namespaced: true,
  state: {...stateInit},
  mutations: {
    setUser (state, user) {
      Object.keys(user).forEach(key => {
        state[key] = user[key]
      })
    },
    setPersonalData (state, payload) {
      state.personalData = {...state.personalData, ...payload}
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
        .then(({data}) => {
          if (data.status !== 'ok') return
          context.commit('setUser', stateInit)
        })
    }
  }
}