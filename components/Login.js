import { Component } from 'react'

export default class Header extends Component {
  /**
   * Не работает локально
   * TODO допилить после выгрузки на сервер
   */
  wgApiRequest(){
    const url = 'https://api.worldoftanks.ru/wot/auth/login/?application_id=00dd20029028e3100534ec15656683cb&display=popup&redirect_uri=https%3A%2F%2Fdevelopers.wargaming.net%2Freference%2Fall%2Fwot%2Fauth%2Flogin%2F'

    fetch(url, {
      method: 'POST',
      headers:{
        'Access-Control-Allow-Origin':'*'
      },
      mode: 'cors',
      body: 'foo=bar&lorem=ipsum'
    })
      .then(res => res.json())
      .then(data => {
        console.log('Request succeeded with JSON response', data);
      })
      .catch(error => {
        console.log('Request failed', error);
      });
  }

  loginHandler(){

  }

  render() {
    return (
      <div className="login" onClick={this.loginHandler}>
        login
      </div>
    )
  }
}