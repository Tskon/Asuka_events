import axios from 'axios'

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.warn(error.message)
  return Promise.reject(error)
})