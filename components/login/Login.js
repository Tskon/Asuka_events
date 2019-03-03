import { Component } from 'react'

export default class Login extends Component {
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

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }

    this.loginHandler = this.loginHandler.bind(this)
  }

  loginHandler() {
    const { showModal } = this.state
    this.setState({
      showModal: !showModal,
    })
  }

  render() {
    const { showModal } = this.state

    const modal = (
      <div className="login__modal-shadow">
        <div className="login__modal">
          <button
            type="button"
            className="login__modal-close-btn"
            onClick={this.loginHandler}
          >
            &#10006;
          </button>
          <form action="/api/signup" method="POST">
            <div className="login__field">
              <label htmlFor="login__login-field">
                Login:
                <input type="text" id="login__login-field" />
              </label>
            </div>
            <div className="login__field">
              <label htmlFor="login__password-field">
                Pass:
                <input type="password" id="login__password-field" />
              </label>
            </div>
            <button className="login__submit-btn" type="submit">Login</button>
          </form>
        </div>
      </div>
    )

    return (
      <div>
        <button type="button" className="login__button" onClick={this.loginHandler}>
          Login
        </button>
        {showModal && modal}
      </div>
    )
  }
}
