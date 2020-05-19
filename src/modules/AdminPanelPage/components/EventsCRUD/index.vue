<template>
  <div class="card card-body">
    <b-button
      variant="success"
      @click="openCreateEventForm"
    >
      Создать новый эвент
    </b-button>
  </div>
</template>

<script>
export default {
  name: "EventsCRUD",

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
