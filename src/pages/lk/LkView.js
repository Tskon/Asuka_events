import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import IconSave from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'

const LkView = props => (
  <div>
    <h1>Личный кабинет</h1>
    <form className="lk-form" onSubmit={props.submitHandler}>
      <TextField
        label="Ссылка на изображение"
        name="image"
        type="text"
        autoComplete="username"
        onChange={props.inputHandler}
      />
      <Button type="submit" variant="contained" color="primary">
        Сохранить
        <IconSave className="button-icon" />
      </Button>
    </form>
  </div>
)

LkView.propTypes = {
  submitHandler: PropTypes.func.isRequired,
}

export default LkView
