function getInitialState() {
  return {
    component: null,
    title: '',
    show: false,
    options: {
      hideFooter: false
    },
    payload: {}
  }
}

export default {
  namespaced: true,
  state: getInitialState(),
  mutations: {
    show(state, { component, title, options, payload }) {
      state.component = component
      state.title = title
      state.show = true
      state.options = options
      state.payload = payload
    },
    hide(state) {
      const initState = getInitialState()
      Object.keys(initState).forEach(key => {
        state[key] = initState[key]
      })
    }
  }
}
