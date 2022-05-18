import { ActionTree } from "vuex";
import { PostState } from "./types";
import axios from "axios";
import Vue from "vue";

export const actions: ActionTree<PostState, any> = {
    async CreatePost(state, {description, images}): Promise<any> {
        const token = Vue.$cookies.get("access_token");
        return await new Promise((resolve, reject) => {
            axios({
                url: 'http://localhost:5000/graphql',
                headers:{
                    "user": token,
                },
                method: 'post',
                data: {
                    query: `
                        mutation {
                            CreatePost(new_post: {description:"${description}"}){
                                id,
                            }
                        }
                        `
                }
            }).then(async (result) => {
                if (result.data.errors) {
                    throw new Error(result.data.errors[0].message);
                }
                const id = result.data.data.CreatePost.id;
                console.log(id);

                const formData = new FormData();
                Array.from(images).forEach(im => {
                    formData.append('files', im as any);
                });
                await axios({
                    url:`http://localhost:1000/images/upload-image/${id}`,
                    method:'post',
                    data: formData,
                    headers:{
                        "user": token,
                    },
                })
                .then((res) => {
                    resolve(id);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    },
}