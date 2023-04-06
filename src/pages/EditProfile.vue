<template>
  <div class="edit-profile">
    <h1>Edit Profile</h1>
    <h4 class="text-center">
      @{{username}}</h4>
    <form class="max-w-md flex flex-col mx-auto" @submit.prevent="submit">
      <input class="mb-2" type="text" v-model="displayName" placeholder="Display Name" />
      <input class="mb-2" type="password" v-model="oldPassword" placeholder="Old Password*" />
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
      password: '',
      oldPassword: '',
      repeatPassword: '',
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
        const oldPassword = this.oldPassword
        const newPassword = this.password && this.password.length > 0 ? this.password : false
        const repeatPassword = this.repeatPassword

        if (newPassword && newPassword.length < 6) {
          this.error = 'Password must have at least 6 characters.'

          return;
        }
        if (newPassword !== repeatPassword) {
          this.error = 'New passwords don\'t match.'
        }

        const avatar = this.avatar.length > 0 ? this.avatar : null
        const updatedUser = {
          displayName: displayName,
          avatar: avatar,
        }

        if ( newPassword ) {
          const profile = await this.axios.get(`http://localhost:3000/users/${this.id}`)

          if ( profile.data.password !== oldPassword ) {
            this.error = 'Please input a valid old password.'

            return
          }

          updatedUser['password'] = newPassword;
        }

        this.error = false

        await this.axios.patch(`http://localhost:3000/users/${this.id}`, updatedUser)

        this.$router.push('/profile')
      } catch(e) {
        console.error(e);
      }
    }
  }
}
</script>
