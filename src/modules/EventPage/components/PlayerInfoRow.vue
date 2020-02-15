<template>
  <div class="player-info-row">
    <span class="name">
      {{ name }}
    </span>
    <span class="value">
      {{ value }}
    </span>
  </div>
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
  .player-info-row {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .name {
    width: 100%;
  }

  .value {
    width: 100%;
  }
</style>
