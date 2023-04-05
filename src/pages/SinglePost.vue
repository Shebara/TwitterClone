<template>
  <div class="single-post">
    <h1>Single Post</h1>
    <div>{{ content }}</div>
    <div>Posted on {{ datePublished | moment("calendar") }}
      <AuthorLine :key="key" :authorId="authorId" />
    </div>
    <div v-show="myId === authorId">
      <a class="cursor-pointer mr-2" @click.prevent="deletePost">Delete</a>
      <router-link class="mr-2" :to="`/edit/${id}`">Edit</router-link>
    </div>
    <CommentSection :myId="myId" :postId="id" :postOwnerId="authorId" />
  </div>
</template>

<script>
import AuthorLine from '../components/AuthorLine.vue'
import CommentSection from '../components/CommentSection.vue'

export default {
  name: 'SinglePost',
  components: {
      AuthorLine,
      CommentSection
  },
  data() {
    return {
      id: false,
      authorId: false,
      content: false,
      datePublished: false,
      myId: false,
      key: 0
    }
  },
  async created() {
    try {
      const vm = this;
      this.$watch(
        () => this.authorId,
        () => {
          vm.key++
        }
      )
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
      this.mine = this.authorId;
      this.myId = this.$store.getters.getUserId;
    } catch(e) {
      console.error(e);

      this.$router.link('/posts');
    }
  },
  methods: {
    async deletePost() {
      try {
          if (this.myId == this.authorId) {
            return;
          }
          await this.axios.delete(`http://localhost:3000/posts/${this.id}`);

          this.$router.push('/');
      } catch (e) {
          console.error(e);
      }
    }
  }
}
</script>
