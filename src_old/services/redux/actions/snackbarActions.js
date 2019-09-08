import store from '../store'

export default {
  openSnackbar(options) {
    store.dispatch({ type: 'CLOSE' }) // сброс таймера
    return {
      type: 'OPEN',
      payload: {
        type: options.type,
        message: options.message,
      },
    }
  },
  closeSnackbar() {
    return {
      type: 'CLOSE',
    }
  },
}
