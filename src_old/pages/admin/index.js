import React from 'react'
import '../../scss/pages/admin.scss'
import AdminView from './AdminView'
import {post} from '../../services/utils'

const initState = {
  admins: [],
  players: [],
  commonUsers: [],
}

export default class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = { ...initState }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    post('/api/admin/get-admin-panel-data')
      .then((resp) => {
        if (resp.status === 'ok') {
          this.setState({
            admins: resp.data.admins,
            players: resp.data.players,
            commonUsers: resp.data.commonUsers,
          })
        }
      })
  }

  setPlayerStatus = (userId, status = 0) => {
    post('/api/admin/set-player-status', { userId, status })
      .then((resp) => {
        if (resp.status === 'ok') this.getData()
      })
  }

  deleteUser = (status) => {
    post('/api/delete-user')
  }

  render() {
    return (
      <AdminView
        {...this.state}
        setPlayerStatus={this.setPlayerStatus}
        deleteUser={this.deleteUser}
      />
    )
  }
}
