<template>
  <div>
    <b-navbar
      toggleable="sm"
      type="dark"
      variant="dark"
      class="row"
    >
      <b-navbar-brand to="/">
        ОГБ
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"/>
      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <MainMenu/>
        <b-navbar-nav class="ml-auto">
          <template v-if="!isAuth">
            <Login
              class="mr-1"
            />
            <Restore
              class="mr-1"
            />
            <SignUp/>
          </template>

          <b-nav-item-dropdown
            v-else
            right
          >
            <template slot="button-content">
              {{ personalData.clanTag }}
            </template>
            <b-dropdown-text v-if="isAdmin">
              Администратор
            </b-dropdown-text>
            <b-dropdown-divider v-if="isAdmin"/>
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
import { mapActions, mapGetters } from 'vuex'
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
    ...mapGetters({
      isAuth: 'user/isAuth',
      isAdmin: 'user/isAdmin',
      personalData: 'user/personalData'
    })
  },

  created() {
    this.getUser()
  },

  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      logout: 'user/logout'
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
