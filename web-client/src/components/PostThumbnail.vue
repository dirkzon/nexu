<template>
    <v-card width="320px" class="ma-8">
      <!-- avatar -->
      <div class="pa-2 text-sm-left" 
        v-if="!loading">
        <user-card v-bind:user="post.createdBy"> </user-card>
      </div>
      <div v-else>
        <v-skeleton-loader
          :boilerplate="true"
          type="list-item-avatar"
        ></v-skeleton-loader>
      </div>
      <!-- image -->
      <div>
        <a @click="route">
          <v-img
            @load="setLoading"
            :aspect-ratio="3/4"
            :height="loading ? '0' : '300px'"
            :src="post.images[0].url"
          ></v-img>
        </a>
      </div>
      <div v-if="loading">
        <v-skeleton-loader
          type="image"
          tile
        ></v-skeleton-loader>
        <v-skeleton-loader
          height="100px"
          type="image"
          tile
        ></v-skeleton-loader>
      </div>
      <!-- actions -->
      <div class="pa-2">
        <div class="text-sm-left">
          <v-btn
            :disabled="loading"
            @click="setLike()"
            icon
            small>
            <v-icon v-if="this.liked" color="red">
              mdi-heart
            </v-icon>
            <v-icon v-else color="accent">
              mdi-heart-outline
            </v-icon>
          </v-btn>
          <v-btn 
            :disabled="loading" 
            small
            icon
            @click="createComment()">
            <v-icon color="accent">
              mdi-comment-outline
            </v-icon>
          </v-btn>
        </div>
        <!-- attributes -->
        <div class="text-sm-left" v-if="!loading">
          <v-card-text class="pa-1">
            {{post.totalLikes}} likes
          </v-card-text>
        </div>
        <div v-else>
          <v-skeleton-loader
            class="ma-0"
            height="32px"
            :boilerplate="true"
            type="list-item"
          ></v-skeleton-loader>
        </div>
      </div>
    </v-card>
</template>

<script>
import Vue from "vue";
import UserCard from "../components/UserCard.vue"

export default Vue.extend({
  name: "PostThumbnail",
  props: ["post"],
  data: () => ({
    liked: false,
    loading: true,
  }),
  components: {
    UserCard,
  },
  mounted () {
    this.liked = this.post.liked;
  },
  methods: {
    setLike: async function () {
      this.like = !this.like;
      await this.$store.dispatch("setLikeOnPost", { post_id: this.post.id });
      this.$router.push({name: "viewPost", params: { id: this.post.id }})
    },
    createComment: async function () {
      this.$router.push({name: "viewPost", params: { id: this.post.id }})
    },
    setLoading: function() {
      this.loading = false;
    },
    route: function() {
      this.$router.push({name: "viewPost", params: { id: this.post.id }})
    },
  },
});
</script>