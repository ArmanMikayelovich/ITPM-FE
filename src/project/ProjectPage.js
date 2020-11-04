import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {getUserId, UserFullNameWithLinkToPage} from "../user/UserInfo";
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
import {Link} from "react-router-dom";
import {AddVersionToProject} from "./AddProjectVersion";
import {AttachUserToProject} from "./AttachUserToProject";
import {onLinkClickAction} from "../confirm/onClickAction";
import {getProjectById} from "../rest-service/ProjectService";

export function ProjectPage() {
    let {projectId} = useParams();
    const [project, setProject] = useState();

    useEffect(() => {
        getProjectById(projectId).then(data => setProject(data));
    },[projectId])

    const updatePage = () => {
        window.location.reload(false);
    }

    return (
        <div>

            <Link onClick={e => onLinkClickAction(e)} to={{
                pathname: `/projects/${project?.id}/create-task`,
            }}> Create New Task.</Link>
            <br/>
            <br/>
            <Link onClick={e => onLinkClickAction(e)} to={{
                pathname: `/projects/${project?.id}/backlog`,
            }}> BackLog Page </Link>
            <h3 style={{float: 'left'}}>{project?.name}</h3>

            <h3>Created at :{project?.createdAt}</h3>
            <div>
                <b>Description:</b> {project?.description}
            </div>

            <div style={{float: 'right'}}>
                <h4>{"Owner"}<UserFullNameWithLinkToPage userId={project?.creatorId}/></h4>
                <UsersInProjectList projectId={projectId}/>
                <ProjectVersionsTable projectId={projectId}/>
            </div>

            <br/>

            <Board projectId={projectId}/>
            <br/>
            {project?.creatorId === getUserId().toString() &&
            <div style={{
                float: "right",
                margin: '10px',
                border: '1px solid #eee',
                'boxShadow': '0 2px 2px #B22222',
                width: ' 500px',
                padding: '20px'
            }}><AttachUserToProject projectId={projectId}/>
                <UpdateProjectForm updateProject={updatePage} project={project}/>
                <br/>
                <AddVersionToProject project={project}/>
                <br/>
                {/*<UpdateProjectVersions updateProject={updatePage} project={project}/>*/}
                <div style={{float: "right"}}>
                    <DeleteProject projectId={projectId}/>
                </div>
            </div>}


        </div>
    );
}

export function Board(props) {
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
                    let userList = content?.map(user => <div key={user.id}>
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
        const isDeleting = window.confirm("Are you need to delete this project?");
        if (isDeleting) {
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
    }

    return (
        <div>
            <button onClick={() => removeProject(projectId)}>Delete Project!</button>
        </div>
    );
}
