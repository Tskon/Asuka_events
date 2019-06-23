import React from 'react'
import '../../scss/pages/lk.scss'
import LkView from './LkView'
import {post} from '../../services/utils'

const initState = {
  imageUrl: '',
  clanName: '',
  clanTag: '',
}

export default class Lk extends React.Component {
  constructor(props) {
    super(props)

    this.state = { ...initState }
  }

  inputHandler = (e) => {
    switch (e.target.name) {
      case 'image':
        this.setState({
          imageUrl: e.target.value,
        })
        break
      case 'clanName':
        this.setState({
          clanName: e.target.value,
        })
        break
      case 'clanTag':
        this.setState({
          clanTag: e.target.value,
        })
        break
      default: console.log(e.target.name)
    }
  }

  submitHandler = (e) => {
    e.preventDefault()
    post('/api/save-lk-data', {
      ...this.state,
    })
  }

  render() {
    return (
      <LkView
        submitHandler={this.submitHandler}
        inputHandler={this.inputHandler}
        {...this.state}
      />
    )
  }
}
