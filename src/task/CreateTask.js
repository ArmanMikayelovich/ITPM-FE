import {useHistory, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {getUserId} from "../user/UserInfo";
import {getProjectVersions, getUsersOfProject} from "../rest-service/ProjectService";
import MultiSelect from "react-multi-select-component";
import {getTasksOfProject} from "../rest-service/TaskService";
import {HOST_ADDRESS} from "../constants/consts";
import {attachFileToTask} from "../rest-service/FileService";
import {changePromptContext} from "../App";

export function CreateTask() {
    const {projectId} = useParams();
    const history = useHistory();

    const {register, handleSubmit,errors} = useForm();
    const [projectVersions, setProjectVersions] = useState([]);
    const [assigningUsers, setAssigningUsers] = useState([]);
    const [selectedProjectVersions, setSelectedProjectVersions] = useState([]);
    const [tasksOfProject, setTasksOfProject] = useState([]);
    const [isTriggerInputHidden, setIsTriggerInputHidden] = useState(true)
    const [uploadingFiles, setUploadingFiles] = useState([]);
    useEffect(() => {
        getProjectVersions(projectId).then(data => setProjectVersions(data));
        getTasksOfProject(projectId).then(data => setTasksOfProject(data));
        getUsersOfProject(projectId).then(data => setAssigningUsers(data.content));
    }, [projectId])

    const handleSelectTriggerChange = e => {
        if (e?.target?.value === '') {
            setIsTriggerInputHidden(true);
        } else {
            setIsTriggerInputHidden(false);

        }
    }
    const FetchTask = data => {
        changePromptContext(false, '');
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
            credentials: "include",
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                response.json().then(task => {
                    uploadingFiles.forEach(file => {
                        attachFileToTask(file, task.id)
                    })
                    alert(`Task created,${uploadingFiles.length} files uploaded`);
                    history.push(`/projects/${task.projectId}/tasks/${task.id}`)
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
            <input hidden={true} type='text' name={'projectId'} defaultValue={projectId} ref={register}/>
            <input hidden={true} type='text' name={'taskState'} defaultValue={'TODO'} ref={register}/>
            <input hidden={true} type='text' name={'creatorId'} defaultValue={getUserId()} ref={register}/>


            <form onSubmit={handleSubmit(FetchTask)}>
                <p>
                    Task name:&nbsp;&nbsp;
                    <input type='text' name='name' placeholder={"Task name"} ref={register({ required: true })}/>
                    {errors.name && <p style={{color:'red'}}> Name required </p>}
                </p>
                <p>
                    Task type:&nbsp;&nbsp;
                    <select onChange={() => changePromptContext(true, "Create task not finished")} defaultValue={'TASK'}
                            ref={register({ required: true })} name={'taskType'}>
                        <option value="TASK">Task</option>
                        <option value="SUBTASK">Sub task</option>
                        <option value="EPIC">Epic</option>
                        <option value="BUG">Bug</option>
                        <option value="STORY">Story</option>
                        <option value="CHANGE">Change</option>
                    </select>
                    {errors.nataskTypeme && <p style={{color:'red'}}> Task type required </p>}
                </p>
                <p>
                    Task Priority:&nbsp;&nbsp;
                    <select onChange={() => changePromptContext(true, "Create task not finished")}
                            defaultValue={'DEFAULT'} ref={register({ required: true })} name={'priority'}>
                        <option value="LOW">Low</option>
                        <option value="DEFAULT">Default</option>
                        <option value="HIGH">High</option>
                    </select>
                    {errors.priority && <p style={{color:'red'}}> Priority required </p>}
                </p>

                <p>
                    Fix version: &nbsp;&nbsp; <select
                    onChange={() => changePromptContext(true, "Create task not finished")}
                    ref={register({ required: true })}
                    name={'projectVersionId'}>
                    {Array.isArray(projectVersions) && projectVersions?.map(version => <option
                        value={version.id}>{version.version}</option>)}
                </select>
                    {errors.projectVersionId && <p style={{color:'red'}}> Fix version required </p>}
                </p>
             Description&nbsp;&nbsp;
                <p>
                    <textarea  style={{
                        width:'380px',
                        height: '250px',
                        resize: 'none'
                    }} onChange={() => changePromptContext(true, "Create task not finished")}
                              ref={register({ required: true })}
                              name={'description'} placeholder={"Description"}/>
                    {errors.description && <p style={{color:'red'}}> Description required </p>}
                </p>
                <p>
                    Assigned user:&nbsp;&nbsp;
                    <select onChange={() => changePromptContext(true, "Create task not finished")}
                            ref={register}
                            name={'assignedUserId'}>
                        <option value={''}>None</option>
                        {assigningUsers?.map(user => <option
                            value={user.userId}>{user.firstName + ' ' + user.lastName}</option>)}
                    </select>
                </p>
                Affected Project Versions: &nbsp;&nbsp;
                <div style={{
                    width: '300px'

                }}>
                    <MultiSelect
                        options={Array.isArray(projectVersions) && projectVersions?.map(data => {
                            return {label: data.version, value: data.id}
                        })}
                        value={selectedProjectVersions}
                        onChange={(e) => {
                            setSelectedProjectVersions(e);
                            changePromptContext(true, "Create task not finished");
                        }}
                        labelledBy={"Select Affected versions"}
                    />
                </div>


                <br/>
                Triggered By:&nbsp;&nbsp;
                <select onChange={(e) => {
                    handleSelectTriggerChange(e);
                    changePromptContext(true, "Create task not finished")
                }}

                        ref={register} name={"triggeredById"} defaultValue={null}>
                    <option value={null}>{''}</option>
                    {Array.isArray(tasksOfProject) && tasksOfProject?.map(task => <option
                        value={task.id}>{task.name}</option>)}
                </select>
                <p>
                    <select onChange={() => changePromptContext(true, "Create task not finished")}
                            hidden={isTriggerInputHidden} ref={register} name={'triggerType'}
                            defaultValue={'BLOCKED_BY'}>
                        <option value={"BLOCKED_BY"}>Blocked by</option>
                        <option value={"TRIGGERED_BY"}>Triggered by</option>
                    </select>
                </p>
                <br/>
                <p>
                    Attach files:&nbsp;&nbsp;
                    <input type={'file'} multiple={true} onChange={event => {
                        onFileChangeHandler(event);
                        changePromptContext(true, "Create task not finished");

                    }} name={'uploadedFiles'}
                           ref={register}/>
                </p>
                <input type="submit"/>
            </form>
        </div>
    );

}