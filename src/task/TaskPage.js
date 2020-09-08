import React, {useState} from "react";
import {useLocation} from "react-router";
import {getUserId, UserFullNameWithLinkToPage} from "../user/UserInfo";
import {HOST_ADDRESS} from "../constants/consts";
import {CommentList, CreateCommentForm} from "../comment/Comments";
import {DeleteTask} from "./Tasks";
import {UpdateTask} from "./UpdateTask";
import {ChangeTaskState} from "./ChangeTaskState";
import {ChangeTaskPriority} from "./ChangePriority";

export function TaskPage() {
    let location = useLocation();
    const [task, setTask] = useState(location.task);

    const reRenderPage = () => {
        fetch(HOST_ADDRESS + '/tasks/' + task.id, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {

                let json = response.json();
                json.then(data => setTask(data));
            }
        ).catch(error => console.log(`an error occurred ${error}`));


    }
    console.log(`task is : ${JSON.stringify(task)}`)
    return (
        <div>
            <h4 style={{float: 'left'}}>{task.name}</h4>

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
                            userId={task.creatorId}/></h4>
                    <AssignedUserWithAssignToMeButton task={task}/>
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
                    <h5>Task Type: {task.taskType}</h5>
                    <h5>Task State: {task.taskState}</h5>
                    <h5>Task Priority: {task.priority}</h5>
                </div>
                <div>

                    {task.assignedUserId === getUserId().toString() && <div style={{

                        margin: 'auto',
                        border: '3px solid green',
                        padding: '10px',
                    }}>
                        <ChangeTaskState updatePage={reRenderPage} task={task}/>
                    </div>}

                    {(task.assignedUserId === getUserId().toString() || task.creatorId === getUserId().toString())
                    && <div style={{

                        margin: 'auto',
                        border: '3px solid green',
                        padding: '10px',
                    }}>
                        <ChangeTaskPriority task={task} updatePage={reRenderPage}/>
                    </div>}

                    {task.creatorId === getUserId().toString() && <div style={{
                        margin: 'auto',
                        border: '3px solid green',
                        padding: '10px',
                    }}>
                        <UpdateTask updatePage={reRenderPage} task={task}/></div>
                    }

                    {task.creatorId === getUserId().toString() && <div style={{
                        margin: 'auto',
                        border: '3px solid red',
                        padding: '5px',
                    }}>
                        <DeleteTask taskId={task.id}/></div>}
                </div>

            </div>

            <div style={{
                margin: 'auto',
                width: '35%',
                border: '3px solid green',
                padding: '10px',
            }}><h5>Description </h5> <p>{task.description}</p></div>
            <br/>

            <div style={{float: 'center'}}>
                <CommentList task={task} name={'All comments'}/>
                <CreateCommentForm updatePage={reRenderPage} taskId={task.id}/>
            </div>

        </div>
    );
}

function AssignedUserWithAssignToMeButton(props) {

    const [task, setTask] = useState(props.task);
    const taskId = task.id;
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
                let assigned = {assignedUserId: userId};
                setTask(assigned);
            }
        }
    ).catch(error => console.log(`an error occurred ${error}`));

    if (task.assignedUserId !== "") {
        return (
            <div style={{float: 'right', 'border-right': '30px solid transparent'}}><h4><br/> Assigned to: <br/>
                <UserFullNameWithLinkToPage userId={task.assignedUserId}/></h4>
            </div>
        )
    } else {
        return (
            <div style={{float: 'right', 'border-right': '30px solid transparent'}}>
                <button onClick={() => {
                    console.log("Clicked!");
                    setUser();
                }}>Assign to Me!
                </button>
            </div>

        )
    }


}
