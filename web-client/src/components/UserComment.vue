<template>
    <v-card class="ma-3 pa-3" flat width="300px">
        <a class="text-overline black--text text-decoration-none" 
        @click="routeToUser(userComment.createdBy.id)"> 
          {{ userComment.createdBy.name | truncate(20) }} 
        </a>
        <v-card-subtitle>{{userComment.comment}}</v-card-subtitle>
        <v-card-text>
            {{new Date(userComment.createdAt).getDay()}}-
            {{new Date(userComment.createdAt).getMonth()}}-
            {{new Date(userComment.createdAt).getFullYear()}} 
            {{new Date(userComment.createdAt).getHours()}}:{{new Date(userComment.createdAt).getMinutes()}}
        </v-card-text>
    </v-card>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "UserComment",
  props: ["userComment"],
  data: () => ({
        date: '',
  }),
    methods: {
        routeToUser: function (id) {
            this.$router.push({name: "user", params: { id: id }});
        }
    }
})
</script>