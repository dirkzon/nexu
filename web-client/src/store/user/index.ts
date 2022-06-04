import { Module } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { UserState } from "./types";

const initialState: UserState = {
    profile: {
        name: "",
        image: {
            id: '',
            url: "",
        },
        bio: "",
        email: "",
    }
};

export const UserModule: Module<UserState, any> = {
    state: initialState,
    actions,
    mutations,
    getters,
};
