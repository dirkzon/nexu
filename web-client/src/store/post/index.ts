import { Module } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { PostState } from "./types";


const initialState: PostState = {
    id: "",
    liked: false,
    totalLikes: 0,
    createdAt: new Date(),
    createdBy: {
        name: "",
        avatar: {
            url: "",
            height: 0,
            width: 0
        }
    },
    description: "",
    images: [{
        url: "",
        height: 0,
        width: 0
    }]
};

export const PostModule: Module<PostState, any> = {
    state: initialState,
    actions,
    mutations,
    getters,
};
