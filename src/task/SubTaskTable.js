import {getCSSForTaskInfo} from "../project/Backlog/TaskInfo";
import React from "react";
import {TaskByIdWithLinkToPage, TaskWithLinkToPage} from "./Tasks";
import {UserFullNameWithLinkToPage} from "../user/UserInfo";
import {ProjectVersion} from "../project/ProjectVersion";

export function SubTaskTable(props) {
    const tasks = props.tasks;
    return (
        <div>
            <table style={getCSSForSubTaskTable()}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>State</th>
                    <th>Priority</th>
                    <th>Creator</th>
                    <th>Project Version</th>
                    <th>Affected Versions</th>
                    <th>Trigger Task</th>
                    <th>TriggerType</th>
                </tr>
                </thead>
                <tbody>
                {Array.from(tasks)?.map(task => <TaskTableLine task={task}/>)}
                </tbody>

            </table>
        </div>
    )
}


function TaskTableLine(props) {
    const task = props.task;
    return (
        <tr>
            <td><TaskWithLinkToPage key={task.id} task={task}/></td>
            <td>{task?.taskType}</td>
            <td> {task?.priority}</td>
            <td> {<UserFullNameWithLinkToPage userId={task?.creatorId}/>}</td>
            <td> {<ProjectVersion versionId={task?.projectVersionId}/>}</td>
            <td> {task?.affectedProjectVersions?.map(id => <ProjectVersion versionId={id}/>)}</td>
            <td>{task?.triggeredById !== null ?
                <TaskByIdWithLinkToPage taskId={task?.triggeredById}/> : ""}
            </td>
            <td>{task?.triggeredById !== null ?
                task?.triggerType : ""}
            </td>
        </tr>
    )
}

function getCSSForSubTaskTable() {
    return {
        border: '1px  black',
        borderStyle: 'groove',
        backgroundColor: 'white',
        width: '70%',
        display: 'inline-block'
    }
}