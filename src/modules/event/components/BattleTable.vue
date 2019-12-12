<template>
  <div>
    <div class="table-wrapper">
      <span class="divider-1">Полуфинал (BO-1)</span>
      <span class="divider-2">Полуфинал (BO-1)</span>
      <span class="final-label">Финал (BO-3)</span>
      <div class="cell semi-final-1">
        {{ playersInBattle[0] ? playersInBattle[0].username : '' }}
      </div>
      <div class="cell semi-final-2">
        {{ playersInBattle[1] ? playersInBattle[1].username : '' }}
      </div>
      <div class="cell semi-final-3">
        {{ playersInBattle[2] ? playersInBattle[2].username : '' }}
      </div>
      <div class="cell semi-final-4">
        {{ playersInBattle[3] ? playersInBattle[3].username : '' }}
      </div>
      <div class="cell final-1">
        {{ finalist1 ? finalist1.username : '------' }}
      </div>
      <div class="cell final-2">
        {{ finalist2 ? finalist2.username : '------' }}
      </div>
    </div>
    <div class="pt-3">
      <hr>
      <b-form @submit="onSubmit">
        <b-input-group>
          <b-form-file
            v-model="screenshot"
            :state="Boolean(screenshot)"
            name="screenshot"
            accept="image/*"
            placeholder="Перетащите сюда изображение"
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
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    payload: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      playersInBattle: [
        {"id":1,"username":"player1","isAdmin":false,"isPlayer":true},
        {"id":2,"username":"player2","isAdmin":false,"isPlayer":true},
        {"id":3,"username":"player3","isAdmin":false,"isPlayer":true},
        {"id":4,"username":"player4","isAdmin":false,"isPlayer":true}
      ],
      finalist1: null,
      finalist2: null,
      screenshot: null
    }
  },

  computed: {
    playerData() { return this.$store.state.user.playerData },
    personalData() { return this.$store.state.user.personalData }
  },

  methods: {
    onSubmit (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('cellId', this.playerData.cellId)
      formData.append('clanTag', this.personalData.clanTag)
      formData.append('isFinal', false)
      formData.append('screenshot', this.screenshot)
      this.uploadVictoryScreenshot(formData)
      // this.uploadVictoryScreenshot(this.screenshot)
    },
    ...mapActions({
      uploadVictoryScreenshot: 'map/uploadVictoryScreenshot'
    })
  }
}
</script>

<style lang="scss" scoped>
  .table-wrapper {
    display: grid;
    grid-template-areas:
    'semi-final-1 final-label final-label semi-final-3'
    'divider-1 final-1 final-2 divider-2'
    'semi-final-2 . . semi-final-4';
    grid-gap: 10px;

    .cell {
      border: 1px solid black;
      text-align: center;
    }
  }

  .semi-final-1 {
    grid-area: semi-final-1;
    position: relative;

    &:after {
      content: '';
      width: 16px;
      border-bottom: 1px solid black;
      position: absolute;
      right: -16px;
      bottom: 0;
      transform-origin: left bottom;
      transform: rotate(45deg);
    }
  }

  .semi-final-2 {
    grid-area: semi-final-2;
    position: relative;

    &:after {
      content: '';
      width: 16px;
      border-bottom: 1px solid black;
      position: absolute;
      right: -17px;
      top: -1px;
      transform-origin: left bottom;
      transform: rotate(-48deg);
    }
  }

  .semi-final-3 {
    grid-area: semi-final-3;
    position: relative;

    &:after {
      content: '';
      width: 16px;
      border-bottom: 1px solid black;
      position: absolute;
      left: -16px;
      bottom: 0;
      transform-origin: right bottom;
      transform: rotate(-45deg);
    }
  }

  .semi-final-4 {
    grid-area: semi-final-4;
    position: relative;

    &:after {
      content: '';
      width: 16px;
      border-bottom: 1px solid black;
      position: absolute;
      left: -17px;
      top: -1px;
      transform-origin: right bottom;
      transform: rotate(48deg);
    }
  }

  .final-label {
    text-align: center;
    grid-area: final-label
  }

  .final-1 {
    grid-area: final-1;
    position: relative;

    &:after {
      content: '';
      width: 10px;
      border-bottom: 1px solid black;
      position: absolute;
      right: -11px;
      top: 50%;
    }
  }

  .final-2 {
    grid-area: final-2;
  }

  .divider-1 {
    grid-area: divider-1;
  }

  .divider-2 {
    grid-area: divider-2;
  }

  .divider-1, .divider-2 {
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    &:before {
      content: '|';
      position: absolute;
      font-size: 10px;
      top: -13px;
      left: 50%;
    }

    &:after {
      content: '|';
      position: absolute;
      font-size: 10px;
      bottom: -12px;
      left: 50%;
    }
  }
</style>

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
