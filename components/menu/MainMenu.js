import { Component } from 'react'
import css from '../../scss/menu.main.scss'

/**
 * Не удается использовать роутер пока нет решения проблемы загрузки стилей чанками
 */
import Link from 'next/link'

export default class MainMenu extends Component {
  render() {
    return (
      <nav className={css.menu}>
        <Link href="/"><a>Home</a></Link>
        <Link href="/about"><a>About</a></Link>
        <Link href="/forum"><a>Forum</a></Link>
      </nav>
    )
  }
}