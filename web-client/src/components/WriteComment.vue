<template>
    <v-card class="pa-2" :disabled="!can_comment" flat>
        <v-form v-model="formValid">
            <v-textarea
                class="ma-3"
                label="write your own comment"
                :rules="comment_rules"
                hide-details="auto"
                rows="2"
                v-model="comment"
                >
                <v-icon slot="prepend"> mdi-comment-text </v-icon>
            </v-textarea>
            <v-btn elevation="2" color="primary" :disabled="!formValid" @click="createComment()" small> Post comment </v-btn>
        </v-form>
    </v-card>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "WriteComment",
  props: ["post_id", "can_comment"],
  data: () => ({
      formValid: false,
      comment: '',
      comment_rules: [
        (value) => value.length < 60 || "Comment must be shorter than 60 characters",
        (value) => value.length > 4 || "Comment must be longer than 4 characters",
    ],
  }),
  methods: {
      createComment: async function() {
          await this.$store.dispatch("PostComment", 
          {
            comment: this.comment,
            post_id: this.post_id,
          }
        ) 
        await this.$store.dispatch(
            "GetCommentsForPost", 
            {post_id: this.post_id}
        )
        this.comment = '';
      },
  }
})
</script>