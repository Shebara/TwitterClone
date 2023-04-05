<template>
  <div class="comment-section mb-4">
    <div v-show="replies.length > 0" class="comments mt-4 mb-4 text-sm">
      <div v-for="reply of replies" :key="reply.id">
        {{ reply.content }}
        <br>
        Posted on {{ reply.datePosted | moment("calendar") }}
        <AuthorLine :authorId="reply.authorId" />
        <a class="cursor-pointer" v-show="myId == reply.authorId" @click="deleteComment(reply.id)">Delete</a>
      </div>
    </div>
    <div class="comment mt-4 mb-4">
      <form class="max-w-md flex flex-col" @submit.prevent="postComment">
        <textarea v-model="comment" placeholder="Write the Comment Here"></textarea>
        <button class="mb-2" type="submit">Post</button>
      </form>
      <div :class="error ? 'block' : 'hidden'" class="text-red-900">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import AuthorLine from '../components/AuthorLine.vue'

export default {
    name: 'CommentSection',
    components: {
        AuthorLine
    },
    props: {
        postId: {
            required: true
        },
        myId: {
            required: true,
        }
    },
    data() {
        return {
            comment: '',
            error: false,
            replies: [],
            key: 0
        }
    },
    async created() {
        try {
            if (this.postId === false) {
                return;
            }

            const comment_res = await this.axios.get(`http://localhost:3000/comments?postId=${this.postId}`);
            this.replies = comment_res.data;
        } catch(e) {
            console.error(e);

            this.$router.link('/posts');
        }
        },
        methods: {
        async deleteComment(id) {
            try {
                await this.axios.delete(`http://localhost:3000/comments/${id}`);

                this.replies = this.replies.filter((reply) => {
                    return reply.id !== id;
                });
            } catch (e) {
                console.error(e);
            }
        },
        async postComment() {
            try {
                const date = this.$moment().toISOString()
                const content = this.comment

                if (! content || content.length < 1) {
                    this.error = 'The comment cannot be empty.'

                    return
                }

                this.error = false

                const newComment = await this.axios.post(`http://localhost:3000/comments`, {
                    content: content,
                    authorId: this.myId,
                    postId: this.postId,
                    datePublished: date
                });

                this.replies.push(newComment.data);
                this.comment = '';

                this.$forceUpdate();
            } catch(e) {
                console.error(e);
            }
        }
    }
}
</script>