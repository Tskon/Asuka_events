<template>
  <div
    :class="{
      'started-cell': cell.isStarted
    }"
    class="map-cell"
  >
    <button
      :id="'cell-popover-' + cell.id"
    >
      <div v-if="playersCount">
        <i class="far fa-user"/> {{ playersCount }}
      </div>
      {{ cell.id.toUpperCase() }}
      <div>
        +{{cell.bonus}}
      </div>
    </button>
    <CellPopover :cell="cell"/>
  </div>
</template>

<script>
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
    playerDataCellId () {
      return this.$store.state.user.playerData.cellId
    },
    playersCount () {
      return this.cell.players.length + +(this.playerDataCellId === this.cell.id)
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

  .started-cell {
    background-color: rgba(green, 0.5);
  }
</style>