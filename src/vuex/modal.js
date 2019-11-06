export default {
  namespaced: true,
  state: {
    component: null,
    title: '',
    show: false
  },
  mutations: {
    show (state, {component, title}) {
      state.component = component
      state.title = title
      state.show = true
    },
    hide (state) {
      state.component = ''
      state.title = ''
      state.show = false
    }
  }
}
