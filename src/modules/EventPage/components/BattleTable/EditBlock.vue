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
          :checked="getCheckboxInitStatus(battleTableData.players[0], battleTableData.firstPair)"
          :value="getCheckboxValue(battleTableData.players[0])"
          name="pair1-p1-winner"
          size="lg"
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
          :checked="getCheckboxInitStatus(battleTableData.players[1], battleTableData.firstPair)"
          :value="getCheckboxValue(battleTableData.players[1])"
          name="pair1-p2-winner"
          size="lg"
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
          :value="battleTableData.players[3] && battleTableData.players[3].username"
          name="pair2-p1"
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          :checked="getCheckboxInitStatus(battleTableData.players[3], battleTableData.firstPair)"
          :value="getCheckboxValue(battleTableData.players[3])"
          name="pair2-p1-winner"
          size="lg"
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
          :value="battleTableData.players[4] && battleTableData.players[4].username"
          name="pair2-p2"
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          :checked="getCheckboxInitStatus(battleTableData.players[4], battleTableData.firstPair) || battleTableData.players.length === 3"
          :value="getCheckboxValue(battleTableData.players[4])"
          :disabled="battleTableData.players.length === 3"
          name="pair2-p2-winner"
          size="lg"
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
          :options="playerOptions"
          :value="battleTableData.firstPair.winner"
          name="final-pair-p1"
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          :checked="battleTableData.firstPair.winner === battleTableData.finalPair.winner"
          :value="battleTableData.firstPair.winner"
          name="final-pair-p1-winner"
          size="lg"
        >
          win
        </b-form-checkbox>
      </div>
      <div class="d-flex flex-row align-items-center">
        <b-form-select
          :options="playerOptions"
          :value="battleTableData.secondPair.winner"
          name="final-pair-p2"
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          :checked="battleTableData.secondPair.winner === battleTableData.finalPair.winner"
          :value="battleTableData.secondPair.winner"
          name="final-pair-p2-winner"
          size="lg"
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
    return {}
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
    }
  },

  methods: {
    getCheckboxInitStatus(player, pair) {
      return player && player.username === pair.winner
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
        cellName: this.cellName,
        players,
        firstPairWinner,
        secondPairWinner,
        finalPairWinner
      })
    }
  }
}
</script>

<style scoped>

</style>
