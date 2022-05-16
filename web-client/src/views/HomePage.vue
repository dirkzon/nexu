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
            url: "https://nexumedia.blob.core.windows.net/nexu-image-container/ff8b0cd6-9150-4777-bc71-92126393889b?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-09-08T18:25:41Z&st=2022-05-09T10:25:41Z&spr=https,http&sig=8oStHDrwtp84snF0p0i1oDzocjjZAjiPkzYFXjwv4Iw%3D",
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
