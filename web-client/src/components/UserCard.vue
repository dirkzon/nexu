<template>
    <div>
        <v-avatar size="32">
          <img :src="user.avatar.url">
        </v-avatar>
        <a class="text-overline black--text text-decoration-none" 
        :href="user.url"> 
          {{ user.name | truncate(20) }} 
        </a>
    </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "UserCard",
  props: ["user"]
});
</script>