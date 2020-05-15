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
        :value="playerData.score"
      />
      <PlayerInfoRow
        name="Статус"
        :value="playerData.battleStatus.inBattle ? 'В турнирной таблице' : 'Не участувуешь в боях'"
      />
      <PlayerInfoRow
        name="Текущий сектор"
        :value="playerData.currentCell || 'Отсутствует'"
      />
      <PlayerInfoRow
        name="Выбранный сектор"
        :value="playerData.selectedCell || 'Не выбран'"
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
  computed: {
    ...mapGetters({
      playerData: 'user/playerData',
      personalData: 'user/personalData',
      cells: 'map/cells'
    }),
    scoreForNextTurn() {
      const currentCell = this.cells.find(cell => cell.name === this.playerData.ownedCell)
      const cellBonus = currentCell ? currentCell.bonus : 0
      return (this.playerData.ownInRowCount > 2) ? 0 : cellBonus
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
