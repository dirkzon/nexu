<template>
    <div>
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="query"
                    label="Search for users..."
                    hide-details="auto"
                    background-color="white"
                    dense
                    solo
                    type="text"
                    clearable
                    @input="search()"
                    v-on="on"
                    class="shrink"
                    ><v-icon slot="append" color="accent"> mdi-account-search </v-icon>
                </v-text-field>
            </template>
            <v-list v-if="results[0] === 'empty'">
                 <v-list-item>
                    <div> No users found... </div>
                </v-list-item>
            </v-list>
            <v-list v-else-if="results.length > 0">
                <v-list-item
                v-for="user in results"
                :key="user.id"
                :to="{name: 'user', params: {id: user.id}}">
                    <user-card v-bind:user="user"></user-card>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
import Vue from "vue";
import UserCard from "./UserCard.vue"

export default Vue.extend({
  name: "UserSearch",
  data() {
      return {
        query: "",
        results: [],
      }
  },
  components: {
      UserCard,
  },
  methods: {
      search: async function () {
          if(this.query !== "") {
            await this.$store.dispatch(
                "searchUsers", 
                { query: this.query, pagination: { first: 5, from: 0} })
                .then((response) => {
                    if (response.length === 0) {
                        this.results = ["empty"]
                    } else {
                        this.results = response;
                    }
                });
          } else {
              this.results = [];
          }
      },
      routeToUser: function (id) {
          this.$router.push({name: "user", params: {id: id}})
      },
  }
});
</script>