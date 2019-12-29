import Noty from "awesome-notifications";

export default Noty.install = function (Vue) {
  const options = {}
  Vue.$noty = new Noty(options)
}