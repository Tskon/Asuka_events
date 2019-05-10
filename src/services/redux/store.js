import { configureStore } from 'redux-starter-kit'
import userReducer from './reducers/userReducer'
import snackbarReducer from './reducers/snackbarReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer,
  },
})

export default store
