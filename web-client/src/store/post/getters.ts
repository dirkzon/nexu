import { GetterTree } from "vuex";
import { PostState } from "./types";

export const getters: GetterTree<PostState, any> = {
    getPostState(state) {
        return state;
      },
}