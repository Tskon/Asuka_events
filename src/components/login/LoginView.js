import React from 'react'
import PropTypes from 'prop-types'
import CheckboxLoginTypeSwitcher from './CheckboxLoginTypeSwitcher'
import TextInput from '../ui/TextInput'

function LoginView(props) {
  const modal = (
    <div className="login__modal-shadow">
      <div className="login__modal">
        <button
          title="Закрыть"
          type="button"
          className="login__modal-close-btn"
          onClick={props.loginModalSwitcher}
        >
          &#10006;
        </button>
        <form onSubmit={props.submitHandler}>
          <CheckboxLoginTypeSwitcher onChange={props.switchType} />
          <TextInput
            onChange={props.loginOnChangeHandler}
            labelText="Логин"
            name="login__login-field"
            required
          />
          <TextInput
            onChange={props.passwordOnChangeHandler}
            labelText="Пароль"
            name="login__password-field"
            type="password"
            required
          />
          {
            (props.currentType === props.typesList[0])
              ? <button className="login__signin-btn" type="submit">Войти</button>
              : <button className="login__signup-btn" type="submit">Зарегистрироваться</button>
          }
        </form>
      </div>
    </div>
  )

  return (
    <div>
      <button type="button" className="login__button" onClick={props.loginModalSwitcher}>
        Войти
      </button>
      <button type="button" className="login__button" onClick={props.logOut}>
        Выйти
      </button>
      {props.showModal && modal}
    </div>
  )
}

LoginView.propTypes = {
  loginModalSwitcher: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  switchType: PropTypes.func.isRequired,
  loginOnChangeHandler: PropTypes.func.isRequired,
  passwordOnChangeHandler: PropTypes.func.isRequired,
  currentType: PropTypes.string.isRequired,
  typesList: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default LoginView
