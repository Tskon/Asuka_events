<template>
  <b-navbar-nav>
    <b-nav-item to="/event">
      Эвент
    </b-nav-item>
    <b-nav-item to="/personalPanel">
      Личный кабинет
    </b-nav-item>
    <b-nav-item to="/adminPanel">
      Админка
    </b-nav-item>
  </b-navbar-nav>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isAuth: 'user/isAuth'
    })
  }
}
</script>
