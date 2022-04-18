import { ActionTree } from "vuex";
import { UserState } from "./types";
import axios from "axios";

export const actions: ActionTree<UserState, any> = {
    async Authorize(state, {user, pass}): Promise<any> {
        await axios({
            url: 'http://localhost:5000/graphql',
            method: 'post',
            data: {
                query: `
                    mutation {
                        login(user: "${user}", password:"${pass}"){
                            tokenType,
                            accessToken,
                        }
                    }
                    `
            }
            }).then((result) => {
                if (result.data.errors) {
                    throw new Error(result.data.errors[0].message);
                }
                state.commit("SET_AUTH", result.data.data.login);
            }).catch((err) => {
                console.log(err);
                throw err;
            });
    }
}