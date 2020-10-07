import {HOST_ADDRESS} from "../constants/consts";

export async function getAllSprintOfProjectWhichNotFinished(projectId) {
    let response = await fetch(HOST_ADDRESS + `/sprints/by-project/${projectId}/not-finished`, {
        method: 'GET',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'

        },
    });
    return await response.json();
}