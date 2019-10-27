<template>
  <b-modal
    :visible="show"
    @change="change"
  >
    <div :is="component"/>
  </b-modal>
</template>

<script>
export default {
  computed: {
    show() {
      return this.$store.state.modal.show
    },
    component() {
      return this.$store.state.modal.component
    }
  },
  methods: {
    change(newState) {
      if (!newState) {
        this.$store.commit('modal/hide')
      }
    }
  }
}
</script>
