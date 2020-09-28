import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
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
import {CreateSubTask} from "./task/CreateSubTask";
import {SearchResultPage} from "./search/SearchResultPage";

export function Main() {

    return (
        <div style={{
            padding : '25px'
        }}>
                <Switch>
                    <Route exact={true} path='/'>
                        <Home/>
                    </Route>
                    <Route exact={true} path='/login'>
                        <Login/>
                    </Route>
                    <Route exact path='/browse-projects' component={BrowseProjects}/>
                    <Route exact path="/projects/:projectId" component={ProjectPage}/>
                    <Route exact path="/projects/:projectId/tasks/:taskId" component={TaskPage}/>
                    <Route exact path="/users/:userId" component={UserPage}/>
                    <Route exact path="/projects/:projectId/tasks/:taskId/update" component={UpdateTask}/>
                    <Route exact path="/projects/:projectId/tasks/:taskId/create-subtask" component={CreateSubTask}/>
                    <Route exact path="/projects/:projectId/create-task" component={CreateTask}/>
                    <Route exact path="/create-project" component={CreateProject}/>
                    <Route exact path="/projects/:projectId/backlog" component={BackLogPage}/>
                    <Route exact path="/search-results" component={SearchResultPage}/>
                </Switch>

        </div>
    )
}