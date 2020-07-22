import React from "react";
import {Route, Switch } from 'react-router-dom'
import {RegisterForm} from "./RegisterForm";
import {Home} from "./Home";

export function Main() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/registration' component={RegisterForm}/>

            </Switch>
        </div>
    )
}