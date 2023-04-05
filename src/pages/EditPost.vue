<template>
  <div class="edit-post">
    <h1>Edit Post</h1>
    <form class="max-w-md flex flex-col mx-auto" @submit.prevent="submit">
      <textarea v-model="content" placeholder="Write the Message Here"></textarea>
      <button class="mb-2" type="submit">Save</button>
    </form>
    <div :class="error ? 'block' : 'hidden'" class="text-red-900 text-center">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'RegisterUser',
  data() {
    return {
      id: false,
      userId: false,
      content: '',
      error: false
    }
  },
  async created() {
    try {
      this.id = this.$route.params.id ? this.$route.params.id : false;
      const userId = this.$store.getters.getUserId;

      if ( this.id ) {
        const res = await this.axios.get(`http://localhost:3000/posts/${this.id}`);
        const post = res.data;

        if ( userId !== post.authorId ) {
          this.$router.push('/');

          return;
        }

        this.userId = userId;
        this.id = post.id;
        this.content = post.content;
      }
    } catch(e) {
      console.error(e);

      this.$router.push('/');
    }
  },
  methods: {
    async submit() {
      try {
        const date = this.$moment().toISOString()
        const content = this.content

        if (! content || content.length < 1) {
          this.error = 'The text cannot be empty.'

          return;
        }

        this.error = false;

        if (this.id) {
          await this.axios.patch(`http://localhost:3000/posts/${this.id}`, {
            content: content,
            datePublished: date
          })
        } else {
          const resp = await this.axios.post(`http://localhost:3000/posts`, {
            content: content,
            authorId: this.userId,
            datePublished: date
          });

          this.id = resp.data.id;
        }
        
        this.$router.push(`/post/${this.id}`);
      } catch(e) {
        console.error(e);
      }
    }
  }
}
</script>
