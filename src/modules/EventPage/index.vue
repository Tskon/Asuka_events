<template>
  <b-tabs
    card
    @activate-tab="tabHandler"
  >
    <b-tab
      v-for="event in eventList"
      :key="event.slug"
      :title="event.name"
    >
      <div>
        <Map :current-event="event"/>
        <PlayerInfo :event="event"/>
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Map from './components/Map'
import PlayerInfo from "./components/PlayerInfo"

export default {
  components: {
    Map,
    PlayerInfo
  },

  data() {
    return {
      fetchInterval: null
    }
  },

  computed: {
    ...mapGetters({
      eventList: 'events/eventList'
    })
  },

  created() {
    this.fetchEvents()

    this.fetchInterval = setInterval(this.fetchEvents, 5000)
  },

  beforeDestroy() {
    clearInterval(this.fetchInterval)
  },

  methods: {
    ...mapActions({
      fetchEvents: 'events/fetchEvents',
      setCurrentEvent: 'events/setCurrentEvent'
    }),

    tabHandler(e) {
      this.setCurrentEvent(e)
    }
  }
}
</script>

<style scoped>

</style>
