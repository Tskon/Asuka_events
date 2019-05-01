import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function LoginView(props) {
  return (
    <div>
      <div>
        <p>{props.user.name}&nbsp;
          <span>
            (
            {props.user.isAdmin && 'Админ'}
            {props.user.isAdmin && props.user.isPlayer && ' | '}
            {props.user.isPlayer && 'Участник эвента'}
            )
          </span>
        </p>
      </div>
      <Link to="/" onClick={props.logOut}>Выйти</Link>
    </div>
  )
}

LoginView.propTypes = {
  logOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isPlayer: PropTypes.bool.isRequired,
  }).isRequired,
}

export default LoginView
