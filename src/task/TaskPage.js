import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getUserId, UserFullNameWithLinkToPage} from "../user/UserInfo";
import {HOST_ADDRESS} from "../constants/consts";
import {CommentList, CreateCommentForm} from "../comment/Comments";
import {DeleteTask, TaskByIdWithLinkToPage} from "./Tasks";
import {ChangeTaskState} from "./ChangeTaskState";
import {ChangeTaskPriority} from "./ChangePriority";
import {ProjectWithLinkToPage} from "../project/Projects";
import {ProjectVersion} from "../project/ProjectVersion";
import {Link} from "react-router-dom";
import {CloneTask} from "./CloneTask";
import {MoveTask} from "./MoveTask";
import {getFileInfosOfTask} from "../rest-service/FileService";
import {FileNameWithHref} from "./FileNameWithHref";
import {onLinkClickAction} from "../confirm/onClickAction";
import {getTaskById} from "../rest-service/TaskService";
import * as PropTypes from "prop-types";
import {SubTaskTable} from "./SubTaskTable";
import {DeleteFileButton} from "./DeleteFileButton";

export function TaskPage() {
    let {taskId, projectId} = useParams();

    const [task, setTask] = useState();
    const [subTasks, setSubTasks] = useState(null);
    const [files, setFiles] = useState([]);
    useEffect(() => {

        getTaskById(taskId).then(data => setTask(data));

        fetch(HOST_ADDRESS + `/tasks/${taskId}/sub-tasks`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then((response) => {
                    if (response.status === 200) {
                        let json = response.json();
                        json.then(data => setSubTasks(data));
                    }
                }
            )

            .catch(error => console.log(`Fail to save Task. An error occurred ${error}`));
        getFileInfosOfTask(taskId).then(data => setFiles(data));

    }, [taskId]);


    const reRenderPage = () => {
        window.location.reload(false);
    }


    return (
        <div>
            <h4 style={{float: 'left'}}>{task?.name}</h4>

            <div style={{float: 'right'}}>
                <div style={{
                    float: 'right',
                    margin: '10px',
                    border: '1px solid #eee',
                    'boxShadow': '0 2px 2px #cccccc',
                    width: ' 200px',
                    padding: '20px'
                }}>
                    <h4 style={{float: 'right', 'borderRight': '30px solid transparent'}}> Creator:<br/>
                        <UserFullNameWithLinkToPage
                            userId={task?.creatorId}/></h4>
                    <AssignedUserWithAssignToMeButton assignedUserId={task?.assignedUserId} taskId={taskId}/>
                    <br/>
                    <br/>

                </div>
                <div style={{
                    float: 'right',
                    margin: '10px',
                    border: '1px solid #eee',
                    'boxShadow': '0 2px 2px #cccccc',
                    width: ' 200px',
                    padding: '20px'
                }}>
                    <h5>Task Type: {task?.taskType}</h5>
                    <h5>Task State: {task?.taskState}</h5>
                    <h5>Task Priority: {task?.priority}</h5>

                    {task?.triggeredById !== undefined && task?.triggeredById !== null &&
                    task?.triggeredById !== '' &&
                    <h5>Trigger : {task?.triggerType} <TaskByIdWithLinkToPage taskId={task?.triggeredById}/>

                    </h5>}


                    <h5>Parent: </h5> {task?.parentId &&
                <TaskByIdWithLinkToPage taskId={task?.parentId}/>}{/*TODO show parent only if task has it*/}


                    <h4>Project :<ProjectWithLinkToPage projectId={projectId}/></h4>
                    <h5>Project version id : <ProjectVersion versionId={task?.projectVersionId}/></h5>
                    <ul>Affected Project versions
                        {task?.affectedProjectVersions && task?.affectedProjectVersions.map(versionId => <ProjectVersion
                            key={versionId} versionId={versionId}/>)}
                    </ul>
                </div>
                <div>

                    {task?.assignedUserId === getUserId().toString() && <div style={{

                        margin: 'auto',
                        border: '3px solid green',
                        padding: '10px',
                    }}>
                        <ChangeTaskState updatePage={reRenderPage} task={task}/>
                    </div>}

                    {(task?.assignedUserId === getUserId().toString() || task?.creatorId === getUserId().toString())
                    && <div style={{

                        margin: 'auto',
                        border: '3px solid green',
                        padding: '10px',
                    }}>
                        <ChangeTaskPriority task={task} updatePage={reRenderPage}/>
                        <CloneTask task={task}/>
                    </div>}

                    {task?.creatorId === getUserId().toString() && <div style={{
                        margin: 'auto',
                        border: '3px solid green',
                        padding: '10px',
                    }}>
                        <MoveTask task={task}/>
                        <Link onClick={e => onLinkClickAction(e)} to={{
                            pathname: `/projects/${task?.projectId}/tasks/${task?.id}/update`,
                        }}>Update Task</Link>
                        <br/>
                        <Link onClick={e => onLinkClickAction(e)} to={{
                            pathname: `/projects/${projectId}/tasks/${taskId}/create-subtask`
                        }}>Create SubTask</Link>
                    </div>
                    }

                    {task?.creatorId === getUserId().toString() && <div style={{
                        margin: 'auto',
                        border: '3px solid red',
                        padding: '5px',
                    }}>
                        <DeleteTask taskId={taskId}/></div>}
                </div>

            </div>

            <div style={{
                margin: 'auto',
                width: '35%',
                border: '3px solid green',
                padding: '10px',
            }}><h5>Description </h5> <p>{task?.description}</p></div>
            {Array.from(files).map(file => <div>
                <FileNameWithHref key={file.id} fileInfo={file}/>
                {task.creatorId === getUserId().toString() && <DeleteFileButton taskId={taskId} fileId={file?.id} />}
            </div>)}
            <br/>
            {subTasks && Array.from(subTasks).length!==0 &&
            <div>
                <ul><b>Subtasks</b>
                    { <SubTaskTable tasks={subTasks}/>}
                </ul>
            </div>}
            {task?.id && <div style={{float: 'center'}}>
                <CommentList task={task} name={'All comments'}/>
                <CreateCommentForm updatePage={reRenderPage} taskId={task?.id}/>
            </div>}

        </div>
    );
}

function AssignedUserWithAssignToMeButton(props) {

    const taskId = props.taskId;
    const assignedUserId = props.assignedUserId;
    const userId = getUserId();

    const setUser = () => fetch(HOST_ADDRESS + '/tasks/attach', {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            id: taskId,
            assignedUserId: userId,

        })
    }).then((response) => {
            if (response.status === 200) {
                alert("attached to me!");
                window.location.reload(false);
            }
        }
    ).catch(error => console.log(`an error occurred ${error}`));

    if (assignedUserId) {
        return (
            <div style={{float: 'right', 'borderRight': '30px solid transparent'}}><h4><br/> Assigned to: <br/>
                <UserFullNameWithLinkToPage userId={assignedUserId}/></h4>
            </div>
        )
    } else {
        return (
            <div style={{float: 'right', 'border-right': '30px solid transparent'}}>
                <button onClick={() => {
                    setUser();
                }}>Assign to Me!
                </button>
            </div>

        )
    }
}

AssignedUserWithAssignToMeButton.propTypes = {
    taskId: PropTypes.any.isRequired,
    assignedUserId: PropTypes.any.isRequired
}
