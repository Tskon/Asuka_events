<template>
  <div>
    <b-button
      v-b-modal.login-modal
      variant="info"
    >
      Войти
    </b-button>
    <b-modal
      id="login-modal"
      ref="login-modal"
      title="Вход"
      centered
      @ok="submit"
      @hidden="resetForm"
      @show="onShow"
      @hide="onHide"
    >
      <b-form-group
        label="Login:"
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
      <b-button
        v-b-modal.restore-modal
        variant="link"
        class="p-0 text-dark"
        @click="restore"
      >
        Забыли пароль?
      </b-button>
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
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      signIn: 'user/signIn'
    }),
    submit(e) {
      if (!this.validate()) {
        e.preventDefault()
        return
      }

      const body = {
        username: this.form.username,
        password: this.form.password
      }

      this.signIn(body)
    },
    validate() {
      if (this.form.username !== '' && this.form.password !== '') return true

      return false
    },
    resetForm() {
      this.form.username = ''
      this.form.password = ''
    },
    restore() {
      this.$refs['login-modal'].hide()
    },
    okByEnterHandler(e) {
      if (e.code === 'Enter') {
        this.submit()
      }
    },
    onShow() {
      document.addEventListener('keydown', this.okByEnterHandler)
    },
    onHide() {
      document.removeEventListener('keydown', this.okByEnterHandler)
      this.resetForm()
    }
  }
}
</script>

<style scoped>

</style>
