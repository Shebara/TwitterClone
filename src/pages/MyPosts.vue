<template>
  <div class="post-list">
    <h1>Posts by You ({{$store.getters.getUserDisplayName}})</h1>
    <div class="posts flex flex-wrap justify-center">
      <ListPost
        v-for="post of posts"
        :key="post.id"
        :id="post.id"
        :content="post.content"
        :authorId="post.authorId"
        :datePublished="post.datePublished"
        />
    </div>
  </div>
</template>

<script>
import ListPost from '../components/ListPost.vue'

export default {
  name: 'MyPosts',
  components: {
    ListPost
  },
  data() {
    return {
      posts: []
    }
  },
  async created() {
    try {
      const userId = this.$store.getters.getUserId;

      const res = await this.axios.get(`http://localhost:3000/posts?authorId=${userId}`);

      this.posts = res.data;
    } catch(e) {
      console.error(e);
    }
  }
}
</script>
