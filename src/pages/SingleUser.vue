<template>
  <div class="single-user">
    <h1>Single User</h1>
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  data() {
    return {
      user: {}
    }
  },
  async created() {
    try {
      const res = await this.axios.get(`http://localhost:3000/users/${this.$route.params.id}`);

      this.user = res.data;
    } catch(e) {
      console.error(e);
    }
  }
}
</script>
