import React from 'react'
import PropTypes from 'prop-types'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconPersonAdd from '@material-ui/icons/PersonAdd'
import '../../scss/loginBlock/loginModal.scss'

function SignupFormView(props) {
  return (
    <div>
      <DialogContent>
        <DialogContentText className="dialog__content-text">
          Зарегистрируйтесь со своим игровым ником, данные по клану можно будет заполнить в
          личном кабинете, после подтверждения участника администратором
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
          label="Пароль"
          name="password"
          type="password"
          fullWidth
        />
        <TextField
          onChange={props.passwordOnChangeHandler}
          margin="dense"
          label="Повторите пароль"
          type="password"
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
          Зарегистрироваться
          <IconPersonAdd className="button-icon" />
        </Button>
      </DialogActions>
    </div>
  )
}

SignupFormView.propTypes = {
  loginModalSwitcher: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  loginOnChangeHandler: PropTypes.func.isRequired,
  passwordOnChangeHandler: PropTypes.func.isRequired,
}

export default SignupFormView
