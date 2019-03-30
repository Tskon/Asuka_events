import React from 'react'
import { NavLink } from 'react-router-dom'
// import Link from '../ui/Link'

export default () => (
  <nav className="menu">
    <NavLink to="/" activeClassName="active">Home</NavLink>
    <NavLink to="/about" activeClassName="active">About</NavLink>
    <NavLink to="/forum" activeClassName="active">Forum</NavLink>
  </nav>
)
