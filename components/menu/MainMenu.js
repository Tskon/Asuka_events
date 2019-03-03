import Link from '../ui/Link'

export default () => (
  <nav className="menu">
    <Link activeClassName="active" href="/"><a>Home</a></Link>
    <Link activeClassName="active" href="/about"><a>About</a></Link>
    <Link activeClassName="active" href="/forum"><a>Forum</a></Link>
  </nav>
)
