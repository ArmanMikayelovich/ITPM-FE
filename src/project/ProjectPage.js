import React, {useLayoutEffect, useState} from "react";
import {useLocation} from "react-router";
import {UserFullName} from "../user/UserInfo";
import {
    HOST_ADDRESS,
    LIST_DONE,
    LIST_IN_PROGRESS,
    LIST_TODO,
    TASK_DONE,
    TASK_IN_PROGRESS,
    TASK_TODO
} from "../constants/consts";

export function ProjectPage() {

    const location = useLocation()

    const project = location.project

    return (
        <div>
            <h3 style={{float: 'left'}}>{project?.name}</h3>
            <h3>Created at : {project.createdAt}</h3>
            <div style={{float: 'right'}}>
                <h4>{"Owner"}<UserFullName userId={project?.publisherId}/></h4>
                <UsersInProjectList projectId={project.id}/>
            </div>

            <br/>

            <Board projectId={project.id} />
        </div>
    );
}

function Board(props) {
    const projectId = props.projectId;
    const [sprint, setSprint] = useState(null);

    useLayoutEffect(() => {
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


    if(!sprint) {
        return (
            <div><h4>You haven't started a sprint</h4></div>
        )
    }

    return (
        <div>
            <TaskList sprintId={sprint.id} taskState={TASK_TODO} listType={LIST_TODO}/>
            <TaskList sprintId={sprint.id} taskState={TASK_IN_PROGRESS} listType={LIST_IN_PROGRESS}/>
            <TaskList sprintId={sprint.id} taskState={TASK_DONE} listType={LIST_DONE}/>
        </div>
    )
}

function UsersInProjectList(props) {
    let projectId = props.projectId;

    const [users, setUsers] = useState([]);

    useLayoutEffect(() => {
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
                    let userList = content.map(user => <li>{user.firstName + " " + user.lastName + " : " + user.role}</li>)

                    setUsers(userList);
                });
            }
        ).catch(error => console.log(`an error occurred ${error}`));


    }, [projectId])

    return (
        <div>
            <hx> Users in Project
                <ul>
                    {users}
                </ul></hx>
        </div>

    )
}

function TaskList(props) {
    const sprintId = props.sprintId;
    const taskState = props.taskState;
    const listType = props.listType;
    const [tasks, setTasks] = useState([]);

    useLayoutEffect(() => {
        fetch(HOST_ADDRESS + '/tasks/by-sprint/' + sprintId + "?taskState=" + taskState, {
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
                    let taskList = data.map(task => <li key={task.id}>{task.name + " " + task.taskType}</li>)
                    setTasks(taskList);
                });
            }
        ).catch(error => console.log(`an error occurred ${error}`));
    }, [sprintId, taskState])

    return (
        <div style={{
            display: "inline-block",
            'margin-right': '10px'
        }}>
            <hx>{listType}
                <ul>
                    {tasks}
                </ul>
            </hx>

        </div>
    );
}