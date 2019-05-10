import React from 'react'
import PropTypes from 'prop-types'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconLockOpen from '@material-ui/icons/LockOpen'
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
      <div className="side-modal__actions">
        <Button onClick={props.submitSigninHandler} variant="contained" color="primary">
          Войти
          <IconLockOpen className="button-icon" />
        </Button>
        <Button onClick={props.loginModalSwitcher} color="default">
          Отмена
        </Button>
      </div>
    </div>
  )
}

SigninFormView.propTypes = {
  loginModalSwitcher: PropTypes.func.isRequired,
  submitSigninHandler: PropTypes.func.isRequired,
  loginOnChangeHandler: PropTypes.func.isRequired,
  passwordOnChangeHandler: PropTypes.func.isRequired,
}

export default SigninFormView
