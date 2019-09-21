<template>
  <b-popover
    :target="'cell-popover-' + cell.id"
    :title="'Действия для сектора ' + cell.id.toUpperCase()"
    triggers="focus"
    placement="rightbottom"
  >
    <span v-if="isNoActions">Доступных действий нет</span>
    <b-button
      v-if="isStartSectorAvailable"
      variant="info"
      @click="setStartSector(cell.id)"
    >
      Выбрать сектор стартовым
    </b-button>
  </b-popover>
</template>

<script>
import {mapActions, mapState} from 'vuex'
  
export default {
  props: {
    cell: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      turnName: state => state.map.currentTurn.turnName
    }),
    isNoActions () {
      return !this.isStartSectorAvailable
    },
    isStartSectorAvailable () {
      return this.turnName === 'selectStartSector' && this.cell.isStarted
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