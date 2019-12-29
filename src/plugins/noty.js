import AWN from 'vue-awesome-notifications'
const noty = new AWN({}) // options

export default Noty.install = function (Vue) {
  Vue.$noty = function (message = '', type = 'info') {
    noty[type](message)
  }
}