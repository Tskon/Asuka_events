import React from 'react'
import { connect } from 'react-redux'
import userActions from '../../redux/actions/userActions'
import store from '../../redux/store'
import LoginView from './LoginView'

class Login extends React.Component {
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

    // check inputs length
    if (this.state.loginValue.length > 5 && this.state.passwordValue.length > 6) {
      const body = {
        username: this.state.loginValue,
        password: this.state.passwordValue,
      }

      const myInit = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }

      const url = (this.state.currentType === 'signin') ? '/api/signin' : '/api/signup'

      fetch(url, myInit)
        .then(response => response.json())
        .then((parsedData) => {
          if (parsedData.status === 'ok') {
            store.dispatch(userActions.setUser(parsedData.data))
          }
        })
    } else {
      if (this.state.loginValue.length < 5) alert('Логин должен быть длиннее 5 символов')
      if (this.state.passwordValue.length < 6) alert('Пароль должен быть длиннее 6 символов')
    }
  }

  logOut() {
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

  render() {
    return (
      <LoginView
        {...this.state}
        loginModalSwitcher={this.loginModalSwitcher}
        submitHandler={this.submitHandler}
        switchType={this.switchType}
        loginOnChangeHandler={this.loginOnChangeHandler}
        passwordOnChangeHandler={this.passwordOnChangeHandler}
        logOut={this.logOut}
      />
    )
  }
}

const mapStateToProps = store => ({
  user: store.user,
})

export default connect(mapStateToProps)(Login)
