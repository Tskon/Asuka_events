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
  },
  playerData: {
    cellId: '',
    score: 0
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
    },
    setPlayerData (state, payload) {
      state.playerData = {...state.playerData, ...payload}
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

          if (data.data.isPlayer) context.dispatch('getPlayerData')

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
    },

    getPersonalData(context) {
      axios
        .post('/api/user/get-lk-data')
        .then(({data}) => {
          if (data.status !== 'ok') return
          context.commit('setPersonalData', data.data)
        })
    },

    getPlayerData(context) {
      axios
        .post('/api/map/get-player-data')
        .then(({data}) => {
          if (data.status !== 'ok') return
          context.commit('setPlayerData', data.data)
        })
    },

    setPersonalData(context) {
      axios
        .post('/api/user/set-lk-data', {
          clanTag: context.state.personalData.clanTag,
          clanName: context.state.personalData.clanName,
          imageUrl: context.state.personalData.imageUrl
        })
    }
  }
}