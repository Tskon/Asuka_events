<template>
  <b-card
    :img-src="imageUrl"
    img-alt="Avatar"
    img-top
    class="mb-2"
  >
    <template v-if="!editMode">
      <b-card-title>[ {{ clanTag }} ] {{ clanName }}</b-card-title>
      <b-button
        variant="primary"
        class="w-100"
        @click="()=>{editMode = !editMode}"
      >
        <i class="fas fa-user-cog"/>
        Редактировать
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
import {mapActions} from 'vuex'

export default {
  data () {
    return {
      editMode: false
    }
  },
  computed: {
    clanTag: {
      get () {
        return this.$store.state.user.personalData.clanTag
      },
      set (clanTag) {
        this.$store.commit('user/setPersonalData', {clanTag})
      }
    },
    clanName: {
      get () {
        return this.$store.state.user.personalData.clanName
      },
      set (clanName) {
        this.$store.commit('user/setPersonalData', {clanName})
      }
    },
    imageUrl: {
      get () {
        return this.$store.state.user.personalData.imageUrl
      },
      set (imageUrl) {
        this.$store.commit('user/setPersonalData', {imageUrl})
      }
    }
  },
  created () {
    this.getPersonalData()
  },
  methods: {
    ...mapActions({
      getPersonalData: 'user/getPersonalData'
    }),
    submitHandler () {
      this.editMode = !this.editMode
      this.$store.dispatch('user/setPersonalData')
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