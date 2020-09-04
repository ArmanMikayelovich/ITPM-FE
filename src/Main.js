import React from "react";
import {Route, Switch} from 'react-router-dom'
import {Login} from "./login/Login";
import {Home} from "./Home";
import {BrowseProjects} from "./project/Projects";
import {ProjectPage} from "./project/ProjectPage";
import {TaskPage} from "./task/TaskPage";
import {UserPage} from "./user/UserPage";

export function Main() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/browse' component={BrowseProjects}/>
                <Route path="/project" component={ProjectPage}/>
                <Route path="/task" component={TaskPage}/>
                <Route path="/user" component={UserPage}/>
            </Switch>
        </div>
    )
}