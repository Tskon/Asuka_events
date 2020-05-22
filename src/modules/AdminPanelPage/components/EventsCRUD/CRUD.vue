<template>
  <form @submit.prevent="submit">
    <label class="edit-label pb-1">
      <span class="pb-1 pr-2">Slug эвента:</span>
      <b-form-input
        v-model="eventSlug"
        type="text"
        class="edit-input"
      />
    </label>
    <label class="edit-label pb-1">
      <span class="pb-1 pr-2">Имя эвента:</span>
      <b-form-input
        v-model="eventName"
        type="text"
        class="edit-input"
      />
    </label>
  </form>
</template>

<script>
export default {
  name: "CRUDVue",

  data() {
    return {
      eventSlug: '',
      eventName: '',
      columns: [],
      rows: [],
      startedSectors: [],
      richEconomyCells: {
        list: [],
        bonus: 0
      },
      middleEconomyCells: {
        list: [],
        bonus: 0
      },
      poorEconomyCells: {
        list: [],
        bonus: 0
      },
      gameMapList: []
    }
  },

  methods: {
    submit() {

    }
  }
}
</script>

<style scoped>

</style>
