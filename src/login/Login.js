import * as React from "react";
import {useEffect, useState} from "react";
import {GITHUB_AUTH, GOOGLE_AUTH} from "../constants/consts";
import {UserInfo} from "../user/UserInfo";
import {checkIsAuthenticated} from "../rest-service/AuthService";
import {getAuthenticatedUser} from "../rest-service/UserRest";
import {Redirect, useHistory} from "react-router";


export function Login() {
    const history = useHistory();
    const [isLoggedId, setIsLoggedIn] = useState(false);


    useEffect(() => {
        checkIsAuthenticated().then(response => {
            if (response.status === 200) {
                getAuthenticatedUser().then(user => {
                                      localStorage.setItem('user', JSON.stringify(user));
                    setIsLoggedIn(true);
                });

            }
        },[isLoggedId])
    }, [isLoggedId]);
    if (isLoggedId) {
        return <Redirect to="/"/>
    }
    return (
        <div className="login-container">
            <div className="title">
                <a href={GOOGLE_AUTH}>
                    <img src={"https://logo.clearbit.com/google.com"} alt={"Log in with Google"}/>
                </a>
                <a href={GITHUB_AUTH}>
                    <img src={"https://logo.clearbit.com/github.com"} alt={"Log in with Github"}/>
                </a>

                <UserInfo/>
            </div>

        </div>
    );
}