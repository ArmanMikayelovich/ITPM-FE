import {HOST_ADDRESS} from "../constants/consts";
import React from "react";
import * as PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
export function DeleteFileButton(props) {
    const taskId = props.taskId;
    const fileId = props.fileId;
    function deleteTask() {
        fetch(HOST_ADDRESS + `/tasks/${taskId}/delete-file/${fileId}`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: "include",
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
            <Button style={{backgroundColor:'#be0000'}} variant={'contained'} color={'secondary'} onClick={deleteTask} >Delete File</Button>
        </div>
    )


}
DeleteFileButton.propTypes = {
    taskId: PropTypes.string.isRequired,
    fileId: PropTypes.string.isRequired,
}