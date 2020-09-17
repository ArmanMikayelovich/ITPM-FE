import React, {useEffect, useState} from "react";
import {getUserId, UserFullName} from "./UserInfo";
import {useLocation} from "react-router";
import {HOST_ADDRESS} from "../constants/consts";
import {TaskList} from "../task/Tasks";
import {useForm} from "react-hook-form";
import {getProjectById} from "../rest-service/ProjectService";

const CREATED = "created";
const TODO = "TODO";
const IN_PROGRESS = "IN_PROGRESS";
const DONE = "DONE";
const SHOW_ALL = 'all';
export function UserPage() {
    const location = useLocation();
    const user = location.user;

    const [filter, setFilter] = useState({projectId:'all', sort: false});

    const [projects, setProjects] = useState();
    useEffect(() => {
        fetch(HOST_ADDRESS + `/projects/by-user/${user.userId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => {
            const promise = response.json();
            promise.then(data => setProjects(data.content));
        })
    }, [user,filter]);

    const {register, handleSubmit} = useForm();

    const handleFilterSubmit = data => {
        setFilter(data);
    }

    return (
        <div>
            <AboutUser user={user}/>
            <form onSubmit={handleSubmit(handleFilterSubmit)}>
                <p>Filter By project</p>
                <select ref={register} defaultValue={SHOW_ALL} name={'projectId'}>
                    <option value={SHOW_ALL}>Show All</option>
                    {projects?.map(project => <option key={project.id} value={project.id}>{project.name}</option>)}
                </select>
                <input ref={register} type="checkbox" id="sort" name="sort"/>
                <label htmlFor="sort"> Sort Tasks by priority</label>
                <input type={'submit'} value={"Filter"}/>
            </form>
            {filter?.projectId === 'all' ? <ProjectsOfUser sort={filter?.sort} userId={user.userId}/> :
                <TasksOfUserInProject sort={filter?.sort} key={filter?.projectId} userId={getUserId()} projectId={filter.projectId}/>}

        </div>
    );
}

function AboutUser(props) {
    const user = props.user;
    return (
        <div style={{
            float: 'left',
            margin: '10px',
            border: '1px solid #eee',
            'boxShadow': '0 2px 2px #cccccc',
            width: ' 200px',
            padding: '20px'
        }}>
            <h5>Full Name:</h5>
            <UserFullName user={user}/>

            <h5>Email:</h5>
            <p>{user.email}</p>

            <h5>Registration date:</h5>
            <p>{user.registrationDate}</p>

        </div>
    )
}

function ProjectsOfUser(props) {
    const userId = props.userId;
    const [projects, setProjects] = useState([]);
    let [isFetched, setIsFetched] = useState(false);
    const sort = props.sort;
    useEffect(() => {
        fetch(HOST_ADDRESS + `/projects/by-user/${userId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {

                let json = response.json();
                json.then(data => {
                    let content = data.content;
                    let projs = []
                    console.log(data.content)
                    for (let project of content) {
                        projs.push(project);
                    }
                    setProjects(projs);
                    setIsFetched(true);
                });
            }
        ).catch(error => console.log(`an error occurred ${error}`));
    }, [userId, isFetched]);

    return (
        <div style={{display: 'inline-block'}}>
            {projects.map(item => <TasksOfUserInProject sort={sort} key={item.id} userId={userId} project={item}/>)}
        </div>
    );
}

function TasksOfUserInProject(props) {
    const userId = props.userId;
    const projectId = props?.project?.id !== undefined ? props.project.id : props.projectId;
    const [projectName, setProjectName] = useState();
    const sort = props.sort;
    let keyCounter = 0;

    useEffect(() => {
        if (props?.project?.id !== undefined) {
            getProjectById((projectId)).then(data => setProjectName(data.name));
        }
    }, [userId, projectId,sort]);



    const [lists, setLists] = useState([]);
    useEffect(() => {
        let query = "";
        if(sort) {
            query = '?direction=DESC&sort=priority'
        }
        fetch(HOST_ADDRESS + `/users/${userId}/projects/${projectId}/tasks${query}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {

                let json = response.json();
                json.then(data => {
                    let content = data;
                    if (content[CREATED] && content[CREATED].length !== 0) {
                        lists.push({name: "Created", arr: content.created});
                    }
                    if (content[TODO] && content[TODO].length !== 0) {
                        lists.push({name: "To do", arr: content[TODO]});
                    }
                    if (content[IN_PROGRESS] && content[IN_PROGRESS].length !== 0) {
                        lists.push({name: "In Progress", arr: content[IN_PROGRESS]});
                    }
                    if (content[DONE] && content[DONE].length !== 0) {
                        lists.push({name: "Done", arr: content[DONE]});
                    }
                });
            }
        ).catch(error => console.log(`an error occurred ${error}`));
    }, [userId, projectId, lists,sort]);


    return (
        <div style={{
            display: 'inline-block',
            margin: '10px',
            border: '1px solid #eee',
            'boxShadow': '0 2px 2px #cccccc',
            width: ' 300px',
            padding: '20px'
        }}>
            <div><h4>{projectName}</h4></div>
            {lists.map(item => (
                <div key={projectId + userId + keyCounter++} style={{
                    display: 'inline-block',
                    margin: '10px',
                    border: '1px solid #eee',
                    'boxShadow': '0 2px 2px #cccccc',
                    width: ' 200px',
                    padding: '20px'
                }}>
                    <TaskList key={projectId + userId + keyCounter++} listName={item.name}
                              taskArray={item.arr}/></div>))}

        </div>
    );
}

