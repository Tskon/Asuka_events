<template>
  <div class="card card-body d-flex flex-column justify-content-between">
    <div class="d-flex flex-column mb-2">
      <h3>{{ currentEvent.name }}</h3>
      <ul class="list-unstyled">
        <b>Текущий ход:</b>
        <li><b>Номер хода:</b> {{ currentTurn.turnNumber }}</li>
        <li><b>Тип:</b> {{ turnNames[currentTurn.type] || currentTurn.type }}</li>
        <li><b>Туман войны:</b> {{ currentTurn.fog ? 'Вкл': 'Выкл' }}</li>
      </ul>

      <b-button
        variant="success"
        @click="nextTurn(currentEvent.slug)"
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
import {mapState, mapActions} from 'vuex'

export default {
  name: 'GeneralState',

  props: {
    currentEvent: {
      type: Object,
      required: true
    }
  },

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
  },

  methods: {
    ...mapActions({
      nextTurn: 'admin/nextTurn',
      cleanEventData: 'admin/cleanEventData'
    }),
    deleteEventData() {
      this.$bvModal.msgBoxConfirm('Вы уверены что хотите удалить все данные эвента? Не будут затронуты данные пользователей и их права')
        .then((isOk) => {
          if (!isOk) return
          this.cleanEventData(this.currentEvent.slug)
        })
    }
  }
}
</script>

<style scoped>

</style>
