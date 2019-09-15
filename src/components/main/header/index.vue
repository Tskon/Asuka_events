<template>
  <header class="row flex-wrap-reverse">
    <MainMenu class="col-12 col-sm-9"/>
    <div class="col-12 col-sm-3">
      <Login v-if="!user.id"/>
      <div
        v-else
        class="text-left text-sm-right"
      >
        {{user.name}}
      </div>
    </div>


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