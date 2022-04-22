<template>
    <v-card width="320px" class="ma-8">
        <div class="text-overline pa-2 text-sm-left">
        <v-avatar size="32">
          <img :src="post.createdBy.avatar.url">
        </v-avatar>
        {{post.createdBy.name}}
      </div>
      <a :href="post.url">
        <v-img
          :aspect-ratio="3/4"
          height="300px"
          :src="post.images[0].url"
        ></v-img> 
      </a>
      <!-- <v-carousel
      :continuous="false"
      hide-delimiters
      height="250"
      >
        <v-carousel-item
          v-for="(image, i) in post.images"
          :key="i"
          :src="image.url"
        >
        </v-carousel-item>
      </v-carousel> -->

      <div class="pa-2">
        <div class="text-sm-left">
          <v-btn
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
            small
            icon
            @click="createComment()">
            <v-icon>
              mdi-comment-outline
            </v-icon>
          </v-btn>
        </div>
        <div class="text-sm-left">
          <v-card-text class="pa-1">
            {{post.likes}} likes
          </v-card-text>
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
    this.like = this.post.liked
  },
  methods: {
    setLike: async function () {
      this.like = !this.like;
      console.log(this.like);
      // await this.$store.dispatch("setLikeOnPost", { post_id: this.post.id, like: this.like });
    },
    createComment: async function () {
      console.log("to be implemented");
    },
  },
});
</script>