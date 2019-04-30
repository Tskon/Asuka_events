import { createReducer } from 'redux-starter-kit'

const initialState = {
  data: {},
}

const userReducer = createReducer(initialState, {
  SET_USER(state, action) {
    state.data = action.payload
  },
})


export default userReducer
