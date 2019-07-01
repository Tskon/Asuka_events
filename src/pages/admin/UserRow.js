import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

AdminView.propTypes = {
  name: PropTypes.string.isRequired,
}

function AdminView(props) {
  return (
    <div className="user-row">
      <span className="user-row__name">{props.name}</span>
      <div className="user-row__actions">
        <Button size="small" variant="outlined" color="primary">Сделать игроком</Button>
        <Button size="small" variant="outlined" color="secondary">Удалить</Button>
      </div>
    </div>
  )
}

export default AdminView
