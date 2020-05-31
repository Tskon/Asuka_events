<template>
  <b-navbar-nav>
    <b-nav-item
      v-if="isAuth"
      to="/event"
    >
      Эвенты
    </b-nav-item>
    <b-nav-item
      v-if="isPlayer"
      to="/personalPanel"
    >
      Личный кабинет
    </b-nav-item>
    <b-nav-item
      v-if="isAdmin"
      to="/adminPanel"
    >
      Админка
    </b-nav-item>
  </b-navbar-nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isAuth: 'user/isAuth',
      isAdmin: 'user/isAdmin',
      isPlayer: 'user/isPlayer'
    })
  }
}
</script>
