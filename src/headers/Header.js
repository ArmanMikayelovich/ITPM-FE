import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {onLinkClickAction} from "../confirm/onClickAction";
import {SearchBarComponent} from "../search/SearchBarComponent";
import {HOST_ADDRESS} from "../constants/consts";
import {LogOutButton} from "../logout/LogoutButton";

export function Header() {

    const [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(() => {
        fetch(HOST_ADDRESS + "/users/user",{
            method: "GET",
            credentials: "include",
        }).then(response => {
            if (response.status === 200) {
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false);
            }
        })
    })
    return (
        <header>
            <nav>

                   <Link onClick={e => onLinkClickAction(e) } to={ {pathname: '/'}}>Home</Link>&nbsp;&nbsp;&nbsp;
                    <Link onClick={e => onLinkClickAction(e) } to={ {pathname: '/login'}}>Log in</Link>&nbsp;&nbsp;&nbsp;
                   <Link onClick={e => onLinkClickAction(e) } to={ {pathname: '/browse-projects'}}> Browse projects</Link>&nbsp;&nbsp;&nbsp;
                {isAuthorized && <LogOutButton style={{float: "right"}} />}
            </nav>
            <SearchBarComponent />
        </header>
    )
}

