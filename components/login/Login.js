import { Component } from 'react'

export default class Header extends Component {
  /**
   * Не работает локально
   * TODO допилить после выгрузки на сервер
   */
  static wgApiRequest() {
    const url = 'https://api.worldoftanks.ru/wot/auth/login/?application_id=00dd20029028e3100534ec15656683cb&display=popup&redirect_uri=https%3A%2F%2Fdevelopers.wargaming.net%2Freference%2Fall%2Fwot%2Fauth%2Flogin%2F'

    fetch(url, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
      body: 'foo=bar&lorem=ipsum',
    })
      .then(res => res.json())
      .then((data) => {
        console.log('Request succeeded with JSON response', data)
      })
      .catch((error) => {
        console.log('Request failed', error)
      })
  }

  static stopPropagation(e) {
    e.stopPropagation()
  }

  static loginHandler() {
    const { showModal } = this.state
    this.setState({
      showModal: !showModal,
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }

    this.loginHandler = this.loginHandler.bind(this)
  }

  render() {
    const { showModal } = this.state

    const modal = (
      <div role="button" tabIndex={0} className="login__modal-shadow" onClick={this.loginHandler}>
        <div className="login__modal" onClick={this.stopPropagation}>
          <button
            className="login__modal-close-btn"
            onClick={this.loginHandler}
          >


            &#10006;
          </button>
          <form action="/login" method="POST">
            <div className="login__field">
              <label>


Login:
                <input type="text" />
              </label>
            </div>
            <div className="login__field">
              <label>


Pass:
                <input type="password" />
              </label>
            </div>
            <button className="login__submit-btn" type="submit">Login</button>
          </form>
        </div>
      </div>
    )

    return (
      <div>
        <div className="login__button" onClick={this.loginHandler}>
          Login
        </div>
        {showModal && modal}

      </div>
    )
  }
}
