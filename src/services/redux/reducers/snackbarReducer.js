import { createReducer } from 'redux-starter-kit'

const initialState = {
  show: false,
  type: 'info',
  message: '',
}

const snackbarReducer = createReducer(initialState, {
  SHOW(state, action) {
    state.show = true
    state.type = action.payload.type
    state.message = action.payload.message
  },
  RESET_USER(state) {
    state.data = initialState.data
  },
})

export default snackbarReducer
