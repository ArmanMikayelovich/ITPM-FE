import * as React from "react";
import {GITHUB_AUTH, GOOGLE_AUTH} from "../constants/consts";
import {UserInfo} from "../user/UserInfo";


export class Login extends React.Component {
    render() {


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
}