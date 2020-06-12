<template>
  <div class="card card-body">
    <h3>Пользователи:</h3>
    <b-card
      no-body
      header="Администраторы"
      class="admins-list"
    >
      <b-list-group flush>
        <b-list-group-item
          v-for="admin in admins"
          :key="admin.username"
        >
          {{ admin.username }}
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <b-card
      no-body
      header="Игроки"
      class="users-list"
    >
      <b-list-group flush>
        <b-list-group-item
          v-for="player in players"
          :key="player.username"
        >
          {{ player.username }}
          <b-button
            variant="danger"
            @click="setPlayerStatus({
              username: player.username,
              status: false,
              eventSlug: event.slug
            })"
          >
            Удалить права
          </b-button>
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <b-card
      no-body
      header="Обычные пользователи"
      class="users-list"
    >
      <b-list-group flush>
        <b-list-group-item
          v-for="user in commonUsers"
          :key="user.username"
        >
          {{ user.username }}
          <b-button
            variant="success"
            @click="setPlayerStatus({
              username: user.username,
              status: true,
              eventSlug: event.slug
            })"
          >
            Сделать игроком
          </b-button>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: "UsersTable",

  props: {
    users: {
      type: Array,
      default: () => []
    },

    event: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    admins() {
      return this.users.filter(user => user.isAdmin)
    },

    players() {
      return this.users.filter(user => {
        if (!user.eventList) return false

        return user.eventList.some(event => event.slug === this.event.slug)
      })
    },

    commonUsers() {
      return this.users.filter(user => {
        return !user.eventList || !user.eventList.length
      })
    }
  },

  methods: {
    ...mapActions({
      setPlayerStatus: 'admin/setPlayerStatus'
    })
  }
}
</script>

<style scoped>

</style>
