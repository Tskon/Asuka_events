import { Component } from 'react'
import MainMenu from './menu/MainMenu'
import Login from './Login'

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>Asuka</h1>
        <MainMenu/>
        <Login/>
      </header>
    )
  }
}