<template>
  <div class="player-info-wrapper">
    <h2 class="info-title">
      Информация о клане {{ personalData.clanName }}:
    </h2>
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
      personalData: 'user/personalData'
    })
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
