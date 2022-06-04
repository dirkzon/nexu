import { MutationTree } from "vuex";
import { CommentState } from "./types";

export const mutations: MutationTree<CommentState> = {
    SET_COMMENTS(state, payload) {
        state.comments = payload;
    },

    SET_CAN_COMMENT(state, payload) {
        state.canComment = payload;
    }
}