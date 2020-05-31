import axios from 'axios'

export default {
  namespaced: true,

  state: {
    eventList: []
  },

  mutations: {
    setEvents(state, payload) {
      state.eventList = payload
    }
  },

  actions: {
    async fetchEvents(context) {
      const {data} = await axios.post('/api/event/get-event-list')
      context.commit('setEvents', data.data.eventList)
    }
  },

  getters: {
    eventList: state => state.eventList
  }
}
