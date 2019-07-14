import {configureStore} from 'redux-starter-kit'
import userReducer from './reducers/userReducer'
import snackbarReducer from './reducers/snackbarReducer'
import mapReducer from './reducers/mapReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    snackbar: snackbarReducer,
    map: mapReducer,
  },
})

export default store
