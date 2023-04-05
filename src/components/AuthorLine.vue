<template>
    <div>
        <span v-if="! noUserData">by
            <router-link :to="`/profile/${authorId}`" class="text-left hover:text-black-70 underline text-black">
            {{ displayName }} <span class="italic">(@{{ name }})</span>
            </router-link>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'TimeAuthorLine',
        props: {
            authorId: {
                required: true,
                type: Number
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
                name: false
            }
        },
        async created() {
            if (this.noUserData) {
                return;
            }
            try {
                const res = await this.axios.get(`http://localhost:3000/users/${this.authorId}`);

                this.displayName = res.data.displayName;
                this.name = res.data.name;
            } catch(e) {
                console.error(e);
            }
        }
    }
</script>