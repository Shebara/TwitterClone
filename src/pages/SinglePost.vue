<template>
  <div class="single-post">
    <h1>Single Post</h1>
    <div>{{ post.content }}</div>
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
      const res = await this.axios.get(`http://localhost:3000/posts/${this.$route.params.id}`);

      this.post = res.data;
    } catch(e) {
      console.error(e);
    }
  }
}
</script>
