<template>

    <v-avatar @click="account">  
        <img
            alt="Avatar"
            :src="account_data.image"
            @click="account"
        >
    </v-avatar>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "AccountMenu",
  data: () => ({

  }),
  async mounted() {
      await this.$store.dispatch("GetSelf");
  },
  computed: {
    account_data() {
        return this.$store.getters.getAccount;
    },
  },
  methods: {
          account: function(){
      this.$router.push({name: "account"})
    }
  }
})
</script>