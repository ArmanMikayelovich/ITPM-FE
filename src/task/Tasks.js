import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {HOST_ADDRESS} from "../constants/consts";


function CreateSprintForm() {

    const sendTask = (data) => {
        fetch(HOST_ADDRESS + '/tasks', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                    if (response.status === 200) {
                        console.log(`Task successfully created ${JSON.stringify(data)}`);

                    } else {
                        response.json().then(data =>
                            console.log(`Fail to save Task. error: code - ${data.status} message: ${data.message}`))
                    }
                }
            )

            .catch(error => console.log(`Fail to save Task. An error occurred ${error}`));
    }

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => sendTask(data)

    return (

        <div>
            <h3>Create Task</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' placeholder={"Sprint id"} name='springId' ref={register}/>
                <br/>
                <input type='text' name='name' placeholder={"Task Name"} ref={register}/>
                <br/>
                <select name="taskType" ref={register}>
                    <option value="TASK">TASK</option>
                    <option value="SUBTASK">SUBTASK</option>
                    <option value="EPIC">EPIC</option>
                    <option value="BUG">BUG</option>
                    <option value="STORY">STORY</option>
                    <option value="CHANGE">CHANGE</option>
                </select>
                <br/>
                <input type='textarea' name='description' placeholder={"Task Description"} ref={register}/>
                <br/>
                <input type='text' name='creatorId' placeholder={"Creator Id"} ref={register}/>
                <br/>
                <input type='text' name='assignedUserId' placeholder={"Assigned UserId (Optional) "} ref={register}/>
                <br/>
                <input type='submit'/>
            </form>
        </div>
    );

}


function UpdateSprintForm() {

    const sendTask = (data) => {
        fetch(HOST_ADDRESS + '/tasks', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                    if (response.status === 200) {
                        console.log(`Task successfully updated ${JSON.stringify(data)}`);

                    } else {
                        response.json().then(data =>
                            console.log(`Fail to updated Task. error: code - ${data.status} message: ${data.message}`))
                    }
                }
            )

            .catch(error => console.log(`Fail to updated Task. An error occurred ${error}`));
    }

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => sendTask(data)

    return (

        <div>
            <h3>Update Task</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' name='creatorId' placeholder={"Creator UserId (Optional) "} ref={register}/>
                <br/>
                <input type='text' placeholder={"Sprint id"} name='springId' ref={register}/>
                <br/>
                <input type='text' placeholder={"Task id"} name='id' ref={register}/>
                <br/>
                <input type='text' name='name' placeholder={"Task Name"} ref={register}/>
                <br/>
                <select name="taskType" ref={register}>
                    <option value="TASK">TASK</option>
                    <option value="SUBTASK">SUBTASK</option>
                    <option value="EPIC">EPIC</option>
                    <option value="BUG">BUG</option>
                    <option value="STORY">STORY</option>
                    <option value="CHANGE">CHANGE</option>
                </select>
                <br/>
                <input type='textarea' name='description' placeholder={"Task Description"} ref={register}/>
                <br/>
                <input type='text' name='assignedUserId' placeholder={"Assigned UserId (Optional) "} ref={register}/>
                <br/>
                <input type='submit'/>
            </form>
        </div>
    );

}


function TaskById() {
    const [taskId, setProjectId] = useState("");
    const [task, setTask] = useState("");

    const fetchProject = () => fetch(HOST_ADDRESS + '/tasks/' + taskId, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }).then((response) => {

            let json = response.json();
            json.then(data => setTask(JSON.stringify(data)));
        }
    ).catch(error => console.log(`an error occurred ${error}`));


    return (
        <div>
            Get Project By id <br/>
            <input type={'text'} name={"projectId"} onChange={(e) => setProjectId(e.target.value)}/>
            <button onClick={fetchProject}>Get</button>
            <label>{task}</label>
        </div>
    );
}


function DeleteTask() {
    const deleteTask = (taskId) => {
        fetch(HOST_ADDRESS + '/tasks/' + taskId, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'

            },
        })
            .then((response) => {
                    if (response.status === 200) {
                        console.log(`Task ${taskId} deleting: status - ${response.status}`);
                        return response;
                    } else {
                        console.log(`An error occurred. Task ${taskId} deleting: status - ${response.status}`);
                    }
                }
            )

            .catch(error => console.log(`an error occurred ${error}`));
    }
    const [taskId, setTaskId] = useState();
    return (
        <div>
            Delete Project <br/>
            <input type={'text'} name={"projectId"} onChange={(e) => setTaskId(e.target.value)}/>
            <button onClick={() => deleteTask(taskId)}>Get</button>

        </div>
    );
}

function AttachToUserForm() {

    const attachTask = (data) => {
        fetch(HOST_ADDRESS + '/tasks/attach', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                    if (response.status === 200) {
                        console.log(`Task successfully updated ${JSON.stringify(data)}`);

                    } else {
                        response.json().then(data =>
                            console.log(`Fail to updated Task. error: code - ${data.status} message: ${data.message}`))
                    }
                }
            )

            .catch(error => console.log(`Fail to updated Task. An error occurred ${error}`));
    }

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => attachTask(data)

    return (

        <div>
            <h3>Update Task</h3>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input type='text' placeholder={"Task id"} name='id' ref={register}/>
                <br/>
                <input type='text' name='assignedUserId' placeholder={"Assigned UserId (Optional) "} ref={register}/>
                <br/>
                <input type='submit'/>
            </form>
        </div>
    );

}


export function TasksPage() {
    return (
        <div>
            <CreateSprintForm/>
            <br/>
            <UpdateSprintForm/>
            <br/>
            <TaskById/>
            <br/>
            <DeleteTask/>
            <br/>
            <AttachToUserForm/>
            <br/>
        </div>
    );
}
