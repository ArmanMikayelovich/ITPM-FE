import React, {useEffect, useLayoutEffect, useState} from "react";
import {HOST_ADDRESS} from "../constants/consts";
import {Link} from "react-router-dom";
import {onLinkClickAction} from "../confirm/onClickAction";

export function UserInfo() {
    return (
        <div>
            {"User info"}
        </div>
    )
}

export function UserFullNameWithLinkToPage(props) {
    const userId = props.userId;
    const [user, setUser] = useState({});


    useEffect(() => {

        fetch(HOST_ADDRESS + '/users/' + userId, {
            method: 'GET',
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {
                if (response.status === 200) {
                    let json = response.json();
                    json.then(data => setUser(data))
                } else {
                    //TODO show error notification
                }
            }
        ).catch(error => console.log(`an error occurred ${error}`));


    }, [userId]);

    return (
        <div>
            <li key={userId}><Link onClick={e => onLinkClickAction(e)} to={{
                pathname: `/users/${userId}`
            }}> <UserFullName user={user} /> </Link></li>
        </div>);

}

export function UserFullName(props) {
    const userId = props.userId;
    const [fullName, setFullName] = useState("");


    useEffect(() => {
        if (props.user) {
            setFullName(props.user.firstName + " " + props.user.lastName)
        } else {
            fetch(HOST_ADDRESS + '/users/' + userId, {
                method: 'GET',
                mode: 'cors',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            }).then((response) => {
                    if (response.status === 404) {
                        setFullName("");
                    } else {
                        let json = response.json();
                        json.then(data => setFullName(data.firstName + " " + data.lastName))
                    }
                }
            ).catch(error => console.log(`an error occurred ${error}`));
        }

    }, [userId,props.user]);


    return (
        <div>
        {fullName}
        </div>
    )
}


export function getUserId() {
    return 1;
    //TODO fix this with security
}


export async function getUserById(userId) {
    let response = await fetch(HOST_ADDRESS + '/users/' + userId, {
        method: 'GET',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });
    if (response.status === 200) {
        return await response.json();
    }
}