import React from 'react'
import { connect } from 'react-redux'
import userActions from '../../services/redux/actions/userActions'
import store from '../../services/redux/store'
import LoginView from './LoginView'
import { post } from '../../services/utils'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      isLogIn: false,
      loginValue: '',
      passwordValue: '',
      currentType: 'signin',
      typesList: ['signin', 'signup'],
    }

    this.loginModalSwitcher = this.loginModalSwitcher.bind(this)
    this.loginOnChangeHandler = this.loginOnChangeHandler.bind(this)
    this.logOut = this.logOut.bind(this)
    this.passwordOnChangeHandler = this.passwordOnChangeHandler.bind(this)
    this.setUser = this.setUser.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.switchType = this.switchType.bind(this)
  }

  componentDidMount() {
    // TODO добавить метод заполнения текущего юзера в стор
    // post('/api/get-user').then((data) => {
    //   this.setUser(data.data)
    // })
  }

  setUser(user) {
    store.dispatch(userActions.setUser(user))
    this.setState({
      isLogIn: true,
      showModal: false,
    })
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
      const url = (this.state.currentType === 'signin') ? '/api/signin' : '/api/signup'

      post(url, body)
        .then((data) => {
          if (data.status === 'ok') {
            this.setUser(data.data)
          }
        })
    } else {
      if (this.state.loginValue.length < 5) alert('Логин должен быть длиннее 5 символов')
      if (this.state.passwordValue.length < 6) alert('Пароль должен быть длиннее 6 символов')
    }
  }

  logOut() {
    const _this = this
    post('/api/logout')
      .then((data) => {
        if (data.status === 'ok') {
          _this.setState({
            isLogIn: false,
          })
        }
      })
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

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Login)
