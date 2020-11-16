import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {TASK_STATE_DONE, TASK_STATE_IN_PROGRESS, TASK_STATE_TODO} from "../constants/consts";
import * as PropTypes from 'prop-types';
import {updateTaskState} from "../rest-service/TaskService";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export function TaskStateChanger(props) {
    const classes = useStyles();

    let task = props.task;
    const [state, setState] = useState();
    useEffect(() => {
        setState(task?.taskState);
    }, [task]);
    const isEnabled = props.isEnabled;

    const handleChange = (event) => {
        const newTaskState = event.target.value;
        if (task.taskState !== newTaskState) {
            task.taskState = newTaskState
            updateTaskState(task).then((response) => {
                    if (response.status === 200) {
                        setState(newTaskState);
                        alert("Task state updated")
                    } else {
                        alert("Some error occurred in changing task state");
                    }
                }
            ).catch(error => console.log(`an error occurred ${error}`));
        }
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                {state && <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    onChange={handleChange}
                >
                    <MenuItem disabled={!isEnabled} value={TASK_STATE_TODO}>To Do</MenuItem>
                    <MenuItem disabled={!isEnabled} value={TASK_STATE_IN_PROGRESS}>In Progress</MenuItem>
                    <MenuItem disabled={!isEnabled} value={TASK_STATE_DONE}>Done</MenuItem>
                </Select>}

            </FormControl>
        </div>
    )

}

TaskStateChanger.propTypes = {
    task: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool.isRequired
}