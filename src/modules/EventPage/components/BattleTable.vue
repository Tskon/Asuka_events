<template>
  <div>
    <div class="table-wrapper">
      <span class="divider-1">Полуфинал</span>
      <span class="divider-2">Полуфинал</span>
      <span class="final-label">Финал</span>
      <div class="cell semi-final-1">
        {{ getPlayerName(pair1[0]) }}
      </div>
      <div class="cell semi-final-2">
        {{ getPlayerName(pair1[1]) }}
      </div>
      <div class="cell semi-final-3">
        {{ getPlayerName(pair2[0]) }}
      </div>
      <div class="cell semi-final-4">
        {{ getPlayerName(pair2[1]) }}
      </div>
      <div class="cell final-1">
        {{ getPlayerName(finalPair[0]) }}
      </div>
      <div class="cell final-2">
        {{ getPlayerName(finalPair[1]) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cellId: {
      type: String,
      default: ''
    },
    battleTableData: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      pair1: [],
      pair2: [],
      finalPair: [],
      winner: ''
    }
  },

  computed: {
    playerList() {
      const currentCell = this.$store.state.map.cells.find(cell => {
        return cell.id === this.cellId
      })
      return currentCell ? currentCell.players : []
    }
  },

  watch: {
    battleTableData() {
      this.pair1 = this.battleTableData.pair1
      this.pair2 = this.battleTableData.pair2
      this.finalPair = this.battleTableData.finalPair
      this.winner = this.battleTableData.winner
    }
  },

  methods: {
    getPlayerName(id) {
      if (id) {
        const currentPlayer = this.playerList.find(player => player.id === id)
        return currentPlayer ? currentPlayer.clanTag : 'Н/Д'
      }
      return '------'
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-wrapper {
    display: grid;
    grid-template-areas:
    'semi-final-1 final-label final-label semi-final-3'
    'divider-1 final-1 final-2 divider-2'
    'semi-final-2 . . semi-final-4';
    grid-gap: 10px;

    .cell {
      border: 1px solid black;
      text-align: center;
    }
  }

  .semi-final-1 {
    grid-area: semi-final-1;
    position: relative;

    &:after {
      content: '';
      width: 16px;
      border-bottom: 1px solid black;
      position: absolute;
      right: -16px;
      bottom: 0;
      transform-origin: left bottom;
      transform: rotate(45deg);
    }
  }

  .semi-final-2 {
    grid-area: semi-final-2;
    position: relative;

    &:after {
      content: '';
      width: 16px;
      border-bottom: 1px solid black;
      position: absolute;
      right: -17px;
      top: -1px;
      transform-origin: left bottom;
      transform: rotate(-48deg);
    }
  }

  .semi-final-3 {
    grid-area: semi-final-3;
    position: relative;

    &:after {
      content: '';
      width: 16px;
      border-bottom: 1px solid black;
      position: absolute;
      left: -16px;
      bottom: 0;
      transform-origin: right bottom;
      transform: rotate(-45deg);
    }
  }

  .semi-final-4 {
    grid-area: semi-final-4;
    position: relative;

    &:after {
      content: '';
      width: 16px;
      border-bottom: 1px solid black;
      position: absolute;
      left: -17px;
      top: -1px;
      transform-origin: right bottom;
      transform: rotate(48deg);
    }
  }

  .final-label {
    text-align: center;
    grid-area: final-label
  }

  .final-1 {
    grid-area: final-1;
    position: relative;

    &:after {
      content: '';
      width: 10px;
      border-bottom: 1px solid black;
      position: absolute;
      right: -11px;
      top: 50%;
    }
  }

  .final-2 {
    grid-area: final-2;
  }

  .divider-1 {
    grid-area: divider-1;
  }

  .divider-2 {
    grid-area: divider-2;
  }

  .divider-1, .divider-2 {
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    &:before {
      content: '|';
      position: absolute;
      font-size: 10px;
      top: -13px;
      left: 50%;
    }

    &:after {
      content: '|';
      position: absolute;
      font-size: 10px;
      bottom: -12px;
      left: 50%;
    }
  }
</style>
