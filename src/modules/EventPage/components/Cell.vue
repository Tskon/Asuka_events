<template>
  <div
    :class="{
      'started-cell': cell.isStarted,
      'selectable-cell': isSectorSelectable,
      'chosen-cell': isSectorChosen,
      'active-battle-cell': isActiveBattle,
      'fog': !isSectorSelectable
    }"
    class="map-cell"
  >
    <button
      :id="'cell-popover-' + cell.id"
      class="cell-content"
      :disabled="!isSectorSelectable"
    >
      <div
        v-if="playersCount"
        class="players-count"
      >
        <i class="far fa-user"/> {{ playersCount }}
      </div>
      <div class="cell-name">
        {{ cell.id.toUpperCase() }}
      </div>
      <div class="bonus-amount">
        +{{ cell.bonus }}
      </div>
      <i
        v-if="cell.players.length > 1"
        class="battle fas fa-crosshairs"
        title="Сражение за сектор"
      />
    </button>
    <CellPopover :cell="cell"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CellPopover from './CellPopover'

export default {
  components: {
    CellPopover
  },
  props: {
    cell: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      playerData: 'user/playerData'
    }),
    playersCount() {
      return this.cell.players.length
    },
    isSectorChosen() {
      return this.playerData.selectedCellId === this.cell.id
    },
    isSectorSelectable() {
      return this.playerData.selectableCellIds.includes(this.cell.id)
    },
    isActiveBattle() {
      return this.playerData.currentCellId === this.cell.id
        && this.playerData.battleStatus.inBattle
    }
  }
}
</script>

<style lang="scss" scoped>
  .map-cell {
    display: inline-block;
    border: none;
    box-shadow: 0 0 1px rgba(0,0,0,0.1);
    transition: 0.3s;
    background-color: #bcdaff;

    button {
      border: none;
      width: 100%;
      height: 100%;
      background-color: transparent;
    }
  }

  .cell-content {
    position: relative;

    .players-count {
      position: absolute;
      top: 5px;
      right: 10px;
    }

    .bonus-amount {
      position: absolute;
      bottom: 5px;
      right: 10px;
    }

    .cell-name {
      position: absolute;
      top: 5px;
      left: 10px;
    }

    .battle {
      position: absolute;
      bottom: 5px;
      left: 10px;
      font-size: 22px;
    }
  }

  .started-cell {
    background-color: rgba(green, 0.5);
  }

  .selectable-cell {
    &:hover{
      background-color: rgba(0,0,0,0.3);
    }
  }

  .chosen-cell {
    box-shadow: inset 0 0 10px blue
  }

  .active-battle-cell {
    box-shadow: inset 0 0 10px red
  }

  .fog {
    filter: blur(2px) grayscale(1);

    & .cell-content:hover{
      cursor: not-allowed;
    }
  }
</style>
