<template>
  <div class="log-in">
    <h1>Log In</h1>
    <form class="max-w-md flex flex-col mx-auto" @submit.prevent="submit">
      <input class="mb-2" type="text" v-model="username" placeholder="Username" />
      <input class="mb-2" type="password" v-model="password" placeholder="Password" />
      <button class="mb-2" type="submit">Log In</button>
    </form>
    <div :class="error ? 'block' : 'hidden'" class="text-red-900 text-center">{{ error }}</div>
    <div class="mt-8 text-center">Got no account? <router-link :to="`/register`">Register</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  data() {
    return {
      username: '',
      password: '',
      error: false,
    }
  },
  methods: {
    async submit() {
      try {
        const username = this.username;
        const password = this.password;
        const res = await this.axios.get(`http://localhost:3000/users`);
        const user = res.data.find(el =>
          el.name === username &&
          el.password === password
        );

        if ( ! user ) {
          this.error = 'Wrong Username or Password'

          return
        }

        this.error = false
        const token = Math.random().toString(36);

        await this.axios.post(`http://localhost:3000/sessions`, {userId: user.id, token: token});

        this.$store.dispatch('login', {
          user,
          token
        })
      } catch(e) {
        console.error(e);
      }
    }
  }
}
</script>
