export default {
  namespaced: true,
  state: {
    message: '',
    type: 'info', // bootstrap variants
    show: false
  },
  mutations: {
    show (state, message = '', type = 'info') {
      state.message = message
      state.type = type
      state.show = true
    },
    hide (state) {
      state.message = ''
      state.type = 'info'
      state.show = false
    }
  }
}