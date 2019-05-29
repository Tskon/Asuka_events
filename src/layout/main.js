import React from 'react'

import { Route } from 'react-router'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Header from '../components/Header'
import Footer from '../components/Footer'
import IndexPage from '../pages/index'
import AboutPage from '../pages/event/index'
import AdminPage from '../pages/admin/index'
import LKPage from '../pages/lk/index'
import Snackbar from '../components/ui/Snackbar'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Arial',
      'sans-serif',
    ].join(','),
    useNextVariants: true,
  },
  palette: {
    type: 'light',
    // primary: { main: '#fdc073' },
    // secondary: { main: '#498161' },
  },
})

export default () => (
  <div>
    <Header />
    <MuiThemeProvider theme={theme}>
      <main className="site-content">
        <Route exact path="/" component={IndexPage} />
        <Route path="/event" component={AboutPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/lk" component={LKPage} />
      </main>
    </MuiThemeProvider>
    <Footer />
    <Snackbar />
  </div>
)
