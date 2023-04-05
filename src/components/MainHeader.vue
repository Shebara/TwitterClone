<template>
    <header class="p-5 bg-green-300 border-b border-indigo-900">
      <div class="container mx-auto text-indigo-900">
        <div class="menus flex justify-between">
          <ul class="main-menu list-none flex gap-5 justify-left">
            <li v-for="link of links" :key="link.url">
              <router-link :to="link.url" class="hover:text-indigo-500">{{ link.text }}</router-link>
            </li>
          </ul>
          <ul class="auth-menu list-none flex gap-5 justify-right">
            <li v-for="link of authentication" :key="link.url">
              <router-link :to="link.url" class="hover:text-indigo-500">{{ link.text }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </header>
</template>

<script>
export default {
  name: 'MainHeader',
  data() {
    return {
      links: [],
      authentication: []
    }
  },
  created() {
    if ( this.$store.getters.getUserId !== false ) {
      this.links = [
        {
          url: '/',
          text: 'Homepage',
        },
        {
          url: '/posts',
          text: 'All Posts',
        },
      ]
      this.authentication = [
        {
          url: '/logout',
          text: 'Log Out'
        }
      ]
    } else {
      this.links = []
      this.authentication = [
        {
          url: '/login',
          text: 'Log In'
        },
        {
          url: '/register',
          text: 'Register'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .router-link-exact-active {
          color: #000;
          font-weight: 700;
  }
</style>
