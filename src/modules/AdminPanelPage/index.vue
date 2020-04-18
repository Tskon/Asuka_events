<template>
  <div class="admin-panel">
    <div class="card card-body d-flex flex-column justify-content-between">
      <div class="d-flex flex-column mb-2">
        <ul class="list-unstyled">
          <h5>Текущий ход:</h5>
          <li><b>Номер хода:</b> {{ currentTurn.turnNumber }}</li>
          <li><b>Тип:</b> {{ turnNames[currentTurn.turnName] }}</li>
          <li><b>Туман войны:</b> {{ currentTurn.fog ? 'Вкл': 'Выкл' }}</li>
        </ul>

        <b-button
          variant="success"
          @click="nextTurn"
        >
          Следующий ход
        </b-button>
      </div>

      <b-button
        variant="danger"
        @click="deleteEventData"
      >
        Сбросить данные эвента
      </b-button>
    </div>

    <div class="card card-body">
      <h5>Игроки:</h5>
      <div
        v-for="player in players"
        :key="player.id"
      >
        <b>Имя:</b> {{ player.username }}
        <b>Очки:</b> {{ player.score }}
        <b>Выбранный сектор:</b> {{ player.selectedCellId }}
      </div>
    </div>

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
            :key="admin.id"
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
            :key="player.id"
          >
            {{ player.username }}
            <b-button
              variant="danger"
              @click="setPlayerStatus({
                userId: player.id,
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
            :key="user.id"
          >
            {{ user.username }}
            <b-button
              variant="success"
              @click="setPlayerStatus({
                userId: user.id,
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

export default {
  name: 'AdminPanelPage',
  data() {
    return {
      data: null,
      turnNames: {
        selectStartSector: 'Выбор стартового сектора',
        commonTurn: 'Обычный ход'
      }
    }
  },
  computed: {
    ...mapState({
      currentTurn: (state) => state.map.currentTurn,
      adminData: (state) => state.admin
    }),
    players() {
      if (!this.adminData.logs.length) return []
      return this.adminData.logs[this.adminData.logs.length - 1].players.map((player) => {
        const playerData = this.adminData.users.players.find(((p) => p.id === player.userId))
        return { ...player, ...playerData }
      })
    }
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
      getLogs: 'admin/getLogs',
      nextTurn: 'admin/nextTurn',
      cleanEventData: 'admin/cleanEventData'
    }),
    deleteEventData() {
      this.$bvModal.msgBoxConfirm('Вы уверены что хотите удалить все данные эвента? Не будут затронуты данные пользователей и их права')
        .then((isOk) => {
          if (!isOk) return
          this.cleanEventData()
        })
    }
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

</style>
