import React from "react";
import {Route, Switch} from 'react-router-dom'
import {Login} from "./login/Login";
import {Home} from "./Home";
import {ProjectsPage} from "./project/Projects";
import {SprintPage} from "./sprint/Sprints";
import {TasksPage} from "./task/Tasks";
import {CommentsPage} from "./comment/Comments";

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