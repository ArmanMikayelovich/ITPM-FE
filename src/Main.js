import React from "react";
import {Route, Switch} from 'react-router-dom'
import {Login} from "./login/Login";
import {Home} from "./Home";
import {ProjectsPage} from "./project/Projects";
import {ProjectPage} from "./project/ProjectPage";

export function Main() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/browse' component={ProjectsPage}/>
                <Route path="/project" component={ProjectPage}/>
            </Switch>
        </div>
    )
}