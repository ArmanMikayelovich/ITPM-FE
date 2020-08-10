import React from "react";
import {HOST_ADDRESS} from "../constants/consts";



export function createProject(data) {
    fetch(HOST_ADDRESS + '/projects', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
    })
        .then((response) => {
                if (response.status === 200) {
                    console.log(`Project successfully created ${JSON.stringify(data)}`);

                } else {
                    console.log(`Data Sent. ${JSON.stringify(data)}`);
                    response.json().then(data => alert(`Error: code - ${data.status} message: ${data.message}`))
                }
            }
        )

        .catch(error => console.log(`an error occurred ${error}`));
}

export function updateProject(data) {
    fetch(HOST_ADDRESS + '/projects', {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
    })
        .then((response) => {
                if (response.status === 200) {
                    console.log(`Project successfully updated ${JSON.stringify(data)}`);

                } else {
                    response.json().then(data => console.log(`Error in updating project: code - ${data.status} message: ${data.message}`))
                }
            }
        )

        .catch(error => console.log(`an error occurred ${error}`));
}

export function findProjectById(projectId) {

    return fetch(HOST_ADDRESS + '/projects/' + projectId, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*'
        },
    }).then((response) => {

            alert(JSON.stringify(response.content));
            return response.json().content;
        }
    ).catch(error => console.log(`an error occurred ${error}`));

}

export function deleteProject(projectId) {

  return   fetch(HOST_ADDRESS + '/projects/' + projectId, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'

        },
    })
        .then((response) => {
                console.log(`Project ${projectId} deleting: status - ${response.status}`);
                return response;
            }
        )

        .catch(error => console.log(`an error occurred ${error}`));
}

export function findAllByUserId(userId) {

    fetch(HOST_ADDRESS + '/projects/by-users/' + userId, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'

        },
    })
        .then((response) => {
                alert(response);
                return response.content;
            }
        )

        .catch(error => console.log(`an error occurred ${error}`));
}
