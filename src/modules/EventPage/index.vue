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

  computed: {
    ...mapGetters({
      eventList: 'events/eventList'
    })
  },

  created() {
    this.fetchEvents()
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
