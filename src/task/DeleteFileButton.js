import {HOST_ADDRESS} from "../constants/consts";
import React from "react";
import * as PropTypes from "prop-types";
export function DeleteFileButton(props) {
    const taskId = props.taskId;
    const fileId = props.fileId;
    function deleteTask() {
        fetch(HOST_ADDRESS + `/tasks/${taskId}/delete-file/${fileId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => {
            if (response.status === 200) {
                alert("File deleted");
                window.location.reload(false);
            }
        });


    }

    return (
        <div>
            <button onClick={deleteTask} >Delete File</button>
        </div>
    )


}
DeleteFileButton.propTypes = {
    taskId: PropTypes.string.isRequired,
    fileId: PropTypes.string.isRequired,
}