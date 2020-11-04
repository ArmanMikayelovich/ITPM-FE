import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
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
import {checkIsAuthenticated} from "./rest-service/AuthService";
import {getAuthenticatedUser} from "./rest-service/UserRest";

export function Main() {
    const [isAuthenticated, setIsAuthenticated] = useState();

    useEffect(() => {
        checkIsAuthenticated().then(response => {
            if (response.status === 200) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        })
    })
    return (
        <div style={{
            padding: '25px'
        }}>
            <Switch>
                <Route exact={true} path='/'>
                    <Home/>
                </Route>
                <Route exact={true} path='/login'>
                    <Login/>
                </Route>
                <Route exact path='/browse-projects'>
                    {isAuthenticated ? <BrowseProjects/> : <Login/>}

                </Route>
                <Route exact path="/projects/:projectId">
                    {isAuthenticated ? <ProjectPage/> : <Login/>}
                </Route>

                <Route exact path="/projects/:projectId/tasks/:taskId">
                    {isAuthenticated ? <TaskPage/> : <Login/>}
                </Route>

                <Route exact path="/users/:userId">
                    {isAuthenticated ? <UserPage/> : <Login/>}
                </Route>

                <Route exact path="/projects/:projectId/tasks/:taskId/update">
                    {isAuthenticated ? <UpdateTask/> : <Login/>}
                </Route>

                <Route exact path="/projects/:projectId/tasks/:taskId/create-subtask">
                    {isAuthenticated ? <CreateSubTask/> : <Login/>}
                </Route>


                <Route exact path="/projects/:projectId/create-task">
                    {isAuthenticated ? <CreateTask/> : <Login/>}
                </Route>

                <Route exact path="/create-project">
                    {isAuthenticated ? <CreateProject/> : <Login/>}
                </Route>


                <Route exact path="/projects/:projectId/backlog" component={BackLogPage}>
                    {isAuthenticated ? <BackLogPage/> : <Login/>}
                </Route>

                <Route exact path="/search-results">
                    {isAuthenticated ? <SearchResultPage/> : <Login/>}
                </Route>

            </Switch>

        </div>
    );
}