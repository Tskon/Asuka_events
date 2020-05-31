import axios from 'axios'

const stateInit = {
  users: {
    events: [],
    admins: [],
    commonUsers: [],
    players: []
  },
  logs: []
}

export default {
  namespaced: true,

  state: { ...stateInit },

  mutations: {
    setAdminData(state, payload) {
      state.users = payload
    },

    setEvents(state, payload) {
      state.events = payload
    },

    setLogs(state, payload) {
      state.logs = payload
    }
  },

  actions: {
    getAdminData(context) {
      axios.post('/api/admin/get-admin-panel-data').then(({ data }) => {
        if (data.status !== 'ok') return
        context.commit('setAdminData', data.data)
      })
      context.dispatch('getEvents')
    },

    getEvents(context) {
      axios.post('/api/admin/get-events').then(({ data }) => {
        if (data.status !== 'ok') return
        context.commit('setEvents', data.data)
      })
    },

    getLogs(context) {
      axios.post('/api/admin/get-logs').then(({ data }) => {
        if (data.status !== 'ok') return
        context.commit('setLogs', data.data)
      })
    },

    setPlayerStatus(context, payload) {
      axios
        .post('/api/admin/set-player-status', {
          username: payload.username,
          status: payload.status
        })
        .then(({ data }) => {
          if (data.status !== 'ok') return
          context.dispatch('getAdminData')
          if (context.rootState.user.name === payload.username) {
            context.dispatch('user/getUser', null, { root: true })
          }
        })
    },

    nextTurn({ dispatch }, eventSlug) {
      axios
        .post('/api/admin/next-turn', { eventSlug })
        .then(() => {
          dispatch('map/getCurrentTurn', null, { root: true })
          dispatch('user/getPlayerData', null, { root: true })
          dispatch('getAdminData')
          dispatch('getLogs')
        })
    },

    cleanEventData({ dispatch }) {
      axios
        .post('/api/admin/clean-event-data')
        .then(() => {
          dispatch('getAdminData')
          dispatch('getLogs')
          dispatch('map/getCurrentTurn', null, { root: true })
          this.$noty.info('Все данные эвента удалены')
        })
        .catch(() => {
          this.$noty.error('Ошибка. Данные не были удалены')
        })
    },

    setPlayerData(context, data) {
      axios
        .post('/api/admin/set-player-data', data)
        .then(() => {
          context.dispatch('getAdminData')
        })
    },

    createEvent(context, data) {
      axios.post('/api/admin/create-event', data)
    }
  }
}
