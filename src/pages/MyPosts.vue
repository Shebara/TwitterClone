<template>
  <div class="post-list">
    <h1>Posts by You</h1>
    <div class="posts flex flex-wrap justify-center">
      <div class="p-4 border" v-for="post of posts" :key="post.id">
        <router-link :to="`/post/${post.id}`" class="text-left hover:text-black-70 underline text-black">{{ post.content }}</router-link>
        <div class="mt-2 text-right text-cs">Posted on {{ post.dateCreated }} by
          <router-link :to="`/user/${post.authorId}`" class="text-left hover:text-black-70 underline text-black">{{ post.authorId }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPosts',
  data() {
    return {
      posts: []
    }
  },
  async created() {
    try {
      const res = await this.axios.get(`http://localhost:3000/posts`);//?authorId=this.$store.user.id

      this.posts = res.data;
    } catch(e) {
      console.error(e);
    }
  }
}
</script>
