import React from 'react'
import PropTypes from 'prop-types'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconRestore from '@material-ui/icons/Restore'
import '../../scss/loginBlock/loginModal.scss'

function RestoreFormView(props) {
  return (
    <div>
      <DialogContent>
        <DialogContentText className="dialog__content-text">
          Восстановите пароль с помощью кодового слова (заданного в личном кабинете) или
          обратитесь к администратору
        </DialogContentText>
        <TextField
          onChange={props.loginOnChangeHandler}
          autoFocus
          margin="dense"
          name="login"
          label="Логин (игровой ник)"
          type="text"
          fullWidth
        />
        <TextField
          onChange={props.passwordOnChangeHandler}
          margin="dense"
          label="Секретное слово"
          name="secret"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.loginModalSwitcher} color="default">
          Отмена
        </Button>
        <Button onClick={props.submitHandler} variant="contained" color="primary">
          Восстановить пароль
          <IconRestore className="button-icon" />
        </Button>
      </DialogActions>
    </div>
  )
}

RestoreFormView.propTypes = {
  loginModalSwitcher: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  loginOnChangeHandler: PropTypes.func.isRequired,
  passwordOnChangeHandler: PropTypes.func.isRequired,
}

export default RestoreFormView
