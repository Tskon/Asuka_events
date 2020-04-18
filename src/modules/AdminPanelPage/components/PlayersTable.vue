<template>
  <div class="card card-body">
    <h5>Игроки:</h5>
    <div
      v-for="player in players"
      :key="player.id"
    >
      <b>Имя:</b> {{ player.username }}
      <b>Очки:</b> {{ player.score }}
      <b>Выбранный сектор:</b> {{ player.selectedCellId }}
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'PlayersTable',

  computed: {
    ...mapState({
      players: (state) => state.admin.users.players
    })
  }
}
</script>

<style scoped lang="scss">

</style>
