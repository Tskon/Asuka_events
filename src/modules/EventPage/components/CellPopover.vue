<template>
  <b-popover
    :target="'cell-popover-' + cell.id"
    :title="'Действия для сектора ' + cell.id.toUpperCase()"
    triggers="focus"
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
          :key="player.id"
        >
          {{ player.clanTag }}
        </li>
      </ol>
      <hr/>
      <template v-if="cell.players.length > 1">
        <BattleTable
          class="pb-3"
          :battle-table-data="battleTableData"
          :cell-id="cell.id"
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
      @click="setSector(cell.id)"
    >
      {{ isSectorChosen ? 'Этот сектор уже выбран' : 'Выбрать сектор стартовым' }}
    </b-button>
    <b-button
      v-else-if="isSectorAvailable"
    >
      Выбрать сектор
    </b-button>
  </b-popover>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
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
      turnName: (state) => state.map.currentTurn.turnName,
      playerSelectedCellId: (state) => state.user.playerData.selectedCellId,
      playerCurrentCellId: (state) => state.user.playerData.currentCellId,
      selectableCellIds: (state) => state.user.playerData.selectableCellIds,
      playerBattleStatus: (state) => state.user.playerData.battleStatus
    }),

    ...mapGetters({
      playerId: 'user/playerId'
    }),

    isNoActions() {
      return !this.isStartSectorAvailable && !this.isSectorAvailable
    },

    isStartSectorAvailable() {
      return (this.turnName === 'selectStartSector')
        && this.cell.isStarted
    },

    isSectorAvailable() {
      return this.selectableCellIds.includes(this.cell.id) && !this.playerBattleStatus.inBattle
    },

    isSectorChosen() {
      return this.playerSelectedCellId === this.cell.id
    },

    isPlayerInThisSector() {
      return this.playerCurrentCellId === this.cell.id
    },

    isUploaderAvailable() {
      const isFinalPairIncludePlayer = this.battleTableData.finalPair.includes(this.playerId)
      const isPair1Valid = this.battleTableData.pair1.length > 1 && this.battleTableData.pair1.includes(this.playerId)
      const isPair2Valid = this.battleTableData.pair2.length > 1 && this.battleTableData.pair2.includes(this.playerId)

      const hasValidPair = isFinalPairIncludePlayer ? this.battleTableData.finalPair > 1 : isPair1Valid || isPair2Valid

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
          cellId: this.cell.id
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
