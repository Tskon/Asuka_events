import { createReducer } from 'redux-starter-kit'

const initialState = {
  data: {
    name: '',
    isAdmin: false,
    isPlayer: false,
  },
}

const userReducer = createReducer(initialState, {
  SET_USER(state, action) {
    state.data = action.payload
  },
  RESET_USER(state) {
    state.data = initialState.data
  },
})


export default userReducer
