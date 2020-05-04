<template>
  <div class="d-flex justify-content-between">
    <b-button
      class="w-100 mr-2"
      variant="success"
      @click="onClick(true)"
    >
      Победа
    </b-button>
    <b-button
      class="w-100 ml-2"
      variant="danger"
      @click="onClick(false)"
    >
      Поражение
    </b-button>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "BattleTableResultBlock",
  methods: {
    ...mapActions({
      setBattleStatus: 'map/setBattleStatus'
    }),
    async onClick(value) {
      await this.setBattleStatus(value)
      this.$emit('resultSended')
    }
  }
}
</script>
