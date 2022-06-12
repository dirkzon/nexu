import { ActionTree } from "vuex";
import { CommentState } from "./types";
import axios from "axios";
import Vue from "vue";
import { nexu_url } from "../constant";

export const actions: ActionTree<CommentState, any> = {
   async PostComment(state, {comment, post_id}): Promise<any> {
    const token = Vue.$cookies.get("access_token");
       await axios({
        url: nexu_url,
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
        if (result.data.errors) {
            throw new Error(result.data.errors[0].message);
        }
        state.dispatch('CanComment', {post_id: post_id});
    }).catch((err) => {
        console.log(err);
        throw err;
    });
   },

    async GetCommentsForPost(state, {post_id}): Promise<any> {
        const token = Vue.$cookies.get("access_token");
        await axios({
            url: nexu_url,
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
   },

   async CanComment(state, {post_id}): Promise<any> {
       console.log(post_id)
    const token = Vue.$cookies.get("access_token");
        await axios({
            url: nexu_url,
            method: 'post',
            headers:{
                "user": token
            },
            data: {
                query: `
                query {
                    canComment(post_id:"${post_id}")
                }
                `   
            }
           })
           .then((result) => {
            console.log('asdfafjkdlsfhjdasklfjsdaklfjsdkla;fjsdkla;', result)
         if (result.data.errors) {
             throw new Error(result.data.errors[0].message);
         }
         state.commit("SET_CAN_COMMENT", result.data.data.canComment)
     }).catch((err) => {
         console.log(err);
         throw err;
     });
   }
}