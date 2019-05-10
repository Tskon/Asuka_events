import { createReducer } from 'redux-starter-kit'

const initialState = {
  open: false,
  type: 'info',
  message: '',
}

const snackbarReducer = createReducer(initialState, {
  OPEN(state, action) {
    state.open = true
    state.type = action.payload.type
    state.message = action.payload.message
  },
  CLOSE(state) {
    state.open = initialState.open
  },
})

export default snackbarReducer
