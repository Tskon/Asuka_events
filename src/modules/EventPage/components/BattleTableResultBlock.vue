<template>
  <div class="d-flex justify-content-between">
    <b-button
      class="w-100 mr-2"
      variant="success"
      @click="setBattleStatus(true)"
    >
      Победа
    </b-button>
    <b-button
      class="w-100 ml-2"
      variant="danger"
      @click="setBattleStatus(false)"
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
    })
  }
}
</script>

<style lang="scss">

</style>
