export default {
  setUser(user) {
    return {
      type: 'SET_USER',
      payload: user,
    }
  },
}