import { Module } from "vuex";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { UserState } from "./types";

const initialState: UserState = {
    profile: {
        name: "",
        image: ""
    }
};

export const UserModule: Module<UserState, any> = {
    state: initialState,
    actions,
    mutations,
};