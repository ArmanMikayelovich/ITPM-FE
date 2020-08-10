import React from "react";
import {Route, Switch } from 'react-router-dom'
import {Login} from "./login/Login";
import {Home} from "./Home";
import { ProjectsPage} from "./project/Projects";

export function Main() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/projects' component={ProjectsPage}/>

            </Switch>
        </div>
    )
}