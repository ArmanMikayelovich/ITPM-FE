import React from "react";
import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../constants/consts";
import {useHistory, useLocation} from "react-router";

export function CreateProject() {
    const location = useLocation();
    const user = location.user;
    const history = useHistory();
    const {register, handleSubmit} = useForm();

    const onSubmit = (data => {
        fetch(HOST_ADDRESS + `/projects`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                alert("Project successfully created");
                history.push("/browse");
            } else {
                response.json(data => alert("An error occurred in creating the project.\n Message: " + data.message));

            }
        }).catch(error => alert("An error occurred in creating the project."));

    })
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type={'text'} ref={register} name={'creatorId'} defaultValue={user.userId} hidden={true}/>
                <p>
                    Project's ID: <br/>
                    <input type={'text'} ref={register} name={'id'}/>
                </p>

                <p>Name of project. <br/>
                    <input type={'text'} ref={register} name={'name'}/>
                </p>

                <p>
                    Description: <br/>
                    <input type={'text'} ref={register} name={'description'}/>
                </p>

                <input type={'submit'} value={"Create Project"}/>
            </form>
        </div>
    );
}