import Noty from 'awesome-notifications'

export default Noty.install = (Vue) => {
  const options = {}
  Vue.$noty = new Noty(options)
}
