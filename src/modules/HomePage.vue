<template>
  <div class="home">
    <h1>Океаническая глобальная карта</h1>
    <p class="greetings">
      {{ greetings }}
    </p>
    <div v-if="isAuth">
      Чтобы записаться в новый эвент обратись к Тактику.
      <template v-if="userEventList.length">
        <ul class="event-list">
          Ты участвуешь в эвентах:
          <li
            v-for="event in userEventList"
            :key="event.slug"
          >
            • {{ event.name }}
            (ход: {{ event.currentTurn.turnNumber }}, счет: {{ event.score }})
          </li>
        </ul>
      </template>

      <template v-else>
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
        return {
          ...fullEvent,
          ...playerEvent
        }
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
  max-width: 600px;
  height: calc(100% - 56px);
}

.greetings {
  font-size: 24px;
  margin: 0 auto 24px;
}

.event-list {
  width: 250px;
  text-align: left;
  list-style: none;
  padding: 12px 0 0;

  li {
    padding-left: 2px;
  }
}
</style>
