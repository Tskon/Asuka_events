<template>
  <div
      id="app"
      class="container-fluid"
  >
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from "./components/main/header"

export default {
  components: {
    Header
  }
}
</script>