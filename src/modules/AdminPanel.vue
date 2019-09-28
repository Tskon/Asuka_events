<template>
  <div>
    <div class="card card-body d-inline-block">
      <ul class="list-unstyled">
        <h5>Текущий ход:</h5>
        <li><b>Номер хода:</b> {{currentTurn.turnNumber}}</li>
        <li><b>Тип:</b> {{turnNames[currentTurn.turnName]}}</li>
        <li><b>Туман войны:</b> {{currentTurn.fog ? 'Вкл': 'Выкл'}}</li>
      </ul>

      <b-button variant="success">Следующий ход</b-button>
    </div>

    <div class="card card-body d-inline-block">
      <h5>Игроки:</h5>

    </div>

    <div class="card card-body d-inline-block">
      <h5>Ходы:</h5>

    </div>

    <div class="card card-body d-inline-block">
      <h5>Пользователи:</h5>

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
      currentTurn: state => state.map.currentTurn
    })
  },
  created() {
    this.getCurrentTurn()
    this.getAdminData()
  },
  methods: {
    ...mapActions({
      getCurrentTurn: 'map/getCurrentTurn',
      getAdminData: 'admin/getAdminData'
    })
  }
}
</script>

<style scoped lang="scss">
  .card {
    margin: 20px auto;
  }
</style>
