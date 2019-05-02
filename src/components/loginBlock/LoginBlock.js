import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import userActions from '../../services/redux/actions/userActions'
import store from '../../services/redux/store'
import LoginView from './LoginView'
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
      currentType: 'signin',
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
          submitHandler={this.submitHandler}
          switchType={this.switchType}
          loginOnChangeHandler={this.loginOnChangeHandler}
          passwordOnChangeHandler={this.passwordOnChangeHandler}
        />
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
