<template>
  <div class="player-info-wrapper">
    <h2 class="info-title">
      Информация о клане {{ personalData.clanName }}:
    </h2>
    <div class="info-table">
      <PlayerInfoRow
        name="Очки за дальнейшее удержание сектора"
        :value="scoreForNextTurn"
      />
      <PlayerInfoRow
        name="Количество очков"
        :value="playerCurrentEvent.score || 0"
      />
      <PlayerInfoRow
        name="Статус"
        :value="'Не участувуешь в боях'"
      />
      <PlayerInfoRow
        name="Текущий сектор"
        :value="playerCurrentEvent.currentCell || 'Отсутствует'"
      />
      <PlayerInfoRow
        name="Выбранный сектор"
        :value="playerCurrentEvent.selectedCell || 'Не выбран'"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import PlayerInfoRow from "./PlayerInfoRow"

export default {
  name: "PlayerInfo",

  components: {
    PlayerInfoRow
  },

  props: {
    event:  {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      personalData: 'user/personalData',
      playerCurrentEvent: 'user/playerCurrentEvent'
    }),

    scoreForNextTurn() {
      const currentCell = this.event.cellList.find(cell => cell.name === this.event.ownedCell)
      const cellBonus = currentCell ? currentCell.bonus : 0
      return (this.event.ownInRowCount > 2) ? 0 : cellBonus
    }
  },

  created() {
    this.getPersonalData()
  },

  methods: {
    ...mapActions({
      getPersonalData: 'user/getPersonalData'
    })
  }
}
</script>

<style scoped>
  .player-info-wrapper {
    padding-top: 20px;
  }

  .info-table {
    display: flex;
    flex-direction: column;
    max-width: 400px;
  }
</style>
