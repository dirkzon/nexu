<template>
  <v-app>
    <v-app-bar app color="primary" class="align-start">
      <div class="align-start" width="min-content">
        <v-img
          :src="require('./assets/nexu_logo_with_name.svg')"
          contain
          height="70"
          transition="scale-transition"
          alt="Nexu logo"
          @click="home"
        />
      </div>
      <user-search></user-search>
      <account-menu></account-menu>
    </v-app-bar>
    <v-main>
      <router-view align="center" />
    </v-main>
  </v-app>
</template>

<script>
import AccountMenu from "./components/AccountMenu.vue"
import UserSearch from "./components/UserSearch.vue"
export default {
  name: "App",
  components: {
    AccountMenu,
    UserSearch,
  },
  mounted () {
    if(!this.$cookies.get("access_token")) {
      this.$router.push("/login");
    }
  },
  methods: {
    home: function() {
      this.$router.push({name: "home"})
    },
  }
};
</script>
