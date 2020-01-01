<template>
  <div>
    <h1>Event</h1>
    <Map/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Map from './components/Map'

export default {
  components: {
    Map
  },
  created() {
    this.getCurrentTurn()
  },
  methods: {
    ...mapActions({
      getCurrentTurn: 'map/getCurrentTurn'
    })
  }
}
</script>

<style scoped>

</style>
