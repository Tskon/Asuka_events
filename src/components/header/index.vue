<template>
  <div>
    <b-navbar
      toggleable="sm"
      type="dark"
      variant="dark"
      class="row"
    >
      <b-navbar-brand to="/">
        Asuka
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"/>
      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <MainMenu/>
        <b-navbar-nav class="ml-auto">
          <Login
            v-if="!user.name"
            class="mr-1"
          />
          <Restore
            v-if="!user.name"
            class="mr-1"
          />
          <SignUp v-if="!user.name"/>
          <b-nav-item-dropdown
            v-else
            right
          >
            <template slot="button-content">
              {{ user.name }}
            </template>
            <b-dropdown-text v-if="user.isAdmin">
              Администратор
            </b-dropdown-text>
            <b-dropdown-divider v-if="user.isAdmin"/>
            <b-dropdown-item-button @click="onLogout">
              Выход
            </b-dropdown-item-button>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Modal/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Login from './Login'
import Restore from './Restore'
import SignUp from './SignUp'
import MainMenu from '../MainMenu'
import Modal from '../Modal'

export default {
  components: {
    Login,
    Restore,
    SignUp,
    MainMenu,
    Modal
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  },

  created() {
    this.getUser()
    this.fetchEvents()

  },

  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      logout: 'user/logout',
      fetchEvents: 'events/fetchEvents'
    }),

    onLogout() {
      this.logout()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>

</style>
