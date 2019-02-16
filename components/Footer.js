import { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p>
          © Wargaming.net.
          Все права защищены. Источником игровых данных
          пользователя является <a href="https://worldofwarships.ru/">Wargaming</a>
        </p>
        <a target="_blank" href="https://ru.wargaming.net/support/ru/products/wows/">
          Центр поддержки пользователей WoWs
        </a>
      </footer>
    )
  }
}