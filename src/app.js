import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {MuiThemeProvider} from '@material-ui/core/styles'
import themes from './services/themes'
import 'typeface-roboto'

import store from './services/redux/store'
import MainLayout from './layout/main'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={themes.dark}><MainLayout /></MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app'),
)
