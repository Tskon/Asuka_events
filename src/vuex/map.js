import axios from 'axios'

const mapInit = {
  cells: [],
  currentTurn: {
    turnNumber: 0,
    turnName: '',
    fog: false
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
          cellId
        })
        .then(({ data }) => {
          console.log(context)
          if (data.status !== 'success') return

          context.commit('user/setPlayerData', { cellId }, { root: true })
          context.dispatch('getCells')
          context.dispatch('user/getPlayerData', null, { root: true })
        })
    },
    uploadVictoryScreenshot(context, formdata) {
      return axios.post('/api/map/battle-table-upload-victory-screenshot', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
}
