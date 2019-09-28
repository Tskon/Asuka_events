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
  },
  methods: {
    ...mapActions({
      getCurrentTurn: 'map/getCurrentTurn'
    })
  }
}
</script>

<style scoped lang="scss">
  .card {
    margin: 20px auto;
  }
</style>
