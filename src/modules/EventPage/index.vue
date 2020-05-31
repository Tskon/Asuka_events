<template>
  <div>
    <h1>Event. {{ $route.params }}</h1>
    <Map/>
    <PlayerInfo/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Map from './components/Map'
import PlayerInfo from "./components/PlayerInfo"

export default {
  components: {
    Map,
    PlayerInfo
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
