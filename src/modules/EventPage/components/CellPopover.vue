<template>
  <b-popover
    :target="'cell-popover-' + cell.id"
    :title="'Действия для сектора ' + cell.id.toUpperCase()"
    triggers="click"
    placement="rightbottom"
    custom-class="w-100"
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
          :cell-id="cell.id"
        />
        <BattleTableScreenshotUploader v-if="isPlayerInThisSector"/>
        <hr/>
      </template>
    </template>
    <span v-if="isNoActions">Доступных действий нет</span>
    <b-button
      v-if="isStartSectorAvailable"
      :disabled="isSectorChoosen"
      variant="info"
      class="w-100 mb-1"
      @click="setSector(cell.id)"
    >
      {{ isSectorChoosen ? 'Этот сектор уже выбран' : 'Выбрать сектор стартовым' }}
    </b-button>
  </b-popover>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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

      }
    }
  },

  computed: {
    ...mapState({
      turnName: (state) => state.map.currentTurn.turnName,
      playerSelectedCellId: (state) => state.user.playerData.selectedCellId,
      playerCurrentCellId: (state) => state.user.playerData.currentCellId
    }),

    isNoActions() {
      return !this.isStartSectorAvailable
    },

    isStartSectorAvailable() {
      return this.turnName === 'selectStartSector'
        && this.cell.isStarted
    },

    isSectorChoosen() {
      return this.playerSelectedCellId === this.cell.id
    },

    isPlayerInThisSector() {
      return this.playerCurrentCellId === this.cell.id
    }
  },

  created() {

  },

  methods: {
    ...mapActions({
      setSector: 'map/setSector'
    })
  }
}
</script>
