import React from "react";
import * as PropTypes from "prop-types";
import {UserFullNameWithLinkToPage} from "../../user/UserInfo";
import {ProjectVersion} from "../ProjectVersion";
import {TaskByIdWithLinkToPage} from "../../task/Tasks";
import {AttachTaskToSprint} from "./AttachTaskToSprint";

export function TaskInfo(props) {
    const task = props.task;
    const notFinishedSprints = props.notFinishedSprints;
    return (

            <tr>
                <td>{task?.name}</td>
                <td>{task?.description}</td>
                <td>{task?.taskType}</td>
                <td> {task?.taskState}</td>
                <td> {task?.priority}</td>
                <td> {<UserFullNameWithLinkToPage userId={task?.creatorId}/>}</td>
                <td> {<ProjectVersion versionId={task?.projectVersionId}/>}</td>

                <td> {task?.affectedProjectVersions?.map(id =><ProjectVersion versionId={id}/> )}</td>
                <td>{task?.parentId !== null ? <TaskByIdWithLinkToPage taskId={task?.parentId}/> : ""}</td>
                <td>{task?.triggeredById !== null ?
                    <TaskByIdWithLinkToPage taskId={task?.triggeredById}/> : ""}
                </td>
                <td>{task?.triggeredById !== null ?
                    task?.triggerType : ""}
                </td>

                <td>
                   <AttachTaskToSprint task={task} sprints={notFinishedSprints} />
                </td>

            </tr>

    );
}

TaskInfo.propTypes = {
    task: PropTypes.element.isRequired,
    notFinishedSprints: PropTypes.element.isRequired
}

export function getCSSForTaskInfo() {
    return {
        border: '1px  black',
        borderStyle: 'groove',
        borderRadius: '25px',
        backgroundColor: 'white',
        width: '75%',
        display: 'inline-block'
    }
}
