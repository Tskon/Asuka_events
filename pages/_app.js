import React from 'react'
import App, { Container } from 'next/app'
import MainMenu from '../components/menu/MainMenu'


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

    return (
      <Container>
        <MainMenu/>
        <Component {...pageProps} />
      </Container>
    )
  }
}