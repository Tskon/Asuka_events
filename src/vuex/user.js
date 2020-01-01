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
    currentCellId: '',
    selectedCellId: '',
    selectableCellIds: '',
    score: 0,
    inBattle: false,
    battleResults: []
  }
}

export default {
  namespaced: true,
  state: { ...stateInit },
  mutations: {
    setUser(state, user) {
      Object.keys(user).forEach((key) => {
        state[key] = user[key]
      })
    },
    setPersonalData(state, payload) {
      state.personalData = { ...state.personalData, ...payload }
    },
    setPlayerData(state, payload) {
      state.playerData = { ...state.playerData, ...payload }
    }
  },
  actions: {
    signUp(context, body) {
      axios
        .post('/api/signup', body)
        .then(({ data }) => {
          if (data.status !== 'ok') return
          context.commit('setUser', data.data)
        })
    },

    signIn(context, body) {
      axios
        .post('/api/signin', body)
        .then(({ data }) => {
          if (data.status !== 'ok') return

          context.commit('setUser', data.data)
        })
    },

    restore(context, body) {
      axios
        .post('/api/restore', body)
        .then(({ data }) => {
          if (data.status !== 'ok') return

          context.commit('setUser', data.data)
        })
    },

    logout(context) {
      axios
        .post('/api/user/logout')
        .then(({ data }) => {
          if (data.status !== 'ok') return
          context.commit('setUser', stateInit)
        })
    },

    getUser(context) {
      axios
        .post('/api/user/get-user')
        .then(({ data }) => {
          if (data.status !== 'ok') return

          if (data.data.isPlayer) {
            context.dispatch('getPlayerData')
            setInterval(() => {
              context.dispatch('getPlayerData')
            }, 5000)
          }

          context.commit('setUser', data.data)
        })
    },

    getPersonalData(context) {
      axios
        .post('/api/user/get-lk-data')
        .then(({ data }) => {
          if (data.status !== 'ok') return
          context.commit('setPersonalData', data.data)
        })
    },

    getPlayerData(context) {
      axios
        .post('/api/map/get-player-data')
        .then(({ data }) => {
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
  },
  getters: {
    isAuth(state) {
      return state.id
    }
  }
}
