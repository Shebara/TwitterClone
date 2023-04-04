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
