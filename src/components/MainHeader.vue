<template>
    <header class="p-5 bg-green-300 border-b border-indigo-900">
      <div class="container mx-auto text-indigo-900">
        <ul class="main-menu list-none flex gap-5 justify-center">
          <li v-for="link of links" :key="link.url">
            <router-link :to="link.url" class="hover:text-indigo-500">{{ link.text }}</router-link>
          </li>
        </ul>
      </div>
    </header>
</template>

<script>
export default {
  name: 'MainHeader',
  data() {
    return {
      links: [
        {
          url: '/',
          text: 'Homepage',
        },
        {
          url: '/posts',
          text: 'All Posts',
        },
      ]
    }
  },
}
</script>

<style scoped>
  .router-link-exact-active {
          color: #000;
          font-weight: 700;
  }
</style>
