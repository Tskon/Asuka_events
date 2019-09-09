<template>
  <div>
    <cell
        v-for="cellId in cells"
        :key="cellId"
        :id="cellId"/>
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

</style>