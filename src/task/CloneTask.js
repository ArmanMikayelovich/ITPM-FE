import React, {useEffect, useState} from "react";
import {getUserId} from "../user/UserInfo";
import {getProjectsOfUser, getProjectVersions} from "../rest-service/ProjectService";
import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../constants/consts";

export function CloneTask(props) {
    const task = props?.task;

    /*  {
          creatorId: "1",
          id : 12,
          projectId: "PR_1",
          projectVersionId: 1
      }*/
    const {register, handleSubmit} = useForm();
    const [projectsOfUser, setProjectsOfUser] = useState();
    const [projectVersions, setProjectVersions] = useState();

    useEffect( () => {
      getProjectsOfUser(getUserId()).then(data => setProjectsOfUser(data.content));
    }, [task])


    const fetchCloneTask = data => {
        data.creatorId = getUserId();
        data.id = task?.id;
        console.clear();
        let isClear = true;
     Object.keys(data).forEach((key) => {
         if (data[key] === '') {
             isClear = false;
         }
     })
        !isClear && alert("You are not choose Project with its version");
        if (isClear) {
            console.log("CLONING TASK " + JSON.stringify(task) + ' FOR PROJECT: ' + data.projectId + " VERSION: " + data.projectVersionId);
            fetch(HOST_ADDRESS + '/tasks/clone', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(() => console.log(`Data Sent. ${JSON.stringify(data)}`))
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
            <h4>Clone Project</h4>
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