<template>
  <div class="post-list">
    <h1>Posts by Your Followed Users</h1>
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

      const following = await this.axios.get(`http://localhost:3000/follows?followerId=${userId}`);
      const followed = following.data.map(data => data.followedId);

      const posts = await this.axios.get(`http://localhost:3000/posts`);
      const data = posts.data.filter(data => followed.indexOf(data.authorId) > -1);

      data.sort((a, b) => {
        const x = this.$moment(a.datePublished).valueOf();
        const y = this.$moment(b.datePublished).valueOf();

        if ( x > y ) {
          return 1;
        }
        if ( x < y ) {
          return -1;
        }
        return 0;
      });

      this.posts = data;
    } catch(e) {
      console.error(e);
    }
  }
}
</script>
