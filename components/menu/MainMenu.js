import { Component } from 'react'

/**
 * Не удается использовать роутер пока нет решения проблемы загрузки стилей чанками
 */
import Link from 'next/link'

export default class MainMenu extends Component {
  render() {
    return (
      <nav className="menu">
        <Link href="/"><a>Home</a></Link>
        <Link href="/about"><a>About</a></Link>
        <Link href="/forum"><a>Forum</a></Link>
      </nav>
    )
  }
}