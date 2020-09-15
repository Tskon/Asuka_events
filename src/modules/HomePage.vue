<template>
  <div class="home">
    {{ greetings }}

    <div v-if="isAuth">
      Ты участвуешь в эвентах: {{ userEventList.join(', ') }}
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
        console.log(fullEvent)
        return fullEvent.name
      })
    }
  }
}
</script>
