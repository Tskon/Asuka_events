<template>
  <b-popover
    :target="'cell-popover-' + id"
    :title="'Действия для сектора ' + id.toUpperCase()"
    triggers="focus"
    placement="rightbottom"
  >
    <b-button
      variant="info"
      @click="chooseStartSector"
    >
      Выбрать сектор стартовым
    </b-button>
  </b-popover>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    chooseStartSector () {

    }
  }
}
</script>

<style scoped>

</style>