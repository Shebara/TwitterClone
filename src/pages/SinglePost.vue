<template>
  <div class="single-post">
    <h1>Single Post</h1>
    <div>{{ content }}</div>
    <div>Posted on {{ datePublished | moment("calendar") }}
      <AuthorLine :authorId="authorId" />
    </div>
    <div v-show="mine">
      <a class="cursor-pointer" @click.prevent="deletePost">Delete</a>
      <router-link :to="`/edit/${id}`">Edit</router-link>
    </div>
  </div>
</template>

<script>
import AuthorLine from '../components/AuthorLine.vue'

export default {
  name: 'SinglePost',
  components: {
      AuthorLine
  },
  data() {
    return {
      id: false,
      authorId: false,
      content: false,
      datePublished: false,
      mine: false
    }
  },
  async created() {
    try {
      this.id = this.$route.params.id;

      if ( this.id === false ) {
        this.$router.link('/posts');

        return;
      }

      const res = await this.axios.get(`http://localhost:3000/posts/${this.id}`);

      const data = res.data;

      this.content = data.content;
      this.authorId = data.authorId;
      this.datePublished = data.datePublished;
      this.mine = this.authorId === this.$store.getters.getUserId;
    } catch(e) {
      console.error(e);

      this.$router.link('/posts');
    }
  },
  methods: {
    async deletePost() {
      //
    }
  }
}
</script>
