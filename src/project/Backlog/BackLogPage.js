import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {AllSprints} from "./AllSprints";
import {getAllFreeTasksOfProject} from "../../rest-service/TaskService";
import {FreeTaskTable} from "./FreeTaskTable";
import {getAllSprintOfProjectWhichNotFinished} from "../../rest-service/SprintRESTService";
import {getProjectById} from "../../rest-service/ProjectService";

export function BackLogPage(props) {
    let {projectId} = useParams();
    const [project, setProject] = useState();
    useEffect(() => {
        getProjectById(projectId).then(data => setProject(data));
    },[projectId])

    const [freeTasks, setFreeTasks] = useState([]);
    const [notFinishedSprints, setNotFinishedSprints] = useState([])
    useEffect(() => {
        getAllFreeTasksOfProject(projectId).then(data => setFreeTasks(data));
        getAllSprintOfProjectWhichNotFinished(projectId).then(data => setNotFinishedSprints(data));
    }, [project])

    return (
        <div>

            <AllSprints projectId={projectId}/>

            <div>
                <br/>
                <h3>Free tasks</h3>
                <FreeTaskTable notFinishedSprints={notFinishedSprints} tasks={freeTasks}/>
            </div>
        </div>
    );
}