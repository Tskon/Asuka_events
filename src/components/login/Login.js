import { Component } from 'react'
import TextInput from '../ui/TextInput'
import CheckboxLoginTypeSwitcher from './CheckboxLoginTypeSwitcher'

export default class Login extends Component {
  static stopPropagation(e) {
    e.stopPropagation()
  }

  static logOut() {
    const myInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }

    try {
      const url = '/api/logout'
      fetch(url, myInit)
        .then(response => response.text())
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      // console.log(err)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
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
      username: this.state.loginValue,
      password: this.state.passwordValue,
    }

    const myInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }

    try {
      const url = (this.state.currentType === 'signin') ? '/api/signin' : '/api/signup'
      fetch(url, myInit)
        .then(response => response.text())
        .then(() => {
          // console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      // console.log(err)
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
            <CheckboxLoginTypeSwitcher onChange={this.switchType} />
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
          </form>
        </div>
      </div>
    )

    return (
      <div>
        <button type="button" className="login__button" onClick={this.loginModalSwitcher}>
          Войти
        </button>
        <button type="button" className="login__button" onClick={this.logOut}>
          Выйти
        </button>
        {showModal && modal}
      </div>
    )
  }
}
