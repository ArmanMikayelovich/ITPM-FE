import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {createProject, deleteProject, updateProject} from "../rest-service/ProjectService";
import {HOST_ADDRESS} from '../constants/consts'
import {Switch, useLocation} from "react-router";
import {Link, Route} from "react-router-dom";
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
    }).then((response) => response.json())
        .then(data => {
            console.log(data);
            setProjects(JSON.stringify(data.content));
        })
        .catch(error => console.log(`an error occurred ${error}`));


    return (
        <div>
            Get Projects By User id <br/>
            <input type={'text'} name={"projectId"} onChange={(e) => setUserId(e.target.value)}/>
            <button onClick={fetchProject}>Get</button>
            <h5>Projects by User: {userId}</h5>
            <ul>
                {projects}
            </ul>
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

   if(project === undefined) {
      fetchProject();
   }

    return (
        <div>
            <li><Link to={`project/${projectId}`}> Project name : {project?.name} </Link></li>
        </div>
    )

}

export function ProjectsPage() {


    return (
        <Switch>


        <div>
            <ProjectWithLinkToPage projectId={"PR_4"}/>
            {/*<h2>{location.projectId}</h2>*/}
            {/*<CreateProjectForm/>*/}
            {/*<br/>*/}
            {/*<UpdateProjectForm/>*/}
            {/*<br/>*/}
            {/*<ProjectById/>*/}
            {/*<br/>*/}
            {/*<DeleteProject/>*/}i
            {/*<br/>*/}
            <ProjectsByUserId/>
        </div>
            <Route path="project/:projectId"  component={ProjectPage}/>
        </Switch>
    );
}