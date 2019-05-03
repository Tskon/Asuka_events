import React from 'react'
import PropTypes from 'prop-types'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconLockOpen from '@material-ui/icons/LockOpen'
import '../../scss/loginBlock/loginModal.scss'

function SigninFormView(props) {
  return (
    <div>
      <DialogContent>
        <DialogContentText className="dialog__content-text">
          Войдите для доступа к эвенту и личному кабинету
        </DialogContentText>
        <TextField
          onChange={props.loginOnChangeHandler}
          autoFocus
          margin="dense"
          label="Логин (игровой ник)"
          name="login"
          type="text"
          fullWidth
        />
        <TextField
          onChange={props.passwordOnChangeHandler}
          margin="dense"
          name="password"
          label="Пароль"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.loginModalSwitcher} color="default">
          Отмена
        </Button>
        <Button onClick={props.submitHandler} variant="contained" color="primary">
          Войти
          <IconLockOpen className="button-icon" />
        </Button>
      </DialogActions>
    </div>
  )
}

SigninFormView.propTypes = {
  loginModalSwitcher: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  loginOnChangeHandler: PropTypes.func.isRequired,
  passwordOnChangeHandler: PropTypes.func.isRequired,
}

export default SigninFormView
