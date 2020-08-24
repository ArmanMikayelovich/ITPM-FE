import React, {useLayoutEffect, useState} from "react";
import {useLocation} from "react-router";
import {UserFullName} from "../user/UserInfo";
import {HOST_ADDRESS} from "../constants/consts";

export function ProjectPage(props) {

    const location = useLocation()

    const project = location.project
    let usersInProject = [];

    return (
        <div>
            <h3 style={{float: 'left'}}>{project?.name}</h3>
            <h3>Created at : {project.createdAt}</h3>
            <div style={{float: 'right'}}>
                <h4>{"Owner"}<UserFullName userId={project?.publisherId}/></h4>
                <UsersInProjectList projectId={project.id}/>
            </div>

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


    }, [])

    return (
        <div>
            <ul>
                {users}
            </ul>
        </div>

    )
}