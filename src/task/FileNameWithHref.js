import React from "react";
import * as PropTypes from "prop-types";
import {HOST_ADDRESS} from "../constants/consts";
import Typography from "@material-ui/core/Typography";

export function FileNameWithHref(props) {
    const fileInfo = props.fileInfo
    return (
        <div>
            <Typography onClick={() => {
                window.location.href = `${HOST_ADDRESS}/tasks/${fileInfo.taskId}/get-files/${fileInfo.id}`
            }} variant={"body2"} color={'primary'} >
                {fileInfo.fileName}
                {/*<a href={`${HOST_ADDRESS}/tasks/${fileInfo.taskId}/get-files/${fileInfo.id}`} >{fileInfo.fileName}</a>*/}
            </Typography>
        </div>
    );
}

FileNameWithHref.propTypes = {
    fileInfo: PropTypes.object.isRequired
}