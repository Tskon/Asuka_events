<template>
  <b-popover
    :target="'cell-popover-' + cell.id"
    :title="'Действия для сектора ' + cell.id.toUpperCase()"
    triggers="focus"
    placement="rightbottom"
  >
    <template v-if="cell.players.length">
      <ol>
        Игроки в секторе:
        <li
          v-for="player in cell.players"
          :key="player.id"
        >
          {{ player.clanTag }}
          {{ player.id }}
        </li>
      </ol>
      <hr>
    </template>
    <span v-if="isNoActions">Доступных действий нет</span>
    <b-button
      v-if="isStartSectorAvailable"
      :disabled="isSectorChoosen"
      variant="info"
      @click="setSector(cell.id)"
    >
      {{isSectorChoosen ? 'Этот сектор уже выбран' : 'Выбрать сектор стартовым'}}
    </b-button>
  </b-popover>
</template>

<script>
import {mapActions, mapState} from 'vuex'
  
export default {
  props: {
    cell: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      turnName: state => state.map.currentTurn.turnName,
      playerCellId: state => state.user.playerData.cellId
    }),
    isNoActions () {
      return !this.isStartSectorAvailable
    },
    isStartSectorAvailable () {
      return this.turnName === 'selectStartSector'
        && this.cell.isStarted
    },
    isSectorChoosen () {
      return this.playerCellId === this.cell.id
    }
  },
  methods: {
    ...mapActions({
      setSector: 'map/setSector'
    })
  }
}
</script>

<style scoped>

</style>