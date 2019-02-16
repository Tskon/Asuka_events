import React from 'react'
import App, { Container } from 'next/app'
import Header from '../components/Header'
import Attachcss from './attach-css';
import '../scss/_index.scss'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props
    const { router: { pageLoader: { buildId, assetPrefix } = {} } = {} } = this.props;

    if (buildId) {
      Object.assign(global, {
        __NEXT_DATA__: {
          buildId,
          assetPrefix,
        },
      });
    }

    try{
      if (location){
        var splitedUrl = location.pathname.split('/')
        fixInit(splitedUrl[splitedUrl.length - 1])
      }
    } catch (e) {

    }
    function fixInit(page){
      <Attachcss include={['_app', page]}/>
    }

    return (
      <Container>
        <Header/>
        <Component {...pageProps} />
      </Container>
    )
  }
}