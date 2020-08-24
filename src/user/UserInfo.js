import React, {useEffect, useState} from "react";
import {HOST_ADDRESS} from "../constants/consts";

export function UserInfo() {
    return (
        <div>
            {"User info"}
        </div>
    )
}


export function UserFullName(props) {
    const userId = props.userId;
    const [fullName, setFullName] = useState("");


    useEffect(() => {

       fetch(HOST_ADDRESS + '/users/' + userId, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {

                let json = response.json();
                json.then(data => setFullName(data.firstName + " " + data.lastName))
            }
        ).catch(error => console.log(`an error occurred ${error}`));


    },[userId]);


    return (
        <div>{fullName}</div>
    )
}