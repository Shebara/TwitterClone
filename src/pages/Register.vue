<template>
  <div class="log-in">
    <h1>Register</h1>
    <form class="max-w-md flex flex-col mx-auto" @submit.prevent="submit">
      <input class="mb-2" type="text" v-model="username" placeholder="Username*" />
      <input class="mb-2" type="text" v-model="displayName" placeholder="Display Name" />
      <input class="mb-2" type="password" v-model="password" placeholder="Password*" />
      <input class="mb-2" type="password" v-model="repeatPassword" placeholder="Repeat Password*" />
      <input class="mb-2" type="text" v-model="avatar" placeholder="Avatar Image URL" />
      <button class="mb-2" type="submit">Log In</button>
    </form>
    <div :class="error ? 'block' : 'hidden'" class="text-red-900 text-center">{{ error }}</div>
    <div class="mt-8 text-center">Already got an account? <router-link :to="`/login`">Log In</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'RegisterUser',
  data() {
    return {
      username: '',
      displayName: '',
      password: '',
      repeatPassword: '',
      avatar: '',
      error: false,
    }
  },
  methods: {
    async submit() {
      try {
        const username = this.username
        const displayName = this.displayName ? this.displayName : username
        const password = this.password
        const repeatPassword = this.repeatPassword

        console.log(username.length)

        if (username.length < 6 || password.length < 6) {
          this.error = 'Username and password must have at least 6 characters.'

          return;
        }
        if (! /^[a-zA-Z0-9]+$/.test(username)) {
          this.error = 'Username must be alphanumeric.'

          return;
        }
        if (password !== repeatPassword) {
          this.error = 'Passwords don\'t match.'
        }

        const avatar = this.avatar.length > 0 ? this.avatar : null
        const res = await this.axios.get(`http://localhost:3000/users?name=${username}`)

        if ( res.data.length > 0 ) {
          this.error = 'User with that username already exists!'

          return
        }

        this.error = false

        await this.axios.post(`http://localhost:3000/users`, {
          name: username,
          password: password,
          displayName: displayName,
          avatar: avatar
        })

        this.$router.push('/login')
      } catch(e) {
        console.error(e);
      }
    }
  }
}
</script>
