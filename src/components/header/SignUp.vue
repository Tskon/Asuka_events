<template>
  <div>
    <b-button
      v-b-modal.sign-up-modal
      variant="outline-info"
    >
      Зарегистрироваться
    </b-button>
    <b-modal
      id="sign-up-modal"
      title="Регистрация"
      centered
      @ok="submit"
      @hidden="resetForm"
    >
      <b-form-group
        label="Email address:"
        label-for="login-input"
        description="Не менее 6 символов"
      >
        <b-form-input
          id="login-input"
          v-model="form.username"
          type="email"
          required
          placeholder="Enter email"
        />
      </b-form-group>

      <b-form-group
        label="Password:"
        label-for="password-input"
        description="Не менее 6 символов"
      >
        <b-form-input
          id="password-input"
          v-model="form.password"
          type="password"
          required
          placeholder="Password"
        />
      </b-form-group>

      <b-form-group
        label="Кодовое слово:"
        label-for="secret-input"
        description="Требуется для восстановления пароля"
      >
        <b-form-input
          id="secret-input"
          v-model="form.secret"
          type="password"
          required
          placeholder="Password"
        />
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        secret: ''
      }
    }
  },
  methods: {
    ...mapActions({
      signUp: 'user/signUp'
    }),
    submit() {
      const body = {
        username: this.form.username,
        password: this.form.password,
        secret: this.form.secret
      }

      this.signUp(body)
    },
    resetForm() {
      this.form.username = ''
      this.form.password = ''
      this.form.secret = ''
    }
  }
}
</script>

<style scoped>

</style>
