import React from 'react'
import PropTypes from 'prop-types'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import '../../scss/loginBlock/loginModal.scss'

function RestoreFormView(props) {
  return (
    <div>
      <DialogContentText className="side-modal__content-text">
        Восстановите пароль с помощью секретного слова или обратитесь к администратору
      </DialogContentText>
      <TextField
        onChange={props.loginOnChangeHandler}
        autoFocus
        margin="dense"
        name="login"
        label="Логин (игровой ник)"
        type="text"
        autoComplete="username"
        fullWidth
      />
      <TextField
        onChange={props.secretOnChangeHandler}
        margin="dense"
        label="Секретное слово"
        name="secret"
        type="password"
        autoComplete="off"
        fullWidth
      />
      <TextField
        onChange={props.passwordOnChangeHandler}
        margin="dense"
        label="Новый пароль"
        name="password"
        type="password"
        autoComplete="new-password"
        fullWidth
      />
      <TextField
        onChange={props.secondPasswordOnChangeHandler}
        margin="dense"
        label="Повторите пароль"
        type="password"
        autoComplete="new-password"
        fullWidth
      />
    </div>
  )
}

RestoreFormView.propTypes = {
  loginOnChangeHandler: PropTypes.func.isRequired,
  secretOnChangeHandler: PropTypes.func.isRequired,
  passwordOnChangeHandler: PropTypes.func.isRequired,
  secondPasswordOnChangeHandler: PropTypes.func.isRequired,
}

export default RestoreFormView
