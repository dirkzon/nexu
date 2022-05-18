<template>
  <v-container>
    <v-card class="d-flex flex-column pa-5 ma-15" width="500px">
    <v-form v-model="formValid">
        <v-card-title> create your post </v-card-title>
        <v-textarea
        class="ma-5"
        label="write your bio"
        :rules="description_rules"
        hide-details="auto"
        rows="2"
        v-model="description"
        ><v-icon slot="prepend"> mdi-image-text </v-icon></v-textarea
        >
        <v-file-input
            class="ma-5"
            v-model="images"
            multiple
            outlined
            placeholder="Select your files"
            truncate-length="15"
            prepend-icon="mdi-file-image-plus"
            accept="image/png, image/jpeg, image/bmp"
            @change="update_images"
            :rules="file_rules"
        >
            <template v-slot:selection="{ index, text }">
                <v-chip
                    v-if="index < 2"
                    color="secondary"
                    dark
                    label
                    small>
                    {{index}}, {{ text }}
                </v-chip>
            </template>
        </v-file-input>

        <v-row>
            <v-col v-for="(image, index) in urls" :key="index">
                <v-img 
                    class="ma-5"
                    :src="image" 
                    width="250px" 
                    :aspect-ratio="3/4"
                >            
                    <v-btn 
                        small color="accent" 
                        v-if="images.length > 0"
                        @click="dicardImage(index)"
                        >discard image
                    </v-btn>
                </v-img>
            </v-col>
        </v-row>

        <v-btn 
            elevation="2" 
            color="primary" 
            @click="createPost()" 
            :disabled="!formValid"
            :loading="uploading"
            >Create Post
        </v-btn>
        <v-card-subtitle class="error--text"> {{error}} </v-card-subtitle>
    </v-form>
  </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CreatePostPage",
    data: () => ({
        formValid: false,
        description: "",
        description_rules: [
            (value: any) => value.length < 60 || "description must be shorter than 60 characters",
            (value: any) => value.length > 5 || "description must be greater than 5 characters",
        ],
        file_rules: [
            (value: any) => value.length > 0 || "Must upload at least a single image",
            (value: any) => value.length < 4 || "Cannot upload more than 3 images",
        ],
        images: [],
        error: "",
        urls: [''],
        uploading: false,
    }),
    methods:{
        createPost: async function () {
            this.uploading = true;
          await this.$store.dispatch(
              "CreatePost", 
              {description: this.description, images: this.images}
            ).then((res) => {
                this.uploading = false;
                this.$router.push({name: "viewPost", params: { id: res }})
            })        
            .catch((err) => {
                this.uploading = false;
                this.error = err.message.split("Unexpected error value: ").pop();
            });
        },
        update_images: function () {
            this.urls = [];
            this.images.forEach((i) => {
                this.urls.push(URL.createObjectURL(i));
            });
        },
        dicardImage: function (index: number) {
            this.images.splice(index, 1);
            this.update_images();
        },
    }
});
</script>
