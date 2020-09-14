import React from "react";
import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../constants/consts";

export function AddVersionToProject(props) {
    const project = props.project;
    const {register, handleSubmit} = useForm();

    const onSubmit = data => {
        fetch(HOST_ADDRESS + `/projects/${project.id}/versions`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                alert("Project Version successfully created");
            } else {
                response.json().then(data =>
                    alert("An error occurred in creating the project version.\n Message: "
                        + data.message))
            }
        }).catch(error => alert("An error occurred in creating the project version."));

    };


    return (
        <div>


            <form onSubmit={handleSubmit(onSubmit)}>Create Project version.
                <input type={'text'} ref={register} name={'projectId'} defaultValue={project.id} hidden={true}/>

                <p>
                    Version name: <br/>
                    <input type={'text'} required={true} ref={register} name={'version'}/>
                </p>
                <p>
                    Status: <br/>
                    <select ref={register} name={'versionStatus'} defaultValue={"UNREALISED"}>
                        <option value={"UNREALISED"}>Unrealised</option>
                        <option value={"REALISED"}>Realised</option>
                        <option value={"ARCHIVED"}>Archived</option>
                    </select>
                </p>

                <input type={'submit'} value={"Create Version"}/>
            </form>
        </div>
    );
}