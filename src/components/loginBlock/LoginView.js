import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
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
        {props.children}
      </Dialog>
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
