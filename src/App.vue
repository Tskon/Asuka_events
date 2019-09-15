<template>
  <div id="app">
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
