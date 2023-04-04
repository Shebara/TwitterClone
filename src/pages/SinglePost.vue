<template>
  <div class="post-list">
    <h1>Single Post</h1>
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  data() {
    return {
      post: {}
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
