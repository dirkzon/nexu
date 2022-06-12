import { ActionTree } from "vuex";
import { PostState } from "./types";
import axios from "axios";
import Vue from "vue";
import { nexu_url } from "../constant";

export const actions: ActionTree<PostState, any> = {
    async GetPosts(state): Promise<any> {
        const token = Vue.$cookies.get("access_token");
        return await axios({
            url: nexu_url,
            headers:{
                "user": token,
            },
            method: 'post',
            data: {
                query: `
                    query {
                        GetPosts(pagination:{first: 10, from: 0}) {
                        images {
                            url
                        }
                        id,
                        createdBy {
                            id,
                            name,
                            avatar {
                            url,
                            },
                        },
                        totalLikes,
                        liked,
                        }
                    }
                    `
            }
        })
        .then((result) => {
            if (result.data.errors) {
                throw new Error(result.data.errors[0].message);
            }
            return result.data.data.GetPosts;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    async GetPostById(state, {id}): Promise<any> {
        const token = Vue.$cookies.get("access_token");
        console.log(id);
        return await new Promise((resolve, reject) => {
            axios({
                url:nexu_url,
                headers: {
                    "user": token,
                },
                method: 'post',
                data: {
                    query: `
                        query {
                            GetPostById(id: "${id}") {
                            creator
                            id
                            liked,
                            totalLikes
                            createdAt,
                            createdBy {
                                name,
                                avatar {
                                    url,
                                    height,
                                    width,
                                }
                            },
                            description
                            images {
                                url,
                                height,
                                width,
                            }
                            }
                        }
                    `
                }
            })
            .then((result) => {
                if (result.data.errors) {
                    throw new Error(result.data.errors[0].message);
                }
                state.commit('SET_POST', result.data.data.GetPostById)
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
        })
    },

    async CreatePost(state, {description, images}): Promise<any> {
        const token = Vue.$cookies.get("access_token");
        return await new Promise((resolve, reject) => {
            axios({
                url: nexu_url,
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

    async setLikeOnPost(state, { post_id }): Promise<any> {
        console.log(state.state.liked)
        const like = !state.state.liked;
        const token = Vue.$cookies.get("access_token");
        await axios({
            url: nexu_url,
            headers:{
                "user": token,
            },
            method: 'post',
            data: {
                query: `
                    mutation {
                        SetLikeOnPost(like: { like: ${like}, post_id: "${post_id}"})
                    }
                    `
            }
        })
        .then((result) => {
            console.log(result)
            if (result.data.errors) {
                throw new Error(result.data.errors[0].message);
            }
            state.commit('SET_POST_LIKES', {totalLikes: result.data.data.SetLikeOnPost, liked: like});
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    async GetPostsFromUser(state, {user_id}): Promise<any> {
        const token = Vue.$cookies.get("access_token");
            return await new Promise((resolve, reject) => {
            axios({
                url: nexu_url,
                method: 'post',
                headers:{
                    "user": token
                },
                data: {
                    query: `
                        query {
                        GetAllPostFromUser(id:"${user_id}") {
                        images {
                                url
                            }
                            id,
                            createdBy {
                                id,
                                name,
                                avatar {
                                url,
                                },
                            },
                            totalLikes,
                            liked,
                            }
                        }
                        `
                }
            }).then((result) => {
                if (result.data.errors) {
                    throw new Error(result.data.errors[0].message);
                }
                resolve(result.data.data.GetAllPostFromUser)
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    },
    
    async deletePost(state, {post_id}): Promise<any> {
        const token = Vue.$cookies.get("access_token");
        await axios({
            url: nexu_url,
            method: 'post',
            headers:{
                "user": token
            },
            data: 
        {query: 
        `
        mutation {
            deletePost(id:"${post_id}") 
            }
        `}
            
        })
        .then((result) => {
            if (result.data.errors) {
                throw new Error(result.data.errors[0].message);
            }
        }).catch((err) => {
            console.log(err);
            throw err;
        });
    }
}