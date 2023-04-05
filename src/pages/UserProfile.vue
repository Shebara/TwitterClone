<template>
  <div class="single-user text-center">
    <h1>{{ displayName }}</h1>
    <img v-show="avatar" :src="avatar" :alt="name" />
    <h5></h5>
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
      this.id = this.$route.params.id;
      const res = await this.axios.get(`http://localhost:3000/users/${this.$route.params.id}`);

      this.user = res.data;
    } catch(e) {
      console.error(e);
    }
  }
}
</script>
