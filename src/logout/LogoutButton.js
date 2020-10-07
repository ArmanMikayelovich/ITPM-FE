import {HOST_ADDRESS} from "../constants/consts";
import React from "react";

export function LogOutButton() {
    const logout = () => {
        fetch(HOST_ADDRESS + '/logout',
            {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                alert(response.status)
            if (response.status === 302 || response.status === 200) {
                window.location.reload(false);
            }
        })
    }

    return (
        <div>
            <button onClick={logout}>Log out</button>
        </div>
    );
}