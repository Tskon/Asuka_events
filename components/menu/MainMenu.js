import { Component } from 'react'
import Link from 'next/link'

export default class MainMenu extends Component {
  render() {
    return (
      <nav>
        <Link href="/about"><a>About page</a></Link>
        <Link href="/forum"><a>Forum</a></Link>
      </nav>
    )
  }
}