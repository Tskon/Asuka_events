import axios from 'axios'

const mapInit = {
  currentBattleTable: {
    cellName: '',
    firstPair: {},
    secondPair: {},
    finalPair: {},
    players: []
  }
}

export default {
  namespaced: true,

  state: {
    ...mapInit
  },

  mutations: {
    fetchCurrentBattleTable(state, battleTable) {
      state.currentBattleTable = battleTable
    },

    clearCurrentBattleTable(state) {
      state.currentBattleTable = {
        cellName: '',
        firstPair: {},
        secondPair: {},
        finalPair: {},
        players: []
      }
    }
  },

  actions: {
    setSector(context, cellId) {
      axios
        .post('/api/event/choose-sector', {
          cellName: cellId
        })
        .then(({ data }) => {
          if (data.status !== 'success') return

          context.commit('user/setPlayerData', { cellId }, { root: true })
          context.dispatch('user/getPlayerData', null, { root: true })
        })
    },

    setBattleStatus(context, isWinner) {
      return axios.post('/api/event/set-match-result', { isWinner })
    },

    clearCurrentBattleTable({ commit }) {
      commit('clearCurrentBattleTable')
    },

    async fetchCurrentBattleTable({ commit }, cellName) {
      const { data } = await axios.post('/api/event/get-battle-table-data', {
        cellName
      })
      if (data) {
        commit('fetchCurrentBattleTable', data.data)
      }
    }
  },

  getters: {
    currentBattleTable: state => state.currentBattleTable
  }
}
