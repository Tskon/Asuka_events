<template>
  <b-tabs @activate-tab="tabHandler" card>
    <b-tab
      v-for="event in eventList"
      :key="event.slug"
      :title="event.name"
    >
      <div>
        <Map :current-event="event"/>
        <PlayerInfo :event-slug="event.slug"/>
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
    if (this.currentEvent) {
      this.fetchMap(this.currentEvent.slug)
    }
  },

  methods: {
    ...mapActions({
      fetchMap: 'map/fetchMap',
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
