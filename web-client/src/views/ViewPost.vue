<template>
  <v-container>
    <v-card class="d-flex pa-10 ma-15">
      <v-card width="500px" flat class="ma-5">
        <v-carousel 
        hide-delimiters
        :continuous="false"
        height="auto">
          <v-carousel-item
            v-for="(image,i) in post.images"
            :key="i">
              <v-img 
                @load="setLoading"
                :src="image.url">            
              </v-img>
          </v-carousel-item>
        </v-carousel>
      </v-card>
       <v-card class="pa-5 ma-5" height="250px">
         <user-card v-bind:user="post.createdBy"> </user-card>
         <v-card-subtitle>
           {{post.description}}
         </v-card-subtitle>
         <v-divider></v-divider>
         <v-card-text v-if="post.totalLikes === 1">
           {{post.totalLikes}} like
         </v-card-text>
         <v-card-text v-else>
           {{post.totalLikes}} likes
         </v-card-text>
         <v-btn
            :disabled="loading"
            @click="setLike()"
            icon
            large>
            <v-icon v-if="post.liked" large color="red">
              mdi-heart
            </v-icon>
            <v-icon v-else large color="accent">
              mdi-heart-outline
            </v-icon>
          </v-btn>
       </v-card>
      <v-card class="pa-5 ma-5">
        <write-comment :can_comment="true" :post_id="post.id"></write-comment>
        <v-card style="overflow-y: scroll;" height="500px" flat>
          <v-card v-for="c in comments" :key="c.id" flat>
            <user-comment :userComment="c"></user-comment>
            <v-divider></v-divider>
          </v-card>
        </v-card>
      </v-card>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import UserCard from "../components/UserCard.vue";
import WriteComment from "../components/WriteComment.vue";
import UserComment from "../components/UserComment.vue";

export default Vue.extend({
  name: "ViewPostPage",
  components: {
    UserCard,
    WriteComment,
    UserComment,
  },
   data: () => ({
    loading: false,
  }),
  mounted: async function () {
        await this.$store.dispatch(
      "GetCommentsForPost", 
      {post_id: this.$route.params.id}
    );
    await this.$store.dispatch(
              "GetPostById", 
              {id: this.$route.params.id}
            );
  },
  computed: {
    post() {
      return this.$store.getters.getPostState;
    },
    comments() {
      return this.$store.getters.getcomments;
    }
  },
  methods: {
    setLike: async function () {
      await this.$store.dispatch("setLikeOnPost", { post_id: this.post.id });
    },
    createComment: async function () {
      console.log("to be implemented");
    },
    setLoading: function() {
      this.loading = false;
    }
  },
});
</script>
