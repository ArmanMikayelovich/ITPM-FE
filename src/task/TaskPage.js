import React, {useState} from "react";
import {useLocation} from "react-router";
import {getUserId, UserFullNameWithLinkToPage} from "../user/UserInfo";
import {HOST_ADDRESS} from "../constants/consts";
import {CommentList, CreateCommentForm} from "../comment/Comments";
import {useForm} from "react-hook-form";
import {DeleteTask} from "./Tasks";

export function TaskPage() {
    let location = useLocation();
    const [task, setTask] = useState(location.task);
    const updateTask = () => {
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
                    <h4 style={{float: 'right', 'border-right': '30px solid transparent'}}> Creator:<br/>
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
                </div>
                <div>

                    {task.assignedUserId === getUserId().toString() && <div style={{

                        margin: 'auto',
                        border: '3px solid green',
                        padding: '10px',
                    }}>
                        <ChangeTaskState updatePage={updateTask} task={task}/>
                    </div>}

                    {task.creatorId === getUserId().toString() && <div style={{
                        margin: 'auto',
                        border: '3px solid green',
                        padding: '10px',
                    }}>
                        <UpdateTask updatePage={updateTask} task={task}/></div>
                    }

                    {task.creatorId === getUserId().toString() && <div style={{
                        margin: 'auto',
                        border: '3px solid red',
                        padding: '5px',
                    }}>
                        <DeleteTask taskId={task.id} /></div>}
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
                <CreateCommentForm updatePage={updateTask} taskId={task.id}/>
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

function ChangeTaskState(props) {
    // TODO UPDATE page when changing any state
    const task = props.task;

    const updatePage = props.updatePage;
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        fetch(HOST_ADDRESS + '/tasks/change-state', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                    if (response.status === 200) {
                        console.log(`Task state updated ${JSON.stringify(data)}`);
                        updatePage();
                    } else {
                        response.json().then(data => console.log(`Error in updating task state: code - ${data.status} message: ${data.message}`))
                    }
                }
            )
            .catch(error => console.log(`an error occurred ${error}`));

    }

    return (

        <div>
            <h3>Change Task State </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input hidden={true} type='text' name='id' ref={register} readOnly={true} value={task.id}/>
                <p>
                    Change state to
                    <br/>
                    <select defaultValue={'DONE'} ref={register} name={'taskState'}>
                        <option value="TODO">To do</option>
                        <option value="IN_PROGRESS">In progress</option>
                        <option  value="DONE">Done</option>
                    </select>
                </p>
                <br/>
                <input type='submit' readOnly={true} value={"Change task state"}/>
            </form>
        </div>
    )
}

function UpdateTask(props) {
    const task = props.task;

    const updatePage = props.updatePage;
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => {
        fetch(HOST_ADDRESS + '/tasks', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                    if (response.status === 200) {
                        console.log(`Task updated ${JSON.stringify(data)}`);
                        updatePage();
                    } else {
                        response.json().then(data => console.log(`Error in updating task state: code - ${data.status} message: ${data.message}`))
                    }
                }
            )
            .catch(error => console.log(`an error occurred ${error}`));

    }

    return (
        <div>
            <h3>Update Task </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input hidden={true} type='text' name='id' ref={register} readOnly={true} value={task.id}/>
                <input hidden={true} type='text' name='assignedUserId' ref={register} readOnly={true}
                       value={task.assignedUserId}/>
                <input hidden={true} type='text' name='creatorId' ref={register} readOnly={true}
                       value={task.creatorId}/>
                <input hidden={true} type='text' name='springId' ref={register} readOnly={true} value={task.springId}/>
                <input hidden={true} type='text' name='taskState' ref={register} readOnly={true}
                       value={task.taskState}/>

                <p>
                    Task name:
                    <br/>
                    <input type={'text'} name={'name'} defaultValue={task.name} ref={register}/>
                </p>
                <p>
                    Task description:
                    <br/>
                    <input type={'text'} name={'description'} defaultValue={task.description} ref={register}/>
                </p>
                <p>
                    Task type:<br/>
                    <select defaultValue={'TASK'} ref={register} name={'taskType'}>
                        <option value="TASK">Task</option>
                        <option value="SUBTASK">Sub task</option>
                        <option value="EPIC">Epic</option>
                        <option value="BUG">Bug</option>
                        <option value="STORY">Story</option>
                        <option value="CHANGE">Change</option>
                    </select>
                </p>
                <br/>
                <input type='submit' readOnly={true} value={"Change task state"}/>
            </form>
        </div>
    )
}