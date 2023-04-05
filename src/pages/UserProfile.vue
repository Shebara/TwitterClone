<template>
  <div class="single-user text-center">
    <h1>{{ displayName }}</h1>
    <img class="mx-auto max-w-sm" v-show="avatar" :src="avatar" :alt="name" />
    <h5>@{{ name }}</h5>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      id: false,
      displayName: 'Single User',
      name: false,
      avatar: null,
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
    } catch(e) {
      console.error(e);
    }
  }
}
</script>
