<template>
    <v-card class="ma-3 pa-3" flat>
        <v-card-title>{{userComment.createdBy.name}}</v-card-title>
        <v-card-subtitle>{{userComment.comment}}</v-card-subtitle>
        <v-card-text small>
        {{new Date(userComment.createdAt).getDay()}}-
        {{new Date(userComment.createdAt).getMonth()}}-
        {{new Date(userComment.createdAt).getFullYear()}} 
        {{new Date(userComment.createdAt).getHours()}}:{{new Date(userComment.createdAt).getMinutes()}}</v-card-text>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "UserComment",
  props: ["userComment"],
  data: () => ({
      date: '',
  }),

})
</script>