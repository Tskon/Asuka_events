<template>
  <b-form
    ref="form"
    class="js-edit-form"
    @submit.prevent="onSubmit"
  >
    <div
      v-if="battleTableData.players.length > 2"
      class="pairBlock"
    >
      <div class="pb-1 pl-2">
        <b>Полуфинал 1</b>
      </div>
      <div class="d-flex flex-row align-items-center mb-2">
        <b-form-select
          :options="playerOptions"
          :value="battleTableData.players[0] && battleTableData.players[0].username"
          name="pair1-p1"
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          v-model="pair1Player1Checked"
          :value="getCheckboxValue(battleTableData.players[0])"
          name="pair1-p1-winner"
          size="lg"
          @change="(value) => { if (value) pair1Player2Checked = false}"
        >
          win
        </b-form-checkbox>
      </div>
      <div class="d-flex flex-row align-items-center">
        <b-form-select
          :options="playerOptions"
          :value="battleTableData.players[1] && battleTableData.players[1].username"
          name="pair1-p2"
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          v-model="pair1Player2Checked"
          :value="getCheckboxValue(battleTableData.players[1])"
          name="pair1-p2-winner"
          size="lg"
          @change="(value) => { if (value) pair1Player1Checked = false}"
        >
          win
        </b-form-checkbox>
      </div>
    </div>

    <div
      v-if="battleTableData.players.length > 2"
      class="pairBlock"
    >
      <div class="pb-1 pl-2">
        <b>Полуфинал 2</b>
      </div>
      <div class="d-flex flex-row align-items-center mb-2">
        <b-form-select
          :options="playerOptions"
          :value="battleTableData.players[2] && battleTableData.players[2].username"
          name="pair2-p1"
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          v-model="pair2Player1Checked"
          :value="getCheckboxValue(battleTableData.players[2])"
          name="pair2-p1-winner"
          size="lg"
          @change="(value) => { if (value) pair2Player2Checked = false}"
        >
          win
        </b-form-checkbox>
      </div>
      <div
        v-if="battleTableData.players.length > 3"
        class="d-flex flex-row align-items-center"
      >
        <b-form-select
          :options="playerOptions"
          :value="battleTableData.players[3] && battleTableData.players[3].username"
          name="pair2-p2"
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          v-model="pair2Player2Checked"
          :value="getCheckboxValue(battleTableData.players[3])"
          name="pair2-p2-winner"
          size="lg"
          @change="(value) => { if (value) pair2Player1Checked = false}"
        >
          win
        </b-form-checkbox>
      </div>
    </div>

    <div
      class="pairBlock mb-2"
    >
      <div class="pb-1 pl-2">
        <b>Финал</b>
      </div>
      <div class="d-flex flex-row align-items-center mb-2">
        <b-form-select
          ref="finalSelect1"
          :options="playerOptions"
          :value="battleTableData.firstPair.winner"
          name="final-pair-p1"
          size="sm"
          class="mr-2"
          @change="(value) => { if (value === null) finalPairPlayer1Checked = false}"
        />
        <b-form-checkbox
          v-model="finalPairPlayer1Checked"
          :value="battleTableData.firstPair.winner"
          :disabled="$refs.finalSelect1 && !$refs.finalSelect1.localValue"
          name="final-pair-p1-winner"
          size="lg"
          @change="(value) => { if (value) finalPairPlayer2Checked = false}"
        >
          win
        </b-form-checkbox>
      </div>
      <div class="d-flex flex-row align-items-center">
        <b-form-select
          ref="finalSelect2"
          :options="playerOptions"
          :value="battleTableData.secondPair.winner"
          name="final-pair-p2"
          size="sm"
          class="mr-2"
          @change="(value) => { if (value === null) finalPairPlayer2Checked = false}"
        />
        <b-form-checkbox
          v-model="finalPairPlayer2Checked"
          :value="battleTableData.secondPair.winner"
          :disabled="$refs.finalSelect2 && !$refs.finalSelect2.localValue"
          name="final-pair-p2-winner"
          size="lg"
          @change="(value) => { if (value) finalPairPlayer1Checked = false}"
        >
          win
        </b-form-checkbox>
      </div>
    </div>

    <b-button
      type="submit"
      variant="warning"
      size="sm"
    >
      Сохранить
    </b-button>
  </b-form>
</template>

<script>
import axios from 'axios'

export default {
  name: "EditBlock",
  props: {
    battleTableData: {
      type: Object,
      default: () => ({
        players: [],
        firstPair: {
          winner: null,
          looser: null
        },
        secondPair: {
          winner: null,
          looser: null
        },
        finalPair: {
          winner: null,
          looser: null
        }
      })
    },
    cellName: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      pair1Player1Checked: false,
      pair1Player2Checked: false,
      pair2Player1Checked: false,
      pair2Player2Checked: false,
      finalPairPlayer1Checked: false,
      finalPairPlayer2Checked: false
    }
  },

  computed: {
    playerOptions() {
      return [
        { value: null, text: '-----' },
        ...this.battleTableData.players.map(player => {
          return {
            value: player.username,
            text: player.clanTag
          }
        })
      ]
    },
    isPair1Player1Checked() {
      return this.getCheckboxInitStatus(this.battleTableData.players[0], this.battleTableData.firstPair)
    },
    isPair1Player2Checked() {
      return this.getCheckboxInitStatus(this.battleTableData.players[1], this.battleTableData.firstPair)
    },
    isPair2Player1Checked() {
      return this.getCheckboxInitStatus(this.battleTableData.players[2], this.battleTableData.secondPair)
    },
    isPair2Player2Checked() {
      return this.getCheckboxInitStatus(this.battleTableData.players[3], this.battleTableData.secondPair)
    }
  },

  mounted() {
    this.pair1Player1Checked = this.getCheckboxInitStatus(this.battleTableData.players[0], this.battleTableData.firstPair)
    this.pair1Player2Checked = this.getCheckboxInitStatus(this.battleTableData.players[1], this.battleTableData.firstPair)
    this.pair2Player1Checked = this.getCheckboxInitStatus(this.battleTableData.players[2], this.battleTableData.secondPair)
    this.pair2Player2Checked = this.getCheckboxInitStatus(this.battleTableData.players[3], this.battleTableData.secondPair)
    this.finalPairPlayer1Checked = this.getFinalPairPlayer1CheckedStatus()
    this.finalPairPlayer2Checked = this.getFinalPairPlayer2CheckedStatus()
  },

  methods: {
    getFinalPairPlayer1CheckedStatus() {
      const isPlayer1Winner = this.battleTableData.finalPair.winner
        && this.battleTableData.firstPair.winner === this.battleTableData.finalPair.winner
      return isPlayer1Winner ? this.battleTableData.finalPair.winner : false
    },
    getFinalPairPlayer2CheckedStatus() {
      const isPlayer2Winner = this.battleTableData.finalPair.winner
        && this.battleTableData.secondPair.winner === this.battleTableData.finalPair.winner
      return isPlayer2Winner ? this.battleTableData.finalPair.winner : false
    },
    getCheckboxInitStatus(player, pair) {
      return player && player.username === pair.winner && pair.winner
    },
    getCheckboxValue(player) {
      return player ? player.username : null
    },
    onSubmit() {
      const formData = new FormData(this.$refs.form)
      const players = this.battleTableData.players.length > 2
        ? [
          formData.get('pair1-p1'),
          formData.get('pair1-p2'),
          formData.get('pair2-p1'),
          formData.get('pair2-p2')
        ].filter(player => !!player)
        : [
          formData.get('final-pair-p1'),
          formData.get('final-pair-p2')
        ]

      const firstPairWinner = this.battleTableData.players.length > 2
        ? formData.get('pair1-p1-winner') || formData.get('pair1-p2-winner') :
        null

      const secondPairWinner = this.battleTableData.players.length > 2
        ? formData.get('pair2-p1-winner') || formData.get('pair2-p2-winner') :
        null

      const finalPairWinner = formData.get('final-pair-p1-winner') || formData.get('final-pair-p2-winner')

      axios.post('/api/admin/change-battle-table', {
        eventSlug: this.battleTableData.eventSlug,
        cellName: this.cellName,
        players,
        firstPairWinner,
        secondPairWinner,
        finalPairWinner
      }).then(() => {
        this.$emit('edit')
      })
    }
  }
}
</script>

<style scoped>

</style>
