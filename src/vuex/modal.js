export default {
  namespaced: true,
  state: {
    component: null,
    show: false
  },
  mutations: {
    show (state, {component}) {
      state.component = component
      state.show = true
    },
    hide (state) {
      state.component = ''
      state.show = false
    }
  }
}