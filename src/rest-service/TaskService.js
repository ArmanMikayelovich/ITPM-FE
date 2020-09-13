import {HOST_ADDRESS} from "../constants/consts";

export async function getTasksOfProject(projectId) {

    const response = await fetch(HOST_ADDRESS + `/tasks/by-project/${projectId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'

        },
    });
    return await response.json();
}