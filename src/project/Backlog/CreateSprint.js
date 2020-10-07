import React from "react";
import {useForm} from "react-hook-form";
import {getUserId} from "../../user/UserInfo";
import {HOST_ADDRESS} from "../../constants/consts";
import * as PropTypes from "prop-types";
import {changePromptContext} from "../../App";

export function CreateSprint(props) {
    const projectId = props.projectId;
    const updatePage = props.updatePage;

    const {register, handleSubmit} = useForm();

    const onSubmit = data => {
        changePromptContext(false, '');
        fetch(HOST_ADDRESS + '/sprints', {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
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
        <div style={{
            border: '1px  black',
            borderStyle: 'groove',
            width: '250px',
            padding: '25px'
        }}>
            Create new Sprint.
            <form onSubmit={handleSubmit(onSubmit)}>
                <input ref={register} type={'text'} name={'creatorId'} hidden={true} defaultValue={getUserId()}/>
                <input ref={register} type={'text'} name={'projectId'} hidden={true} defaultValue={projectId}/>

                Name:&nbsp;&nbsp;
                <input onChange={() => changePromptContext(true, "Create sprint - not finished")} ref={register}
                       type={'text'} name={'name'} placeholder={'Sprint name'}/>&nbsp;&nbsp;
                <input type={'submit'} value={"Create Sprint."}/>
            </form>

        </div>
    );
}

CreateSprint.propTypes = {
    projectId: PropTypes.string.isRequired,
    updatePage: PropTypes.func.isRequired

};