<template>
  <div>
    <h1>Event</h1>
    <Map />
  </div>
</template>

<script>
import axios from 'axios'
import Map from './components/Map'

export default {
  components: {
    Map
  },
  mounted() {
    axios.post('/api/map/get-map-cells')
      .then(({data}) => {
        console.log(data)
      })
  }
}
</script>

<style scoped>

</style>