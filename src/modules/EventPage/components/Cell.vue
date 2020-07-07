<template>
  <div
    :class="{
      'started-cell': cell.started,
      'selectable-cell': isSelectable,
      'chosen-cell': isSectorChosen,
      'active-battle-cell': isActiveBattle,
      'fog': showFog
    }"
    class="map-cell"
  >
    <button
      :id="`cell-popover-${eventSlug}-${cell.name}`"
      class="cell-content"
      :disabled="showFog"
    >
      <div
        v-if="playersCount"
        class="players-count"
      >
        <i class="far fa-user"/> {{ playersCount }}
      </div>

      <div class="cell-name">
        {{ cell.name.toUpperCase() }}
      </div>

      <div
        v-if="cell.bonus"
        class="bonus-amount"
        :class="`bonus-${cell.incomeStatus}`"
      >
        +{{ cell.bonus }}
      </div>

      <i
        v-if="cell.players.length > 1"
        class="battle fas fa-crosshairs"
        title="Сражение за сектор"
      />
    </button>
    <CellPopover
      :event-slug="eventSlug"
      :cell="cell"
    />
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
    },

    eventSlug: {
      type: String,
      default: ''
    }
  },

  computed: {
    ...mapGetters({
      playerEvents: 'user/playerEvents',
      isAdmin: 'user/isAdmin',
      playerCurrentEvent: 'user/playerCurrentEvent',
      currentEventTurn: 'events/currentEventTurn'
    }),

    playersCount() {
      return this.cell.players.length
    },

    isSectorChosen() {
      return this.playerCurrentEvent.selectedCell === this.cell.name
    },

    isSelectable() {
      if (!this.playerCurrentEvent.selectableCells) return false
      return this.playerCurrentEvent.selectableCells.includes(this.cell.name)
    },

    isActiveBattle() {
      if (!this.playerCurrentEvent.battleStatus) return false
      return this.playerCurrentEvent.currentCell === this.cell.name
        && this.playerCurrentEvent.battleStatus.inBattle
    },

    showFog() {
      if (this.isAdmin || this.playerCurrentEvent.currentCell === this.cell.name) {
        return false
      }
      return this.currentEventTurn.fog && !this.isSelectable
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
      font-size: 12px;
    }

    .bonus-reach {
      color: lighten(#940194, 10%);
    }

    .bonus-middle {
      color: #940194;
    }

    .bonus-poor {
      color: darken(#940194, 10%);
    }

    .cell-name {
      position: absolute;
      top: 5px;
      left: 10px;
      opacity: .7;
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
    box-shadow: inset 0 0 10px green;

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
