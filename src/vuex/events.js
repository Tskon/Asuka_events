import axios from 'axios'

export default {
  namespaced: true,

  state: {
    eventList: [],
    currentEvent: 0
  },

  mutations: {
    setEvents(state, payload) {
      state.eventList = payload
    },

    setCurrentEvent(state, index) {
      state.currentEvent = index
    }
  },

  actions: {
    async fetchEvents(context) {
      const {data} = await axios.post('/api/event/get-event-list')
      context.commit('setEvents', data.data.eventList)
    },

    setCurrentEvent({ commit }, index) {
      commit('setCurrentEvent', index)
    }
  },

  getters: {
    eventList: state => state.eventList
  }
}
