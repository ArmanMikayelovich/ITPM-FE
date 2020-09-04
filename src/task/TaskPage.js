import React, {useState} from "react";
import {useLocation} from "react-router";
import {getUserId, UserFullName, UserFullNameWithLinkToPage} from "../user/UserInfo";
import {HOST_ADDRESS} from "../constants/consts";
import {Comment, CommentList} from "../comment/Comments";

export function TaskPage() {
    let location = useLocation();
    const task = location.task;

    return (
        <div>
            <h4 style={{float: 'left'}}>{task.name}</h4>

            <div style={{float : 'right'}}>
            <div style={{
                float: 'right',
                margin: '10px',
                border: '1px solid #eee',
                'boxShadow': '0 2px 2px #cccccc',
                width: ' 200px',
                padding: '20px'
            }}  >
                <h4 style={{float: 'right', 'border-right': '30px solid transparent'}}> Creator:<br/> <UserFullNameWithLinkToPage
                    userId={task.creatorId}/></h4>
                <AssignedUserWithAssignToMeButton task={task}/>

            </div>
            <div style={{
                float: 'right',
                margin: '10px',
                border: '1px solid #eee',
                'box-shadow': '0 2px 2px #cccccc',
                width: ' 200px',
                padding: '20px'
            }} >
                <h5>Task Type: {task.taskType}</h5>
                <h5>Task State: {task.taskState}</h5>
            </div>
            </div>



            <div style={{
                margin: 'auto',
                width: '35%',
                border: '3px solid green',
                padding: '10px',
            }} ><h5>Description </h5> <p>{task.description}</p></div>

            <div style={{float : 'center'}}>
                <CommentList taskId={task.id} name={'All comments'}/>

            </div>

        </div>
    )
}

function AssignedUserWithAssignToMeButton(props) {

    const [task, setTask] = useState(props.task);
    const taskId = task.id;
    const userId = getUserId();

    const setUser = () =>  fetch(HOST_ADDRESS + '/tasks/attach', {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({
            id: taskId,
            assignedUserId: userId,

        }) }).then((response) => {
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
                <UserFullNameWithLinkToPage userId={task.assignedUserId}/> </h4>
            </div>
        )
    }else {
        return (
            <div style={{float: 'right', 'border-right': '30px solid transparent'}}>
                <button onClick={() => { console.log("Clicked!");
                    setUser();
                }} >Assign to Me!</button>
            </div>

        )
    }


}

