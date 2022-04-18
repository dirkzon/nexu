import { MutationTree } from "vuex";
import { UserState } from "./types";
import Vue from "vue";

export const mutations: MutationTree<UserState> = {
    SET_AUTH(state, payload) {
        const token = `${payload.tokenType}:${payload.accessToken}`;
        Vue.$cookies.set("access_token", token);
    }
}