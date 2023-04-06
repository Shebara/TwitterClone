<template>
  <div class="single-user text-center">
    <h1>{{ displayName }}</h1>
    <img class="mx-auto max-w-sm" v-show="avatar" :src="avatar" :alt="name" />
    <h5>@{{ name }}</h5>
    <button v-show="id != myId" class="border bg-slate-300 cursor-pointer hover:bg-slate-100 p-4" @click.prevent="follow">{{ following !== false ? 'Unfollow' : 'Follow' }} @{{ name }}</button>
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
      posts: [],
      myId: false,
      following: false,
    }
  },
  async created() {
    try {
      this.myId = this.$store.getters.getUserId;
      this.id = this.$route.params.id ? this.$route.params.id : this.myId;
      const res = await this.axios.get(`http://localhost:3000/users/${this.id}`);

      const user = res.data;
      this.name = user.name;
      this.displayName = user.displayName;
      this.avatar = user.avatar;
      this.registrationDate = user.registrationDate;

      const posts = await this.axios.get(`http://localhost:3000/posts?authorId=${this.id}`);
      this.posts = posts.data;

      const following = await this.axios.get(`http://localhost:3000/follows?followerId=${this.myId}&followedId=${this.id}`);
      this.following = following.data.length > 0 ? following.data[0].id : false
    } catch(e) {
      console.error(e);
    }
  },
  methods: {
    async follow() {
        try {
          if (this.following === false) {
            const data = await this.axios.post(`http://localhost:3000/follows`, {
              followerId: parseInt( this.myId ),
              followedId: parseInt( this.id )
            });

            this.following = data.data.id;
          } else {
            await this.axios.delete(`http://localhost:3000/follows/${this.following}`);

            this.following = false;
          }
        } catch(e) {
          console.error(e);
        }
    },
  }
}
</script>
