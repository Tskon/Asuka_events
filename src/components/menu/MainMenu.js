import React from 'react'
import { NavLink } from 'react-router-dom'

const isActiveChecker = (match, location) => {
  if (!match) return false
  return match.url === location.pathname
}

export default () => (
  <nav className="menu">
    <NavLink to="/" activeClassName="active" isActive={isActiveChecker}>Home</NavLink>
    <NavLink to="/event" activeClassName="active" isActive={isActiveChecker}>Event</NavLink>
  </nav>
)
