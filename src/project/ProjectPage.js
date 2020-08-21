import React from "react";
import {useParams} from "react-router";

export function ProjectPage(props) {

    let { projectId } = useParams();

alert(projectId);
    return (
        <div>asdfsadf<h1>asd {projectId}</h1></div>
    )
}