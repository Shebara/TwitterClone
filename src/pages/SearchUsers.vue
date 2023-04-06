<template>
  <div class="search-users">
    <h1>Search for Users</h1>
    <form @submit.prevent="userSearch">
      <input type="text" v-model="search" placeholder="Search terms" />
      <button type="submit">Search</button>
    </form>
    <div class="users flex flex-wrap justify-center">
      //
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchUsers',
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async userSearch() {
      //
    }
  }
}
</script>
