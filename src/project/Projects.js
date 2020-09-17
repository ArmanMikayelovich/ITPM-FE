import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {createProject} from "../rest-service/ProjectService";
import {HOST_ADDRESS} from '../constants/consts'
import {Link} from "react-router-dom";
import {getUserById, getUserId, UserFullNameWithLinkToPage} from "../user/UserInfo";

function CreateProjectForm() {

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => createProject(data)

    return (

        <div>
            <h3>Create Project</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type='text' placeholder={"Project id"} name='id' ref={register}/>
                <br/>
                <input type='text' name='name' placeholder={"Project name"} ref={register}/>
                <br/>
                <input type='text' name='publisherId' placeholder={"Publisher id"} ref={register}/>
                <br/>
                <input type='text' name="description" placeholder={"Description"} ref={register}/>
                <br/>
                <input type='submit'/>
            </form>
        </div>
    );
}

export function UpdateProjectForm(props) {
    const project = props.project;

    const {register, handleSubmit} = useForm();
    const updatePage = props.updateProject;

    const updateProject = (data) => {
        fetch(HOST_ADDRESS + '/projects', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                    if (response.status === 200) {
                        updatePage(data.id);
                    } else {
                        response.json().then(data => console.log(`Error in updating project: code - ${data.status} message: ${data.message}`))
                    }
                }
            )

            .catch(error => console.log(`an error occurred ${error}`));
    }
    const onSubmit = (data) => updateProject(data)

    return (

        <div>
            <h3>Update Project</h3>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input hidden={true} type='text' name='id' ref={register} readOnly={true} value={project.id}/>
                <input hidden={true} type='text' name='publisherId' ref={register} readOnly={true}
                       value={project.publisherId}/>

                <br/>
                <p> Name
                    <input type='text' name='name' placeholder={"Project name"} defaultValue={project.name}
                           ref={register}/>
                    <br/>
                </p>
                <p>
                    Description
                    <input type='text' name="description" placeholder={"Description"}
                           defaultValue={project.description} ref={register}/>
                </p>
                <br/>
                <input type='submit' readOnly={true} value={"Update project"}/>
            </form>
        </div>
    );
}


function ProjectById() {
    const [projectId, setProjectId] = useState("");
    const [project, setProject] = useState("");

    const fetchProject = () => fetch(HOST_ADDRESS + '/projects/by-id/' + projectId, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }).then((response) => {

            let json = response.json();
            json.then(data => setProject(JSON.stringify(data)));
        }
    ).catch(error => console.log(`an error occurred ${error}`));


    return (
        <div>
            Get Project By id <br/>
            <input type={'text'} name={"projectId"} onChange={(e) => setProjectId(e.target.value)}/>
            <button onClick={fetchProject}>Get</button>
            <label>{project}</label>
        </div>
    );
}


function ProjectsByUserId(props) {
    const userId = props.userId;
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetch(HOST_ADDRESS + '/projects/by-user/' + userId, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',

            },
        }).then((response) => {

                let json = response.json();
                json.then(data => setProjects(data.content));
            }
        ).catch(error => console.log(`an error occurred ${error}`));

    }, [userId]);


    const projectList = [];

    for (let project of projects) {
        projectList.push(
            <ProjectWithLinkToPage key={project.id} projectId={project.id}/>
        )
    }

    return (
        <div>
            <h5>Projects by User: {userId}</h5>

            {projects ? projectList : ""}

        </div>
    );
}

export function ProjectWithLinkToPage(props) {
    const projectId = props.projectId
    const [project, setProject] = useState(undefined);

    const fetchProject = () => fetch(HOST_ADDRESS + '/projects/by-id/' + projectId, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }).then((response) => {

            let json = response.json();
            json.then(data => setProject(data));
        }
    ).catch(error => console.log(`an error occurred ${error}`));

    if (project === undefined) {
        fetchProject();
    }

    return (
        <div>
            <li><Link to={{
                pathname: `/project`,
                project: project
            }}> Project name : {project?.name} </Link></li>
        </div>
    )

}

export function BrowseProjects() {
    const [user, setUser] = useState();
    let [isUserFetched, setIsUserFetched] = useState(false);
    useEffect(() => {
        if (!isUserFetched) {
            getUserById(getUserId()).then(data => setUser(data));
            setIsUserFetched(true);
        }

    },[isUserFetched])

    return (
        <div>
            User: <UserFullNameWithLinkToPage userId={getUserId()}/>
            <ProjectsByUserId userId={getUserId()}/>
            <p>
                Create New Project:
                <br/>
                <Link to={{
                    pathname: `/create-project`,
                    user: user
                }}> Create New Project.</Link>
            </p>
        </div>
    );
}