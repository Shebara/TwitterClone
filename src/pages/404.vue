<template>
  <div class="text-center">
    <h1>404</h1>
    Page Not Found!
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      posts: []
    }
  },
  async created() {
    try {
      const res = await this.axios.get(`http://localhost:3000/posts`);

      this.posts = res.data;
    } catch(e) {
      console.error(e);
    }
  }
}
</script>
