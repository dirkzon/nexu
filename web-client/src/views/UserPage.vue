<template>
  <v-container>
    <v-card width="500px" class="ma-5 pa-4">
      <v-row>
        <v-col>
<v-avatar size="200">    
        <v-img
                  :src="user.avatar.url"
          :alt="user.name"
          >

        </v-img>    
      </v-avatar>
        </v-col>
        <v-col>
      <v-card-title>{{user.name}}</v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>{{user.bio}}</v-card-subtitle>
        </v-col>
      </v-row>
    </v-card>
    <v-row align="center" class="align-center justify-center">
      <div v-for="post in posts" :key="post.id">
        <post-thumbnail :post="post"> </post-thumbnail>
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import PostThumbnail from "../components/PostThumbnail.vue"

export default Vue.extend({
  name: "UserPage",
  components: {
    PostThumbnail,
  },
  data: () => ({
    user: Object,
    posts: [],
  }),
  mounted: async function() {
    await this.$store.dispatch("GetUserById", {id: this.$route.params.id}).then((res) => {
      this.user = res;
    })
    await this.$store.dispatch("GetPostsFromUser", {user_id: this.$route.params.id}).then((res) => {
      this.posts = res;
    })
  }
});
</script>
