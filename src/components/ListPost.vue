<template>
    <div class="p-4 border">
        <router-link :to="`/post/${id}`" class="text-left hover:text-black-70 underline text-black">{{ content }}</router-link>
        <div class="mt-2 text-right text-cs">Posted on {{ datePublished | moment("calendar") }} by
            <router-link :to="`/user/${authorId}`" class="text-left hover:text-black-70 underline text-black">
            {{ displayName }} <span class="italic">(@{{ name }})</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ListPost',
        props: {
            id: {
                required: true,
                type: Number
            },
            content: {
                required: true,
                type: String
            },
            authorId: {
                required: true,
                type: Number
            },
            datePublished: {
                required: true,
                type: String
            },
        },
        data() {
            return {
                displayName: false,
                name: false
            }
        },
        async created() {
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