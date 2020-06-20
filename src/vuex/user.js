import axios from 'axios'

let getUserIntervalId = null

const stateInit = {
  name: '',
  isAdmin: false,
  personalData: {
    clanName: 'Unknown clan',
    clanTag: 'UNKNWN',
    imageUrl: 'https://avatanplus.com/files/resources/mid/58e0ccb473a4915b2e1fa0fa.png'
  },
  events: []
}

export default {
  namespaced: true,

  state: { ...stateInit },

  mutations: {
    setUser(state, user) {
      Object.keys(user).forEach(key => {
        state[key] = user[key]
      })
    },
    setPersonalData(state, payload) {
      state.personalData = { ...state.personalData, ...payload }
    },
    setPlayerData(state, payload) {
      state.events = payload
    }
  },

  actions: {
    signUp(context, body) {
      axios.post('/api/signup', body).then(({ data }) => {
        if (data.status !== 'ok') return
        context.commit('setUser', data.data)
      })
    },

    signIn(context, body) {
      axios.post('/api/signin', body).then(({ data }) => {
        if (data.status !== 'ok') return

        context.commit('setUser', data.data)
        context.dispatch('getUser')
      })
    },

    restore(context, body) {
      axios.post('/api/restore', body).then(({ data }) => {
        if (data.status !== 'ok') return

        context.commit('setUser', data.data)
      })
    },

    logout(context) {
      axios.post('/api/user/logout').then(({ data }) => {
        if (data.status !== 'ok') return
        context.commit('setUser', stateInit)
      })
        .then(() => {
          clearInterval(getUserIntervalId)
        })
    },

    getUser(context) {
      axios.post('/api/user/get-user').then(({ data }) => {
        if (data.status !== 'ok') return

        context.dispatch('getPlayerData')
        getUserIntervalId = setInterval(() => {
          context.dispatch('getPlayerData')
        }, 15000)

        context.commit('setUser', data.data)
      })
    },

    getPersonalData(context) {
      axios.post('/api/user/get-lk-data').then(({ data }) => {
        if (data.status !== 'ok') return
        context.commit('setPersonalData', data.data)
      })
    },

    async getPlayerData(context) {
      const {data} = await axios.post('/api/event/get-player-data')

      if (data.status !== 'success') return
      context.commit('setPlayerData', data.data.events)
    },

    setPersonalData(context) {
      axios.post('/api/user/set-lk-data', {
        clanTag: context.state.personalData.clanTag,
        clanName: context.state.personalData.clanName,
        imageUrl: context.state.personalData.imageUrl
      })
    }
  },
  getters: {
    isAuth(state) {
      return !!state.name
    },
    isAdmin: state => state.isAdmin,
    isCurrentEventPlayer: (state, getters, rootState, rootGetters) => {
      const currentEvent = rootGetters['events/currentEvent']
      return state.events.some((event) => event.slug === currentEvent.slug)
    },
    playerEvents: state => state.events,
    playerCurrentEvent: (state, getters, rootState, rootGetters) => {
      const currentEvent = rootGetters['events/currentEvent']
      return state.events.find(event => event.slug === currentEvent.slug) || {}
    },
    personalData: state => state.personalData
  }
}
