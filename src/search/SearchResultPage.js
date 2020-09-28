import * as PropTypes from 'prop-types';
import React from "react";
import {UserFullNameWithLinkToPage} from "../user/UserInfo";
import {ProjectWithLinkToPage} from "../project/Projects";
import {Link, useLocation} from "react-router-dom";
import {TaskWithLinkToPage} from "../task/Tasks";

const USERS = 'users';
const PROJECTS = 'projects';
const SPRINTS = 'sprints';
const TASKS = 'tasks';

export function SearchResultPage(props) {
    const location = useLocation();
    const results = location.state;

    const users = results[USERS];
    const projects = results[PROJECTS];
    const sprints = results[SPRINTS];
    const tasks = results[TASKS];
    return (
        <div>

            <div style={CSSForDiv()}>   Users:<br/>
                {users && Array.from(users).length !== 0
                && users.map(user => <UserFullNameWithLinkToPage userId={user.userId}/>)}
            </div>


            <div style={CSSForDiv()}>  Projects:<br/>
                {projects && Array.from(projects).length !== 0
                && projects.map(project => <ProjectWithLinkToPage projectId={project.id}/>)}
            </div>


            <div style={CSSForDiv()}>
                Sprints:<br/>
                {sprints && Array.from(sprints).length !== 0
                && sprints.map(sprint => <div><Link to={`/projects/${sprint.projectId}/backlog`}>{sprint.name}</Link><br/></div>)}
            </div>



            <div style={CSSForDiv()}>   Tasks:<br/>
                {tasks && Array.from(tasks).length !== 0
                && tasks.map(task => <TaskWithLinkToPage task={task}/>)}
            </div>
        </div>
    );
}

SearchResultPage.propTypes = {
    results: PropTypes.object.isRequired
}

function CSSForDiv() {
    return {
        float: 'left',
        display: 'inline-block',
        border: '1px solid black',
        margin: '5px',
        padding: '5px',
        width: '300px',
        height:'800px',
        overflow:'scroll'
    }
}