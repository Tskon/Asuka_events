import React from 'react'
import PropTypes from 'prop-types'
import UserRow from './UserRow'
import PlayerRow from './PlayerRow'

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
  setPlayerStatus: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

function AdminView(props) {
  const admins = props.admins.map(user => (<div key={`a_${user.username}`}>{user.username}</div>))
  const players = props.players.map(user => (
    <PlayerRow
      key={`cu_${user.username}`}
      name={user.username}
      setPlayerStatus={props.setPlayerStatus}
      deleteUser={props.deleteUser}
    />
  ))
  const commonUsers = props.commonUsers.map(user => (
    <UserRow
      key={`cu_${user.username}`}
      name={user.username}
      setPlayerStatus={props.setPlayerStatus}
      deleteUser={props.deleteUser}
    />
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
