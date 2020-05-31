<template>
  <div v-if="currentEvent">
    <h1>{{ currentEvent.name }}</h1>
    <Map :current-event="currentEvent"/>
    <PlayerInfo :event-slug="currentEvent.slug"/>
  </div>

  <div v-else>
    Такого эвента не найдено, список эвентов:
    <ul>
      <RouterLink
        v-for="event in eventList"
        :key="`link-${event.slug}`"
        :to="`/event/${event.slug}`"
      >
        <li>{{ event.name }}</li>
      </RouterLink>
    </ul>
  </div>
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
    }),

    currentEvent() {
      return this.eventList.find(event => event.slug === this.$route.params.eventSlug)
    }
  },

  created() {
    if (this.currentEvent) {
      this.fetchMap(this.currentEvent.slug)
    }
  },

  methods: {
    ...mapActions({
      fetchMap: 'map/fetchMap'
    })
  }
}
</script>

<style scoped>

</style>
