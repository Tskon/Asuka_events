<template>
  <div>
    <b-button v-b-modal.login-modal>
      Войти
    </b-button>
    <b-modal
      id="login-modal"
      title="Войти"
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
          required
          placeholder="Enter name"
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
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      signIn: 'user/signIn',
      getUser: 'user/getUser',
    }),
    submit() {
      const body = {
        username: this.form.username,
        password: this.form.password
      }

      this.signIn(body)
    },
    resetForm() {
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>

<style scoped>

</style>