<template>
  <header>
    <div class="d-flex">
      <template v-if="!user.id">
        <b-button v-b-modal.login-modal>
          Войти
        </b-button>
        <b-modal
          id="login-modal"
          title="Войти"
          @ok="onSubmit"
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
      </template>
      <div
        v-else
        class="info"
      >
        {{user.name}}
      </div>
    </div>

    <MainMenu/>
  </header>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import MainMenu from './MainMenu'

export default {
  components: {
    MainMenu
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  created () {
    this.getUser()
  },
  methods: {
    ...mapActions({
      signIn: 'user/signIn',
      getUser: 'user/getUser',
    }),
    onSubmit() {
      const body = {
        username: this.form.username,
        password: this.form.password,
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