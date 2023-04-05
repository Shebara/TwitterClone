<template>
    <router-link class="post-button" v-show="display" :to="`/edit`">
        New Post
    </router-link>
</template>

<script>
    export default {
        name: 'PostButton',
        data() {
            return {
                display: true,
            }
        },
        async created() {
            if (this.$store.getters.getUserId === false) {
                this.display = false;
            }
        }
    }
</script>

<style scoped>
    .post-button {
        border-radius: 20px;
        width: 200px;
        height: 80px;
        border: 1px solid #000;
        color: #000;
        background-color: #EDEDED;
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        line-height: 80px;
        text-align: center;
    }
    .post-button:hover {
        color: #EDEDED;
        background-color: #000;
    }
</style>