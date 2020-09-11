import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../constants/consts";
import MultiSelect from "react-multi-select-component";
import {useHistory, useLocation} from "react-router";
import {getProjectVersion} from "../project/ProjectVersion";

export function UpdateTask(props) {
    const location = useLocation();
    const task = location.task;
    const [assigningUsers, setAssigningUsers] = useState();
    const [projectVersions, setProjectVersions] = useState();
    const [projectVersionOptions, setProjectVersionOptions] = useState([]);
    const [selectedProjectVersions, setSelectedProjectVersions] =
        useState(task.affectedProjectVersions);

    const {register, handleSubmit} = useForm();

    const history = useHistory();
    useEffect(() => {
        fetch(HOST_ADDRESS + `/users/by-project/${task.projectId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'

            },
        }).then((response) => {
            if (response.status === 200) {
                let promise = response.json();
                promise.then(data => {
                    let mapped = data.content.map(user =>
                        <option key={task.id + '' + user.userId}
                                value={user.userId}>{user.firstName + " " + user.lastName}</option>
                    );
                    setAssigningUsers(mapped);
                })
            } else {
                response.json().then(data => console.log(`Error in updating task state: 
                        code - ${data.status} message: ${data.message}`))
            }
        })
            .catch(error => console.log(`an error occurred ${error}`));


        fetch(HOST_ADDRESS + `/projects/${task.projectId}/versions`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'

            },
        })
            .then((response) => {
                if (response.status === 200) {
                    let json = response.json();
                    json.then(data => {
                        let formattedVersions = data.map(version =>
                            <option key={version.id} value={version.id}>{version.version}</option>)
                        setProjectVersions(formattedVersions);
                        let options = [];
                        data.forEach(version => options.push({label: version.version, value: version.id}));
                        setProjectVersionOptions(options);
                    })
                } else {
                    console.log("an error occurred on fetching project versions");
                }
            })
            .catch(error => console.log(JSON.stringify(error)));

        const selectedVersionObjects = [];
        selectedProjectVersions.forEach(versionId => {
            getProjectVersion(versionId).then(data => selectedVersionObjects.push({label: data.version, value: data.id}))
        })

        setSelectedProjectVersions(selectedVersionObjects);
    }, [task])

    const onSubmit = (data) => {
        fetch(HOST_ADDRESS + '/tasks', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(Object.assign(data, {affectedProjectVersions: parseSelectedOptionsToIds(selectedProjectVersions)}))
        })
            .then((response) => {
                    if (response.status === 200) {
                        console.log(`Task updated ${JSON.stringify(data)}`);
                        history.push("/task",{task: task})
                    } else {
                        response.json().then(data => console.log(`Error in updating task state: code - ${data.status} message: ${data.message}`))
                    }
                }
            )
            .catch(error => console.log(`an error occurred ${error}`));

    }

    return (
        <div>
            <h3>Update Task </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input hidden={true} type='text' name='id' ref={register} readOnly={true} value={task.id}/>
                <input hidden={true} type='text' name='creatorId' ref={register} readOnly={true}
                       value={task.creatorId}/>
                <input hidden={true} type='text' name='springId' ref={register} readOnly={true} value={task.springId}/>
                <input hidden={true} type='text' name='taskState' ref={register} readOnly={true}
                       value={task.taskState}/>
                <input hidden={true} type='text' name='projectId' ref={register} readOnly={true}
                       value={task.projectId}/>
                <input hidden={true} type='text' name='taskState' ref={register} readOnly={true}
                       value={task.taskState}/>
                <input hidden={true} type='text' name='priority' ref={register} readOnly={true}
                       value={task.priority}/>

                <p>
                    Task name:
                    <br/>
                    <input type={'text'} name={'name'} defaultValue={task.name} ref={register}/>
                </p>
                <p>
                    Task description:
                    <br/>
                    <input type={'text'} name={'description'} defaultValue={task.description} ref={register}/>
                </p>
                <p>
                    Task type:<br/>
                    <select defaultValue={'TASK'} ref={register} name={'taskType'}>
                        <option value="TASK">Task</option>
                        <option value="SUBTASK">Sub task</option>
                        <option value="EPIC">Epic</option>
                        <option value="BUG">Bug</option>
                        <option value="STORY">Story</option>
                        <option value="CHANGE">Change</option>
                    </select>
                </p>

                <p>
                    Fix version
                    <select defaultValue={task.projectVersionId} ref={register} name={'projectVersionId'}>
                        {projectVersions}
                    </select>
                </p>
                <p>
                    Change assigned user
                    <select ref={register} name={'assignedUserId'}>
                        {assigningUsers}
                    </select>
                </p>
                <br/>
                <br/>
                    <MultiSelect
                        options={projectVersionOptions}
                        value={selectedProjectVersions}
                        onChange={setSelectedProjectVersions}
                        labelledBy={"Select Affected versions"}
                    />
                <input type='submit' readOnly={true} value={"Change task state"}/>
            </form>
        </div>
    )
}

function parseSelectedOptionsToIds(options) {
   return  options.map(item => item.value);
}
