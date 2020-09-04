import React, {useLayoutEffect, useState} from "react";
import {UserFullName} from "./UserInfo";
import {useLocation} from "react-router";
import {HOST_ADDRESS} from "../constants/consts";
import {TaskList} from "../task/Tasks";

const CREATED = "created";
const TODO = "TODO";
const IN_PROGRESS = "IN_PROGRESS";
const DONE = "DONE";

export function UserPage() {
    const location = useLocation();
    const user = location.user;

    return (
        <div>
            <AboutUser user={user}/>
            <ProjectsOfUser userId={user.userId}/>
        </div>
    )
}

function AboutUser(props) {
    const user = props.user;
    return (
        <div style={{
            float: 'left',
            margin: '10px',
            border: '1px solid #eee',
            'boxShadow': '0 2px 2px #cccccc',
            width: ' 200px',
            padding: '20px'
        }}>
            <h5>Full Name:</h5>
            <UserFullName user={user}/>

            <h5>Email:</h5>
            <p>{user.email}</p>

            <h5>Registration date:</h5>
            <p>{user.registrationDate}</p>

        </div>
    )
}

function ProjectsOfUser(props) {
    const userId = props.userId;
    const [projects, setProjects] = useState([]);
    let [isFetched, setIsFetched] = useState(false);
    useLayoutEffect(() => {
        fetch(HOST_ADDRESS + `/projects/by-user/${userId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {

                let json = response.json();
                json.then(data => {
                    let content = data.content;
                    let projs = []
                    console.log(data.content)
                    for (let project of content) {
                        projs.push(project);
                    }
                    setProjects(projs);
                    setIsFetched(true);
                });
            }
        ).catch(error => console.log(`an error occurred ${error}`));
    }, [userId, isFetched]);

    return (
        <div>
            {projects.map(item => <TasksOfUserInProject key={item.id} userId={userId} project={item}/>)}
        </div>
    );
}

function TasksOfUserInProject(props) {
    const userId = props.userId;
    const projectId = props.project.id;
    const projectName = props.project.name;
    let keyCounter = 0;

    const [lists, setLists] = useState([]);
    useLayoutEffect(() => {
        fetch(HOST_ADDRESS + `/users/${userId}/projects/${projectId}/tasks`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {

                let json = response.json();
                json.then(data => {
                    let content = data;
                    if (content[CREATED] && content[CREATED].length !== 0) {
                        lists.push(content.created);
                    }
                    if (content[TODO] && content[TODO].length !== 0) {
                        lists.push(content[TODO])
                    }
                    if (content[IN_PROGRESS] && content[IN_PROGRESS].length !== 0) {

                        lists.push(content[IN_PROGRESS])
                    }
                    if (content[DONE] && content[DONE].length !== 0) {

                        lists.push(content[DONE])
                    }
                });
            }
        ).catch(error => console.log(`an error occurred ${error}`));
    }, [userId, projectId, lists]);


    return (
        <div>

            {lists.map(item => (
                <div><h4>{projectName}</h4>
                    <TaskList key={projectId + userId + keyCounter++} listName={'list'}
                              taskArray={item}/></div>))}

        </div>
    );
}

