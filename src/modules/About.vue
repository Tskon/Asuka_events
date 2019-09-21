<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>BaseUrl: {{ baseUrl }}</p>
    <p>Data: {{ data }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      data: null
    }
  },
  mounted() {
    axios.post('/api/user/get-user').then(resp => {
      this.data = resp.data.message
    })
  }
}
</script>
