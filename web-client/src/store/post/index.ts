import { Module } from "vuex";
import { actions } from "./actions";
import { PostState } from "./types";


const initialState: PostState = {
    nothing: '',
};

export const PostModule: Module<PostState, any> = {
    state: initialState,
    actions,
};
