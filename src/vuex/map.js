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
    fetchMap(context, slug) {
      context.dispatch('getCurrentTurn', slug)
    },

    getCurrentTurn(context, slug) {
      axios.post('/api/event/get-current-turn', {
        eventSlug: slug
      })
        .then(({ data }) => {
          if (data.status !== 'ok') return
          context.commit('setCurrentTurn', data.data)
        })
    },

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
    isNeedFog: state => state.currentTurn.fog,
    currentBattleTable: state => state.currentBattleTable,
    cells: state => state.cells
  }
}
