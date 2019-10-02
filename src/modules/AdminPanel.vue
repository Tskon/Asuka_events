<template>
  <div class="admin-panel">
    <div class="card card-body d-inline-block">
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

    <div class="card card-body">
      <h5>Игроки:</h5>
    </div>

    <div class="card card-body">
      <h5>Ходы:</h5>
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
import {mapActions, mapState} from 'vuex'

export default {
  data() {
    return {
      data: null,
      turnNames: {
        selectStartSector: 'Выбор стартового сектора',
        commonTurn: `Обычный ход`
      }
    }
  },
  computed: {
    ...mapState({
      currentTurn: state => state.map.currentTurn,
      adminData: state => state.admin
    })
  },
  created() {
    this.getCurrentTurn()
    this.getAdminData()
  },
  methods: {
    ...mapActions({
      getCurrentTurn: 'map/getCurrentTurn',
      getAdminData: 'admin/getAdminData',
      setPlayerStatus: 'admin/setPlayerStatus',
      nextTurn: 'admin/nextTurn'
    })
  }
}
</script>

<style scoped lang="scss">
.admin-panel {
  padding-top: 20px;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
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

</style>
