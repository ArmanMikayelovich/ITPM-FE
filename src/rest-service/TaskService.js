import {HOST_ADDRESS} from "../constants/consts";

export async function getTasksOfProject(projectId) {

    const response = await fetch(HOST_ADDRESS + `/tasks/by-project/${projectId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'

        },
    });
    return await response.json();
}


export async function getAllFreeTasksOfProject(projectId) {

    const response = await fetch(HOST_ADDRESS + `/tasks/by-project/${projectId}/free`, {
        method: 'GET',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return await response.json();
}


export async function getAllTasksBySprintId(sprintId) {

    const response = await fetch(HOST_ADDRESS + `/tasks/by-sprint/${sprintId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'

        },
    });
    return await response.json();
}
export async function getTaskById(taskId) {

    const response = await fetch(HOST_ADDRESS + `/tasks/${taskId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'

        },
    });
    return await response.json();
}

export async function updateTaskState(task) {
   return await fetch(HOST_ADDRESS + '/tasks/change-state', {
        method: 'PUT',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(task)
    })
}

export async function updateTaskPriority(task) {
    return await fetch(HOST_ADDRESS + '/tasks/change-priority', {
        method: 'PUT',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}