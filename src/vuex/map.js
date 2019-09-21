import axios from 'axios'
import {post} from "../../src_old/services/utils";

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
    setCells (state, cellsList) {
      state.cells = [...cellsList]
    },
    setCurrentTurn (state, turn) {
      state.currentTurn = turn
    }
  },
  actions: {
    getCurrentTurn (context) {
      axios
        .post('/api/map/get-current-turn')
        .then(({data}) => {
          if (data.status !== 'ok') return
          context.commit('setCurrentTurn', data.data)
        })
    },
    getCells (context) {
      axios
        .post('/api/map/get-map-cells')
        .then(({data}) => {
          if (data.status !== 'ok') return

          context.commit('setCells', data.data)
        })
    },
    setStartSector (context, cellId) {
      axios
        .post('/api/map/choose-start-sector', {
          cellId: cellId
        })
        .then(({data}) => {
          if (data.status !== 'ok') return

          context.dispatch('getCells')
        })
    }
  }
}

