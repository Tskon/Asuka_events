import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

PlayerRow.propTypes = {
  user: PropTypes.object.isRequired,
  setPlayerStatus: PropTypes.func.isRequired,
}

function PlayerRow(props) {
  return (
    <div className="user-row">
      <span className="user-row__name">{props.user.username}</span>
      <div className="user-row__actions">
        <Button size="small" variant="outlined" color="primary" onClick={() => props.setPlayerStatus(props.user.id, 0)}>
          Сделать бесправным
        </Button>
      </div>
    </div>
  )
}

export default PlayerRow
