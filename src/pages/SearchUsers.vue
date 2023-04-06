<template>
  <div class="search-users text-center">
    <h1>Search for Users</h1>
    <form @submit.prevent="userSearch">
      <input type="text" v-model="search" placeholder="Search terms" />
      <button type="submit">Search</button>
    </form>
    <div :class="error ? 'block' : 'hidden'" class="text-red-900 text-center">{{ error }}</div>
    <div class="users flex flex-wrap flex-col justify-center">
      <div class="p-4 border m-2" v-for="user of users" :key="user.id">
        <router-link :to="`/user/${user.id}`" class="text-left hover:text-black-70 underline text-black">
          {{ user.displayName }}
          <span class="italic">(@{{ user.name }})</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchUsers',
  data() {
    return {
      search: '',
      users: [],
      error: false
    }
  },
  methods: {
    async userSearch() {
      try {
        const search = this.search

        if (search.length < 2) {
          this.error = 'Please input an at least two-character long search string.'

          return
        }

        const users = await this.axios.get(`http://localhost:3000/users?q=${search}`)
        const data = users.data;

        if (data.length === 0) {
          this.error = 'No results found!'

          return
        }

        this.error = false;
        this.users = data;
      } catch(e) {
        console.error(e);
      }
    }
  }
}
</script>
