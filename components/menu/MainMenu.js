import { Component } from 'react'

/**
 * Не удается использовать роутер пока нет решения проблемы загрузки стилей чанками
 */
// import Link from 'next/link'

export default class MainMenu extends Component {
  render() {
    return (
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/forum">Forum</a>
      </nav>
    )
  }
}