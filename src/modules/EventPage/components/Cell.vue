<template>
  <div
    :class="{
      'started-cell': cell.isStarted,
      'selectable-cell': isSectorSelectable,
      'chosen-cell': isSectorChosen,
      'active-battle-cell': isActiveBattle
    }"
    class="map-cell"
  >
    <button
      :id="'cell-popover-' + cell.id"
    >
      <div class="cell-grid-wrapper">
        <div
          v-if="playersCount"
          class="players-count"
        >
          <i class="far fa-user"/> {{ playersCount }}
        </div>
        <div class="cell-name">{{ cell.id.toUpperCase() }}</div>
        <div class="bonus-amount">
          +{{ cell.bonus }}
        </div>
      </div>
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
      return this.cell.players.length + +this.isSectorChoosen
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

    &:hover{
     background-color: rgba(0,0,0,0.3);
    }

    button {
      border: none;
      width: 100%;
      height: 100%;
      background-color: transparent;
    }
  }

  .cell-grid-wrapper {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-areas:
      'cell-name players-count'
      '. .'
      '. bonus-amount';
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;

    .players-count {
      grid-area: players-count;
    }

    .bonus-amount {
      grid-area: bonus-amount;
    }

    .cell-name {
      grid-area: cell-name;
    }
  }

  .started-cell {
    background-color: rgba(green, 0.5);
  }

  .selectable-cell {
    box-shadow: inset 0 0 10px green
  }

  .chosen-cell {
    box-shadow: inset 0 0 10px blue
  }

  .active-battle-cell {
    box-shadow: inset 0 0 10px red
  }
</style>
