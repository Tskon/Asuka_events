<template>
  <div class="map-cell">
    <button
      :id="'cell-popover-' + id"
    >
      {{ id.toUpperCase() }}
    </button>
    <CellPopover :id="id"/>
  </div>
</template>

<script>
import CellPopover from './CellPopover'

export default {
  components: {
    CellPopover
  },
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .map-cell {
    display: inline-block;
    border: none;
    background-color: transparent;
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
</style>