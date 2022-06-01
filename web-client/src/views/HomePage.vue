<template>
  <v-container>
    <v-row align="center" class="align-center justify-center">
      <div v-for="post in posts" :key="post.id">
        <post-thumbnail :post="post"> </post-thumbnail>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import PostThumbnail from "../components/PostThumbnail.vue";

export default Vue.extend(
  {
  components: { 
    PostThumbnail,
  },
  name: "HomePage",
  data: () => ({
    posts: [],
   }),
  mounted: async function () {
    await this.$store.dispatch("GetPosts").then((res) => {
      console.log(res);
      this.posts = res;
    })
  },
});
</script>
