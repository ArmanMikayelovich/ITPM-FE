import React, {useEffect, useState} from 'react'
import {HOST_ADDRESS} from "./constants/consts";
export function Home() {
    const [isFetched, setIsFetched] = useState(false);
    const [user, setUser] = useState();
    useEffect(() => {
        fetch(HOST_ADDRESS + "/users/user", {
            method: 'GET',
            credentials: "include"
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data =>  {
                    setUser(data);
                    setIsFetched(true)
                    window.localStorage.setItem("user", JSON.stringify(data));
                });
            }
        })
    },[isFetched])
    return (
        <div>
            <h1>Welcome to ITPM ;)</h1>
            {isFetched}
            {JSON.stringify(user)}
        </div>
    );
}