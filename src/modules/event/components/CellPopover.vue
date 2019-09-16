<template>
  <b-popover
    :target="'cell-popover-' + cell.id"
    :title="'Действия для сектора ' + cell.id.toUpperCase()"
    triggers="focus"
    placement="rightbottom"
  >
    <span v-if="!cell.isStarted">Доступных действий нет</span>
    <b-button
      v-if="cell.isStarted"
      variant="info"
      @click="setStartSector(cell.id)"
    >
      Выбрать сектор стартовым
    </b-button>
  </b-popover>
</template>

<script>
import {mapActions} from 'vuex'
  
export default {
  props: {
    cell: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      setStartSector: 'map/setStartSector'
    })
  }
}
</script>

<style scoped>

</style>