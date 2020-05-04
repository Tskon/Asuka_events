<template>
  <b-popover
    :target="'cell-popover-' + cell.name"
    :title="'Действия для сектора ' + cell.name.toUpperCase()"
    triggers="focus"
    placement="rightbottom"
    custom-class="w-100"
    @show="onPopoverShown(cell.name)"
    @hidden="onPopoverHidden"
  >
    <template v-if="cell.players.length">
      <ol>
        Команды в секторе:
        <li
          v-for="player in cell.players"
          :key="player.username"
        >
          {{ player.clanTag }}
        </li>
      </ol>
      <hr/>
      <template v-if="cell.players.length > 1">
        <BattleTable
          :cell-name="cell.name"
        />
        <hr/>
      </template>
    </template>
    <span v-if="isNoActions">Доступных действий нет</span>
    <b-button
      v-if="isStartSectorAvailable"
      :disabled="isSectorChosen"
      variant="info"
      class="w-100 mb-1"
      @click="setSector(cell.name)"
    >
      {{ isSectorChosen ? 'Этот сектор уже выбран' : 'Выбрать сектор стартовым' }}
    </b-button>
    <b-button
      v-else-if="isSectorAvailable"
      @click="setSector(cell.name)"
    >
      Выбрать сектор
    </b-button>
  </b-popover>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BattleTable from './BattleTable'

export default {
  components: {
    BattleTable
  },

  props: {
    cell: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isPopoverHidePrevent: false
    }
  },

  computed: {
    ...mapState({
      turnType: (state) => state.map.currentTurn.type,
      playerSelectedCell: (state) => state.user.playerData.selectedCell,
      playerCurrentCell: (state) => state.user.playerData.currentCell,
      selectableCells: (state) => state.user.playerData.selectableCells,
      playerBattleStatus: (state) => state.user.playerData.battleStatus
    }),

    isNoActions() {
      return !this.isStartSectorAvailable && !this.isSectorAvailable
    },

    isStartSectorAvailable() {
      return (this.turnType === 'selectStartSector')
        && this.cell.started
    },

    isSectorAvailable() {
      return this.selectableCells.includes(this.cell.name) && !this.playerBattleStatus.inBattle
    },

    isSectorChosen() {
      return this.playerSelectedCell === this.cell.name
    }
  },

  methods: {
    ...mapActions({
      setSector: 'map/setSector',
      fetchCurrentBattleTable: 'map/fetchCurrentBattleTable',
      clearCurrentBattleTable: 'map/clearCurrentBattleTable'
    }),

    onPopoverShown(cellName) {
      const cellButtons = document.querySelectorAll('.map-cell > button')
      cellButtons.forEach(button => {
        button.classList.add('pointer-events-none')
      })

      this.fetchCurrentBattleTable(cellName)
    },

    onPopoverHidden() {
      const cellButtons = document.querySelectorAll('.map-cell > button')
      cellButtons.forEach(button => {
        button.classList.remove('pointer-events-none')
      })

      this.clearCurrentBattleTable()
    }
  }
}
</script>
