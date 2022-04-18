<template>
  <v-card class="d-flex flex-column pa-5 ma-15" width="500px">
    <v-form v-model="formValid">
      <v-card-title> Login </v-card-title>
      <v-text-field
        class="ma-3"
        label="Username or Email"
        :rules="rules"
        hide-details="auto"
        v-model="user"
        ><v-icon slot="prepend"> mdi-account-circle </v-icon>
      </v-text-field>
      <v-text-field
        class="ma-3"
        label="Password"
        :rules="rules"
        type="password"
        hide-details="auto"
        v-model="pass"
        ><v-icon slot="prepend"> mdi-lastpass </v-icon>
      </v-text-field>

      <v-card-subtitle class="error--text"> {{error}} </v-card-subtitle>
      <v-row class="ma-2">
        <v-col>
          <v-btn elevation="2" color="primary" @click="login()" :disabled="!formValid"> Login </v-btn>
        </v-col>
        <v-col>
          <v-btn elevation="2" color="accent" @click="register()"
            >Register
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "LogIn",
  data: () => ({
    rules: [(value) => !!value || "Required."],
    formValid: false,
    pass: "",
    user: "",
    error: "",
  }),
  methods: {
    register: function () {
      this.$router.push("/register");
    },
    login: async function () {
      this.error = "";
      await this.$store.dispatch("Authorize", 
          {user: this.user, pass: this.pass}
        )
        .then(() => {
          this.$router.push("/home")
        })
        .catch((err) => {
          this.error = err.message.split("Unexpected error value: ").pop();
        });
    }
  },
});
</script>
