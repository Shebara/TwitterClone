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
    <div v-show="replies.length > 0" class="comments mt-4 mb-4 text-sm">
      <div v-for="reply of replies" :key="reply.id">
        {{ reply.content }}
        <br>
        Posted on {{ reply.datePosted | moment("calendar") }}
        <AuthorLine :authorId="reply.authorId" />
      </div>
    </div>
    <div class="comment mt-4 mb-4">
      <form class="max-w-md flex flex-col" @submit.prevent="postComment">
        <textarea v-model="comment" placeholder="Write the Comment Here"></textarea>
        <button class="mb-2" type="submit">Post</button>
      </form>
      <div :class="error ? 'block' : 'hidden'" class="text-red-900">{{ error }}</div>
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
      myId: false,
      comment: '',
      error: false,
      replies: [],
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

      const comment_res = await this.axios.get(`http://localhost:3000/comments?postId=${this.id}`);
      this.replies = comment_res.data;
    } catch(e) {
      console.error(e);

      this.$router.link('/posts');
    }
  },
  methods: {
    async deletePost() {
      //
    },
    async postComment() {
      try {
        const date = this.$moment().toISOString()
        const content = this.comment

        if (! content || content.length < 1) {
          this.error = 'The comment cannot be empty.'

          return
        }

        this.error = false

        const newComment = await this.axios.post(`http://localhost:3000/comments`, {
          content: content,
          authorId: this.myId,
          postId: this.id,
          datePublished: date
        });

        this.replies.push(newComment.data);
        this.comment = '';

        this.$forceUpdate();
      } catch(e) {
        console.error(e);
      }
    }
  }
}
</script>
