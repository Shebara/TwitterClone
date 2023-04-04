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
</style>
