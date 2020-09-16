import React from "react";
import {useForm} from "react-hook-form";
import {getUserId} from "../../user/UserInfo";
import {HOST_ADDRESS} from "../../constants/consts";
import * as PropTypes from "prop-types";

export function CreateSprint(props) {
    const project = props.project;
    const updatePage = props.updatePage;

    const {register, handleSubmit} = useForm();

    const onSubmit = data => {
        fetch(HOST_ADDRESS + '/sprints', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                    if (response.status === 200) {
                        alert('Sprint successfully created.');
                        updatePage();
                    } else {
                        response.json().then(data =>
                            alert(`Failed to save Sprint.\n Error message: ${data.message}`))
                    }
                }
            )

            .catch(error => console.log(`Fail to save Sprint. An error occurred ${error}`));

    }

    return (
        <div>
            Create new Sprint.
            <form onSubmit={handleSubmit(onSubmit)}>
                <input ref={register} type={'text'} name={'creatorId'} hidden={true} defaultValue={getUserId()}/>
                <input ref={register} type={'text'} name={'projectId'} hidden={true} defaultValue={project.id}/>
                <h4>Input Sprint name</h4>
                    <input ref={register} type={'text'} name={'name'} placeholder={'Sprint name'}/>
                <br/>

                <input type={'submit'} value={"Create Sprint."}/>
            </form>

        </div>
    );
}

CreateSprint.propTypes = {
    project: PropTypes.element.isRequired,
    updatePage: PropTypes.func.isRequired

};