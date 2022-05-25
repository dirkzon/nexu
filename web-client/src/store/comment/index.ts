import { Module } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { CommentState } from "./types";

const initialState: CommentState = {
    canComment: false,
    comments: [{
        comment: '',
        createdAt: new Date(),
        createdBy: {
            name: "",
            id: ``,
        }
    }]
};

export const CommentModule: Module<CommentState, any> = {
    state: initialState,
    actions,
    mutations,
    getters,
};
