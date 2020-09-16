import * as PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {getAllTasksBySprintId} from "../../rest-service/TaskService";
import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../../constants/consts";

export function DetachTaskFromSprint(props) {
    const sprint = props.sprint;
    const [tasks, setTasks] = useState();
    const {register, handleSubmit} = useForm();

    const onSubmit = data => {
        fetch(HOST_ADDRESS + `/tasks/detach-from-sprint/${data.taskId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                alert("Task detached from Sprint.")
            } else {
                const json = response.json();
                json.then(error => {
                    alert("An error occurred in detaching task.\n Message: " + error.message);
                })
            }
        }).catch(error => alert("An error occurred in detaching task.\n Message: " + error.message));
    }

    useEffect(() => {
        getAllTasksBySprintId(sprint.id).then(data => setTasks(data));
    }, [sprint]);

    return (
        <div><h4>Detach task from sprint</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Select task</p>
                <select ref={register} name={'taskId'}>
                    {tasks?.map(task => <option value={task.id}>{task.name}</option>)}
                </select>

                <input type={"submit"} value={"Detach"}/>
            </form>
        </div>
    );

}

DetachTaskFromSprint.propTypes = {
    sprint: PropTypes.element.isRequired
}