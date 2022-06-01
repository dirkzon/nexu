<template>
    <div>

        <div class="pa-5">   
            <v-img
            width="300px"
            :src="image"
            :aspect-ratio="1"
            ></v-img>
        </div>
        <v-card width="500px" class="pa-5 d-flex flex-column">
            <v-form v-model="formValid">
                <v-text-field
                    class="ma-3"
                    label="Username"
                    hide-details="auto"
                    :rules="name_rules"
                    v-model="user_name"
                    ><v-icon slot="prepend"> mdi-account-circle </v-icon>
                </v-text-field>
                <v-text-field
                    class="ma-3"
                    label="email"
                    hide-details="auto"
                    disabled
                    :value="email"
                    ><v-icon slot="prepend"> mdi-at </v-icon>
                </v-text-field>
                <v-textarea
                    class="ma-3"
                    label="bio"
                    :rules="bio_rules"
                    hide-details="auto"
                    rows="2"
                    v-model="user_bio"
                    ><v-icon slot="prepend"> mdi-account-details </v-icon>
                </v-textarea>
                <v-row class="ma-2">
                    <!-- <v-col>
                        <v-btn elevation="2" color="primary" @click="reset()"> Reset </v-btn>
                    </v-col> -->
                    <v-col>
                        <v-btn elevation="2" color="primary" :disabled="!formValid" @click="updateAccount()"> Update account </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend(
  {
    name: "HomePage",
    computed: {
        image: {
            get() {
                return this.$store.getters.getAccount.image;
            }
        },
        email: {
            get() {
                return this.$store.getters.getAccount.email;
            }
        },
        name: {
            get() {
                return this.$store.getters.getAccount.name;
            },
        },
        bio: {
            get() {
                return this.$store.getters.getAccount.bio;
            },
        }
    },
    data: () => ({
        user_name: "",
        user_bio: "",
        formValid: false,
        name_rules: [
            (value: string) => !!value || "Name is required",
            (value: string) => value.length > 2 || "Name must be longer than 2 characters",
            (value: string) => value.length < 20 || "Name must be shorter than 20 characters",
        ],
        bio_rules: [
            (value: string) => value.length < 60 || "Name must be shorter than 60 characters",
        ],
     }),
     methods: {
         updateAccount: async function () {
            await this.$store.dispatch("UpdateSelf", { name: this.user_name, bio: this.user_bio });

         }
     },
     watch: {
         bio(value) {
             this.user_bio = value;
         },
         name(value) {
             this.user_name = value;
         }
     }
  });
</script>
