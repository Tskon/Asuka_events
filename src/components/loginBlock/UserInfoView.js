import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../../scss/loginBlock/userInfo.scss'

function UserInfoView(props) {
  const description = (props.user.isPlayer || props.user.isAdmin)
    ? (
      <p className="user-info__description">
        (
        {props.user.isAdmin && 'Админ'}
        {props.user.isAdmin && props.user.isPlayer && ' | '}
        {props.user.isPlayer && 'Участник эвента'}
        )
      </p>
    ) : <br />
  return (
    <div className="user-info">
      <div>
        <p className="user-info__name">{props.user.name}</p>
        {description}
      </div>
      <Link to="/" onClick={props.logOut}>Выйти</Link>
    </div>
  )
}

UserInfoView.propTypes = {
  logOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isPlayer: PropTypes.bool.isRequired,
  }).isRequired,
}

export default UserInfoView
