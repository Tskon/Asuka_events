<template>
  <b-navbar
    toggleable="sm"
    type="dark"
    variant="primary"
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
      <div class="ml-auto">
        <Login v-if="!user.id"/>
        <div v-else>
          {{ user.name }}
        </div>
      </div>
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
      user: state => state.user.user
    })
  },
  created () {
    this.getUser()
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser'
    })
  }
}
</script>

<style scoped>

</style>