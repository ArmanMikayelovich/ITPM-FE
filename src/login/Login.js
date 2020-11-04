import * as React from "react";
import {useEffect} from "react";
import {GITHUB_AUTH, GOOGLE_AUTH} from "../constants/consts";
import {UserInfo} from "../user/UserInfo";
import {checkIsAuthenticated} from "../rest-service/AuthService";
import {getAuthenticatedUser} from "../rest-service/UserRest";
import {useHistory} from "react-router";


export function Login() {
    const history = useHistory();
    useEffect(() => {
        checkIsAuthenticated().then(response => {
            if (response.status === 200) {
                getAuthenticatedUser().then(user => {
                                      localStorage.setItem('user', JSON.stringify(user));
                    history.push('/');
                    window.location.reload(false);

                });

            }
        })
    }, [history])

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