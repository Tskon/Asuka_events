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
      showModal: true,
      loginValue: '',
      passwordValue: '',
      currentType: 'signin',
      typesList: ['signin', 'signup'],
    }

    this.loginModalSwitcher = this.loginModalSwitcher.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.loginOnChangeHandler = this.loginOnChangeHandler.bind(this)
    this.passwordOnChangeHandler = this.passwordOnChangeHandler.bind(this)
    this.switchType = this.switchType.bind(this)
  }

  loginModalSwitcher() {
    const { showModal } = this.state
    this.setState({
      showModal: !showModal,
    })
  }

  switchType() {
    const signInType = this.state.typesList[0]
    const signUpType = this.state.typesList[1]
    const curentType = this.state.currentType
    const newType = ((signInType === curentType) ? signUpType : signInType)

    this.setState({
      currentType: newType,
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
            title="Закрыть"
            type="button"
            className="login__modal-close-btn"
            onClick={this.loginModalSwitcher}
          >
            &#10006;
          </button>
          <form onSubmit={this.submitHandler}>
            <TextInput
              onChange={this.loginOnChangeHandler}
              labelText="Логин"
              name="login__login-field"
              required
            />
            <TextInput
              onChange={this.passwordOnChangeHandler}
              labelText="Пароль"
              name="login__password-field"
              required
            />
            {
              (this.state.currentType === this.state.typesList[0])
                ? <button className="login__signin-btn" type="submit">Войти</button>
                : <button className="login__signup-btn" type="submit">Зарегистрироваться</button>
            }
            <button
              type="button"
              className="login__modal-switch-type-btn"
              onClick={this.switchType}
            >
              { (this.state.currentType === this.state.typesList[0]) ? 'Зарегистрироваться' : 'Войти' }
            </button>
          </form>
        </div>
      </div>
    )

    return (
      <div>
        <button type="button" className="login__button" onClick={this.loginModalSwitcher}>
          Войти
        </button>
        {showModal && modal}
      </div>
    )
  }
}
