import axios from 'axios'

export default {
  namespaced: true,

  state: {
    eventList: [],
    currentEventIndex: 0
  },

  mutations: {
    setEvents(state, payload) {
      state.eventList = payload
    },

    setCurrentEvent(state, index) {
      state.currentEventIndex = index
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
    eventList: state => state.eventList,
    currentEvent: state => state.eventList[state.currentEventIndex],
    currentEventIndex: state => state.currentEventIndex,
    currentEventTurn: (state, getters) => getters.currentEvent.currentTurn
  }
}
