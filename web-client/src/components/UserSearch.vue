<template>
    <div>
        <v-text-field
            v-model="query"
            label="Search for users..."
            hide-details="auto"
            background-color="white"
            rounded
            dense
            solo
            type="text"
            clearable
            @input="search()"
            ><v-icon slot="append" color="accent"> mdi-account-search </v-icon>
        </v-text-field>
        <v-list v-if="results.length > 0">
            <v-list-item
            v-for="item in results"
            :key="item.id"
            >
            <v-list-item-title>
                <user-card v-bind:user="item">
                </user-card>
            </v-list-item-title>
            </v-list-item>
        </v-list>
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
                { query: this.query, pagination: { first: 8, from: 0} })
                .then((response) => {
                    this.results = response;
                    console.log(response);
                });
          } else {
              this.results = [];
          }
      }
  }
});
</script>