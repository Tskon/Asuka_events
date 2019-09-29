import axios from 'axios'

const stateInit = {
  users: {
    admins: [],
    commonUsers: [],
    players: []
  }
}

export default {
  namespaced: true,
  state: {...stateInit},
  mutations: {
    setAdminData (state, payload) {
      state.users = {...payload}
    }
  },
  actions: {
    getAdminData (context) {
      axios
        .post('/api/admin/get-admin-panel-data')
        .then(({data}) => {
          if (data.status !== 'ok') return
          context.commit('setAdminData', data.data)
        })
    },
    setPlayerStatus (context, payload) {
      axios
        .post('/api/admin/set-player-status', {
          userId: payload.userId,
          status: payload.status
        })
        .then(({data}) => {
          if (data.status !== 'ok') return
          context.dispatch('getAdminData')
        })
    },
    nextTurn (context) {
      axios
        .post('/api/admin/next-turn')
    }
  }
}
