<template>
  <div class="players-table card card-body">
    <h5>Игроки:</h5>
    <b-table :items="items" :fields="fields"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'PlayersTable',

  data() {
    return {
      fields: [
        {
          key: 'username',
          sortable: true,
          label: 'Клан'
        },
        {
          key: 'score',
          sortable: true,
          label: 'Очки'
        },
        {
          key: 'currentCell',
          label: 'Текущ.',
          sortable: true
        },
        {
          key: 'selectedCell',
          label: 'Выбр.',
          sortable: false
        },
        {
          key: 'ownedCell',
          label: 'Принадл.',
          sortable: false
        }
      ]
    }
  },

  computed: {
    ...mapState({
      players: (state) => state.admin.users.players
    }),
    items() {
      return this.players.map(player => ({
        username: player.username,
        score: player.score || 47,
        currentCell: player.currentCellId || 'a1',
        selectedCell: player.currentCellId || 'b2',
        ownedCell: player.ownedCell
      }))
    }
  }
}
</script>
