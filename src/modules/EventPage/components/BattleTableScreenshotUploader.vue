<template>
  <b-form @submit="onSubmit">
    <b-input-group>
      <b-form-file
        v-model="screenshot"
        :state="Boolean(screenshot)"
        name="screenshot"
        accept="image/*"
        placeholder="Перетащите скрин сюда"
        drop-placeholder="Бросьте сюда..."
        class="image-form-file text-nowrap"
        size="sm"
      />
      <template v-slot:append>
        <b-button
          variant="success"
          size="sm"
          type="submit"
        >
          Отправить
        </b-button>
      </template>
    </b-input-group>
  </b-form>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: "BattleTableScreenshotUploader",
  data() {
    return {
      screenshot: null
    }
  },
  computed: {
    playerData() { return this.$store.state.user.playerData },
    personalData() { return this.$store.state.user.personalData }
  },
  methods: {
    ...mapActions({
      uploadVictoryScreenshot: 'map/uploadVictoryScreenshot'
    }),
    onSubmit(e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('cellId', this.playerData.cellId)
      formData.append('clanTag', this.personalData.clanTag)
      formData.append('screenshot', this.screenshot)
      this.uploadVictoryScreenshot(formData)
    }
  }
}
</script>

<style lang="scss">
  .image-form-file {
    .custom-file-input ~ .custom-file-label[data-browse] {
      padding-left: 80px;
      &:after {
        right: auto;
        left: 0;
        border-right: inherit;
        border-left: none;
      }
    }
  }
</style>
