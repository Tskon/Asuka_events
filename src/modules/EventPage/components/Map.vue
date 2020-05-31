<template>
  <div class="map-wrapper">
    <div class="event-map">
      <Cell
        v-for="cell in currentEvent.cellList"
        :key="cell.name"
        :cell="cell"
      />
    </div>
  </div>
</template>

<script>
import Cell from './Cell'

export default {
  components: {
    Cell
  },

  props: {
    currentEvent: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  .map-wrapper{
    margin: 0 auto;
    position: relative;
    top: 0;
    left: 0;
    /*background-image: url(../../static/map-indonesia.svg);*/
    background-size: 100%;
    background-repeat: no-repeat;
    width: 1200px;
    height: 480px;
  }

  .event-map{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-auto-flow: column;
  }
</style>
