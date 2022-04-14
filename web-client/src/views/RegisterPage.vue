<template>
  <v-container>
    <Register></Register>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Register from "../components/Register.vue";

export default Vue.extend({
  name: "RegisterPage",
  components: {
    Register,
  },
});
</script>
