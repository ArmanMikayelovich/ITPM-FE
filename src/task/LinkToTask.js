import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {getTaskById} from "../rest-service/TaskService";

const useStyles = makeStyles({
    name: {
        paddingLeft:10,
        fontWeight: 'lighter',
        display: "inline-block",
        float: 'left'
    }
})

export function LinkToTask(props) {

    const classes = useStyles();

    const taskId = props.taskId;
    const [task, setTask] = useState();

    const [name, setName] = useState();
    useEffect(() => {
        getTaskById(taskId).then(data => setTask(data));
    }, [taskId]);

    useEffect(() => {
        if (task?.name.length > 60) {
            setName(task?.name.substring(0, 50).concat('...'));
        } else {
            setName(task?.name);
        }
    },[task])

    return (
        <div className={classes.name}>
            <Link to={`/projects/${task?.projectId}/tasks/${task?.id}`}>
                {name}
            </Link>
        </div>

    )
}

LinkToTask.propTypes = {
    taskId: PropTypes.object.isRequired
}