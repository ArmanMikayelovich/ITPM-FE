import {
    HOST_ADDRESS,
    LIST_DONE,
    LIST_IN_PROGRESS,
    LIST_TODO,
    TASK_DONE,
    TASK_IN_PROGRESS,
    TASK_TODO
} from "../../constants/consts";
import React, {useEffect, useState} from "react";
import {TaskList} from "../../task/Tasks";
import {StartSprint} from "./StartSprint";
import {CreateSprint} from "./CreateSprint";
import {DetachTaskFromSprint} from "./DetachTaskFromSprint";

export function AllSprints(props) {
    const project = props.project;
    const [sprints, setSprints] = useState();
    const [hasActiveSprint, setHasActiveSprint] = useState();

    const updateComponent = () => {
        fetch(HOST_ADDRESS + `/sprints/by-project/${project.id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {

                let json = response.json();
                json.then(data => setSprints(data.content));
            }
        ).catch(error => console.log(`an error occurred ${error}`));
    }

    const checkHasActiveSprint = (sprints) => {
        let isRunning = false;
        if (sprints !== undefined) {

            sprints.forEach(sprint => {
                if (sprint.isRunning) {
                    isRunning = true
                }
            });
            setHasActiveSprint(isRunning);
        }
    }
    useEffect(() => {
        fetch(HOST_ADDRESS + `/sprints/by-project/${project.id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {

                let json = response.json();
                json.then(data => {
                    setSprints(data.content);
                });
            }
        ).catch(error => console.log(`an error occurred ${error}`));

    }, [project]);

    useEffect(() => {
        checkHasActiveSprint(sprints);
    }, [sprints]);


    return (
        <div>
            <CreateSprint project={project} updatePage={updateComponent} />
            {sprints?.map(sprint => <TaskBoard key={sprint.id} hasActiveSprint={hasActiveSprint}  sprint={sprint}/>)}
        </div>
    )
}


function TaskBoard(props) {
    const [sprint, setSprint] = useState(props.sprint);
    const hasActiveSprint = props.hasActiveSprint;
    const updateComponent = () => {
        fetch(HOST_ADDRESS + `/sprints/${sprint.id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {

                let json = response.json();
                json.then(data => setSprint(data));
            }
        ).catch(error => console.log(`an error occurred ${error}`));
    }
    const updateAllSprints = props.updateAllSprints;
    return (
        <div style={{padding: '10px'}}>
            <h4>{`${sprint?.name} : ${sprint?.startDate === null && sprint.deadLine === null ? "Not started yet." :
                "Start date: " + sprint.startDate + " deadLine: " + sprint.deadLine}  `}</h4>
            {sprint.isRunning && <h3 style={{color: 'red'}}>RUNNING</h3>}
            {sprint.isFinished && <h3 style={{color: 'gray'}}>FINISHED</h3>}
            <div>
                {(!hasActiveSprint && !sprint.isFinished) && <StartSprint sprint={sprint} update={updateComponent}/>}
            </div>
            <DetachTaskFromSprint sprint={sprint} />
            <div style={getStyleForTaskList()}>
                <TaskList sprintId={sprint.id} taskState={TASK_TODO} listName={LIST_TODO}/>
            </div>

            <div style={getStyleForTaskList()}>
                <TaskList sprintId={sprint.id} taskState={TASK_IN_PROGRESS} listName={LIST_IN_PROGRESS}/>
            </div>

            <div style={getStyleForTaskList()}>
                <TaskList sprintId={sprint.id} taskState={TASK_DONE} listName={LIST_DONE}/>
            </div>
        </div>
    );
}


function getStyleForTaskList() {
    return {
        padding: '10px',
        border: '1px  black',
        borderStyle: 'groove',
        borderRadius: '25px',
        backgroundColor: 'white',
        width: '350px',
        height: '210px',
        overflow: 'scroll',
        display: 'inline-block'
    }
}