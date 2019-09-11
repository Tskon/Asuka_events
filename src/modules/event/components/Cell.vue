<template>
  <div class="map-cell">{{id.toUpperCase()}}</div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  .map-cell {
    border: 1px solid gray;
  }
</style>