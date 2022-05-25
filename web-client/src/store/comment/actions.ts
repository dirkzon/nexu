import { ActionTree } from "vuex";
import { CommentState } from "./types";
import axios from "axios";
import Vue from "vue";

export const actions: ActionTree<CommentState, any> = {
   async PostComment(state, {comment, post_id}): Promise<any> {
    const token = Vue.$cookies.get("access_token");
       await axios({
        url: 'http://localhost:5000/graphql',
        method: 'post',
        headers:{
            "user": token
        },
        data: {
            query: `
                mutation {
                    CreateComment(new_comment: {comment:"${comment}", post_id: "${post_id}"}) {
                        comment,
                        postId,
                    }
            }
            `   
        }
       })
       .then((result) => {
        console.log(result)
        if (result.data.errors) {
            throw new Error(result.data.errors[0].message);
        }
    }).catch((err) => {
        console.log(err);
        throw err;
    });
   },

    async GetCommentsForPost(state, {post_id}): Promise<any> {
        console.log('asdfdasfdsafdsafsafsdaf', post_id);
        const token = Vue.$cookies.get("access_token");
        await axios({
            url: 'http://localhost:5000/graphql',
            method: 'post',
            headers:{
                "user": token
            },
            data: {
                query: `
                query {
                    getCommentByPostId(post_id:"${post_id}"){
                      comment,
                      createdAt,
                      createdBy {
                        name,
                        id,
                      }
                    }
                  }
                `   
            }
           })
           .then((result) => {
               console.log(result)
            if (result.data.errors) {
                throw new Error(result.data.errors[0].message);
            }
            state.commit("SET_COMMENTS", result.data.data.getCommentByPostId)
        }).catch((err) => {
            console.log(err);
            throw err;
        });
   }
}