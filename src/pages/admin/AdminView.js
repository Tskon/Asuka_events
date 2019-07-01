import React from 'react'
import PropTypes from 'prop-types'
import UserRow from './UserRow'

const shape = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isPlayer: PropTypes.bool.isRequired,
}

AdminView.propTypes = {
  admins: PropTypes.arrayOf(PropTypes.shape(shape)).isRequired,
  players: PropTypes.arrayOf(PropTypes.shape(shape)).isRequired,
  commonUsers: PropTypes.arrayOf(PropTypes.shape(shape)).isRequired,
}

function AdminView(props) {
  const admins = props.admins.map(user => (<div key={`a_${user.username}`}>{user.username}</div>))
  const players = props.players.map(user => (<div key={`p_${user.username}`}>{user.username}</div>))
  const commonUsers = props.commonUsers.map(user => (
    <UserRow key={`cu_${user.username}`} name={user.username} />
  ))

  return (
    <div>
      <h1>Админка</h1>
      {!!props.admins.length && (
        <section>
          <h2>Админы</h2>
          {admins}
        </section>
      )}

      {!!props.players.length && (
        <section>
          <h2>Игроки</h2>
          {players}
        </section>
      )}

      {!!props.commonUsers.length && (
        <section>
          <h2>Бесправные пользователи</h2>
          {commonUsers}
        </section>
      )}
    </div>
  )
}

export default AdminView
