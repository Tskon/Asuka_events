import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconLockOpen from '@material-ui/icons/LockOpen'

function LoginView(props) {
  return (
    <div>
      <Button variant="outlined" onClick={props.loginModalSwitcher} color="primary">
        Войти
      </Button>
      <Dialog open={props.showModal} onClose={props.loginModalSwitcher} fullWidth>
        <DialogTitle>Вход \ Регистрация</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Зарегистрируйтесь со своим игровым ником, данные по клану можно будет заполнить в личном
            кабинете, после подтверждения участника администратором
          </DialogContentText>
          <TextField
            onChange={props.loginOnChangeHandler}
            autoFocus
            margin="dense"
            label="Логин (игровой ник)"
            type="text"
            fullWidth
          />
          <TextField
            onChange={props.passwordOnChangeHandler}
            margin="dense"
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
            Вход
            <IconLockOpen className="button-icon" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

LoginView.propTypes = {
  loginModalSwitcher: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  switchType: PropTypes.func.isRequired,
  loginOnChangeHandler: PropTypes.func.isRequired,
  passwordOnChangeHandler: PropTypes.func.isRequired,
  currentType: PropTypes.string.isRequired,
  typesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  showModal: PropTypes.bool.isRequired,
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
})

export default LoginView
