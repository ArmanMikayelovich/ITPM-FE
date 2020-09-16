import React from "react";
import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../../constants/consts";

export function StartSprint(props) {
    const sprint = props.sprint;
    const updateAllSprints = props.updateAllSprints;

    const {register, handleSubmit} = useForm();
    const updateComponent = props.update;
    const onSubmit = data => {
        const tomorrow = new Date(getTomorrowDateString())
        const deadLineDate = new Date(data.deadLine);
        if (deadLineDate <= tomorrow) {
            alert("dead line should be later than today")
        } else {
            data.id = sprint.id;

            console.log(data);
            fetch(HOST_ADDRESS + "/sprints/start", {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.status === 200) {
                    alert("Sprint started");
                    updateComponent();
                } else {
                    response.json().then(error => {
                        alert("An error occurred:\n" + error.message);
                    })
                }
            })
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Deadline
                    <input type={'date'} ref={register} name={'deadLine'} defaultValue={getTomorrowDateString()}/>
                </p>
                <input type={'submit'} value={"Start."}/>
            </form>
        </div>
    );
}

function getTomorrowDateString() {
    const date = new Date();
    let today = date.getFullYear() + "/";
    today = today.concat((+date.getMonth() + 1), '/', +date.getDate() + 1)
    return today;
}