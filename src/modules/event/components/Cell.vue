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

<style lang="scss" scoped>
  .map-cell {
    display: inline-block;
    border: none;
    background-color: transparent;
    box-shadow: 0 0 1px rgba(0,0,0,0.5);
    cursor: pointer;
    transition: 0.3s;

    &:hover{
     background-color: rgba(0,0,0,0.3);
   }
  }
</style>