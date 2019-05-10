export default {
  openSnackbar(options) {
    return {
      type: 'OPEN',
      payload: {
        type: options.type,
        message: options.message,
      },
    }
  },
  closeSnackbar(options) {
    return {
      type: 'CLOSE',
    }
  },
}
