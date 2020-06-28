<template>
  <div class="players-table-wrapper card card-body">
    <h3>Игроки:</h3>
    <b-table
      :items="items"
      :fields="fields"
      class="players-table"
      responsive="xl"
      striped
    >
      <template v-slot:head(username)>
        <i class="fas fa-users"/>
      </template>
      <template v-slot:head(ownInRowCount)>
        <i class="fas fa-clock"/>
      </template>
      <template v-slot:head(actions)>
        <i class="fas fa-user-cog"/>
      </template>

      <template v-slot:cell(actions)="row">
        <b-button
          size="sm"
          variant="warning"
          @click="editFormOpen(row)"
        >
          <i class="far fa-edit"/>
        </b-button>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <b-form class="form">
            <label class="edit-label pb-1">
              <span class="pb-1 pr-2">Количество очков:</span>
              <b-form-input
                v-model="forms[row.index].score"
                type="number"
                class="edit-input"
                size="sm"
              />
            </label>
            <label class="edit-label pr-2 pb-1">
              <span class="pb-1 pr-2">Текущий сектор:</span>
              <b-form-input
                v-model="forms[row.index].currentCell"
                :state="forms[row.index].currentCellStatus"
                type="text"
                class="edit-input"
                size="sm"
                @input="checkCellState(row.index, 'currentCell')"
              />
            </label>
            <label class="edit-label pr-2 pb-1">
              <span class="pb-1 pr-2">Выбранный сектор:</span>
              <b-form-input
                v-model="forms[row.index].selectedCell"
                :state="forms[row.index].selectedCellStatus"
                type="text"
                class="edit-input"
                size="sm"
                @input="checkCellState(row.index, 'selectedCell')"
              />
            </label>
            <label class="edit-label pr-2 pb-1">
              <span class="pb-1 pr-2">Захваченный сектор:</span>
              <b-form-input
                v-model="forms[row.index].ownedCell"
                :state="forms[row.index].ownedCellStatus"
                type="text"
                class="edit-input"
                size="sm"
                @input="checkCellState(row.index, 'ownedCell')"
              />
            </label>
            <label class="edit-label pr-2 pb-1">
              <span class="pb-1 pr-2">Время владения:</span>
              <b-form-input
                v-model="forms[row.index].ownInRowCount"
                type="number"
                class="edit-input"
                size="sm"
              />
            </label>

            <b-button
              type="button"
              variant="success"
              :disabled="!checkFormStatus(forms[row.index])"
              @click="editFormSubmit(row)"
            >
              <i class="far fa-save mr-2"/> Сохранить
            </b-button>
          </b-form>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PlayersTable',

  props: {
    users: {
      type: Array,
      default: () => []
    },

    eventSlug: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      fields: [
        {
          key: 'username',
          sortable: true,
          label: 'Клан',
          tdClass: 'username-td'
        },
        {
          key: 'score',
          sortable: true,
          label: 'Очки'
        },
        {
          key: 'currentCell',
          label: 'Текущ.',
          sortable: true
        },
        {
          key: 'selectedCell',
          label: 'Выбр.'
        },
        {
          key: 'ownedCell',
          label: 'Влад.'
        },
        {
          key: 'ownInRowCount',
          label: 'Время Влад.'
        },
        {
          key: 'actions',
          label: ''
        }
      ],
      forms: []
    }
  },

  computed: {
    players() {
      return this.users.filter(user => {
        if (!user.eventList) return false

        return user.eventList.some(event => event.slug === this.eventSlug)
      })
    },

    items() {
      return this.players.map(player => {
        const event = player.eventList.find(({slug}) => slug === this.eventSlug)

        return {
          username: player.username,
          score: event.score || 0,
          currentCell: event.currentCell || '',
          selectedCell: event.selectedCell || '',
          ownedCell: event.ownedCell || '',
          ownInRowCount: event.ownInRowCount || 0
        }
      })
    }
  },

  methods: {
    ...mapActions({
      setPlayerData: 'admin/setPlayerData'
    }),

    editFormOpen(row) {
      this.$set(this.forms, row.index, {
        score: row.item.score,
        currentCell: row.item.currentCell,
        selectedCell: row.item.selectedCell,
        ownedCell: row.item.ownedCell,
        currentCellStatus: true,
        selectedCellStatus: true,
        ownedCellStatus: true,
        ownInRowCount: row.item.ownInRowCount
      })

      row.toggleDetails()
    },

    editFormSubmit(row) {
      const { score, currentCell, selectedCell, ownedCell, ownInRowCount } = this.forms[row.index]

      this.setPlayerData({
        eventSlug: this.eventSlug,
        username: row.item.username,
        score,
        currentCell: currentCell.toLowerCase(),
        selectedCell: selectedCell.toLowerCase(),
        ownedCell: ownedCell.toLowerCase(),
        ownInRowCount
      })

      row.toggleDetails()
    },

    checkCellState(index, key) {
      const value = this.forms[index][key]
      this.forms[index][`${key}Status`] = value ? /^[abcdefgh][1-6]$/.test(value.toLowerCase()) : true
    },

    checkFormStatus(formData) {
      return formData.currentCellStatus && formData.selectedCellStatus && formData.ownedCellStatus
    }
  }
}
</script>

<style lang="scss">
  .players-table-wrapper {
    .username-td {
      width: 100%;
    }

    .edit-input {
      max-width: 80px;
    }

    .edit-label {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      padding-right: 30px;
    }

    .form {
      display: grid;
      grid-template-columns: 1fr 1fr;

      @media (min-width: 1300px) {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    .players-table {
      td, th {
        &:not(:first-child){
          text-align: center;
        }
      }
    }
  }
</style>
