import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {getTaskById} from "../rest-service/TaskService";

const useStyles = makeStyles({
    name: {
        top: 5,
        paddingTop: 5,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bolder',
        display: "inline-block",
        width: '250px',
        height: '150',
        paddingLeft: '5px',
        float: 'left'
    }
})

export function LinkToTask(props) {

    const classes = useStyles();

    const taskId = props.taskId;
    const [task, setTask] = useState();

    useEffect(() => {
        getTaskById(taskId).then(data => setTask(data));
    }, [taskId]);

    return (
        <div className={classes.name}>
            <Link to={`/projects/${task?.projectId}/tasks/${task?.id}`}>
                {task?.name}
            </Link>
        </div>

    )
}

LinkToTask.propTypes = {
    taskId: PropTypes.object.isRequired
}