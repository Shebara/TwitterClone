<template>
    <header class="p-5 bg-green-300 border-b border-indigo-900">
      <div class="container mx-auto text-indigo-900">
        <div class="menus flex justify-between">
          <ul class="main-menu list-none flex gap-5 justify-left">
            <li v-for="link of links" :key="link.url">
              <router-link :to="link.url" :key="link.key" class="hover:text-indigo-500">{{ link.text }}</router-link>
            </li>
          </ul>
          <ul class="auth-menu list-none flex gap-5 justify-right">
            <li v-for="link of authentication" :key="link.url">
              <router-link :to="link.url" :key="link.key" class="hover:text-indigo-500">{{ link.text }}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <PostButton />
    </header>
</template>

<script>
import PostButton from './PostButton.vue'

export default {
  name: 'MainHeader',
  data() {
    return {
      links: [],
      authentication: []
    }
  },
  components: {
    PostButton
  },
  created() {
    if ( this.$store.getters.getUserId !== false ) {
      this.links = [
        {
          url: '/',
          text: 'Homepage',
          key: 'home'
        },
        {
          url: '/posts',
          text: 'All Posts',
          key: 'all'
        },
        {
          url: '/followed',
          text: 'Followed Posts',
          key: 'followed'
        },
        {
          url: '/search',
          text: 'Search Users',
          key: 'search'
        },
      ]
      this.authentication = [
        {
          url: '/profile',
          text: 'My Profile',
          key: 'my_profile'
        },
        {
          url: '/editprofile',
          text: 'Edit Profile',
          key: 'edit_profile'
        },
        {
          url: '/logout',
          text: 'Log Out',
          key: 'logout'
        }
      ]
    } else {
      this.links = []
      this.authentication = [
        {
          url: '/login',
          text: 'Log In',
          key: 'login'
        },
        {
          url: '/register',
          text: 'Register',
          key: 'register'
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
