import axios from 'axios'
import Vue from 'vue'

axios.interceptors.response.use((response) => response, (error) => {
  Vue.$noty.alert('Ошибка сервера. Попрбуйте позже или обратитесь к администратору')
  console.warn(error.message)
  return Promise.reject(error)
})
