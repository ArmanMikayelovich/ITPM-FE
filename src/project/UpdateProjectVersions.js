import React from "react";
import {HOST_ADDRESS} from "../constants/consts";
import {useForm} from "react-hook-form";

export function UpdateProjectVersion(props) {
    const projectVersion = props.version;
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => updateProjectVersion(data)

    const updatePage = props.updatePage()

    const updateProjectVersion = (data) => {
        fetch(HOST_ADDRESS + `/projects/${projectVersion.projectId}/versions`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                    if (response.status === 200) {
                        console.log(`Project Version successfully updated ${JSON.stringify(data)}`);
                        updatePage();
                    } else {
                        response.json().then(data => console.log(`Error in updating project version:
                         code - ${data.status} message: ${data.message}`));
                    }
                }
            ).catch(error => console.log(`an error occurred ${error}`));
    }

    return (
        <div>
            <div>
                <h3>Update Project version</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input hidden={true} type='text' name='id' ref={register} readOnly={true}
                           value={projectVersion.id}/>
                    <input hidden={true} type='text' name='projectId' ref={register} readOnly={true}
                           value={projectVersion.projectId}/>


                    <br/>
                    <p> Version
                        <input type='text' name='name' placeholder={"Version name"}
                               defaultValue={projectVersion.version}
                               ref={register}/>
                        <br/>
                    </p>
                        <p>
                            Change Status to:
                            <br/>
                            <select defaultValue={'UNREALISED'} ref={register} name={'priority'}>
                                <option value="REALISED">Realised</option>
                                <option value="UNREALISED">Unrealised</option>
                                <option value="ARCHIVED">Archived</option>
                            </select>
                        </p>
                    <br/>
                    <input type='submit' readOnly={true} value={"Update project"}/>
                </form>
            </div>
        </div>
    );


    return (

        <div></div>
    );
}