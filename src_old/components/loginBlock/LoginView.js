import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import RadioGroup from '@material-ui/core/es/RadioGroup/RadioGroup'
import Radio from '@material-ui/core/es/Radio/Radio'
import FormControlLabel from '@material-ui/core/es/FormControlLabel/FormControlLabel'
import Button from '@material-ui/core/Button'
import IconPersonAdd from '@material-ui/icons/PersonAdd'
import IconRestore from '@material-ui/icons/Restore'
import IconLockOpen from '@material-ui/icons/LockOpen'
import {MuiThemeProvider} from '@material-ui/core/styles'
import themes from '../../services/themes'
import '../../scss/loginBlock/loginModal.scss'


function LoginView(props) {
  return (
    <div>
      <Button variant="outlined" onClick={props.loginModalSwitcher} color="primary">
        Войти
      </Button>
      <MuiThemeProvider theme={themes.dark}>
        <Drawer open={props.showModal} onClose={props.loginModalSwitcher} anchor="right">
          <form onSubmit={props.submitHandler} className="side-modal__content">
            <div>
              {props.children}
              <div className="side-modal__actions">
                <Button type="submit" variant="contained" color="primary">
                  {props.currentType === 'restore' && 'Восстановить пароль'}
                  {props.currentType === 'restore' && <IconRestore className="button-icon" />}
                  {props.currentType === 'signin' && 'Войти'}
                  {props.currentType === 'signin' && <IconLockOpen className="button-icon" />}
                  {props.currentType === 'signup' && 'Зарегистрироваться'}
                  {props.currentType === 'signup' && <IconPersonAdd className="button-icon" />}
                </Button>
                <Button onClick={props.loginModalSwitcher} color="default">
                  Отмена
                </Button>
              </div>
            </div>

            <RadioGroup
              aria-label="position"
              value={props.currentType}
              onChange={props.switchType}
            >
              <FormControlLabel
                value="signin"
                control={<Radio color="primary" />}
                label="Вход"
                labelPlacement="end"
              />
              <FormControlLabel
                value="signup"
                control={<Radio color="primary" />}
                label="Регистрация"
                labelPlacement="end"
              />
              <FormControlLabel
                value="restore"
                control={<Radio color="primary" />}
                label="Восстановление пароля"
                labelPlacement="end"
              />
            </RadioGroup>
          </form>
        </Drawer>
      </MuiThemeProvider>
    </div>
  )
}

LoginView.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  loginModalSwitcher: PropTypes.func.isRequired,
  switchType: PropTypes.func.isRequired,
  currentType: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
}


export default LoginView
