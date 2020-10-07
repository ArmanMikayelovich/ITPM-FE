import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {HOST_ADDRESS} from "../constants/consts";


function CreateSprintForm() {

    const sendSprint = (data) => {
        fetch(HOST_ADDRESS + '/sprints', {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                    if (response.status === 200) {

                    } else {
                        response.json().then(data =>
                            console.log(`Fail to save Sprint. error: code - ${data.status} message: ${data.message}`))
                    }
                }
            )

            .catch(error => console.log(`Fail to save Sprint. An error occurred ${error}`));
    }

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => sendSprint(data)

    return (

        <div>
            <h3>Create Sprint</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' placeholder={"Project id"} name='projectId' ref={register}/>
                <br/>
                <input type='text' name='creatorId' placeholder={"Creator Id"} ref={register}/>
                <br/>
                <input type='datetime-local' name='deadLine' placeholder={"Deadline"} ref={register}/>
                <br/>
                <input type='submit'/>
            </form>
        </div>
    );
}

function ChangeDeadLine() {

    const sendData = (data) => {
        fetch(HOST_ADDRESS + '/sprints', {
            method: 'PUT',
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                    if (response.status === 200) {
                        console.log(`Sprint successfully updated ${JSON.stringify(data)}`);

                    } else {
                        response.json().then(data =>
                            console.log(`Fail to save Sprint. error: code - ${data.status} message: ${data.message}`))
                    }
                }
            )

            .catch(error => console.log(`Fail to update Sprint. An error occurred ${error}`));
    }
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => sendData(data)

    return (

        <div>
            <h3>Update Deadline</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' placeholder={"Sprint id"} name='id' ref={register}/>
                <br/>
                <input type='datetime-local' name='deadLine' placeholder={"Deadline"} ref={register}/>
                <br/>
                <input type='submit'/>
            </form>
        </div>
    );

}


function SprintsByProjectId() {
    const [projectId, setProjectId] = useState("");
    const [sprints, setSprints] = useState("");

    const fetchProject = () => fetch(HOST_ADDRESS + '/sprints/by-project/' + projectId, {
        method: 'GET',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }).then((response) => response.json())
        .then(data => {

            setSprints(JSON.stringify(data.content));
        })
        .catch(error => console.log(`an error occurred ${error}`));


    return (
        <div>
            Get Project By User id <br/>
            <input type={'text'} name={"projectId"} onChange={(e) => setProjectId(e.target.value)}/>
            <button onClick={fetchProject}>Get</button>
            <h5>Sprints by project: {projectId}</h5>
            <ul>
                {sprints}
            </ul>
        </div>
    );
}


export function SprintPage() {
    return (
        <div>
            <CreateSprintForm/>
            <br/>
            <ChangeDeadLine/>
            <br/>
            <SprintsByProjectId/>
        </div>
    );
}