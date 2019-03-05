import { Component } from 'react'
import TextInput from '../ui/TextInput'

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
      loginValue: '',
      passwordValue: '',
    }

    this.loginModalSwitcher = this.loginModalSwitcher.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.loginOnChangeHandler = this.loginOnChangeHandler.bind(this)
    this.passwordOnChangeHandler = this.passwordOnChangeHandler.bind(this)
  }

  loginModalSwitcher() {
    const { showModal } = this.state
    this.setState({
      showModal: !showModal,
    })
  }

  loginOnChangeHandler(val) {
    this.setState({
      loginValue: val,
    })
  }

  passwordOnChangeHandler(val) {
    this.setState({
      passwordValue: val,
    })
  }

  submitHandler(e) {
    e.preventDefault()

    const body = {
      login: this.state.loginValue,
      password: this.state.passwordValue,
    }

    const myInit = {
      method: 'POST',
      body: JSON.stringify(body),
    }

    try {
      fetch('/api/signup', myInit)
        .then((response) => {
          console.log(response)
        })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { showModal } = this.state

    const modal = (
      <div className="login__modal-shadow">
        <div className="login__modal">
          <button
            type="button"
            className="login__modal-close-btn"
            onClick={this.loginModalSwitcher}
          >
            &#10006;
          </button>
          <form onSubmit={this.submitHandler}>
            <TextInput
              onChange={this.loginOnChangeHandler}
              labelText="Login"
              name="login__login-field"
            />
            <TextInput
              onChange={this.passwordOnChangeHandler}
              labelText="Password"
              name="login__password-field"
            />
            <button className="login__submit-btn" type="submit">Login</button>
          </form>
        </div>
      </div>
    )

    return (
      <div>
        <button type="button" className="login__button" onClick={this.loginModalSwitcher}>
          Login
        </button>
        {showModal && modal}
      </div>
    )
  }
}
