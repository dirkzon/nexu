<template>
  <v-card class="d-flex flex-column pa-5 ma-15" width="500px">
    <v-card-title> Login </v-card-title>
    <v-text-field
      class="ma-3"
      label="Username or Email"
      :rules="rules"
      hide-details="auto"
      ><v-icon slot="prepend"> mdi-account-circle </v-icon></v-text-field
    >
    <v-text-field
      class="ma-3"
      label="Password"
      :rules="rules"
      type="password"
      hide-details="auto"
      ><v-icon slot="prepend"> mdi-lastpass </v-icon></v-text-field
    >
    <v-row class="ma-2">
      <v-col>
        <v-btn elevation="2" color="primary"> Login </v-btn>
      </v-col>
      <v-col>
        <v-btn elevation="2" color="accent" @click="register()"
          >Register
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "LogIn",
  data: () => ({
    rules: [(value) => !!value || "Required."],
  }),
  methods: {
    register: function () {
      this.$router.push("/register");
    },
  },
});
</script>
