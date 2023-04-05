<template>
  <div class="single-user text-center">
    <h1>{{ displayName }}</h1>
    <img class="mx-auto max-w-sm" v-show="avatar" :src="avatar" :alt="name" />
    <h5>@{{ name }}</h5>
    <p>Registered on: {{ registrationDate | moment("calendar") }}</p>
    <h2>Posts by @{{ name }}</h2>
    <div class="posts flex flex-wrap justify-center mt-8">
      <ListPost
        v-for="post of posts"
        :key="post.id"
        :id="post.id"
        :content="post.content"
        :authorId="post.authorId"
        :datePublished="post.datePublished"
        :noUserData=true
        />
    </div>
  </div>
</template>

<script>
import ListPost from '../components/ListPost.vue'

export default {
  name: 'UserProfile',
  components: {
    ListPost
  },
  data() {
    return {
      id: false,
      displayName: 'Single User',
      name: false,
      avatar: null,
      registrationDate: false,
      posts: []
    }
  },
  async created() {
    try {
      this.id = this.$route.params.id ? this.$route.params.id : this.$store.getters.getUserId;
      const res = await this.axios.get(`http://localhost:3000/users/${this.id}`);

      const user = res.data;
      this.name = user.name;
      this.displayName = user.displayName;
      this.avatar = user.avatar;
      this.registrationDate = user.registrationDate;

      const posts = await this.axios.get(`http://localhost:3000/posts?authorId=${this.id}`);
      this.posts = posts.data;
    } catch(e) {
      console.error(e);
    }
  }
}
</script>
