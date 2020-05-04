import axios from 'axios'

const mapInit = {
  cells: [],
  currentTurn: {
    turnNumber: 0,
    type: '',
    fog: false
  },
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
    setCells(state, cellsList) {
      state.cells = [...cellsList]
    },

    setCurrentTurn(state, turn) {
      state.currentTurn = turn
    },

    fetchCurrentBattleTable(state, battleTable) {
      state.currentBattleTable = battleTable
    }
  },

  actions: {
    getCurrentTurn(context) {
      axios.post('/api/map/get-current-turn').then(({ data }) => {
        if (data.status !== 'ok') return
        context.commit('setCurrentTurn', data.data)
      })
    },

    getCells(context) {
      axios.post('/api/map/get-map-cells').then(({ data }) => {
        if (data.status !== 'ok') return

        context.commit('setCells', data.data)
      })
    },

    setSector(context, cellId) {
      axios
        .post('/api/map/choose-sector', {
          cellName: cellId
        })
        .then(({ data }) => {
          if (data.status !== 'success') return

          context.commit('user/setPlayerData', { cellId }, { root: true })
          context.dispatch('getCells')
          context.dispatch('user/getPlayerData', null, { root: true })
        })
    },

    setBattleStatus(context, isWinner) {
      return axios.post('/api/map/set-match-result', { isWinner })
    },

    async fetchCurrentBattleTable({ commit }, cellName) {
      const { data } = await axios.post('/api/map/get-battle-table-data', {
        cellName
      })
      if (data) {
        commit('fetchCurrentBattleTable', data.data)
      }
    }
  },

  getters: {
    isNeedFog: state => state.currentTurn.fog,
    currentBattleTable: state => state.currentBattleTable
  }
}
