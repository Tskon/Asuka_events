<template>
  <div>{{id.toUpperCase()}}</div>
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

</style>