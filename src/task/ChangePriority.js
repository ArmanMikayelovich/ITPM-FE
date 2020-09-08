import React from "react";
import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../constants/consts";

export function ChangeTaskPriority(props) {
    const task = props.task;

    const updatePage = props.updatePage;
    const {register, handleSubmit} = useForm();


    const onSubmit = (data) => {
        fetch(HOST_ADDRESS + '/tasks/change-priority', {
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
            <h3>Change Task Priority </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input hidden={true} type='text' name='id' ref={register} readOnly={true} value={task.id}/>
                <p>
                    Change Priority to
                    <br/>
                    <select defaultValue={'DEFAULT'} ref={register} name={'priority'}>
                        <option value="LOW">Low</option>
                        <option value="DEFAULT">Default</option>
                        <option value="HIGH">High</option>
                    </select>
                </p>

                <br/>
                <input type='submit' readOnly={true} value={"Change task priority"}/>
            </form>
        </div>
    )
}