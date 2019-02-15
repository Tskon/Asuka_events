import { Component } from 'react'
import Link from 'next/link'

export default class MainMenu extends Component {
  render() {
    return (
      <nav>
        <Link href="/forum"><a>Forum page</a></Link>
        <br/>
        <Link href="/about"><a>About page</a></Link>
        <br/>
        <a href="/forum">222 forum</a>
      </nav>
    )
  }
}