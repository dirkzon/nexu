import { MutationTree } from "vuex";
import { CommentState, UserComment } from "./types";

export const mutations: MutationTree<CommentState> = {
    SET_COMMENTS(state, payload) {
        state.comments = payload;
    }
}