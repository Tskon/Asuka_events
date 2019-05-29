import React from 'react'
import TextField from "@material-ui/core/TextField";

export default (props) => (
  <div>
    <h1>Личный кабинет</h1>
    <TextField
      autoFocus
      margin="dense"
      label="Логин (игровой ник)"
      name="login"
      type="text"
      autoComplete="username"
      fullWidth
    />
  </div>
)
