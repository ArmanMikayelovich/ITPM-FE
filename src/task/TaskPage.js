import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {getUserId, UserFullNameWithLinkToPage} from "../user/UserInfo";
import {HOST_ADDRESS} from "../constants/consts";
import {CommentList, CreateCommentForm} from "../comment/Comments";
import {DeleteTask} from "./Tasks";
import {Link} from "react-router-dom";
import {CloneTask} from "./CloneTask";
import {MoveTask} from "./MoveTask";
import {onLinkClickAction} from "../confirm/onClickAction";
import {getTaskById} from "../rest-service/TaskService";
import * as PropTypes from "prop-types";
import {SubTaskTable} from "./SubTaskTable";
import Typography from "@material-ui/core/Typography";
import {AttachFileButtonComponent} from "./AttachFileButtonComponent";
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import Fab from "@material-ui/core/Fab";
import {TaskTypeIconComponent} from "./TaskBorderForBoard";
import {AttachedFilesTable} from "./file/AttachedFileList";
import Paper from "@material-ui/core/Paper";

import {TaskStateChanger} from "./TaskStateChanger";
import {LinkToTask} from "./LinkToTask";
import {TaskPriorityChanger} from "./TaskPriorityChanger";
import {TaskInfoList} from "./TaskInfoList";


export function TaskPage() {


    const history = useHistory();
    let {taskId, projectId} = useParams();

    const [task, setTask] = useState();
    const [subTasks, setSubTasks] = useState(null);

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

    }, [taskId]);


    const reRenderPage = () => {
        window.location.reload(false);
    }


    function addSubtaskOnClickHandler() {
        const url = `/projects/${projectId}/tasks/${taskId}/create-subtask`
        history.push(url);
    }

    return (
        <div style={{paddingLeft: 50}}>


            <div id={'task-name-add-file-subtask-button'} style={{display: 'absolute'}}>
                <div style={{display: 'inline-block'}}>
                    <TaskTypeIconComponent taskType={task?.taskType}/>
                </div>
                &nbsp;&nbsp;
                <div style={{display: 'inline-block',}}>
                    <Typography variant={'h5'}>
                        {task?.name}
                    </Typography>
                </div>


                <br/>
                <br/>

                <div style={{paddingLeft: 15, display: "inline-block"}}>
                    <AttachFileButtonComponent/>
                </div>
                <div style={{paddingLeft: 15, display: "inline-block"}}>
                    <Fab onClick={() => addSubtaskOnClickHandler()} component="span" size="small" variant="extended">
                        <BookmarksIcon/> Add Subtask.
                    </Fab>
                </div>

            </div>

            <div style={{
                float: 'right',
                margin: '10px',
                border: '1px solid #eee',
                'boxShadow': '0 2px 2px #cccccc',
                width: '35%',
                padding: '20px'
            }}>
                <div style={{display: "inline-block"}}>
                    <TaskStateChanger task={task} isEnabled={(task?.assignedUserId === getUserId().toString()
                        || task?.creatorId === getUserId().toString())}/>
                </div>
                <div style={{display: "inline-block"}}>
                    <TaskPriorityChanger task={task} isEnabled={task?.creatorId === getUserId().toString()}/>
                </div>

                <br/>
                <TaskInfoList task={task}/>



                 {/*   {(task?.assignedUserId === getUserId().toString() || task?.creatorId === getUserId().toString())
                    && <div style={{

                        margin: 'auto',
                        border: '3px solid green',
                        padding: '10px',
                    }}>
                        <CloneTask task={task}/>
                    </div>}*/}

                 {/*   {task?.creatorId === getUserId().toString() && <div style={{
                        margin: 'auto',
                        border: '3px solid green',
                        padding: '10px',
                    }}>
                        <MoveTask task={task}/>
                        <Link onClick={e => onLinkClickAction(e)} to={{
                            pathname: `/projects/${task?.projectId}/tasks/${task?.id}/update`,
                        }}>Update Task</Link>
                        <br/>
                    </div>
                    }
*/}
                   {/* {task?.creatorId === getUserId().toString() && <div style={{
                        margin: 'auto',
                        border: '3px solid red',
                        padding: '5px',
                    }}>
                        <DeleteTask taskId={taskId}/></div>}*/}

            </div>
            <br/>
            <div style={{paddingLeft: 45}}>
                <TaskDescription description={task?.description}/>
            </div>
            <br/>

            <AttachedFilesTable task={task}/>


            <br/>
            {subTasks && Array.from(subTasks).length !== 0 &&
            <div>
                <ul><b>Subtasks</b>
                    {<SubTaskTable tasks={subTasks}/>}
                </ul>
            </div>}
            {task?.id && <div style={{float: 'center'}}>
                <CommentList task={task} name={'All comments'}/>
                <CreateCommentForm updatePage={reRenderPage} taskId={task?.id}/>
            </div>}

        </div>
    );
}

function TaskDescription(props) {
    const description = props.description;
    return (
        <div>
            <Typography variant={"h6"}>Description</Typography>
            <br/>

            < Paper style={{maxWidth: 750, overflow: 'auto'}}>
                <Typography style={{paddingLeft: 5, paddingTop: 2, paddingRight: 5, paddingBottom: 3}} variant={"body1"}
                            color={"textPrimary"}>
                    {description}
                </Typography>
            </Paper>
        </div>
    )
}

TaskDescription.propTypes = {
    description: PropTypes.string.isRequired
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
