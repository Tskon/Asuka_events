<template>
  <header>
    <div class="d-flex">
      <b-button v-b-modal.login-modal>
        Войти
      </b-button>
      <b-modal
        id="login-modal"
        title="BootstrapVue"
      >
        <b-form-group
          label="Email address:"
          label-for="login-input"
          description="Не менее 6 символов"
        >
          <b-form-input
            id="login-input"
            v-model="form.login"
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

    <MainMenu/>
  </header>
</template>

<script>
import MainMenu from "./MainMenu"

export default {
  components: {
    MainMenu
  },
  data () {
    return {
      form: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>

<style scoped>

</style>