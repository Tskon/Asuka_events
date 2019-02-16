import { Component } from 'react'
import MainMenu from './menu/MainMenu'

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>Asuka</h1>
        <MainMenu/>
      </header>
    )
  }
}