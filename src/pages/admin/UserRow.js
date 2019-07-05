import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

UserRow.propTypes = {
  name: PropTypes.string.isRequired,
  setPlayerStatus: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

function UserRow(props) {
  return (
    <div className="user-row">
      <span className="user-row__name">{props.name}</span>
      <div className="user-row__actions">
        <Button size="small" variant="outlined" color="primary" onClick={() => props.setPlayerStatus(1)}>
          Сделать игроком
        </Button>
        <Button size="small" variant="outlined" color="secondary" onClick={props.deleteUser}>
          Удалить
        </Button>
      </div>
    </div>
  )
}

export default UserRow
