import { MutationTree } from "vuex";
import { UserState } from "./types";
import Vue from "vue";

export const mutations: MutationTree<UserState> = {
    SET_AUTH(state, payload) {
        const token = `${payload.tokenType}:${payload.accessToken}`;
        Vue.$cookies.set("access_token", token);
    },

    SET_ACCOUNT(state, payload) {
        state.profile.image.id = payload.avatar.id;
        state.profile.image.url = payload.avatar.url;
        state.profile.name = payload.name;
        state.profile.email = payload.email;
        state.profile.bio = payload.bio;
    },

    UPDATE_AVATAR(state, payload) {
        state.profile.image.url = payload;
    }
}