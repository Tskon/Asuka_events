<template>
  <div class="map-wrapper">
    <div class="event-map">
      <cell
          v-for="cellId in cells"
          :key="cellId"
          :id="cellId"/>
    </div>
  </div>
</template>

<script>
  import Cell from './Cell'

  export default {
    components: {
      Cell
    },

    data() {
      return {
        cols: 8,
        rows: 6,
        selectedCell: 'a1',
        letters: 'abcdefghijklmnop'
      }
    },

    computed: {
      cells() {
        const cells = []

        for (let i = 0; i < this.cols * this.rows; i += 1) {
          const rowNum = Math.ceil((i + 1) / this.cols)
          const colNum = (i + 1) % this.cols || this.cols
          const colLetter = this.letters[colNum - 1]
          cells.push(colLetter + rowNum)
        }

        return cells
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
    background-color: #bcdaff;
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
  }
</style>