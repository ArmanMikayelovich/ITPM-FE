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
            credentials: "include",
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                alert("Task detached from Sprint.")
                window.location.reload(false);
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                Detach task from sprint&nbsp;&nbsp;
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