import React from 'react'
import TextField from '@material-ui/core/TextField'
import IconSave from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'


export default props => (
  <div>
    <h1>Личный кабинет</h1>
    <form onSubmit={(e) => {
      console.log(props, e)
    }}
    >
      <TextField
        label="Ссылка на изображение"
        name="image"
        type="text"
        autoComplete="username"
      />
      <Button type="submit" variant="contained" color="primary">
        Сохранить
        <IconSave className="button-icon" />
      </Button>
    </form>
  </div>
)
