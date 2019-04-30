import { configureStore} from 'redux-starter-kit'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
})

export default store
