<template>
  <div class="admin-panel">
    <PlayersTable class="players-table"/>
    <GeneralState/>

    <div class="card card-body">
      <h5>Пользователи:</h5>
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
                status: 0
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
                status: 1
              })"
            >
              Сделать игроком
            </b-button>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import GeneralState from './components/GeneralState'
import PlayersTable from './components/PlayersTable'

export default {
  name: 'AdminPanelPage',

  components: {
    GeneralState,
    PlayersTable
  },

  data() {
    return {
      data: null
    }
  },

  computed: {
    ...mapState({
      adminData: (state) => state.admin
    })
  },

  created() {
    this.getCurrentTurn()
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
  padding-top: 20px;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-gap: 20px;

  @media (min-width: $md) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: $xl) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.logs {
  grid-row: 2;
  grid-column: 1 / span 3;
}

.admins-list {
  margin-bottom: 20px;

  .list-group-item {
    padding: 7px 0 7px 1.25rem;
  }
}

.users-list {
  margin-bottom: 20px;

  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 1.25rem;

    .btn {
      border-top-right-radius: 0;
    }

    &:not(:last-child) .btn {
      border-bottom-right-radius: 0;
    }
  }
}

.cells-grid {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(8, 1fr);
  grid-auto-flow: column;

  .cells-grid-item {
    width: 160px;
  }
}

.players-table {
  @media (min-width: $md) {
    grid-column: span 2;
    grid-row: span 2;
  }
}
</style>
