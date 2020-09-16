import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router";
import {getUserId, UserFullName, UserFullNameWithLinkToPage} from "../user/UserInfo";
import {
    HOST_ADDRESS,
    LIST_DONE,
    LIST_IN_PROGRESS,
    LIST_TODO,
    TASK_DONE,
    TASK_IN_PROGRESS,
    TASK_TODO
} from "../constants/consts";
import {TaskList} from "../task/Tasks";
import {UpdateProjectForm} from "./Projects";
import {ProjectVersionsTable} from "./ProjectVersionsTable";
import {CreateTask} from "../task/CreateTask";
import {Link} from "react-router-dom";
import {AddVersionToProject} from "./AddProjectVersion";
import {UpdateProjectVersions} from "./UpdateProjectVersions";

export function ProjectPage() {

    const location = useLocation()

    const [project, setProject] = useState(location.project);
    const updatePage = (id) => {
        fetch(HOST_ADDRESS + '/projects/by-id/' + id, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {
                if (response.status === 200) {
                    let json = response.json();
                    json.then(data => setProject(data));
                } else {
                    console.log("An error occurred on updating project page.")
                }
            }
        ).catch(error => console.log(`an error occurred ${error}`));
    }


    return (
        <div>

            <Link to={{
                pathname: `/create-task`,
                project: project
            }}> Create New Task.</Link>
            <br/>
            <br/>
            <Link to={{
                pathname: `/backlog`,
                project: project
            }}> BackLog Page </Link>
            <h3 style={{float: 'left'}}>{project?.name}</h3>
            <h3>Created at :{project.createdAt}</h3>
            <div style={{
                margin: '10px',
                border: '1px solid #eee',
                'boxShadow': '0 2px 2px #B22222',
                width: ' 200px',
                height: "300",
                padding: '20px'
            }}><h4>Description</h4>
                <p>{project.description}</p></div>
            <div style={{float: 'right'}}>
                <h4>{"Owner"}<UserFullNameWithLinkToPage userId={project?.creatorId}/></h4>
                <UsersInProjectList projectId={project.id}/>
                <ProjectVersionsTable project={project}/>
            </div>

            <br/>

            <Board projectId={project.id}/>
            <br/>
            {project.creatorId === getUserId().toString() &&
            <div style={{
                float: "right",
                margin: '10px',
                border: '1px solid #eee',
                'boxShadow': '0 2px 2px #B22222',
                width: ' 200px',
                padding: '20px'
            }}>
                <UpdateProjectForm updateProject={updatePage} project={project}/>
                <br/>
                <AddVersionToProject project={project} />
                <br/>
                <UpdateProjectVersions updateProject={updatePage} project={project} />
                <div style={{float: "right"}}>
                    <DeleteProject projectId={project.id}/>
                </div>
            </div>}


        </div>
    );
}

function Board(props) {
    const projectId = props.projectId;
    const [sprint, setSprint] = useState(null);

    useEffect(() => {
        fetch(HOST_ADDRESS + `/sprints/by-project/${projectId}/active`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',

            },
        }).then((response) => {

                if (response.status === 200) {
                    let json = response.json();
                    json.then(data => {
                        setSprint(data);
                    });
                }

            }
        ).catch(error => console.log(`an error occurred ${error}`));
    }, [projectId])


    if (!sprint) {
        return (
            <div><h4>You haven't started a sprint</h4></div>
        )
    }

    return (
        <div>
            <TaskList sprintId={sprint.id} taskState={TASK_TODO} listName={LIST_TODO}/>
            <TaskList sprintId={sprint.id} taskState={TASK_IN_PROGRESS} listName={LIST_IN_PROGRESS}/>
            <TaskList sprintId={sprint.id} taskState={TASK_DONE} listName={LIST_DONE}/>
        </div>
    )
}

function UsersInProjectList(props) {
    let projectId = props.projectId;

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(HOST_ADDRESS + '/users/by-project/' + projectId, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',

            },
        }).then((response) => {

                let json = response.json();
                json.then(data => {
                    let content = data.content;
                    let userList = content.map(user => <div key={user.id}>
                            <br/>
                            <UserFullNameWithLinkToPage userId={user.userId}/>
                            role: {user.role}
                        </div>
                    )

                    setUsers(userList);
                });
            }
        ).catch(error => console.log(`an error occurred ${error}`));


    }, [projectId])

    return (
        <div>

            <ul>Users in Project
                {users}
            </ul>
        </div>

    )
}


function DeleteProject(props) {

    const history = useHistory();
    const projectId = props.projectId;

    const removeProject = (projectId) => {
        fetch(HOST_ADDRESS + '/projects/' + projectId, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'

            },
        })
            .then((response) => {
                    if (response.status === 200) {
                        history.push('/browse');
                    } else {
                        console.log(`Project ${projectId} deleting: status - ${response.status}`);
                        return response;
                    }
                }
            )

            .catch(error => console.log(`an error occurred ${error}`));
    }

    return (
        <div>
            <button onClick={() => removeProject(projectId)}>Delete Project!</button>

        </div>
    );
}
