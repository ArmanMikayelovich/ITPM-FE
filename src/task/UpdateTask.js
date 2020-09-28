import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../constants/consts";
import MultiSelect from "react-multi-select-component";
import {useHistory, useParams} from "react-router";
import {getProjectVersion} from "../project/ProjectVersion";
import {getTaskById} from "../rest-service/TaskService";
import {changePromptContext} from "../App";
import {attachFileToTask} from "../rest-service/FileService";

export function UpdateTask(props) {

    const [task, setTask] = useState();
    const [assigningUsers, setAssigningUsers] = useState();
    const [projectVersions, setProjectVersions] = useState();
    const [projectVersionOptions, setProjectVersionOptions] = useState([]);
    const [selectedProjectVersions, setSelectedProjectVersions] =
        useState(task?.affectedProjectVersions);
    const [uploadingFiles, setUploadingFiles] = useState([]);

    const {register, handleSubmit} = useForm();

    let {taskId} = useParams();
    const history = useHistory();
    useEffect(() => {
        getTaskById(taskId).then(data => setTask(data));
    }, [taskId])

    useEffect(() => {
        fetch(HOST_ADDRESS + `/users/by-project/${task?.projectId}`, {
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
                        <option key={task?.id + '' + user.userId}
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


        fetch(HOST_ADDRESS + `/projects/${task?.projectId}/versions`, {
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
        selectedProjectVersions && selectedProjectVersions.forEach(versionId => {
            getProjectVersion(versionId).then(data => selectedVersionObjects.push({
                label: data.version,
                value: data.id
            }))
        })

        setSelectedProjectVersions(selectedVersionObjects);
    }, [task])

    const onFileChangeHandler = (e) => {
        let files = [];
        for (let i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i]);
        }
        console.clear();
        console.log("UPLOAD FILES" + files);
        setUploadingFiles(files);
    };

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

                                uploadingFiles.forEach(file => {
                                    attachFileToTask(file, task.id)
                                })
                        alert("Task updated");
                        history.push(`/projects/${task.projectId}/tasks/${task.id}`)
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
                <input hidden={true} type='text' name='id' ref={register} readOnly={true} value={task?.id}/>
                <input hidden={true} type='text' name='creatorId' ref={register} readOnly={true}
                       value={task?.creatorId}/>
                <input hidden={true} type='text' name='sprintId' ref={register} readOnly={true} value={task?.sprintId}/>
                <input hidden={true} type='text' name='taskState' ref={register} readOnly={true}
                       value={task?.taskState}/>
                <input hidden={true} type='text' name='projectId' ref={register} readOnly={true}
                       value={task?.projectId}/>
                <input hidden={true} type='text' name='taskState' ref={register} readOnly={true}
                       value={task?.taskState}/>
                <input hidden={true} type='text' name='priority' ref={register} readOnly={true}
                       value={task?.priority}/>

                <p>
                    Task name:&nbsp;&nbsp; <input type={'text'} name={'name'} defaultValue={task?.name} ref={register}/>
                </p>
                <p>
                    Task description:&nbsp;&nbsp;<input type={'text'} name={'description'} defaultValue={task?.description} ref={register}/>
                </p>
                <p>
                    Task type:&nbsp;&nbsp;
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
                    Fix version:&nbsp;&nbsp;
                    <select defaultValue={task?.projectVersionId} ref={register} name={'projectVersionId'}>
                        {projectVersions}
                    </select>
                </p>
                <p>
                    Change assigned user: &nbsp;&nbsp;
                    <select ref={register} name={'assignedUserId'}>
                        {assigningUsers}
                    </select>
                </p>
                <br/>
                <br/>
                <div style={{width:'400px'}}>
                    Select affected project version(s):&nbsp;&nbsp;
                    <MultiSelect
                        options={projectVersionOptions}
                        value={selectedProjectVersions}
                        onChange={setSelectedProjectVersions}
                        labelledBy={"Select Affected versions"}
                    />
                </div>
                <p>
                    Attach files:&nbsp;&nbsp;
                    <input type={'file'} multiple={true} onChange={event => {
                        onFileChangeHandler(event);
                        changePromptContext(true, "Create task not finished");

                    }} name={'uploadedFiles'}
                           ref={register}/>
                </p>

                <input type='submit' readOnly={true} value={"Change task state"}/>
            </form>
        </div>
    )
}

function parseSelectedOptionsToIds(options) {
    return options.map(item => item.value);
}
