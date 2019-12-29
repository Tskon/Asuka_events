<template>
  <div>
    <b-modal
      id="restore-modal"
      title="Восстановление пароля"
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
        label="Новый пароль:"
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
        description="Код который вводили при регистрации"
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
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      form: {
        username: '',
        newPassword: '',
        secret: ''
      }
    }
  },
  methods: {
    ...mapActions({
      restore: 'user/restore',
    }),
    submit() {
      const body = {
        username: this.form.username,
        newPassword: this.form.newPassword,
        secret: this.form.secret
      }

      this.restore(body)
    },
    resetForm() {
      this.form.username = ''
      this.form.newPassword = ''
      this.form.secret = ''
    }
  }
}
</script>

<style scoped>

</style>