<template>
    <div @click="account">
        <v-avatar size="32">
          <img :src="user.avatar.url">
        </v-avatar>
        <a class="text-overline black--text text-decoration-none" > 
          {{ user.name | truncate(20) }} 
        </a>
    </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "UserCard",
  props: ["user"],
  methods: {
    account: function(){
      this.$router.push({name: "user", params: {id: this.user.id}});
    },
  }
});
</script>