<template>
  <b-form @submit="onSubmit">
    <b-form-group label="Отправить скриншот победы (Только победившая команда!):">
      <b-input-group class="uploader-wrapper">
        <button
          v-if="isHelperActive"
          class="uploader-helper"
          @click="beforeUpload"
          title="загрузить изображение"
        />
        <b-form-file
          ref="formFile"
          v-model="screenshot"
          :state="Boolean(screenshot)"
          name="screenshot"
          accept="image/*"
          placeholder="Выбрать файл"
          class="image-form-file text-nowrap"
          size="sm"
          :no-drop="true"
          @input="onInput"
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
    </b-form-group>
  </b-form>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: "BattleTableScreenshotUploader",
  data() {
    return {
      screenshot: null,
      isHelperActive: true
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
    beforeUpload() {
      this.$emit('togglePopoverHidePrevent')
      console.log(this.$refs.formFile.$refs.input.click())
      this.isHelperActive = false
    },
    onInput() {
      this.$emit('togglePopoverHidePrevent')
      this.isHelperActive = true
    },
    onSubmit(e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('cellId', this.playerData.currentCellId)
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

  .uploader-wrapper {
    position: relative;
  }
  .uploader-helper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
  }
</style>
