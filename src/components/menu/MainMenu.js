import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const isActiveChecker = (match, location) => {
  if (!match) return false
  return match.url === location.pathname
}

const MainMenu = props => (
  <nav className="menu">
    <NavLink to="/" activeClassName="active" isActive={isActiveChecker}>Home</NavLink>
    <NavLink to="/event" activeClassName="active" isActive={isActiveChecker}>Event</NavLink>
    {
      props.user.isAdmin
      && <NavLink to="/event" activeClassName="active" isActive={isActiveChecker}>Админка</NavLink>
    }
    {
      props.user.isPlayer
      && <NavLink to="/event" activeClassName="active" isActive={isActiveChecker}>ЛК</NavLink>
    }
  </nav>
)

const mapStateToProps = state => ({
  user: state.user.data,
})

export default connect(mapStateToProps)(MainMenu)
