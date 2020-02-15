<template>
  <p>
    <span class="name">
      {{ name }}
    </span>
    &nbsp;-&nbsp;
    <span class="value">
      {{ value }}
    </span>
  </p>
</template>

<script>
export default {
  name: "PlayerInfoRow",
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .name {
    padding-right: 10px;
  }

  .value {
    padding-left: 10px;
  }
</style>
