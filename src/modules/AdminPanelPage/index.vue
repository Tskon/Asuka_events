<template>
  <div class="admin-panel pb-3">
    <b-card
      class="events"
      no-body
    >
      <b-tabs card>
        <b-tab
          v-for="event in eventList"
          :key="event.slug"
          :title="event.name"
          active
        >
          <div class="event-tab">
            <GeneralState
              :current-event="event"
              class="event-tab__state"
            />
            <div class="event-tab__user-table card card-body">
              <h3>Пользователи:</h3>
              <b-card
                no-body
                header="Администраторы"
                class="admins-list"
              >
                <b-list-group flush>
                  <b-list-group-item
                    v-for="admin in adminData.users.admins"
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
                    v-for="player in adminData.users.players"
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
                    v-for="user in adminData.users.commonUsers"
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
            <PlayersTable class="event-tab__players-table"/>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
    <CreateEvent class="new-event card card-body"/>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import GeneralState from './components/GeneralState'
import PlayersTable from './components/PlayersTable'
import CreateEvent from './components/CreateEvent'

export default {
  name: 'AdminPanelPage',

  components: {
    GeneralState,
    PlayersTable,
    CreateEvent
  },

  data() {
    return {
      data: null
    }
  },

  computed: {
    ...mapState({
      adminData: (state) => state.admin
    }),

    ...mapGetters({
      eventList: 'events/eventList'
    })
  },

  created() {
    this.getAdminData()
    this.getLogs()
  },

  methods: {
    ...mapActions({
      getCurrentTurn: 'map/getCurrentTurn',
      getAdminData: 'admin/getAdminData',
      setPlayerStatus: 'admin/setPlayerStatus',
      getLogs: 'admin/getLogs'
    })
  }
}
</script>

<style scoped lang="scss">
.admin-panel {
  margin-left: -15px;
  margin-right: -15px;
  padding: 20px;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  background-color: lighten($dark, 20%);

  @media (min-width: $md) {
    grid-template-columns: 1fr 1fr;

    .events {
      grid-column: 1 / span 2;
    }
  }

  @media (min-width: $xl) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.event-tab {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  &__players-table {
    grid-column: 1 / span 2;
  }
}
</style>
