<template>
  <b-popover
    :target="'cell-popover-' + cell.name"
    :title="'Действия для сектора ' + cell.name.toUpperCase()"
    triggers="click"
    placement="rightbottom"
    custom-class="w-100"
    @show="onPopoverShown(cell.name)"
    @hidden="onPopoverHidden"
  >
    <template v-if="cell.players.length">
      <b-card class="mb-2 pt-0">
        {{ cell.gameMap }}
        <hr/>
        Команды в секторе:
        <ol class="pl-3 mb-0">
          <li
            v-for="player in cell.players"
            :key="player.username"
          >
            {{ player.clanTag }}
          </li>
        </ol>
      </b-card>
      <template v-if="cell.players.length > 1">
        <b-card class="mb-2">
          <BattleTable
            :cell-name="cell.name"
          />
        </b-card>
      </template>
    </template>

    <span v-if="isNoActions || !isCurrentEventPlayer">Доступных действий нет</span>
    <template v-if="isCurrentEventPlayer">
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
    </template>
  </b-popover>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
    ...mapGetters({
      isCurrentEventPlayer: 'user/isCurrentEventPlayer',
      playerCurrentEvent: 'user/playerCurrentEvent',
      currentEventTurn: 'events/currentEventTurn'
    }),

    playerSelectedCell() {
      return this.playerCurrentEvent.selectedCell
    },

    selectableCells() {
      // todo дописать логику
      return []
    },

    playerBattleStatus() {
      // todo дописать логику
      return {
        inBattle: true
      }
    },

    isNoActions() {
      return !this.isStartSectorAvailable && !this.isSectorAvailable
    },

    isStartSectorAvailable() {
      return (this.currentEventTurn.type === 'selectStartSector')
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
