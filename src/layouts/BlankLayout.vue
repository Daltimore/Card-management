<template>
  <div>
    <nav-bar></nav-bar>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<style>

</style>