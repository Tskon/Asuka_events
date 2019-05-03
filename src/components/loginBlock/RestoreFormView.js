import React from 'react'
import PropTypes from 'prop-types'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconRestore from '@material-ui/icons/Restore'
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
        fullWidth
      />
      <TextField
        onChange={props.secretOnChangeHandler}
        margin="dense"
        label="Секретное слово"
        name="secret"
        type="password"
        fullWidth
      />
      <div className="side-modal__actions">
        <Button onClick={props.submitRestoreHandler} variant="contained" color="primary">
          Восстановить пароль
          <IconRestore className="button-icon" />
        </Button>
        <Button onClick={props.loginModalSwitcher} color="default">
          Отмена
        </Button>
      </div>
    </div>
  )
}

RestoreFormView.propTypes = {
  loginModalSwitcher: PropTypes.func.isRequired,
  submitRestoreHandler: PropTypes.func.isRequired,
  loginOnChangeHandler: PropTypes.func.isRequired,
  secretOnChangeHandler: PropTypes.func.isRequired,
}

export default RestoreFormView
