import { GetterTree } from "vuex";
import { CommentState } from "./types";

export const getters: GetterTree<CommentState, any> = {
    getcomments(state) {
        return state.comments;
      },
}