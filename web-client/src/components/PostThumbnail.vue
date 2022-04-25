<template>
    <v-card width="320px" class="ma-8">
      <!-- avatar -->
      <div class="pa-2 text-sm-left" 
        v-if="!isLoading">
        <v-avatar size="32">
          <img :src="post.createdBy.avatar.url">
        </v-avatar>
        <a class="text-overline black--text text-decoration-none" 
        :href="post.createdBy.url"> 
          {{ post.createdBy.name | truncate(20) }}
        </a>
      </div>
      <div v-else>
        <v-skeleton-loader
          :boilerplate="true"
          type="list-item-avatar"
        ></v-skeleton-loader>
      </div>
      <!-- image -->
      <div 
        v-if="!isLoading">
        <a :href="post.url">
          <v-img
            :aspect-ratio="3/4"
            height="300px"
            :src="post.images[0].url"
          ></v-img>
        </a>
      </div>
      <div v-else>
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
            :disabled="isLoading"
            @click="setLike()"
            icon
            small>
            <v-icon v-if="this.like" color="red">
              mdi-heart
            </v-icon>
            <v-icon v-else>
              mdi-heart-outline
            </v-icon>
          </v-btn>
          <v-btn 
            :disabled="isLoading" 
            small
            icon
            @click="createComment()">
            <v-icon>
              mdi-comment-outline
            </v-icon>
          </v-btn>
        </div>
        <!-- attributes -->
        <div class="text-sm-left" v-if="!isLoading">
          <v-card-text class="pa-1">
            {{post.likes}} likes
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
export default Vue.extend({
  name: "PostThumbnail",
  props: ["post"],
  data: () => ({
    like: false,
  }),
  mounted () {
    this.like = this.post.liked;
  },
  methods: {
    setLike: async function () {
      this.like = !this.like;
      // await this.$store.dispatch("setLikeOnPost", { post_id: this.post.id, like: this.like });
    },
    createComment: async function () {
      console.log("to be implemented");
    },
  },
  computed: {
    isLoading: function () {
      return !this.post;
    },
  }
});
</script>