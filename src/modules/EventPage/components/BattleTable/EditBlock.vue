<template>
  <b-form>
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
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          :checked="getCheckboxInitStatus(battleTableData.players[0], battleTableData.firstPair)"
          :value="getCheckboxValue(battleTableData.players[0])"
          size="lg"
        >
          win
        </b-form-checkbox>
      </div>
      <div class="d-flex flex-row align-items-center">
        <b-form-select
          :options="playerOptions"
          :value="battleTableData.players[1] && battleTableData.players[1].username"
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          :checked="getCheckboxInitStatus(battleTableData.players[1], battleTableData.firstPair)"
          :value="getCheckboxValue(battleTableData.players[1])"
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
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          :checked="getCheckboxInitStatus(battleTableData.players[3], battleTableData.firstPair)"
          :value="getCheckboxValue(battleTableData.players[3])"
          size="lg"
        >
          win
        </b-form-checkbox>
      </div>
      <div class="d-flex flex-row align-items-center">
        <b-form-select
          :options="playerOptions"
          :value="battleTableData.players[4] && battleTableData.players[4].username"
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          :checked="getCheckboxInitStatus(battleTableData.players[4], battleTableData.firstPair)"
          :value="getCheckboxValue(battleTableData.players[4])"
          size="lg"
        >
          win
        </b-form-checkbox>
      </div>
    </div>
    <div
      class="pairBlock"
    >
      <div class="pb-1 pl-2">
        <b>Финал</b>
      </div>
      <div class="d-flex flex-row align-items-center mb-2">
        <b-form-select
          :options="playerOptions"
          :value="battleTableData.firstPair.winner"
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          :checked="battleTableData.firstPair.winner === battleTableData.finalPair.winner"
          :value="battleTableData.firstPair.winner"
          size="lg"
        >
          win
        </b-form-checkbox>
      </div>
      <div class="d-flex flex-row align-items-center">
        <b-form-select
          :options="playerOptions"
          :value="battleTableData.secondPair.winner"
          size="sm"
          class="mr-2"
        />
        <b-form-checkbox
          :checked="battleTableData.secondPair.winner === battleTableData.finalPair.winner"
          :value="battleTableData.secondPair.winner"
          size="lg"
        >
          win
        </b-form-checkbox>
      </div>
    </div>
  </b-form>
</template>

<script>
export default {
  name: "EditBlock",
  props: {
    battleTableData: {
      type: Object,
      default: () => ({
        cellName: '',
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
    }
  }
}
</script>

<style scoped>

</style>
