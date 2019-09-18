import axios from 'axios'
import {post} from "../../src_old/services/utils";

const mapInit = {
  cells: []
}

export default {
  namespaced: true,
  state: {
    ...mapInit
  },
  mutations: {
    setCells (state, cellsList) {
      state.cells = [...cellsList]
    }
  },
  actions: {
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

