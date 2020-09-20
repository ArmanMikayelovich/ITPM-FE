import {HOST_ADDRESS} from "../constants/consts";

export async function attachFileToTask(file, taskId) {
    const formData = new FormData();
    formData.append('file', file);

    await fetch(`${HOST_ADDRESS}/tasks/${taskId}/upload-file`, {
        method: 'POST',
        mode: 'cors',
        body: formData
    }).then(response => {
        if (response.status === 200) {
            console.log("all is ok task with files created  ");
        } else {
            console.error("Error on creating task with files: " + response);
        }
    });
}

export async function getFileInfosOfTask(taskId) {
    const response = await fetch(HOST_ADDRESS + `/tasks/${taskId}/get-files`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });
    return await response.json();
}