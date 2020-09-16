import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {AllSprints} from "./AllSprints";
import {getAllFreeTasksOfProject} from "../../rest-service/TaskService";
import {FreeTaskTable} from "./FreeTaskTable";
import {getAllSprintOfProjectWhichNotFinished} from "../../rest-service/SprintRESTService";

export function BackLogPage(props) {
    const location = useLocation();
    const project = location.project;

    const [freeTasks, setFreeTasks] = useState();
    const [notFinishedSprints,setNotFinishedSprints] = useState()
    useEffect(() => {
        getAllFreeTasksOfProject(project.id).then(data => setFreeTasks(data));
        getAllSprintOfProjectWhichNotFinished(project.id).then(data => setNotFinishedSprints(data));
    }, [project])

    return (
        <div>

            <AllSprints project={project}/>

            <div>
                <br/>
                <h3>Free tasks</h3>
                <FreeTaskTable notFinishedSprints={notFinishedSprints} tasks={freeTasks}/>
            </div>
        </div>
    );
}