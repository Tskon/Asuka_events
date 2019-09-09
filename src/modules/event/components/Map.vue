<template>
  <div>

  </div>
</template>

<script>
  import Cell

  export default {
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

        for (let i = 0; i < this.state.cols * this.state.rows; i += 1) {
          const rowNum = Math.ceil((i + 1) / this.state.cols)
          const colNum = (i + 1) % this.state.cols || this.state.cols
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