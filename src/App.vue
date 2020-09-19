<template>
  <div
    id="app"
    class="app-wrapper container-fluid"
  >
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/header'

export default {
  components: {
    Header
  }
}
</script>

<style scoped>
  .app-wrapper {
    height: 100%;
  }
</style>
