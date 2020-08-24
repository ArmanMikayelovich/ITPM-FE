import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {createProject, deleteProject, updateProject} from "../rest-service/ProjectService";
import {HOST_ADDRESS} from '../constants/consts'
import {Route, Switch} from "react-router";
import {Link} from "react-router-dom";
import {ProjectPage} from "./ProjectPage";

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

function UpdateProjectForm() {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => updateProject(data)

    return (

        <div>
            <h3>Update Project</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <legend> Input Project Id for update
                    <input type='text' placeholder={"Project id"} name='id' ref={register}/>
                </legend>
                <br/>
                <input type='text' name='name' placeholder={"Project name"} ref={register}/>
                <br/>
                <input type='text' name="description" placeholder={"Description"} ref={register}/>
                <br/>
                <input type='submit'/>
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

function DeleteProject() {
    const [projectId, setProjectId] = useState();
    return (
        <div>
            Delete Project <br/>
            <input type={'text'} name={"projectId"} onChange={(e) => setProjectId(e.target.value)}/>
            <button onClick={() => deleteProject(projectId)}>Get</button>

        </div>
    );
}

function ProjectsByUserId() {
    const [userId, setUserId] = useState("");
    const [projects, setProjects] = useState("");

    const fetchProject = () => fetch(HOST_ADDRESS + '/projects/by-user/' + userId, {
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


    const projectList = [];

    for (let project of projects) {
        console.log(` looping on projects  ${JSON.stringify(project)}`);
        projectList.push(
            <ProjectWithLinkToPage projectId={project.id}/>
        )
    }

    return (
        <div>
            Get Projects By User id <br/>
            <input type={'text'} name={"projectId"} onChange={(e) => setUserId(e.target.value)}/>
            <button onClick={fetchProject}>Get</button>
            <h5>Projects by User: {userId}</h5>

            {console.log(projectList)}
            {projects ? projectList : ""}

        </div>
    );
}

function ProjectWithLinkToPage(props) {
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

export function ProjectsPage() {


    return (
        <div>



                <ProjectsByUserId/>
                <ProjectWithLinkToPage projectId={"PR_4"}/>



          </div>
    );
}