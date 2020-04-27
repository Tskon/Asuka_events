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
          label: 'Выбр.'
        },
        {
          key: 'ownedCell',
          label: 'Влад.'
        },
        {
          key: 'ownInRowCount',
          label: 'Ход.Влад.'
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
        score: player.score || 0,
        currentCell: player.currentCell || '',
        selectedCell: player.selectedCell || '',
        ownedCell: player.ownedCell || '',
        ownInRowCount: player.ownInRowCount || 0
      }))
    }
  }
}
</script>
