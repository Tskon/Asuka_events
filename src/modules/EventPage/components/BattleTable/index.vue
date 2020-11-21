<template>
  <div v-if="currentBattleTable">
    <button
      v-if="isAdmin"
      class="edit-btn"
      @click="editBtnClick"
    >
      <i class="fas fa-edit"/>
      <span v-if="isEditMode">
        Закрыть редактирование
      </span>
      <span v-else>
        Редактировать таблицу
      </span>
    </button>
    <div
      v-if="!isEditMode"
      class="table-wrapper"
    >
      <span class="divider-1">Полуфинал</span>
      <span class="divider-2">Полуфинал</span>
      <span class="final-label">Финал</span>
      <div
        class="cell semi-final-1"
        :class="{
          'pair-winner': currentBattleTable.firstPair.winner
            && currentBattleTable.firstPair.winner === (pair1[0] && pair1[0].username),
        }"
      >
        <i
          v-if="currentBattleTable.firstPair.winner
            && currentBattleTable.firstPair.winner === (pair1[0] && pair1[0].username)"
          class="fas fa-crown"
        />
        {{ getPlayerName(pair1[0]) }}
      </div>
      <div
        class="cell semi-final-2"
        :class="{
          'pair-winner': currentBattleTable.firstPair.winner
            && currentBattleTable.firstPair.winner === (pair1[1] && pair1[1].username),
        }"
      >
        <i
          v-if="currentBattleTable.firstPair.winner
            && currentBattleTable.firstPair.winner === (pair1[1] && pair1[1].username)"
          class="fas fa-crown"
        />
        {{ getPlayerName(pair1[1]) }}
      </div>
      <div
        class="cell semi-final-3"
        :class="{
          'pair-winner': currentBattleTable.secondPair.winner
            && currentBattleTable.secondPair.winner === (pair2[0] && pair2[0].username),
        }"
      >
        <i
          v-if="currentBattleTable.secondPair.winner
            && currentBattleTable.secondPair.winner === (pair2[0] && pair2[0].username)"
          class="fas fa-crown"
        />
        {{ getPlayerName(pair2[0]) }}
      </div>
      <div
        class="cell semi-final-4"
        :class="{
          'pair-winner': currentBattleTable.secondPair.winner
            && currentBattleTable.secondPair.winner === (pair2[1] && pair2[1].username),
        }"
      >
        <i
          v-if="currentBattleTable.secondPair.winner
            && currentBattleTable.secondPair.winner === (pair2[1] && pair2[1].username)"
          class="fas fa-crown"
        />
        {{ getPlayerName(pair2[1]) }}
      </div>
      <div
        class="cell final-1"
        :class="{
          'pair-winner': currentBattleTable.finalPair.winner
            && currentBattleTable.finalPair.winner === (finalPair[0] && finalPair[0].username),
        }"
      >
        <i
          v-if="currentBattleTable.finalPair.winner
            && currentBattleTable.finalPair.winner === (finalPair[0] && finalPair[0].username)"
          class="fas fa-crown"
        />
        {{ getPlayerName(finalPair[0]) }}
      </div>
      <div
        class="cell final-2"
        :class="{
          'pair-winner': currentBattleTable.finalPair.winner
            && currentBattleTable.finalPair.winner === (finalPair[1] && finalPair[1].username),
        }"
      >
        <i
          v-if="currentBattleTable.finalPair.winner
            && currentBattleTable.finalPair.winner === (finalPair[1] && finalPair[1].username)"
          class="fas fa-crown"
        />
        {{ getPlayerName(finalPair[1]) }}
      </div>
    </div>
    <BattleTableResultBlock
      v-if="!isEditMode && isResultBlockAvailable"
      :slug="currentBattleTable.eventSlug"
      class="pt-3"
      @resultSended="onResultSended"
    />
    <EditBlock
      v-if="isEditMode"
      :battle-table-data="currentBattleTable"
      :cell-name="cellName"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import EditBlock from './EditBlock'
import BattleTableResultBlock from '../BattleTableResultBlock'

export default {
  components: {
    EditBlock,
    BattleTableResultBlock
  },
  props: {
    cellName: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      pair1: [],
      pair2: [],
      finalPair: [],
      isEditMode: false
    }
  },

  computed: {
    ...mapGetters({
      currentBattleTable: 'map/currentBattleTable'
    }),
    ...mapState({
      isAdmin: state => state.user.isAdmin,
      username: state => state.user.name
    }),

    isResultBlockAvailable() {
      const isPlayerInBattleTable = this.currentBattleTable.players
        .some(player => player.username === this.username)
      const hasBTWinner = this.currentBattleTable.finalPair.winner

      return isPlayerInBattleTable && !hasBTWinner
    }
  },

  watch: {
    currentBattleTable() {
      const {players, firstPair, secondPair} = this.currentBattleTable
      const findPlayer = username => {
        return this.currentBattleTable.players.find(player => player.username === username)
      }

      if (players.length === 2) {
        this.pair1 = [players[0]]
        this.pair2 = [players[1]]
        this.finalPair = [players[0], players[1]]
      }
      if (players.length === 3) {
        this.pair1 = [players[0], players[1]]
        this.pair2 = [players[2]]
        this.finalPair = [findPlayer(firstPair.winner), findPlayer(secondPair.winner)]
      }
      if (players.length >= 4) {
        this.pair1 = [players[0], players[1]]
        this.pair2 = [players[2], players[3]]
        this.finalPair = [findPlayer(firstPair.winner), findPlayer(secondPair.winner)]
      }
    }
  },

  methods: {
    ...mapActions({
      fetchCurrentBattleTable: 'map/fetchCurrentBattleTable'
    }),

    getPlayerName(playerObject) {
      return playerObject ? playerObject.clanTag : '------'
    },

    editBtnClick() {
      this.isEditMode = !this.isEditMode
    },

    async onEdit() {
      await this.fetchCurrentBattleTable(this.cellName)
      this.isEditMode = false
    },

    onResultSended() {
      this.fetchCurrentBattleTable(this.cellName)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@fortawesome/fontawesome-free/scss/fontawesome.scss';

  .table-wrapper {
    display: grid;
    grid-template-areas: 'semi-final-1 final-label final-label semi-final-3' 'divider-1 final-1 final-2 divider-2' 'semi-final-2 . . semi-final-4';
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

  .winner {
    text-align: center;
    grid-area: winner;
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

  .pair-winner {
    color: $warning;
  }

  .edit-btn {
    background-color: transparent;
    border: none;
    margin-bottom: 10px;
    transition: color .2s;

    &:hover {
      color: lighten($dark, 20%);
    }
  }
</style>
