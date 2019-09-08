import React from 'react'
import PropTypes from 'prop-types'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import '../../scss/loginBlock/loginModal.scss'

function SigninFormView(props) {
  return (
    <div>
      <DialogContentText className="side-modal__content-text">
        Войдите для доступа к эвенту и личному кабинету
      </DialogContentText>
      <TextField
        onChange={props.loginOnChangeHandler}
        autoFocus
        margin="dense"
        label="Логин (игровой ник)"
        name="login"
        type="text"
        autoComplete="username"
        fullWidth
      />
      <TextField
        onChange={props.passwordOnChangeHandler}
        margin="dense"
        name="password"
        label="Пароль"
        type="password"
        autoComplete="current-password"
        fullWidth
      />
    </div>
  )
}

SigninFormView.propTypes = {
  loginOnChangeHandler: PropTypes.func.isRequired,
  passwordOnChangeHandler: PropTypes.func.isRequired,
}

export default SigninFormView
