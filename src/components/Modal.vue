<template>
  <b-modal
    :visible="show"
    :title="title"
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
    },
    title() {
      return this.$store.state.modal.title
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
