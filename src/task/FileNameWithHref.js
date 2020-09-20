import React from "react";
import * as PropTypes from "prop-types";
import {HOST_ADDRESS} from "../constants/consts";

export function FileNameWithHref(props) {
    const fileInfo = props.fileInfo
    return (
        <div>
            <a href={`${HOST_ADDRESS}/tasks/${fileInfo.taskId}/get-files/${fileInfo.id}`} >{fileInfo.fileName}</a>
        </div>
    );
}

FileNameWithHref.propTypes = {
    fileInfo: PropTypes.object.isRequired
}