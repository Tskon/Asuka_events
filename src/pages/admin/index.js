import React from 'react'
import '../../scss/pages/lk.scss'
import AdminView from './AdminView'
import { post } from '../../services/utils'

const initState = {
  users: [],
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
            imageUrl: resp.data.imageUrl,
            clanName: resp.data.clanName,
            clanTag: resp.data.clanTag,
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
