<template>
  <div>
    <h1>Эвенты:</h1>
    <RouterLink
      v-for="event in eventList"
      :key="`link-${event.slug}`"
      :to="`/event/${event.slug}`"
    >
      {{event.name}}
    </RouterLink>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "EventsPage",

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
      fetchEvents: 'events/fetchEvents'
    })
  }
}
</script>

<style scoped>

</style>
