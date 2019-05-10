export default {
  showSnackbar(options) {
    return {
      type: 'SHOW',
      payload: {
        type: options.type,
        message: options.message,
      },
    }
  },
}
