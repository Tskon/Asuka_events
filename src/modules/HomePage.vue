<template>
  <div class="home">
    <h1>{{ greetings }}</h1>

    <div v-if="isAuth">
      Чтобы зааписаться в новый эвент обратись к Тактику.
      <template v-if="userEventList.length">
        Ты участвуешь в эвентах: {{ userEventList.join(', ') }}
      </template>
      <template>
        Сейчас ты не участвуешь в эвентах.
      </template>
    </div>

    <div v-if="!isAuth"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'HomePage',

  computed: {
    ...mapGetters({
      isAuth: 'user/isAuth',
      personalData: 'user/personalData',
      username: 'user/username',
      playerEvents: 'user/playerEvents',
      events: 'events/eventList'
    }),

    greetings() {
      return this.isAuth ? `Рады видеть, ${this.username}!` : 'Привет, чтобы воспользоваться сайтом - авторизуйся.'
    },

    userEventList() {
      return this.playerEvents.map(playerEvent => {
        const fullEvent = this.events.find(event => event.slug === playerEvent.slug)
        return fullEvent.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 500px;
  height: 100%;
}
</style>
