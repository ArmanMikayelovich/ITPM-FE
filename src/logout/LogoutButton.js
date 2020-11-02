import {HOST_ADDRESS} from "../constants/consts";
import React from "react";
import Button from "@material-ui/core/Button";

export function LogOutButton() {
    const logout = () => {
        fetch(HOST_ADDRESS + '/logout',
            {
                method: "POST",
                credentials: "include",
                mode: 'cors',
                headers: {
                //     'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : "*",
                //     'Access-Control-Allow-Credentials': 'true'
                //
                },
            }).then(response => {
                alert(response.status)
            if (response.status === 302 || response.status === 200) {
                window.localStorage.removeItem("user");
                window.location.reload(false);
            }
        }).catch(response => {
            console.log(response);
        })
    }

    return (
        <div>
            <Button variant={'contained'} color={'secondary'} onClick={logout}>Log out</Button>
        </div>
    );
}