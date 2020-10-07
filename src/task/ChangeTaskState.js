import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../constants/consts";
import React from "react";
import {changePromptContext} from "../App";

export function ChangeTaskState(props) {
    const task = props.task;

    const updatePage = props.updatePage;
    const {register, handleSubmit} = useForm();


    const onSubmit = (data) => {
        changePromptContext(false, '')
        fetch(HOST_ADDRESS + '/tasks/change-state', {
            method: 'PUT',
            mode: 'cors',
            credentials: "include",
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
                    <select onChange={() => changePromptContext(true, "Change project version not finished")}
                            defaultValue={'DONE'} ref={register} name={'taskState'}>
                        <option value="TODO">To do</option>
                        <option value="IN_PROGRESS">In progress</option>
                        <option value="DONE">Done</option>
                    </select>
                </p>

                <br/>
                <input type='submit' readOnly={true} value={"Change task state"}/>
            </form>
        </div>
    )
}
