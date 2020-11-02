import React from "react";
import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../constants/consts";
import {useHistory} from "react-router";
import {getUserId} from "../user/UserInfo";
import {changePromptContext} from "../App";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export function CreateProject() {

    const history = useHistory();
    const {register, handleSubmit} = useForm();

    const onSubmit = (data => {
            changePromptContext(false,'')
        fetch(HOST_ADDRESS + `/projects`, {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                alert("Project successfully created");
                history.push("/browse-projects");
            } else {
                response.json()
                    .then(data => alert("An error occurred in creating the project.\n Message: " + data.message));

            }
        }).catch(error => alert("An error occurred in creating the project."));
    })
    return (
        <div>
            <h3>Create new project.</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type={'text'} ref={register} name={'creatorId'} defaultValue={getUserId()} hidden={true}/>
                <p>
                    <TextField inputRef={register} variant={'outlined'} style={{width: '15%'}} name={'id'}
                               id="standard-basic" label="Project's ID"
                               onClick={() => changePromptContext(true,
                                   "Creating project not finished.")}/>
                </p>

                <p>
                    <TextField inputRef={register} style={{width: '15%'}} name={'name'} variant={'outlined'}
                               id="standard-basic" label="Project's name"
                               onClick={() => changePromptContext(true,
                                   "Creating project not finished.")}/>
                </p>

                <p>
                    <TextField inputRef={register}
                               style={{width: '25%'}}
                               rows={5} name={'description'}
                               multiline={true}
                               variant={'outlined'}
                               id="standard-basic"
                               label="Description"
                               onClick={() => changePromptContext(true,
                                   "Creating project not finished.")}/>

                </p>

                <Button variant={"contained"} style={{backgroundColor: 'green'}} type={'submit'}
                        color={'primary'}> Create Project</Button>
            </form>
        </div>
    );
}