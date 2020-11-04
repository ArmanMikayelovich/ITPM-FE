import {HOST_ADDRESS} from "../constants/consts";

export async function getAuthenticatedUser() {
    let response = await fetch(HOST_ADDRESS + '/users/user', {
        method: 'GET',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'

        }
    });
    return await response.json();
}