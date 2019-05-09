import React from 'react'

import { Route } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import IndexPage from '../pages/index'
import AboutPage from '../pages/event/index'
import AdminPage from '../pages/admin/index'
import LKPage from '../pages/lk/index'
import Snackbar from '../components/ui/Snackbar'

export default () => (
  <div>
    <Header />
    <main className='site-content'>
      <Route exact path="/" component={IndexPage} />
      <Route path="/event" component={AboutPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/lk" component={LKPage} />
    </main>
    <Footer />
    <Snackbar />
  </div>
)
