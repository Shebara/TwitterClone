<template>
  <div class="edit-profile">
    <h1>Edit Profile</h1>
    <h4 class="text-center">
      @{{username}}</h4>
    <form class="max-w-md flex flex-col mx-auto" @submit.prevent="submit">
      <input class="mb-2" type="text" v-model="displayName" placeholder="Display Name" />
      <input class="mb-2" type="password" v-model="oldpassword" placeholder="Old Password*" />
      <input class="mb-2" type="password" v-model="password" placeholder="New Password*" />
      <input class="mb-2" type="password" v-model="repeatPassword" placeholder="Repeat Password*" />
      <input class="mb-2" type="text" v-model="avatar" placeholder="Avatar Image URL" />
      <button class="mb-2" type="submit">Log In</button>
    </form>
    <div :class="error ? 'block' : 'hidden'" class="text-red-900 text-center">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'EditProfile',
  data() {
    return {
      id: false,
      username: '',
      displayName: '',
      password: false,
      oldPassword: false,
      repeatPassword: false,
      avatar: '',
      error: false,
    }
  },
  async created() {
    this.id = this.$store.getters.getUserId

    if (this.id === false) {
      return
    }

    const profile = await this.axios.get(`http://localhost:3000/users/${this.id}`)
    const data = profile.data;

    this.username = data.name;
    this.displayName = data.displayName;
    this.avatar = data.avatar;
  },
  methods: {
    async submit() {
      try {
        const username = this.username
        const displayName = this.displayName ? this.displayName.length < 1 : username
        const password = this.password
        const repeatPassword = this.repeatPassword

        if (password.length < 6) {
          this.error = 'Password must have at least 6 characters.'

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

        await this.axios.patch(`http://localhost:3000/users/${this.id}`, {
          password: password,
          displayName: displayName,
          avatar: avatar,
        })

        this.$router.push('/profile')
      } catch(e) {
        console.error(e);
      }
    }
  }
}
</script>
