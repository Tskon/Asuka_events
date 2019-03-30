import React from 'react'
import Link from '../ui/Link'

export default () => (
  <nav className="menu">
    <Link href="/"><a>Home</a></Link>
    <Link href="/about"><a>About</a></Link>
    <Link href="/forum"><a>Forum</a></Link>
  </nav>
)
