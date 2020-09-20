import {useLocation} from "react-router";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {getUserId} from "../user/UserInfo";
import {getProjectVersions, getUsersOfProject} from "../rest-service/ProjectService";
import MultiSelect from "react-multi-select-component";
import {getTasksOfProject} from "../rest-service/TaskService";
import {HOST_ADDRESS} from "../constants/consts";
import {attachFileToTask} from "../rest-service/FileService";

export function CreateTask(props) {
    const location = useLocation();
    const project = location.project;


    const {register, handleSubmit} = useForm();
    const [projectVersions, setProjectVersions] = useState([]);
    const [assigningUsers, setAssigningUsers] = useState([]);
    const [selectedProjectVersions, setSelectedProjectVersions] = useState([]);
    const [tasksOfProject, setTasksOfProject] = useState([]);
    const [isTriggerInputHidden, setIsTriggerInputHidden] = useState(true)
    const [uploadingFiles, setUploadingFiles] = useState([]);
    useEffect(() => {
        getProjectVersions(project?.id).then(data => setProjectVersions(data));
        getTasksOfProject(project?.id).then(data => setTasksOfProject(data));
        getUsersOfProject(project?.id).then(data => setAssigningUsers(data.content));
    }, [project])

    const handleSelectTriggerChange = e => {
        if (e?.target?.value === '') {
            setIsTriggerInputHidden(true);
        } else {
            setIsTriggerInputHidden(false);

        }
    }
    const FetchTask = data => {
        Object.assign(data, {affectedProjectVersions: selectedProjectVersions.map(data => data.value)})
        if (data.triggeredById === '') {
            data.triggerType = null;
        }
        console.clear();
        console.log(data);
        fetch(`${HOST_ADDRESS}/tasks`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                response.json().then(task => {
                    uploadingFiles.forEach(file => {
                        attachFileToTask(file, task.id)
                    })
                    alert(`Task created,${uploadingFiles.length} files uploaded`);
                })

            } else {
                console.error("Error on creating task : " + response);
            }
        })


    }


    const onFileChangeHandler = (e) => {
        let files = [];
        for (let i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i]);
        }
        console.clear();
        console.log("UPLOAD FILES" + files);
        setUploadingFiles(files);
    };


    return (
        <div>
            <input hidden={true} type='text' name={'projectId'} defaultValue={project?.id} ref={register}/>
            <input hidden={true} type='text' name={'taskState'} defaultValue={'TODO'} ref={register}/>
            <input hidden={true} type='text' name={'creatorId'} defaultValue={getUserId()} ref={register}/>


            <form onSubmit={handleSubmit(FetchTask)}>
                Important
                <p>
                    Task name:<br/>
                    <input type='text' name='name' placeholder={"Task name"} ref={register}/>
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
                    Task Priority:
                    <br/>
                    <select defaultValue={'DEFAULT'} ref={register} name={'priority'}>
                        <option value="LOW">Low</option>
                        <option value="DEFAULT">Default</option>
                        <option value="HIGH">High</option>
                    </select>
                </p>

                <p>
                    Fix version
                    <select ref={register} name={'projectVersionId'}>
                        {Array.isArray(projectVersions) && projectVersions?.map(version => <option
                            value={version.id}>{version.version}</option>)}
                    </select>
                </p>
                ADDITIONAL
                <p>Description<br/>
                    <textarea ref={register} name={'description'} placeholder={"Description"}/>
                </p>
                <p>
                    Assigned user
                    <select ref={register} name={'assignedUserId'}>
                        <option value={''}>None</option>
                        {assigningUsers?.map(user => <option
                            value={user.userId}>{user.firstName + ' ' + user.lastName}</option>)}
                    </select>
                </p>
                <br/>
                Affected Project Versions: <br/>
                <MultiSelect
                    options={Array.isArray(projectVersions) && projectVersions?.map(data => {
                        return {label: data.version, value: data.id}
                    })}
                    value={selectedProjectVersions}
                    onChange={setSelectedProjectVersions}
                    labelledBy={"Select Affected versions"}
                />

                <p>Triggered By: </p>
                <br/>

                <select onChange={handleSelectTriggerChange}

                        ref={register} name={"triggeredById"} defaultValue={null}>
                    <option value={null}>{''}</option>
                    {Array.isArray(tasksOfProject) && tasksOfProject?.map(task => <option
                        value={task.id}>{task.name}</option>)}
                </select>
                <p>
                    <select hidden={isTriggerInputHidden} ref={register} name={'triggerType'}
                            defaultValue={'BLOCKED_BY'}>
                        <option value={"BLOCKED_BY"}>Blocked by</option>
                        <option value={"TRIGGERED_BY"}>Triggered by</option>
                    </select>
                </p>
                <br/>
                <p>
                    Parent
                    <select ref={register} defaultValue={null} name={'parentId'}>
                        <option value={null}/>
                        {Array.isArray(tasksOfProject) && tasksOfProject?.map(task => <option
                            value={task.id}>{task.name}</option>)}
                    </select>
                </p>
                <p>
                    Attach files:
                    <br/>
                    <input type={'file'} multiple={true} onChange={onFileChangeHandler} name={'uploadedFiles'}
                           ref={register}/>
                </p>
                <input type="submit"/>
            </form>
        </div>
    );

}