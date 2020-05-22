<template>
  <div class="card card-body">
    <b-button
      variant="success"
      @click="openCreateEventForm"
    >
      Создать новый эвент
    </b-button>

    <CRUD/>
  </div>
</template>

<script>
import CRUD from './CRUD'

export default {
  name: "EventsCRUD",

  components: {
    CRUD
  },

  data() {
    return {
      newEventFormShown: false,
      events: []
    }
  },

  methods: {
    openCreateEventForm() {
      this.newEventFormShown = !this.newEventFormShown
    }
  }
}
</script>

<style scoped>

</style>
