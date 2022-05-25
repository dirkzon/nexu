import Vue from "vue";
import Vuex from "vuex";
import { CommentModule } from "./comment";
import { PostModule } from "./post";
import { UserModule } from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    UserModule,
    PostModule,
    CommentModule,
  },
});
