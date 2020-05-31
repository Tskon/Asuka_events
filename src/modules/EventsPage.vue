<template>
  <div>
    <h1>Эвенты</h1>
    <ul>
      <RouterLink
        v-for="event in eventList"
        :key="`link-${event.slug}`"
        :to="`/event/${event.slug}`"
      >
        <li>{{event.name}}</li>
      </RouterLink>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "EventsPage",

  computed: {
    ...mapGetters({
      eventList: 'events/eventList'
    })
  }
}
</script>

<style scoped>

</style>
