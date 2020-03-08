<template>
  <div class="map-wrapper">
    <div class="event-map">
      <cell
        v-for="cell in cells"
        :key="cell.id"
        :cell="cell"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Cell from './Cell'

export default {
  components: {
    Cell
  },

  data() {
    return {
      selectedCell: 'a1'
    }
  },

  computed: {
    ...mapState({
      cells: (state) => state.map.cells
    })
  },

  created() {
    this.getCells()
  },

  methods: {
    ...mapActions({
      getCells: 'map/getCells'
    })
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
