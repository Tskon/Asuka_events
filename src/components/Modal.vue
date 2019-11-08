<template>
  <b-modal
    :visible="show"
    :title="title"
    @change="change"
  >
    <div
      :is="component"
      :payload="payload"
    />
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
    },
    payload() {
      return this.$store.state.modal.payload
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
