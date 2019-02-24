import React from 'react'
import App, { Container } from 'next/app'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Attachcss from './attach-css'
import '../scss/_index.scss'

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    const { router: { pageLoader: { buildId, assetPrefix } = {} } = {} } = this.props

    function fixInit(page) {
      return <Attachcss include={['_app', page]} />
    }

    if (buildId) {
      Object.assign(global, {
        __NEXT_DATA__: {
          buildId,
          assetPrefix,
        },
      })
    }

    try {
      if (document.location) {
        const splitedUrl = document.location.pathname.split('/')
        fixInit(splitedUrl[splitedUrl.length - 1])
      }
    } catch (e) {
      console.log(e)
    }

    return (
      <Container>
        <Header />
        <div className="container">
          <Component {...pageProps} />
        </div>
        <Footer />
      </Container>
    )
  }
}
