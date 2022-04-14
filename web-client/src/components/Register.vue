<template>
  <v-card class="d-flex flex-column pa-5 ma-15" width="500px">
    <v-card-title> Register </v-card-title>
    <v-text-field
      class="ma-3"
      label="Username"
      :rules="name_rules"
      hide-details="auto"
      ><v-icon slot="prepend"> mdi-account-circle </v-icon></v-text-field
    >
    <v-text-field
      class="ma-3"
      label="Email"
      :rules="mail_rules"
      hide-details="auto"
      ><v-icon slot="prepend"> mdi-at </v-icon></v-text-field
    >
    <v-text-field
      class="ma-3"
      label="Password"
      :rules="password_rules"
      type="password"
      hide-details="auto"
      ><v-icon slot="prepend"> mdi-lastpass </v-icon></v-text-field
    >
    <v-textarea
      class="ma-3"
      label="bio"
      :rules="bio_rules"
      hide-details="auto"
      rows="2"
      ><v-icon slot="prepend"> mdi-account-details </v-icon></v-textarea
    >
    <v-row class="ma-2">
      <v-col>
        <v-btn elevation="2" color="primary"> Regsiter </v-btn>
      </v-col>
      <v-col>
        <v-btn elevation="2" color="accent"> Login </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data: () => ({
    name_rules: [
      (value) => !!value || "Name is required",
      (value) => value.length > 2 || "Name must be longer than 2 characters",
      (value) => value.length < 20 || "Name must be shorter than 20 characters",
    ],
    mail_rules: [
      (value) => !!value || "Email is required",
      (value) =>
        !value ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "E-mail must be valid",
    ],
    password_rules: [
      (value) => !!value || "Password is required",
      (value) =>
        !value ||
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
          value
        ) ||
        "Min. 8 characters with at least one capital letter, a number and a special character.",
    ],
    bio_rules: [
      (value) => value.length < 60 || "Name must be shorter than 60 characters",
    ],
  }),
});
</script>
