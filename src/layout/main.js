import React from 'react'

import { Route } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import IndexPage from '../pages/index'
import AboutPage from '../pages/event/index'
import Map from '../pages/map/index'

export default () => (
  <div>
    <Header />
    <main>
      <Route exact path="/" component={IndexPage} />
      <Route path="/event" component={AboutPage} />
      <Route path="/map" component={Map} />
    </main>
    <Footer />
  </div>
)
