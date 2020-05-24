<template>
  <form
    class="CRUD"
    @submit.prevent="submit"
  >
    <div class="twin-inputs pt-3">
      <label class="edit-label pb-1">
        <span class="pb-1 pr-2">Slug эвента:</span>
        <b-form-input
          v-model="eventSlug"
          type="text"
          class="edit-input"
        />
      </label>
      <label class="edit-label pb-1">
        <span class="pb-1 pr-2">Имя эвента:</span>
        <b-form-input
          v-model="eventName"
          type="text"
          class="edit-input"
        />
      </label>
    </div>
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
  </form>
</template>

<script>
export default {
  name: "CRUDVue",

  data() {
    return {
      eventSlug: '',
      eventName: '',
      columns: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      rows: [1, 2, 3, 4, 5, 6],
      startedSectors: ['a1', 'h6'],
      richEconomyCells: {
        list: [],
        bonus: 0
      },
      middleEconomyCells: {
        list: [],
        bonus: 0
      },
      poorEconomyCells: {
        list: [],
        bonus: 0
      },
      gameMapList: []
    }
  },

  methods: {
    submit() {

    }
  }
}
</script>

<style lang="scss" scoped>
  .CRUD {
    display: flex;
    flex-direction: column;
  }

  .twin-inputs {
    display: flex;
    justify-content: space-between;

    .edit-label {
      width: calc(50% - 10px);
    }
  }

</style>
