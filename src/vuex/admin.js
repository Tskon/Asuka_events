import axios from 'axios'

const stateInit = {
  users: {
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
      state.users = { ...payload }
    },
    setLogs(state, payload) {
      state.logs = [...payload]
    }
  },
  actions: {
    getAdminData(context) {
      axios.post('/api/admin/get-admin-panel-data').then(({ data }) => {
        if (data.status !== 'ok') return
        context.commit('setAdminData', data.data)
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
          userId: payload.userId,
          status: payload.status
        })
        .then(({ data }) => {
          if (data.status !== 'ok') return
          context.dispatch('getAdminData')
        })
    },
    nextTurn(context) {
      axios
        .post('/api/admin/next-turn')
        .then(() => {
          context.dispatch('map/getCurrentTurn', null, { root: true })
          context.dispatch('user/getPlayerData', null, { root: true })
        })
    },
    cleanEventData() {
      axios
        .post('/api/admin/clean-event-data')
        .then(() => {
          this.$noty.info('Все данные эвента удалены')
        })
        .catch(() => {
          this.$noty.error('Ошибка. Данные не были удалены')
        })
    }
  }
}
