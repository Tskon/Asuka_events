import React from 'react'

import { Route } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import IndexPage from '../pages/index'
import AboutPage from '../pages/about/index'
import ForumPage from '../pages/forum/index'

export default () => (
  <div>
    <Header />
    <main>
      <Route exact path="/" component={IndexPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/forum" component={ForumPage} />
    </main>
    <Footer />
  </div>
)
