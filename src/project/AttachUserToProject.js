import React from "react";
import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../constants/consts";
import {changePromptContext} from "../App";

export function AttachUserToProject(props) {
    const projectId = props.projectId;
    const {register, handleSubmit} = useForm();

    const onSubmit = data => {
        changePromptContext(false, '')
        fetch(HOST_ADDRESS + '/projects/attach-user-to-project', {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                window.location.reload(false);

            } else {
                const promise = response.json();
                promise.then(data => alert(`Fail to attach User. error: code - ${data.status} message: ${data.message}`))
            }
        })
    }
    return (

        <div style={{padding: '1px'}}>Attach user to project.
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type={'text'} name={'projectId'} ref={register} defaultValue={projectId} hidden={true}/>
                <p>Input user's e-mail.&nbsp;&nbsp;
                    <input onChange={() => changePromptContext(true, "Attach user to project not finished")}
                           type={'email'}
                           name={'email'} ref={register}/>
                </p>
                <p>
                    Choose role in project.&nbsp;&nbsp;
                    <select onChange={() => changePromptContext(true, "Attach user to project not finished")}
                            ref={register}
                            name={'role'}>
                        <option value={'ADMINISTRATORS'}>Administrators</option>
                        <option value={'DEVELOPERS'}>Developers</option>
                        <option value={'USERS'}>Users</option>
                    </select>
                </p>

                <p>
                    <input type={'submit'} value={"Attach User."}/>
                </p>
            </form>
        </div>
    );
}