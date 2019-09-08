<template>
  <div id="app">
    <MainMenu/>
    <router-view/>
  </div>
</template>

<script>
  import MainMenu from "./components/MainMenu"

  export default {
      components: {
          MainMenu
      }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
