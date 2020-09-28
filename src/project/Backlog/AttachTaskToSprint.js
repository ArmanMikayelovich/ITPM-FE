import React from "react";
import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../../constants/consts";
import * as PropTypes from "prop-types";

export function AttachTaskToSprint(props) {
    const task = props.task;
    const sprints = props.sprints;

    const {register, handleSubmit} = useForm();

    const onSubmit = data => {
        if (data.sprintId === null) {
            alert("Please choose sprint.")
        } else {
           fetch(HOST_ADDRESS + '/tasks/attach-to-sprint', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(data)
            }).then(response => {
                if (response.status === 200) {
                    alert("Task attached to Sprint.")
                    window.location.reload(false);
                } else {
                    const json = response.json();
                    json.then(error => {
                        alert("An error occurred in attaching task.\n Message: " + error.message);
                    })
                }
            }).catch(error => alert("An error occurred in attaching task.\n Message: " + error.message));
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type={'text'} ref={register} name={'id'} defaultValue={task.id} hidden={true}/>
                <p>
                    Attach task to

                    <select ref={register} name={'sprintId'}>
                        {sprints?.map(sprint => <option key={sprint.id} value={sprint.id}>{sprint.name}</option>)}
                    </select>
                </p>
                <input type={'submit'} value={'Attach.'}/>
            </form>
        </div>
    );
}

AttachTaskToSprint.propTypes = {
    task: PropTypes.element.isRequired,
    sprints: PropTypes.array.isRequired
}