<template>
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
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'GeneralState',

  data() {
    return {
      turnNames: {
        selectStartSector: 'Выбор стартового сектора',
        commonTurn: 'Обычный ход'
      }
    }
  },

  computed: {
    ...mapState({
      currentTurn: (state) => state.map.currentTurn
    })
  }
}
</script>

<style scoped>

</style>
