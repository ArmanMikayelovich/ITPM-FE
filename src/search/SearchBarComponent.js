import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {HOST_ADDRESS} from "../constants/consts";
import {useHistory} from "react-router";
import {getUserId} from "../user/UserInfo";

export function SearchBarComponent() {
    const {register, handleSubmit} = useForm();
    const history = useHistory();
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetch(HOST_ADDRESS + '/projects/by-user/' + getUserId(), {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',

            },
        }).then((response) => {
                if (response.status === 200) {
                    let json = response.json();
                    json.then(data => setProjects(data.content));
                }
            }
        ).catch(error => console.log(`an error occurred ${error}`));

    }, [history]);

    const onSubmit = (data) => {
        const searchText = data.searchText;
        const projectId = data.projectId;
        alert(JSON.stringify(data))
        if (searchText) {
            const trimmed = searchText.trim();
            getSearchResults(trimmed, projectId).then(data => {
                history.push("/search-results", data);
            })
        } else {
            alert("Search bart is empty!");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type={'text'} name={'searchText'} readOnly={false} ref={register}/> &nbsp;&nbsp;&nbsp;
                <select ref={register} name={'projectId'} defaultValue={null}>
                    <option value={''}>None</option>
                    {projects?.map(project => <option value={project.id}>{project.name}</option>)}
                </select>
                <input type={'submit'} value={"Search!"}/>
            </form>
        </div>
    );
}

export async function getSearchResults(searchText, projectId) {
    let query;
    if (searchText && projectId) {
        query = `/search?projectId=${projectId}&searchText=${searchText}`;
    } else {
        query = `/search?searchText=${searchText}`;
    }
    let response = await fetch(HOST_ADDRESS + query, {
        method: 'GET',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });
    return await response.json();

}