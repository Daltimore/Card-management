<template>
  <nav class="flex justify-between items-center py-6 px-4 md:px-20 shadow-lg">
    <h4 class="text-primary text-3xl font-black">BartCard</h4>
    <button
      @click.prevent="logout"
      class="border-0 bg-primary text-white w-20 md:w-32 py-2 rounded font-semibold focus:outline-none"
    >
      Logout
    </button>
  </nav>
</template>

<script>
export default {
  methods:{
    logout() {
      localStorage.removeItem('authObject');
      this.$router.push({ name: 'login'})
    }
  }

}
</script>

<style>

</style>