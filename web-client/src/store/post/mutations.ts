import { MutationTree } from "vuex";
import { PostState } from "./types";

export const mutations: MutationTree<PostState> = {
    SET_POST(state, payload) {
        state.description = payload.description;
        state.createdAt = payload.createdAt;
        state.createdBy = payload.createdBy;
        state.images = payload.images;
        state.id = payload.id;
        state.totalLikes = payload.totalLikes;
        state.liked = payload.liked;
    },

    SET_POST_LIKES(state, payload) {
        state.totalLikes = payload.totalLikes;
        state.liked = payload.liked
    }
}