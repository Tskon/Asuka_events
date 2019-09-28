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
    }
  }
}
