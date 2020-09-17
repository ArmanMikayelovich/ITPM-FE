import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {getProjectsOfUser, getProjectVersions} from "../rest-service/ProjectService";
import {getUserId} from "../user/UserInfo";
import {HOST_ADDRESS} from "../constants/consts";

export function MoveTask(props) {
    const task = props?.task;

    const {register, handleSubmit} = useForm();
    const [projectsOfUser, setProjectsOfUser] = useState();
    const [projectVersions, setProjectVersions] = useState();

    useEffect( () => {
        getProjectsOfUser(getUserId()).then(data => setProjectsOfUser(data.content));
    }, [task])


    const fetchCloneTask = data => {
        data.creatorId = getUserId();
        data.id = task?.id;
        let isClear = true;
        Object.keys(data).forEach((key) => {
            if (data[key] === '') {
                isClear = false;
            }
        })
        !isClear && alert("You are not choose Project with it's version");
        if (isClear) {
            console.log("MOVING TASK " + JSON.stringify(task) + ' TO PROJECT: ' + data.projectId + " VERSION: " + data.projectVersionId);
            fetch(HOST_ADDRESS + '/tasks/move', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(() => {})
                .catch(error => console.log(`an error occurred ${error}`));
        }
    };

    const handleProjectChange = e => {
        const projectId = e?.target?.value;
        if (projectId !== null && projectId !== '') {
            getProjectVersions(projectId).then(data => setProjectVersions(data));
        } else {
            setProjectVersions([]);
        }
    }


    return (
        <div>
            <h4>Move Task to another project</h4>
            <form onSubmit={handleSubmit(fetchCloneTask)}>


                <select ref={register}  onChange={handleProjectChange} name={'projectId'}>
                    <option value={''}>Choose Project</option>
                    {projectsOfUser?.map(project => <option value={project.id}>{project.name}</option>)}
                </select>
                <select ref={register} name={'projectVersionId'}>
                    <option value={''}>Choose Project Id </option>

                    {projectVersions?.map(version => <option value={version.id}>{version.version}</option>)}
                </select>
                <input type={'submit'} value={"Clone"} />
            </form>

        </div>
    );
}