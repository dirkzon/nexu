import { GetterTree } from "vuex";
import { UserState } from "./types";

export const getters: GetterTree<UserState, any> = {
    getAccount(state) {
        return state.profile;
      },
}