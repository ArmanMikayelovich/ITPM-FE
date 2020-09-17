import React, {useState} from "react";
import {getProjectVersions} from "../rest-service/ProjectService";
import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../constants/consts";

export function DeleteProjectVersion(props) {
    const project = props.project;
    const [projectVersions, setProjectVersions] = useState();
    const {register, handleSubmit} = useForm();

    useState(() => {
        getProjectVersions(project.id).then(data => setProjectVersions(data));
    }, [project]);

    const onSubmit = data => {
            fetch(HOST_ADDRESS + `/projects/${project.id}/versions?versionId=${data.id}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                        if (response.status === 200) {


                        } else {
                            response.json().then(data =>
                                console.log(`Fail to updated Comment. error: code - ${data.status} message: ${data.message}`))
                        }
                    }
                )

                .catch(error => console.log(`Fail to updated Comment. An error occurred ${error}`));
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select ref={register} name={'id'}>
                    {projectVersions?.map(projectVersion =>  <option key={projectVersion.id}
                                value={projectVersion.id}>{projectVersion.version}</option>)}
                </select>
                <input type={'submit'} value={"Delete Project Version"}/>
            </form>
        </div>
    );
}

//but we unable to delete project version, we need to archive that