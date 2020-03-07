import axios from 'axios'
import Vue from 'vue'

axios.interceptors.response.use(
  response => {
    if (response.data.message) {
      Vue.$noty[response.data.status](response.data.message)
    }
    return response
  },
  error => {
    Vue.$noty.alert('Ошибка сервера. Попрбуйте позже или обратитесь к администратору')
    console.warn(error.message)
    return Promise.reject(error)
  }
)
