<template>
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
        <Login v-if="!user.id"/>
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
          <b-dropdown-text v-if="user.isPlayer">
            Участник&nbsp;эвента
          </b-dropdown-text>
          <b-dropdown-divider v-if="user.isAdmin || user.isPlayer"/>
          <b-dropdown-item-button @click="logout">
            Выход
          </b-dropdown-item-button>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Login from './Login'
import MainMenu from '../MainMenu'

export default {
  components: {
    Login,
    MainMenu
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  created () {
    this.getUser()
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
      logout: 'user/logout'
    })
  }
}
</script>

<style scoped>

</style>