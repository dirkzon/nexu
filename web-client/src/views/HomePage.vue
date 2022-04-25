<template>
  <v-container>
    <v-row align="center" class="align-center justify-center">
      <post-thumbnail v-bind:post="mock_post"> </post-thumbnail>
      <post-thumbnail v-bind:post="mock_post2"> </post-thumbnail>
      <post-thumbnail v-bind:post="mock_post"> </post-thumbnail>
      <post-thumbnail v-bind:post="mock_post2"> </post-thumbnail>
      <post-thumbnail v-bind:post="mock_post2"> </post-thumbnail>
      <post-thumbnail> </post-thumbnail>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import PostThumbnail from "../components/PostThumbnail.vue";

export default Vue.extend(
  {
  components: { 
    PostThumbnail,
  },
  name: "HomePage",
  data: () => {
    return {
      mock_post: {
        images: [
          {
            url: "https://4.bp.blogspot.com/-tsGDGlr87iY/T7A0g_AGs_I/AAAAAAAACgI/PTUgmoFOGXQ/s1600/Toco+toucan+Ramphastos+toco.jpg",
          },
          {
            url: "https://niagara.ca/wp-content/uploads/2014/01/Bird-Kingdom-Niagara-Falls-Macaw-Parrots.jpg",
          }
        ],
        createdBy: {
          url:"https://git.fhict.nl/I438220/nexu",
          name:"peter",
          id: "1234",
          avatar: {
            url: "https://trendsinusa.com/wp-content/uploads/2018/01/Miniclip-8-Ball-Pool-Avatar-16.png"
          }
        },
        likes: 283,
        liked: true,
        url: "https://git.fhict.nl/I438220/nexu",
      },
      mock_post2: {
        images: [
          {
            url: "https://niagara.ca/wp-content/uploads/2014/01/Bird-Kingdom-Niagara-Falls-Macaw-Parrots.jpg",
          },
          {
            url: "https://4.bp.blogspot.com/-tsGDGlr87iY/T7A0g_AGs_I/AAAAAAAACgI/PTUgmoFOGXQ/s1600/Toco+toucan+Ramphastos+toco.jpg",
          }
        ],
        createdBy: {
          url:"https://git.fhict.nl/I438220/nexu",
          name:"Henk",
          id: "1234",
          avatar: {
            url: "https://www.sarkarinaukrisearch.in/wp-content/uploads/2019/08/Whatsapp-DP-Profile-Images-72.jpg"
          }
        },
        likes: 58,
        liked: false,
        url: "https://git.fhict.nl/I438220/nexu",
      }
    }
  },
});
</script>
