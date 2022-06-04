<template>
    <div>
        <div class="pa-5">   
            <v-img
            width="300px"
            :src="avatar_url.url"
            :aspect-ratio="1"
            ></v-img>
        </div>
        <v-card width="500px" class="pa-5 ma-5 d-flex flex-column">
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
        <v-card  width="500px" class="pa-5 ma-5 d-flex flex-column">
            <v-form v-model="formValid2">
                <v-file-input
                class="ma-5"
                v-model="imageobject"
                outlined
                placeholder="Select your avatar"
                truncate-length="15"
                prepend-icon="mdi-file-image-plus"
                accept="image/png, image/jpeg, image/bmp"
                @change="update_images"
                :rules="file_rules"
                >
                </v-file-input>
                <v-btn elevation="2" color="primary" :disabled="!formValid2" @click="update_avatar()"> Update account </v-btn>
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
        avatar_url: {
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
        formValid2: false,
        imageobject: Object,
        name_rules: [
            (value: string) => !!value || "Name is required",
            (value: string) => value.length > 2 || "Name must be longer than 2 characters",
            (value: string) => value.length < 20 || "Name must be shorter than 20 characters",
        ],
        bio_rules: [
            (value: string) => value.length < 60 || "Name must be shorter than 60 characters",
        ],
        file_rules: [
            (value: any) => !!value  || "Must upload at least a single image",
        ],
     }),
     mounted: async function() {
         this.user_name = this.$store.getters.getAccount.name;
         this.user_bio = this.$store.getters.getAccount.bio;
         this.email = this.$store.getters.getAccount.email;
     }, 
     methods: {
         updateAccount: async function () {
            await this.$store.dispatch("UpdateSelf", { name: this.user_name, bio: this.user_bio });

         },
        update_images: function () {
            const url = URL.createObjectURL(this.imageobject as any);
            this.$store.commit("UPDATE_AVATAR", url);
        },
        update_avatar: function () {
            this.$store.dispatch("UploadAvatar", {image: this.imageobject, image_id: this.avatar_url.id });
        },
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
