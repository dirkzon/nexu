import { ActionTree } from "vuex";
import { UserState } from "./types";
import axios from "axios";

export const actions: ActionTree<UserState, any> = {
    async Authorize(state, {user, pass}): Promise<any> {
        const scope = ["get:self", "get:other-users"]
        await axios({
            url: 'http://localhost:5000/graphql',
            method: 'post',
            data: {
                query: `
                    mutation {
                        login(
                            user: "${user}", 
                            password:"${pass}",
                            scope: "${scope}"
                            ){
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
                console.log(result.data.data.login)
                state.commit("SET_AUTH", result.data.data.login.accessToken);
            }).catch((err) => {
                console.log(err);
                throw err;
            });
    },

    async Register(state, {user_name, email, password, bio}): Promise<any> {
        await axios({
            url: 'http://localhost:5000/graphql',
            method: 'post',
            data: {
                query: `
                    mutation {
                        CreateUser(new_user: {name:"${user_name}", password:"${password}", email:"${email}", bio:"${bio}"}){
                            createdAt,
                        }
                    }
                    `
            }
        }).then((result) => {
            console.log(result);
            if (result.data.errors) {
                throw new Error(result.data.errors[0].message);
            }
        }).catch((err) => {
            console.log(err);
            throw err;
        });
    },

    async GetSelf(state): Promise<any> {
        console.log("yeet")
    },
}