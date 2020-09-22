import React from "react";
import {Route, Switch} from 'react-router-dom'
import {Login} from "./login/Login";
import {Home} from "./Home";
import {BrowseProjects} from "./project/Projects";
import {ProjectPage} from "./project/ProjectPage";
import {TaskPage} from "./task/TaskPage";
import {UserPage} from "./user/UserPage";
import {UpdateTask} from "./task/UpdateTask";
import {CreateTask} from "./task/CreateTask";
import {CreateProject} from "./project/CreateProject";
import {BackLogPage} from "./project/Backlog/BackLogPage";

export function Main() {
    let flag = false;

    return (
        <div>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/browse' component={BrowseProjects}/>
                <Route path="/project" component={ProjectPage}/>
                <Route path="/task" component={TaskPage}/>
                <Route path="/user" component={UserPage}/>
                <Route path="/update-task" component={UpdateTask}/>
                <Route path="/create-task" component={CreateTask}/>
                <Route path="/create-project" component={CreateProject}/>
                <Route path="/backlog" component={BackLogPage}/>
            </Switch>
        </div>
    )
}