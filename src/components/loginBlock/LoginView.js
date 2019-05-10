import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import RadioGroup from '@material-ui/core/es/RadioGroup/RadioGroup'
import Radio from '@material-ui/core/es/Radio/Radio'
import FormControlLabel from '@material-ui/core/es/FormControlLabel/FormControlLabel'
import Button from '@material-ui/core/Button'
import '../../scss/loginBlock/loginModal.scss'

function LoginView(props) {
  return (
    <div>
      <Button variant="outlined" onClick={props.loginModalSwitcher} color="primary">
        Войти
      </Button>
      <Drawer open={props.showModal} onClose={props.loginModalSwitcher} anchor="right">
        <form className="side-modal__content">
          {props.children}
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
    </div>
  )
}

LoginView.propTypes = {
  children: PropTypes.node.isRequired,
  loginModalSwitcher: PropTypes.func.isRequired,
  switchType: PropTypes.func.isRequired,
  currentType: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
}


export default LoginView
