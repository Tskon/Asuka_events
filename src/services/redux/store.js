import { configureStore} from 'redux-starter-kit'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export default store
