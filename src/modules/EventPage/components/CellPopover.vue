<template>
  <b-popover
    :target="'cell-popover-' + cell.name"
    :title="'Действия для сектора ' + cell.name.toUpperCase()"
    triggers="click"
    placement="rightbottom"
    custom-class="w-100"
    @show="fetchBattleTable"
    @hide="onHide"
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
          class="pb-3"
          :battle-table-data="battleTableData"
          :cell-id="cell.name"
        />
        <BattleTableScreenshotUploader
          v-if="isUploaderAvailable"
          @togglePopoverHidePrevent="togglePopoverHidePrevent"
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
import axios from "axios"
import BattleTable from './BattleTable'
import BattleTableScreenshotUploader from './BattleTableScreenshotUploader'

export default {
  components: {
    BattleTable,
    BattleTableScreenshotUploader
  },

  props: {
    cell: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      battleTableData: {
        pair1: [],
        pair2: [],
        finalPair: [],
        winner: null
      },
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
    },

    isPlayerInThisSector() {
      return this.playerCurrentCell === this.cell.name
    },

    isUploaderAvailable() {
      const isFinalPairIncludePlayer = this.battleTableData.finalPair.includes(this.playerId)
      const isPair1Valid = this.battleTableData.pair1.length > 1 && this.battleTableData.pair1.includes(this.playerId)
      const isPair2Valid = this.battleTableData.pair2.length > 1 && this.battleTableData.pair2.includes(this.playerId)

      const hasValidPair = isFinalPairIncludePlayer ? this.battleTableData.finalPair.length > 1 : isPair1Valid || isPair2Valid

      return this.isPlayerInThisSector
        && !this.battleTableData.winner
        && hasValidPair
    }
  },

  methods: {
    ...mapActions({
      setSector: 'map/setSector'
    }),

    async fetchBattleTable() {
      const {data: {data: battleTableData}} = await axios
        .post('/api/map/get-battle-table-data', {
          cellName: this.cell.name
        })
      if (battleTableData) this.battleTableData = battleTableData
    },

    togglePopoverHidePrevent() {
      this.isPopoverHidePrevent = !this.isPopoverHidePrevent
    },

    onHide(e) {
      if (this.isPopoverHidePrevent) e.preventDefault()
    }
  }
}
</script>
