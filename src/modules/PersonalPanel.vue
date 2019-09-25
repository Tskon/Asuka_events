<template>
  <b-card
    :img-src="imageUrl"
    img-alt="Avatar"
    img-top
    class="mb-2"
  >
    <template v-if="!editMode">
      <b-card-title>[ {{ clanTag }} ] {{ clanName }}</b-card-title>
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </b-card-text>

      <b-button
        variant="primary"
        class="w-100"
        @click="()=>{editMode = !editMode}"
      >
        <i class="fas fa-user-cog"/>
      </b-button>
    </template>

    <b-form
      v-if="editMode"
      @submit.prevent="submitHandler"
    >
      <b-form-group
        label="Клан тэг"
        description="Максимум 6 символов"
      >
        <b-form-input
          v-model="clanTag"
          :maxlength="6"
        />
      </b-form-group>
      <b-form-group
        label="Название клана"
        description="Максимум 20 символов"
      >
        <b-form-input
          v-model="clanName"
          :maxlength="20"
        />
      </b-form-group>
      <b-form-group
        label="Изображение"
      >
        <b-form-input
          v-model="imageUrl"
        />
      </b-form-group>
      <b-button
        v-if="editMode"
        variant="success"
        class="w-100"
        type="submit"
      >
        <i class="far fa-save"/>
        Сохранить
      </b-button>
    </b-form>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
      clanTag: 'TAG',
      clanName: 'Name',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfq5YrLJG8oFkpyvOtQFdkdjov3oK1C1ZWl7sJl3C6dZGoAgn8',
      editMode: false
    }
  },
  methods: {
    submitHandler (event) {
      this.editMode = !this.editMode
    }
  }
}
</script>

<style scoped>
.card {
  width: 400px;
  margin: 20px auto;
}
</style>