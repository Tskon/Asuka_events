import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import IconSave from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'

LkView.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
}

function LkView(props) {
  return (
    <div className="lk-layout">
      <h1 className="lk-title">Личный кабинет</h1>
      <form className="lk-form" onSubmit={props.submitHandler}>
        <TextField
          label="Название клана"
          name="clanName"
          type="text"
          onChange={props.inputHandler}
        />
        <TextField
          label="Клан-тег"
          name="clanTag"
          type="text"
          onChange={props.inputHandler}
        />
        <TextField
          label="Ссылка на аватар"
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
      <section className="lk-preview">
        <h3 className="lk-preview__title">{props.clanTag && `[${props.clanTag}] `}{props.clanName}</h3>
        <div className="lk-preview__avatar">
          {props.imageUrl && <img src={props.imageUrl} alt="Аватар" />}
        </div>
      </section>
    </div>
  )
}

export default LkView
