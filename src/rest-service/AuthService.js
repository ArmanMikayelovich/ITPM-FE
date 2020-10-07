import {HOST_ADDRESS} from "../constants/consts";

export async function checkIsAuthenticated() {
    return await fetch(HOST_ADDRESS + "/users/user", {
        method: 'GET',
        credentials: "include"
    });

}