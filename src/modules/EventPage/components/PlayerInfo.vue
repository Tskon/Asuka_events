<template>
  <div class="player-info-wrapper">
    <div class="info-table">
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
        :value="playerData.currentCellId.toUpperCase() || 'Отсутствует'"
      />
      <PlayerInfoRow
        name="Выбранный сектор"
        :value="playerData.selectedCellId.toUpperCase() || 'Не выбран'"
      />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PlayerInfoRow from "./PlayerInfoRow"

export default {
  name: "PlayerInfo",
  components: {
    PlayerInfoRow
  },
  computed: {
    ...mapGetters({
      playerData: 'user/playerData'
    })
  }
}
</script>

<style scoped>
  .info-table {

  }
</style>
