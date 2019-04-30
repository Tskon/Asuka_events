import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import store from './redux/store'
import MainLayout from './layout/main'

ReactDOM.render(
  <Provider store={store}><Router><MainLayout /></Router></Provider>,
  document.getElementById('app'),
)
