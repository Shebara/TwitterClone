<template>
  <div id="app">
    <Header />
    <router-view class="p-5 container mx-auto" />
  </div>
</template>

<script>
import Header from './components/MainHeader.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  async created() {
    try {
      this.$watch(
        () => this.$route.params,
        () => {
          this.$store.dispatch('confirmLogin')
        }
      )

      this.$store.dispatch('confirmLogin')
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style>
#app h1 {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 40px;
}
#app form input {
  border: 1px solid #777777;
  margin-bottom: 10px;
  padding: 10px;
}
#app form button {
  border: 1px solid #333333;
  background-color: #DFDFDF;
  padding: 10px;
}
#app form button:hover {
  background-color: #EFEFEF;
}
</style>
