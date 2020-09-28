import React from "react";
import {getCSSForTaskInfo, TaskInfo} from "./TaskInfo";
import * as PropTypes from "prop-types";


export function FreeTaskTable(props) {
    const tasks = props.tasks;
    const notFinishedSprints = props.notFinishedSprints;
    return (
        <div>
            <table style={getCSSForTaskInfo()}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>TaskType</th>
                    <th>State</th>
                    <th>Priority</th>
                    <th>Creator</th>
                    <th>Project Version</th>
                    <th>Affected Versions</th>
                    <th>Parent Task</th>
                    <th>Trigger Task</th>
                    <th>TriggerType</th>
                    <th colSpan={2}>Attach to Sprint</th>
                </tr>
                </thead>
                <tbody>
                { Array.from(tasks)?.map(task => <TaskInfo notFinishedSprints={notFinishedSprints}
                                                                                task={task}/>)}
                </tbody>

            </table>
        </div>
    )
}

FreeTaskTable.propTypes = {
    tasks: PropTypes.array.isRequired,
    notFinishedSprints: PropTypes.array.isRequired
}