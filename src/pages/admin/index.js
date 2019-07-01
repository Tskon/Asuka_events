import React from 'react'
import '../../scss/pages/admin.scss'
import AdminView from './AdminView'
import { post } from '../../services/utils'

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
    post('/api/get-admin-panel-data')
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

  render() {
    return (
      <AdminView
        {...this.state}
      />
    )
  }
}
