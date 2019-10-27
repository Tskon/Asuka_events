<template>
  <b-modal
    :visible="show"
    @change="change"
  >
    <div class="wrapper">
      <div :is="component"></div>
    </div>
  </b-modal>
</template>

<script>
export default {
  computed: {
    show () {
      return this.$store.state.modal.show
    },
    component () {
      return this.$store.state.modal.component
    }
  },
  methods: {
    change (newState) {
      if (!newState) {
        this.$store.commit('modal/hide')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    position: fixed;
    top: 20px;
    right: 20px;
  }
</style>