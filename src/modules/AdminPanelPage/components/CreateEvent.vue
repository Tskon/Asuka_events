<template>
  <form
    class="CRUD"
    @submit.prevent="submit"
  >
    <h3 class="pb-2">
      Создание нового эвента:
    </h3>
    <div class="twin-inputs">
      <label class="edit-label pb-1">
        <span class="pb-1 pr-2">Slug эвента:</span>
        <b-form-input
          v-model="slug"
          type="text"
          class="edit-input"
        />
      </label>
      <label class="edit-label pb-1">
        <span class="pb-1 pr-2">Имя эвента:</span>
        <b-form-input
          v-model="name"
          type="text"
          class="edit-input"
        />
      </label>
    </div>
    <label class="edit-label pb-1">
      <span class="pb-1 pr-2">Количество ходов:</span>
      <b-form-input
        v-model="turnCount"
        type="number"
        class="edit-input"
      />
    </label>
    <label class="edit-label pb-1">
      <span class="pb-1 pr-2">Обозначения колонок:</span>
      <b-form-tags
        v-model="columns"
        placeholder="Добавить столбец..."
        type="text"
        class="edit-input"
      />
    </label>
    <label class="edit-label pb-1">
      <span class="pb-1 pr-2">Обозначения строк:</span>
      <b-form-tags
        v-model="rows"
        placeholder="Добавить строку..."
        type="text"
        class="edit-input"
      />
    </label>
    <label class="edit-label pb-1">
      <span class="pb-1 pr-2">Стартовые сектора:</span>
      <b-form-tags
        v-model="startedSectors"
        placeholder="Колонка + строка"
        type="text"
        class="edit-input"
      />
    </label>
    <label class="edit-label pb-1">
      <span class="pb-1 pr-2">Список игровых карт:</span>
      <b-form-tags
        v-model="gameMapList"
        placeholder="Название карты"
        type="text"
        class="edit-input"
      />
    </label>
    <label class="edit-label pb-1">
      <span class="pb-1 pr-2">Очки за победу:</span>
      <b-form-input
        v-model="bonusForWin"
        type="number"
        class="edit-input"
      />
    </label>
    <div class="card card-body mb-3">
      <b class="mb-2">Богатые сектора:</b>
      <div class="twin-inputs-2">
        <label class="edit-label pb-1">
          <span class="pb-1 pr-2">Список секторов:</span>
          <b-form-tags
            v-model="richEconomyCells.list"
            placeholder="Колонка + строка"
            type="text"
            class="edit-input"
          />
        </label>
        <label class="edit-label pb-1">
          <span class="pb-1 pr-2">Доходность:</span>
          <b-form-input
            v-model="richEconomyCells.bonus"
            type="number"
            class="edit-input"
          />
        </label>
      </div>
    </div>
    <div class="card card-body mb-3">
      <b class="mb-2">Обычные сектора:</b>
      <div class="twin-inputs-2">
        <label class="edit-label pb-1">
          <span class="pb-1 pr-2">Список секторов:</span>
          <b-form-tags
            v-model="middleEconomyCells.list"
            placeholder="Колонка + строка"
            type="text"
            class="edit-input"
          />
        </label>
        <label class="edit-label pb-1">
          <span class="pb-1 pr-2">Доходность:</span>
          <b-form-input
            v-model="middleEconomyCells.bonus"
            type="number"
            class="edit-input"
          />
        </label>
      </div>
    </div>
    <div class="card card-body mb-3">
      <b class="mb-2">Бедные сектора:</b>
      <div class="twin-inputs-2">
        <label class="edit-label pb-1">
          <span class="pb-1 pr-2">Список секторов:</span>
          <b-form-tags
            v-model="poorEconomyCells.list"
            placeholder="Колонка + строка"
            type="text"
            class="edit-input"
          />
        </label>
        <label class="edit-label pb-1">
          <span class="pb-1 pr-2">Доходность:</span>
          <b-form-input
            v-model="poorEconomyCells.bonus"
            type="number"
            class="edit-input"
          />
        </label>
      </div>
    </div>

    <b-button
      variant="success"
      type="submit"
    >
      Создать новый эвент
    </b-button>
  </form>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "CRUDVue",

  data() {
    return {
      slug: '',
      name: '',
      turnCount: 20,
      columns: ['a', 'b', 'c'],
      rows: [1, 2, 3],
      startedSectors: ['a1', 'c3'],
      bonusForWin: 0,
      richEconomyCells: {
        list: ['a2', 'a3'],
        bonus: 30
      },
      middleEconomyCells: {
        list: ['b1', 'b2'],
        bonus: 20
      },
      poorEconomyCells: {
        list: ['c1', 'c2'],
        bonus: 10
      },
      gameMapList: ['Название карты 1', 'Название карты 2']
    }
  },

  methods: {
    ...mapActions({
      createEvent: 'admin/createEvent'
    }),

    submit() {
      const {
        slug,
        name,
        turnCount,
        columns,
        rows,
        startedSectors,
        richEconomyCells,
        middleEconomyCells,
        poorEconomyCells,
        gameMapList,
        bonusForWin
      } = this

      this.createEvent({
        slug,
        name,
        turnCount,
        columns,
        rows,
        startedSectors,
        richEconomyCells,
        middleEconomyCells,
        poorEconomyCells,
        gameMapList,
        bonusForWin
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .CRUD {
    display: flex;
    flex-direction: column;
  }

  .twin-inputs, .twin-inputs-2 {
    display: flex;
    justify-content: space-between;
  }

  .twin-inputs .edit-label {
    width: calc(50% - 10px);
  }

  .twin-inputs-2 {
    .edit-label:first-child {
      width: calc(100% - 140px);
    }

    .edit-label:last-child {
      width: 120px;
    }
  }
</style>
