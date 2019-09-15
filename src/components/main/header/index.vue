<template>
  <header>
    <div class="d-flex">
      <Login v-if="!user.id"/>
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