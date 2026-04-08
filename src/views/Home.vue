<template>
  <q-page padding class="kvar-card-container full-height column justify-center items-center content-center">
    <HomePage/>
  </q-page>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/HomePage.vue'

export default {
  name: 'Home',
  components: {
    HomePage
  }
}
</script>


<style scoped>
 
</style>