<template>
  <div class="card card-body d-flex flex-column justify-content-between">
    <div class="d-flex flex-column mb-2">
      <h3>{{ currentEvent.name }}</h3>
      <ul class="list-unstyled">
        <b>Текущий ход:</b>
        <li><b>Номер хода:</b> {{ currentEvent.turnNumber }}</li>
        <li><b>Тип:</b> {{ turnNames[currentTurn.type] }}</li>
        <li><b>Туман войны:</b> {{ currentTurn.fog ? 'Вкл': 'Выкл' }}</li>
      </ul>

      <b-button
        variant="success"
        :disabled="isLustTurn"
        @click="nextTurn(currentEvent.slug)"
      >
        {{ isLustTurn ? 'Эвент окончен' : 'Следующий ход' }}
      </b-button>
    </div>

    <b-button
      class="mt-auto mb-3"
      variant="outline-warning"
      @click="deleteEventData"
    >
      Сбросить данные эвента
    </b-button>

    <b-button
      variant="outline-danger"
      @click="delEvent"
    >
      Удалить эвент
    </b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
    currentTurn() {
      return this.currentEvent.turnList.find(turn => turn.turnNumber === this.currentEvent.turnNumber)
    },

    isLustTurn() {
      return this.currentEvent.turnList.length === this.currentEvent.turnNumber
    }
  },

  methods: {
    ...mapActions({
      nextTurn: 'admin/nextTurn',
      cleanEventData: 'admin/cleanEventData',
      deleteEvent: 'admin/deleteEvent'
    }),

    deleteEventData() {
      this.$bvModal.msgBoxConfirm('Вы уверены что хотите удалить все данные эвента? Не будут затронуты данные пользователей и их права')
        .then((isOk) => {
          if (!isOk) return
          this.cleanEventData(this.currentEvent.slug)
        })
    },

    delEvent() {
      this.$bvModal.msgBoxConfirm('Будет удален эвент, его логи, прогресс у пользователей. Удалить?')
        .then((isOk) => {
          if (!isOk) return
          this.deleteEvent(this.currentEvent.slug)
        })
    }
  }
}
</script>

<style scoped>

</style>
