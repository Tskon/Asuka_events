import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import store from './services/redux/store'
import MainLayout from './layout/main'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: { main: '#fdc073' },
    secondary: { main: '#498161' },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}><MainLayout /></MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app'),
)
