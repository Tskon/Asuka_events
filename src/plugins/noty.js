import Noty from 'awesome-notifications'

export default Noty.install = Vue => {
  const options = {}
  const noty = new Noty(options)
  noty.error = noty.alert

  Vue.prototype.$noty = noty
  Vue.$noty = noty
}
