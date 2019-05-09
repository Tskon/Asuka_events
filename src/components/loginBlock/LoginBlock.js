import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import userActions from '../../services/redux/actions/userActions'
import store from '../../services/redux/store'
import LoginView from './LoginView'
import RestoreFormView from './RestoreFormView'
import SigninFormView from './SigninFormView'
import SignupFormView from './SignupFormView'
import UserInfoView from './UserInfoView'
import { post } from '../../services/utils'

class LoginBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      isLogIn: false,
      loginValue: '',
      passwordValue: '',
      secondPasswordValue: '',
      secretValue: '',
      currentType: 'signin',
    }

    this.loginModalSwitcher = this.loginModalSwitcher.bind(this)
    this.loginOnChangeHandler = this.loginOnChangeHandler.bind(this)
    this.logOut = this.logOut.bind(this)
    this.passwordOnChangeHandler = this.passwordOnChangeHandler.bind(this)
    this.secondPasswordOnChangeHandler = this.secondPasswordOnChangeHandler.bind(this)
    this.secretOnChangeHandler = this.secretOnChangeHandler.bind(this)
    this.setUser = this.setUser.bind(this)
    this.submitSigninHandler = this.submitSigninHandler.bind(this)
    this.submitSignupHandler = this.submitSignupHandler.bind(this)
    this.submitRestoreHandler = this.submitRestoreHandler.bind(this)
    this.switchType = this.switchType.bind(this)
  }

  componentDidMount() {
    post('/api/get-user')
      .then((data) => {
        if (data.status === 'ok') this.setUser(data.data)
        if (data.message) console.log(data.message)
      })
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

  switchType(e) {
    this.setState({
      currentType: e.currentTarget.value,
    })
  }

  loginOnChangeHandler(e) {
    this.setState({
      loginValue: e.currentTarget.value,
    })
  }

  passwordOnChangeHandler(e) {
    this.setState({
      passwordValue: e.currentTarget.value,
    })
  }

  secondPasswordOnChangeHandler(e) {
    this.setState({
      secondPasswordValue: e.currentTarget.value,
    })
  }

  secretOnChangeHandler(e) {
    this.setState({
      secretValue: e.currentTarget.value,
    })
  }

  submitSigninHandler(e) {
    e.preventDefault()

    // check inputs length
    if (this.state.loginValue.length > 5 && this.state.passwordValue.length > 6) {
      const body = {
        username: this.state.loginValue,
        password: this.state.passwordValue,
      }

      post('/api/signin', body)
        .then((data) => {
          if (data.status === 'ok') {
            this.setUser(data.data)
          }
        })
    } else {
      if (this.state.loginValue.length <= 5) alert('Логин должен быть длиннее 5 символов')
      if (this.state.passwordValue.length <= 6) alert('Пароль должен быть длиннее 6 символов')
    }
  }

  // TODO проверять что пароли совпадают
  submitSignupHandler(e) {
    e.preventDefault()

    // check inputs length
    if (this.state.loginValue.length > 5
      && this.state.passwordValue.length > 6
      && this.state.secretValue.length > 3
      && this.state.secondPasswordValue === this.state.passwordValue) {
      const body = {
        username: this.state.loginValue,
        password: this.state.passwordValue,
        secret: this.state.secretValue,
      }

      post('/api/signup', body)
        .then((data) => {
          if (data.status === 'ok') {
            this.setUser(data.data)
          }
        })
    } else {
      if (this.state.loginValue.length <= 5) alert('Логин должен быть длиннее 5 символов')
      if (this.state.passwordValue.length <= 6) alert('Пароль должен быть длиннее 6 символов')
      if (this.state.secretValue.length <= 3) alert('Введите секретное слово для восстановления пароля длиннее 3 символов')
      if (this.state.secondPasswordValue !== this.state.passwordValue) alert('Пароли не совпадают')
    }
  }

  submitRestoreHandler(e) {
    e.preventDefault()
    const body = {
      username: this.state.loginValue,
      secret: this.state.secretValue,
    }

    post('/api/restore', body)
      .then((data) => {
        if (data.status === 'ok') {
          this.setUser(data.data)
        }
      })
  }


  logOut() {
    post('/api/logout')
      .then((data) => {
        if (data.status === 'ok') {
          this.setState({
            isLogIn: false,
          })
          store.dispatch(userActions.resetUser())
        }
      })
  }

  render() {
    const content = !this.state.isLogIn
      ? (
        <LoginView
          {...this.state}
          loginModalSwitcher={this.loginModalSwitcher}
          switchType={this.switchType}
        >
          {this.state.currentType === 'signin'
          && (
            <SigninFormView
              loginModalSwitcher={this.loginModalSwitcher}
              submitSigninHandler={this.submitSigninHandler}
              loginOnChangeHandler={this.loginOnChangeHandler}
              passwordOnChangeHandler={this.passwordOnChangeHandler}
            />
          )}
          {this.state.currentType === 'signup'
          && (
            <SignupFormView
              loginModalSwitcher={this.loginModalSwitcher}
              submitSignupHandler={this.submitSignupHandler}
              loginOnChangeHandler={this.loginOnChangeHandler}
              passwordOnChangeHandler={this.passwordOnChangeHandler}
              secondPasswordOnChangeHandler={this.secondPasswordOnChangeHandler}
              secretOnChangeHandler={this.secretOnChangeHandler}
            />
          )}
          {this.state.currentType === 'restore'
          && (
            <RestoreFormView
              loginModalSwitcher={this.loginModalSwitcher}
              submitRestoreHandler={this.submitRestoreHandler}
              loginOnChangeHandler={this.loginOnChangeHandler}
              secretOnChangeHandler={this.secretOnChangeHandler}
              passwordOnChangeHandler={this.passwordOnChangeHandler}
              secondPasswordOnChangeHandler={this.secondPasswordOnChangeHandler}
            />
          )}
        </LoginView>
      )
      : <UserInfoView user={this.props.user} logOut={this.logOut} />

    return content
  }
}

LoginBlock.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isPlayer: PropTypes.bool.isRequired,
  }).isRequired,
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default connect(mapStateToProps)(LoginBlock)
