<template>
  <div class="d-flex justify-content-between">
    <b-button
      class="w-100"
      variant="success"
      @click="onClick(true)"
    >
      Победа
    </b-button>
    <!--    <b-button-->
    <!--      class="w-100 ml-2"-->
    <!--      variant="danger"-->
    <!--      @click="onClick(false)"-->
    <!--    >-->
    <!--      Поражение-->
    <!--    </b-button>-->
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "BattleTableResultBlock",

  props: {
    slug: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      preventPopover: false
    }
  },

  mounted() {
    this.$root.$on('bv::popover::show', event => {
      if (this.preventPopover) event.preventDefault()
    })
    this.$root.$on('bv::popover::hide', event => {
      if (this.preventPopover) event.preventDefault()
    })
  },

  methods: {
    ...mapActions({
      setBattleStatus: 'map/setBattleStatus'
    }),

    onClick(value) {
      this.preventPopover = true
      const valueText = value ? 'Сообщить о Победе?' : 'Сообщить о Поражении?'
      this.$bvModal.msgBoxConfirm(valueText)
        .then(async (isOk) => {
          this.$root.$emit('bv::hide::popover')
          if (!isOk) {
            this.preventPopover = false
            return
          }
          await this.setBattleStatus({isWinner: value, eventSlug: this.slug})
          this.$emit('resultSended')
          this.preventPopover = false
        })
    }
  }
}
</script>
