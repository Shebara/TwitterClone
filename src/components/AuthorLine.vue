<template>
    <div>
        <span v-if="! noUserData">by
            <router-link key="user_profile" :to="`/profile/${authorId}`" class="text-left hover:text-black-70 underline text-black">
            {{ displayName }}
            <span class="italic">(@{{ name }})</span>
            <img v-show="avatar" class="small-avatar ml-auto" :src="avatar" />
            </router-link>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'TimeAuthorLine',
        props: {
            authorId: {
                required: true
            },
            noUserData: {
                required: false,
                default: false,
                type: Boolean
            },
        },
        data() {
            return {
                displayName: false,
                name: false,
                avatar: false
            }
        },
        async created() {
            if (this.noUserData || this.authorId === false) {
                return;
            }
            try {
                const res = await this.axios.get(`http://localhost:3000/users/${this.authorId}`);

                this.displayName = res.data.displayName;
                this.name = res.data.name;
                this.avatar = res.data.avatar;
            } catch(e) {
                console.error(e);
            }
        }
    }
</script>