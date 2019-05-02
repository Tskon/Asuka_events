import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import RadioGroup from '@material-ui/core/es/RadioGroup/RadioGroup'
import Radio from '@material-ui/core/es/Radio/Radio'
import FormControlLabel from '@material-ui/core/es/FormControlLabel/FormControlLabel'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconLockOpen from '@material-ui/icons/LockOpen'
import '../../scss/loginBlock/loginModal.scss'

function LoginView(props) {
  return (
    <div>
      <Button variant="outlined" onClick={props.loginModalSwitcher} color="primary">
        Войти
      </Button>
      <Dialog open={props.showModal} onClose={props.loginModalSwitcher} fullWidth>
        <DialogTitle>
          <div>
            <RadioGroup
              aria-label="position"
              value={props.currentType}
              onChange={props.switchType}
              row
            >
              <FormControlLabel
                value="signin"
                control={<Radio color="primary" />}
                label="Вход"
                labelPlacement="start"
              />
              <FormControlLabel
                value="signup"
                control={<Radio color="primary" />}
                label="Регистрация"
                labelPlacement="start"
              />
              <FormControlLabel
                value="restore"
                control={<Radio color="primary" />}
                label="Восстановление пароля"
                labelPlacement="start"
              />
            </RadioGroup>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="dialog__content-text">
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
  showModal: PropTypes.bool.isRequired,
}


export default LoginView
