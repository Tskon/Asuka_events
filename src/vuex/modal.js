export default {
  namespaced: true,
  state: {
    component: null,
    title: '',
    show: false,
    payload: {}
  },
  mutations: {
    show (state, {component, title, payload}) {
      state.component = component
      state.title = title
      state.show = true
      state.payload = payload
    },
    hide (state) {
      state.component = ''
      state.title = ''
      state.show = false
    }
  }
}
