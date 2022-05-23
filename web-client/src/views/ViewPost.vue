<template>
  <v-container>
    <v-card class="d-flex pa-10 ma-15">
      <v-card width="400px" flat class="ma-5">
        <v-carousel 
        hide-delimiters
        :continuous="false"
        height="auto"
        >
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
       <v-card class="pa-5 ma-5">
         <user-card v-bind:user="post.createdBy"> </user-card>
         <v-card-subtitle>
           {{post.description}}
         </v-card-subtitle>
         <v-divider></v-divider>
         <v-btn
            :disabled="loading"
            @click="setLike()"
            icon
            large>
            <v-icon v-if="like" large color="red">
              mdi-heart
            </v-icon>
            <v-icon v-else large color="accent">
              mdi-heart-outline
            </v-icon>
          </v-btn>
       </v-card>
      <v-card class="pa-5 ma-5">
        <v-card-title>
          comments:
        </v-card-title>
      </v-card>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import UserCard from "../components/UserCard.vue"

export default Vue.extend({
  name: "ViewPostPage",
  components: {
    UserCard,
  },
   data: () => ({
    like: false,
    loading: false,
  }),
  mounted: async function () {
    await this.$store.dispatch(
              "GetPostById", 
              {id: this.$route.params.id}
            );
  },
  computed: {
    post() {
        return this.$store.getters.getPostState;
    },
  },
  methods: {
    setLike: async function () {
      this.like = !this.like;
      // await this.$store.dispatch("setLikeOnPost", { post_id: this.post.id, like: this.like });
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
