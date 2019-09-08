import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import userActions from '../../services/redux/actions/userActions'
import store from '../../services/redux/store'
import snackbarActions from '../../services/redux/actions/snackbarActions'
import LoginView from './LoginView'
import RestoreFormView from './RestoreFormView'
import SigninFormView from './SigninFormView'
import SignupFormView from './SignupFormView'
import UserInfoView from './UserInfoView'
import { post } from '../../services/utils'


class LoginBlock extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      isAdmin: PropTypes.bool.isRequired,
      isPlayer: PropTypes.bool.isRequired,
    }).isRequired,
  }

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
  }

  componentDidMount() {
    post('/api/user/get-user')
      .then((data) => {
        if (data.status === 'ok') this.setUser(data.data)
        if (data.message) console.log(data.message)
      })
  }

  setUser = (user) => {
    store.dispatch(userActions.setUser(user))
    this.setState({
      isLogIn: true,
      showModal: false,
    })
  }

  loginModalSwitcher = () => {
    const { showModal } = this.state
    this.setState({
      showModal: !showModal,
    })
  }

  switchType = (e) => {
    this.setState({
      currentType: e.currentTarget.value,
    })
  }

  loginOnChangeHandler = (e) => {
    this.setState({
      loginValue: e.currentTarget.value,
    })
  }

  passwordOnChangeHandler = (e) => {
    this.setState({
      passwordValue: e.currentTarget.value,
    })
  }

  secondPasswordOnChangeHandler = (e) => {
    this.setState({
      secondPasswordValue: e.currentTarget.value,
    })
  }

  secretOnChangeHandler = (e) => {
    this.setState({
      secretValue: e.currentTarget.value,
    })
  }

  submitSigninHandler = (e) => {
    e.preventDefault()

    if (this.state.loginValue.length <= 5) {
      return store.dispatch(snackbarActions.openSnackbar({
        message: 'Логин должен быть длиннее 5 символов',
        type: 'error',
      }))
    }
    if (this.state.passwordValue.length <= 6) {
      return store.dispatch(snackbarActions.openSnackbar({
        message: 'Пароль должен быть длиннее 6 символов',
        type: 'error',
      }))
    }

    const body = {
      username: this.state.loginValue,
      password: this.state.passwordValue,
    }

    post('/api/signin', body)
      .then((data) => {
        if (data.status === 'ok') {
          this.setUser(data.data)
          store.dispatch(snackbarActions.openSnackbar({
            message: `Добро пожаловать, ${data.data.name}`,
            type: 'success',
          }))
        }
      })
  }

  submitSignupHandler = (e) => {
    e.preventDefault()

    if (this.state.loginValue.length <= 5) {
      return store.dispatch(snackbarActions.openSnackbar({
        message: 'Логин должен быть длиннее 5 символов',
        type: 'error',
      }))
    }
    if (this.state.passwordValue.length <= 6) {
      return store.dispatch(snackbarActions.openSnackbar({
        message: 'Пароль должен быть длиннее 6 символов',
        type: 'error',
      }))
    }
    if (this.state.secretValue.length <= 3) {
      return store.dispatch(snackbarActions.openSnackbar({
        message: 'Введите секретное слово для восстановления пароля длиннее 3 символов',
        type: 'error',
      }))
    }
    if (this.state.secondPasswordValue !== this.state.passwordValue) {
      return store.dispatch(snackbarActions.openSnackbar({
        message: 'Пароли не совпадают',
        type: 'error',
      }))
    }

    const body = {
      username: this.state.loginValue,
      password: this.state.passwordValue,
      secret: this.state.secretValue,
    }

    post('/api/signup', body)
      .then((data) => {
        if (data.status === 'ok') {
          this.setUser(data.data)
          store.dispatch(snackbarActions.openSnackbar({
            message: `Добро пожаловать, ${data.data.name}`,
            type: 'success',
          }))
        }
      })
  }

  submitRestoreHandler = (e) => {
    e.preventDefault()
    if (this.state.loginValue.length <= 5) {
      return store.dispatch(snackbarActions.openSnackbar({
        message: 'Логин должен быть длиннее 5 символов',
        type: 'error',
      }))
    }
    if (this.state.passwordValue.length <= 6) {
      return store.dispatch(snackbarActions.openSnackbar({
        message: 'Пароль должен быть длиннее 6 символов',
        type: 'error',
      }))
    }
    if (this.state.secretValue.length <= 3) {
      return store.dispatch(snackbarActions.openSnackbar({
        message: 'Введите секретное слово для восстановления пароля длиннее 3 символов',
        type: 'error',
      }))
    }
    if (this.state.secondPasswordValue !== this.state.passwordValue) {
      return store.dispatch(snackbarActions.openSnackbar({
        message: 'Пароли не совпадают',
        type: 'error',
      }))
    }

    const body = {
      username: this.state.loginValue,
      newPassword: this.state.password,
      secret: this.state.secretValue,
    }

    post('/api/restore', body)
      .then((data) => {
        if (data.status === 'ok') {
          this.setUser(data.data)
          store.dispatch(snackbarActions.openSnackbar({
            message: 'Пароль успешно изменен',
            type: 'success',
          }))
        }
      })
  }

  logOut = () => {
    post('/api/user/logout')
      .then((data) => {
        if (data.status === 'ok') {
          this.setState({
            isLogIn: false,
          })
          store.dispatch(userActions.resetUser())
          store.dispatch(snackbarActions.openSnackbar({
            message: 'Возвращайся, товарищ!',
            type: 'info',
          }))
        }
      })
  }

  render() {
    let submitHandler
    switch (this.state.currentType) {
      case 'signin':
        submitHandler = this.submitSigninHandler
        break
      case 'signup':
        submitHandler = this.submitSignupHandler
        break
      default:
        submitHandler = this.submitRestoreHandler
    }

    const content = !this.state.isLogIn
      ? (
        <LoginView
          {...this.state}
          submitHandler={submitHandler}
          loginModalSwitcher={this.loginModalSwitcher}
          switchType={this.switchType}
        >
          {this.state.currentType === 'signin'
          && (
            <SigninFormView
              loginOnChangeHandler={this.loginOnChangeHandler}
              passwordOnChangeHandler={this.passwordOnChangeHandler}
            />
          )}
          {this.state.currentType === 'signup'
          && (
            <SignupFormView
              loginOnChangeHandler={this.loginOnChangeHandler}
              passwordOnChangeHandler={this.passwordOnChangeHandler}
              secondPasswordOnChangeHandler={this.secondPasswordOnChangeHandler}
              secretOnChangeHandler={this.secretOnChangeHandler}
            />
          )}
          {this.state.currentType === 'restore'
          && (
            <RestoreFormView
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

const mapStateToProps = state => ({
  user: state.user.data,
})

export default connect(mapStateToProps)(LoginBlock)