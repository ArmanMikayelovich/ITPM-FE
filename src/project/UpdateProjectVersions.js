import React, {useEffect, useState} from "react";
import {HOST_ADDRESS} from "../constants/consts";
import {useForm} from "react-hook-form";
import {getProjectVersions} from "../rest-service/ProjectService";

export function UpdateProjectVersions(props) {
    const project = props.project;
    const [projectVersions, setProjectVersions] = useState();
    const [selectedProjectVersion, setSelectedProjectVersion] = useState();
    useEffect(() => {
        getProjectVersions(project.id).then(data => setProjectVersions(data));
    }, [project]);

    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => updateProjectVersion(data)

    const updatePage = props.updatePage;

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
        alert(JSON.stringify(data));
    }


    return (
        <div>
            <div>
                <h3>Update Project version</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input hidden={true} type='text' name='projectId' ref={register} readOnly={true}
                           value={project.id}/>
                    <br/>

                     Choose Version:&nbsp;&nbsp;
                        <select ref={register} name={'id'}>
                            {projectVersions?.map(projectVersion => <option
                                value={projectVersion.id}>{projectVersion.version} </option>)}
                        </select>
                    <br/>
                        Change Version Name:&nbsp;&nbsp;
                        <input ref={register} name={'name'} defaultValue={selectedProjectVersion?.version}/>


                    <br/>
                         Status:  <select defaultValue={selectedProjectVersion?.versionStatus} ref={register} name={'priority'}>
                            <option value="REALISED">Realised</option>
                            <option value="UNREALISED">Unrealised</option>
                            <option value="ARCHIVED">Archived</option>
                        </select>

                    <p>

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